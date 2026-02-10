import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { createUser } from "../../api/users";

export default function StudentCreateScreen({ navigation }: any) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSave() {
    if (!nome || !email || !password) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    await createUser({ nome, email, password, user_type: "ALUNO" });
    navigation.goBack();
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontWeight: "900", marginBottom: 6 }}>Nome</Text>
      <TextInput
        value={nome}
        onChangeText={setNome}
        style={{
          backgroundColor: "#fff",
          padding: 12,
          borderRadius: 12,
          marginBottom: 14,
        }}
      />

      <Text style={{ fontWeight: "900", marginBottom: 6 }}>E-mail</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{
          backgroundColor: "#fff",
          padding: 12,
          borderRadius: 12,
          marginBottom: 14,
        }}
      />

      <Text style={{ fontWeight: "900", marginBottom: 6 }}>Senha</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          backgroundColor: "#fff",
          padding: 12,
          borderRadius: 12,
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
          Salvar
        </Text>
      </TouchableOpacity>
    </View>
  );
}
