import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { api } from "../../api/client";

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

export default function PostReadScreen({ route }: any) {
  const { id } = route.params;
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/posts/${id}`);
        setPost(data);
      } catch (err: any) {
        console.log("POST_READ_ERROR:", err?.response?.data ?? err?.message ?? err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
        <Text style={{ marginTop: 10 }}>Abrindo post...</Text>
      </View>
    );
  }

  if (!post) {
    return (
      <View style={{ flex: 1, padding: 16 }}>
        <Text>Post não encontrado.</Text>
      </View>
    );
  }

  const autor = post.created_by?.nome?.trim() || "Autor desconhecido";
  const data = formatarData(post.created_at);
  const linhaMeta = data ? `por ${autor} • ${data}` : `por ${autor}`;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#fff" }}
      contentContainerStyle={{ padding: 16 }}
    >
      <Text style={{ fontSize: 22, fontWeight: "900", color: "#111" }}>
        {post.title}
      </Text>

      <Text style={{ color: "#777", marginTop: 6, marginBottom: 14 }}>
        {linhaMeta}
      </Text>

      <Text style={{ color: "#222", lineHeight: 22, fontSize: 16 }}>
        {post.content}
      </Text>
    </ScrollView>
  );
}
