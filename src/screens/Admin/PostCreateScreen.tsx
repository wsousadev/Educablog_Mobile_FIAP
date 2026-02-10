import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { api } from "../../api/client";

export default function PostCreateScreen() {
  const navigation = useNavigation<any>();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function handleSave() {
    if (!title || !content) {
      Alert.alert("Erro", "Preencha título e conteúdo.");
      return;
    }

    await api.post("/posts", { title, content });
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
          Publicar
        </Text>
      </TouchableOpacity>
    </View>
  );
}
