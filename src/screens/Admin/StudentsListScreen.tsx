import React, { useCallback, useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { deleteUser, listUsers, UserDTO } from "../../api/users";

const PAGE_SIZE = 10;

export default function StudentsListScreen() {
  const navigation = useNavigation<any>();
  const [all, setAll] = useState<UserDTO[]>([]);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  async function load() {
    const users = await listUsers();
    setAll(users.filter((u) => u.user_type === "ALUNO"));
    setPage(1);
  }
  useFocusEffect(
    useCallback(() => {
      load();
    }, [])
  );

  const pageItems = useMemo(() => all.slice(0, page * PAGE_SIZE), [all, page]);
  const hasMore = pageItems.length < all.length;

  async function onRefresh() {
    setRefreshing(true);
    try {
      await load();
    } finally {
      setRefreshing(false);
    }
  }

  function confirmDelete(id: number) {
    Alert.alert("Excluir aluno", "Tem certeza?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          await deleteUser(id);
          await load();
        },
      },
    ]);
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#f6f6f6", padding: 14 }}>
      <TouchableOpacity
        onPress={() => navigation.navigate("StudentCreate")}
        style={{
          backgroundColor: "#7a1e2b",
          padding: 14,
          borderRadius: 16,
          marginBottom: 14,
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "900", textAlign: "center" }}>
          Cadastrar novo aluno
        </Text>
      </TouchableOpacity>

      <FlatList
        data={pageItems}
        keyExtractor={(item) => String(item.id)}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={{ padding: 24, alignItems: "center" }}>
            <Text style={{ color: "#777", fontWeight: "800" }}>
              Nenhum aluno cadastrado.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "#fff",
              padding: 14,
              borderRadius: 16,
              marginBottom: 12,
            }}
          >
            <Text style={{ fontWeight: "900", fontSize: 16 }}>{item.nome}</Text>
            <Text style={{ color: "#666", marginTop: 4 }}>{item.email}</Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginTop: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("StudentEdit", { id: item.id })}
                style={{ marginRight: 16 }}
              >
                <Text style={{ color: "#1976d2", fontWeight: "800" }}>
                  Editar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => confirmDelete(item.id)}>
                <Text style={{ color: "#e03131", fontWeight: "800" }}>
                  Excluir
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListFooterComponent={
          hasMore ? (
            <TouchableOpacity
              onPress={() => setPage((p) => p + 1)}
              style={{
                padding: 14,
                borderRadius: 16,
                backgroundColor: "#fff",
                borderWidth: 1,
                borderColor: "rgba(0,0,0,0.08)",
                marginTop: 6,
              }}
            >
              <Text style={{ fontWeight: "900", textAlign: "center" }}>
                Carregar mais
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={{ height: 6 }} />
          )
        }
      />
    </View>
  );
}
