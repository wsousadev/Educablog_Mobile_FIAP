import { api } from "./client";

export type UserType = "PROFESSOR" | "ALUNO";

export type UserDTO = {
  id: number;
  nome: string;
  email: string;
  user_type: UserType;
};

export type CreateUserPayload = {
  nome: string;
  email: string;
  password: string;
  user_type: UserType;
};

export type UpdateUserPayload = Partial<{
  nome: string;
  email: string;
  password: string;
  user_type: UserType;
}>;

export async function listUsers() {
  const { data } = await api.get<UserDTO[]>("/users");
  return Array.isArray(data) ? data : [];
}

export async function getUser(id: number) {
  const { data } = await api.get<UserDTO>(`/users/${id}`);
  return data;
}

export async function createUser(payload: CreateUserPayload) {
  const { data } = await api.post("/users/register", payload);
  return data;
}

export async function updateUser(id: number, payload: UpdateUserPayload) {
  const { data } = await api.put(`/users/${id}`, payload);
  return data;
}

export async function deleteUser(id: number) {
  const { data } = await api.delete(`/users/${id}`);
  return data;
}
