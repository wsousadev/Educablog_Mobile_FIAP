import axios from "axios";

export const API_URL = process.env.EXPO_PUBLIC_API_URL ?? "";

if (!API_URL) {
  console.warn("EXPO_PUBLIC_API_URL não definido. Verifique o .env");
  console.log("API_URL:", API_URL);

}

export const api = axios.create({
  baseURL: API_URL,
  timeout: 60000,
});
