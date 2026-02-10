import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { api } from "../api/client";
import { clearAuth, getAuth, saveAuth, StoredUser } from "../utils/storage";

type Role = "PROFESSOR" | "ALUNO" | null;

type AuthState = {
  token: string | null;
  user: StoredUser | null;
  role: Role;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<StoredUser | null>(null);
  const [loading, setLoading] = useState(true);

  const role: Role = (user?.user_type as Role) ?? null;

  useEffect(() => {
    (async () => {
      try {
        const saved = await getAuth();

        if (saved?.token) {
          setToken(saved.token);
          setUser(saved.user ?? null);
          api.defaults.headers.common.Authorization = `Bearer ${saved.token}`;
        }
      } catch (err) {
        console.log("RESTORE_SESSION_ERROR:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    const id = api.interceptors.response.use(
      (res) => res,
      async (err) => {
        if (err?.response?.status === 401) {
          await signOut();
        }
        return Promise.reject(err);
      },
    );

    return () => api.interceptors.response.eject(id);
  }, []);

  async function signIn(email: string, password: string) {
    console.log("LOGIN_PAYLOAD:", {
      email,
      emailLen: email.length,
      passLen: password.length,
    });
    console.log("LOGIN_URL:", api.defaults.baseURL + "/auth/login");

    const { data } = await api.post("/auth/login", { email, password });

    const newToken: string = data.token;
    const newUser: StoredUser = {
      id: data.id,
      nome: data.nome,
      email,
      user_type: data.user_type,
    };

    api.defaults.headers.common.Authorization = `Bearer ${newToken}`;
    setToken(newToken);
    setUser(newUser);
    await saveAuth(newToken, newUser);
  }

  async function signOut() {
    setToken(null);
    setUser(null);
    delete api.defaults.headers.common.Authorization;
    await clearAuth();
  }

  const value = useMemo(
    () => ({ token, user, role, loading, signIn, signOut }),
    [token, user, role, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
