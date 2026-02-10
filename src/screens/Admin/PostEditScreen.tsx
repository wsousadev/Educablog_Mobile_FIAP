import React, { useEffect, useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { api } from "../../api/client";

export default function PostEditScreen({ route, navigation }: any) {
  const { id } = route.params;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

useEffect(() => {
  (async () => {
    const { data } = await api.get(`/posts/${id}`);
    setTitle(data.title);
    setContent(data.content);
  })();
}, [id]);

  async function handleSave() {
    if (!title || !content) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    await api.put(`/posts/${id}`, { title, content });
    navigation.goBack();
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontWeight: "900", marginBottom: 6 }}>Título</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={{
          backgroundColor: "#fff",
          padding: 12,
          borderRadius: 12,
          marginBottom: 14,
        }}
      />

      <Text style={{ fontWeight: "900", marginBottom: 6 }}>Conteúdo</Text>
      <TextInput
        value={content}
        onChangeText={setContent}
        multiline
        style={{
          backgroundColor: "#fff",
          padding: 12,
          borderRadius: 12,
          height: 180,
          textAlignVertical: "top",
        }}
      />

      <TouchableOpacity
        onPress={handleSave}
        style={{
          backgroundColor: "#7a1e2b",
          padding: 14,
          borderRadius: 16,
          marginTop: 20,
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "900", textAlign: "center" }}>
          Salvar alterações
        </Text>
      </TouchableOpacity>
    </View>
  );
}
