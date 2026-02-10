import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "@tc_token";
const USER_KEY = "@tc_user";

export type StoredUser = {
  id: string | number;
  nome?: string;
  email?: string;
  user_type?: "PROFESSOR" | "ALUNO";
};

export async function saveAuth(token: string, user: StoredUser) {
  await AsyncStorage.multiSet([
    [TOKEN_KEY, token],
    [USER_KEY, JSON.stringify(user)],
  ]);
}

export async function getAuth() {
  const [[, token], [, userStr]] = await AsyncStorage.multiGet([TOKEN_KEY, USER_KEY]);
  const user = userStr ? (JSON.parse(userStr) as StoredUser) : null;
  return { token: token ?? null, user };
}

export async function clearAuth() {
  await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
}
