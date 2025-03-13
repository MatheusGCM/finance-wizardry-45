import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DollarSign, Eye, EyeOff, LogIn } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await login(email, password);
      toast.success("Login realizado com sucesso!", {
        className: "success",
      });
      navigate("/");
    } catch (error) {
      toast.error("Credenciais inválidas. Tente novamente.", {
        className: "destructive",
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-finance-dark flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md animate-fade-in">
        <div className="flex items-center justify-center mb-8">
          <div className="w-12 h-12 bg-finance-income rounded-md flex items-center justify-center animate-pulse-subtle">
            <DollarSign className="text-white h-7 w-7" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight ml-3">NoMoney</h1>
        </div>

        <div className="card-finance">
          <h2 className="text-xl font-semibold mb-6 text-center">
            Acesse sua conta
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="E-mail"
                required
                className="input-finance"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                required
                className="input-finance pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-finance-muted hover:text-finance-text"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isSubmitting}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="text-right">
              <Link
                to="/recuperar-senha"
                className="text-sm text-finance-income hover:underline"
              >
                Esqueceu sua senha?
              </Link>
            </div>

            <button
              type="submit"
              className="btn-finance w-full flex items-center justify-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn size={18} />
                  <span>Entrar</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-finance-muted">
              Não tem uma conta?{" "}
              <Link
                to="/cadastro"
                className="text-finance-income hover:underline"
              >
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>

        <p className="text-finance-muted text-sm text-center mt-8">
          &copy; {new Date().getFullYear()} NoMoney. Todos os direitos
          reservados.
        </p>
      </div>
    </div>
  );
};

export default Login;
