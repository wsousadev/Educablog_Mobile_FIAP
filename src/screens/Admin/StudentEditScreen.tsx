import React, { useEffect, useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { getUser, updateUser } from "../../api/users";

export default function StudentEditScreen({ route, navigation }: any) {
  const { id } = route.params;

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    (async () => {
      const u = await getUser(id);
      setNome(u.nome ?? "");
      setEmail(u.email ?? "");
    })();
  }, []);

  async function handleSave() {
    if (!nome || !email) {
      Alert.alert("Erro", "Nome e e-mail são obrigatórios.");
      return;
    }

    const payload: any = { nome, email };
    if (password.trim()) payload.password = password.trim();

    await updateUser(id, payload);
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

      <Text style={{ fontWeight: "900", marginBottom: 6 }}>
        Nova senha (opcional)
      </Text>
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
