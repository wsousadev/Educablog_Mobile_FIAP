import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { api } from "../../api/client";
import { useAuth } from "../../context/AuthContext";

type Post = {
  id: number;
  title: string;
  content: string;
  created_at?: string | null;
  created_by?: {
    nome?: string | null;
  } | null;
};

function formatarData(iso?: string | null) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(d);
}

export default function PostsListScreen() {
  const navigation = useNavigation<any>();
  const { role, signOut } = useAuth();

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);

  async function loadPosts() {
    const { data } = await api.get("/posts");
    console.log("POSTS SAMPLE:", data?.[0]);
    setPosts(Array.isArray(data) ? data : []);
  }

  async function searchPosts(term: string) {
    const trimmed = term.trim();
    if (!trimmed) {
      await loadPosts();
      return;
    }
    const { data } = await api.get(`/posts/search`, {
      params: { termo: trimmed },
    });
    setPosts(Array.isArray(data) ? data : []);
  }

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) return;

    const t = setTimeout(async () => {
      try {
        setSearching(true);
        await searchPosts(trimmed);
      } catch (err: any) {
        console.log(
          "SEARCH_ERROR:",
          err?.response?.data ?? err?.message ?? err,
        );
      } finally {
        setSearching(false);
      }
    }, 450);

    return () => clearTimeout(t);
  }, [query]);

  useEffect(() => {
    (async () => {
      try {
        await loadPosts();
      } catch (err: any) {
        console.log("POSTS_ERROR:", err?.response?.data ?? err?.message ?? err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function onRefresh() {
    setRefreshing(true);
    try {
      if (query.trim()) {
        await searchPosts(query);
      } else {
        await loadPosts();
      }
    } finally {
      setRefreshing(false);
    }
  }

  const headerSubtitle = useMemo(() => {
    if (searching) return "Buscando…";
    if (query.trim()) return `Resultados para: "${query.trim()}"`;
    return "Explore os conteúdos publicados por professores.";
  }, [query, searching]);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
        <Text style={{ marginTop: 10 }}>Carregando feed...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#f6f6f6" }}>
      {/* Header */}
      <View style={{ padding: 14, paddingTop: 18 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Título */}
          <View style={{ flex: 1, paddingRight: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: "900" }}>
              {headerSubtitle}
            </Text>
          </View>

          {/* Botão Sair */}
          <TouchableOpacity
            onPress={signOut}
            activeOpacity={0.8}
            style={{
              paddingHorizontal: 10,
              paddingVertical: 6,
              borderRadius: 12,
              backgroundColor: "#f2f2f2",
            }}
          >
            <Text style={{ color: "#7a1e2b", fontWeight: "800" }}>Sair</Text>
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View
          style={{
            marginTop: 14,
            backgroundColor: "#fff",
            borderRadius: 16,
            paddingHorizontal: 12,
            paddingVertical: 10,
            flexDirection: "row",
            alignItems: "center",
            shadowColor: "#000",
            shadowOpacity: 0.06,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 4 },
            elevation: 1,
          }}
        >
          <Text style={{ marginRight: 8, fontSize: 16 }}>🔎</Text>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Buscar posts..."
            placeholderTextColor="#999"
            autoCapitalize="none"
            style={{ flex: 1, color: "#111", fontWeight: "700" }}
          />
          {!!query.trim() && (
            <TouchableOpacity
              onPress={async () => {
                setQuery("");
                setSearching(true);
                try {
                  await loadPosts();
                } finally {
                  setSearching(false);
                }
              }}
              activeOpacity={0.8}
              style={{
                paddingHorizontal: 10,
                paddingVertical: 6,
                borderRadius: 12,
                backgroundColor: "#f2f2f2",
              }}
            >
              <Text style={{ fontWeight: "900", color: "#333" }}>Limpar</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => String(item.id)}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ padding: 14, paddingBottom: 30 }}
        ListEmptyComponent={
          <View style={{ padding: 20, alignItems: "center" }}>
            <Text style={{ color: "#777", fontWeight: "800" }}>
              Nenhum post encontrado.
            </Text>
          </View>
        }
        renderItem={({ item }) => {
          const preview =
            item.content?.length > 140
              ? item.content.slice(0, 140) + "…"
              : item.content;

          const autor = item.created_by?.nome?.trim() || "Autor desconhecido";
          const data = formatarData(item.created_at);

          // "por Professor Admin • 08/02/2026"
          const linhaMeta = data ? `por ${autor} • ${data}` : `por ${autor}`;

          return (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigation.navigate("PostRead", { id: item.id })}
              style={{
                backgroundColor: "#fff",
                borderRadius: 16,
                padding: 14,
                marginBottom: 12,
                shadowColor: "#000",
                shadowOpacity: 0.08,
                shadowRadius: 12,
                shadowOffset: { width: 0, height: 6 },
                elevation: 2,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              >
                <View style={{ flex: 1, paddingRight: 10 }}>
                  <Text
                    style={{ fontWeight: "900", fontSize: 16, color: "#111" }}
                  >
                    {item.title}
                  </Text>

                  <Text style={{ color: "#777", marginTop: 2 }}>
                    {linhaMeta}
                  </Text>
                </View>
              </View>

              <Text style={{ color: "#333", lineHeight: 20 }}>{preview}</Text>

              <View style={{ marginTop: 12, flexDirection: "row" }}>
                <View
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 999,
                    backgroundColor: "#f2f2f2",
                  }}
                >
                  <Text style={{ color: "#7a1e2b", fontWeight: "900" }}>
                    Ler mais
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
