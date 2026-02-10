import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { api } from "../../api/client";

type Post = {
  id: number;
  title: string;
  content?: string;
  created_by?: {
    id: number;
    nome:  string;
    email?: string;
  } | null;
};

function getPreview(text?: string, max = 90) {
  const clean = (text || "").replace(/\s+/g, " ").trim();
  if (!clean) return "";
  return clean.length > max ? clean.slice(0, max) + "..." : clean;
}

export default function PostsAdminScreen() {
  const navigation = useNavigation<any>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  async function loadPosts() {
    const { data } = await api.get("/posts");
    setPosts(Array.isArray(data) ? data : []);
  }

  useFocusEffect(
    useCallback(() => {
      let active = true;

      (async () => {
        try {
          await loadPosts();
        } catch (e) {
          Alert.alert("Erro", "Não foi possível carregar os posts.");
        } finally {
          if (active) setLoading(false);
        }
      })();

      return () => {
        active = false;
      };
    }, [])
  );

  async function onRefresh() {
    setRefreshing(true);
    try {
      await loadPosts();
    } catch (e) {
      Alert.alert("Erro", "Não foi possível atualizar os posts.");
    } finally {
      setRefreshing(false);
    }
  }

  function deletePost(id: number) {
    Alert.alert("Excluir post", "Tem certeza que deseja excluir este post?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            await api.delete(`/posts/${id}`);
            await loadPosts();
          } catch (e) {
            Alert.alert("Erro", "Não foi possível excluir o post.");
          }
        },
      },
    ]);
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#f6f6f6", padding: 14 }}>
      <TouchableOpacity
        onPress={() => navigation.navigate("PostCreate")}
        style={{
          backgroundColor: "#7a1e2b",
          padding: 14,
          borderRadius: 16,
          marginBottom: 14,
        }}
        activeOpacity={0.9}
      >
        <Text style={{ color: "#fff", fontWeight: "900", textAlign: "center" }}>
          Criar novo post
        </Text>
      </TouchableOpacity>

      <FlatList
        data={posts}
        keyExtractor={(item) => String(item.id)}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={{ padding: 20, alignItems: "center" }}>
            <Text style={{ color: "#777", fontWeight: "800" }}>
              Nenhum post cadastrado.
            </Text>
          </View>
        }
        renderItem={({ item }) => {
          const author = item.created_by?.nome || "Autor não informado";
          const preview = getPreview(item.content, 95);

          return (
            <View
              style={{
                backgroundColor: "#fff",
                padding: 14,
                borderRadius: 16,
                marginBottom: 12,
              }}
            >
              <Text style={{ fontWeight: "900", fontSize: 16 }}>
                {item.title}
              </Text>

              
              <Text style={{ marginTop: 6, color: "#666", fontWeight: "700" }}>
                por {author}
              </Text>

              
              {!!preview && (
                <Text style={{ marginTop: 6, color: "#777", lineHeight: 20 }}>
                  {preview}
                </Text>
              )}

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginTop: 10,
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate("PostEdit", { id: item.id })}
                  style={{ marginRight: 16 }}
                >
                  <Text style={{ color: "#1976d2", fontWeight: "800" }}>
                    Editar
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => deletePost(item.id)}>
                  <Text style={{ color: "#e03131", fontWeight: "800" }}>
                    Excluir
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}
