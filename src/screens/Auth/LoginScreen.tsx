import React, { useState } from "react";
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "../../context/AuthContext";

export default function LoginScreen() {
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    const emailNorm = email.trim().toLowerCase();
    const passNorm = password.trim();

    if (!emailNorm || !passNorm) {
      Alert.alert("Atenção", "Informe email e senha.");
      return;
    }

    setLoading(true);
    try {
      await signIn(emailNorm, passNorm);
    } catch (err: any) {
      Alert.alert(
        "Erro ao entrar",
        err?.response?.data?.message ?? "Falha no login",
      );
      console.log(
        "LOGIN_ERR:",
        err?.response?.status,
        err?.response?.data ?? err?.message,
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
      <Text style={{ fontSize: 22, fontWeight: "700", marginBottom: 16 }}>
        EducaBlog
      </Text>

      <Text style={{ marginBottom: 6 }}>Email</Text>
      <TextInput
        autoCorrect={false}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="seuemail@exemplo.com"
        style={{
          borderWidth: 1,
          borderColor: "#ddd",
          borderRadius: 10,
          padding: 12,
          marginBottom: 12,
        }}
      />

      <Text style={{ marginBottom: 6 }}>Senha</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
        placeholder="sua senha"
        style={{
          borderWidth: 1,
          borderColor: "#ddd",
          borderRadius: 10,
          padding: 12,
          marginBottom: 18,
        }}
      />

      <TouchableOpacity
        onPress={handleLogin}
        disabled={loading}
        style={{
          backgroundColor: "#7a1e2b",
          padding: 14,
          borderRadius: 12,
          alignItems: "center",
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={{ color: "#fff", fontWeight: "700" }}>Entrar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
