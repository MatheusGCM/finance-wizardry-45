import {
  type ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { supabase } from "../lib/supabase";
import type { Session, User as SupabaseUser } from "@supabase/supabase-js";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext({} as AuthContextType);

// Local storage key for persisting user data
const LOCAL_STORAGE_KEY = "@nomoney:user-1.0.0";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Função para transformar um usuário do Supabase em nosso formato de usuário
  const formatUser = useCallback((session: Session | null): User | null => {
    if (!session?.user) return null;

    const supaUser = session.user;

    return {
      id: supaUser.id,
      email: supaUser.email || "",
      name:
        supaUser.user_metadata?.name ||
        supaUser.email?.split("@")[0] ||
        "Usuário",
    };
  }, []);

  // Verificar sessão atual ao carregar
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(formatUser(session));
      setLoading(false);
    });

    // Verificar sessão atual imediatamente
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(formatUser(session));
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [formatUser]);

  // Login com email e senha
  const login = useCallback(
    async (email: string, password: string) => {
      setLoading(true);

      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        setUser(formatUser(data.session));
      } catch (error: unknown) {
        console.error(
          "Erro no login:",
          error instanceof Error ? error.message : String(error)
        );
        throw new Error(
          error instanceof Error ? error.message : "Erro ao fazer login"
        );
      } finally {
        setLoading(false);
      }
    },
    [formatUser]
  );

  // Cadastro com email e senha
  const register = useCallback(
    async (name: string, email: string, password: string) => {
      setLoading(true);

      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name,
            },
          },
        });

        if (error) throw error;

        // Se o usuário foi criado com sucesso
        if (data.user) {
          // Em produção, o Supabase pode exigir confirmação de email
          // Nesse caso, mostrar uma mensagem para o usuário verificar o email
          if (data.session === null) {
            toast.info("Verifique seu email para confirmar seu cadastro", {
              duration: 6000,
            });
          } else {
            setUser(formatUser(data.session));
          }
        }
      } catch (error: unknown) {
        console.error(
          "Erro no cadastro:",
          error instanceof Error ? error.message : String(error)
        );
        throw new Error(
          error instanceof Error ? error.message : "Erro ao criar conta"
        );
      } finally {
        setLoading(false);
      }
    },
    [formatUser]
  );

  // Logout
  const logout = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setUser(null);
    } catch (error: unknown) {
      console.error(
        "Erro ao fazer logout:",
        error instanceof Error ? error.message : String(error)
      );
      throw new Error(
        error instanceof Error ? error.message : "Erro ao fazer logout"
      );
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        register,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
