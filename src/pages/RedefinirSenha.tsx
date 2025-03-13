import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DollarSign, Eye, EyeOff, Save } from "lucide-react";
import { supabase } from "../lib/supabase";
import { toast } from "sonner";

const RedefinirSenha = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidLink, setIsValidLink] = useState(true);
  
  const navigate = useNavigate();
  
  // Verificar se o link de redefinição é válido
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      
      // Se não houver sessão, o link pode não ser válido
      if (!data.session) {
        setIsValidLink(false);
      }
    };
    
    checkSession();
  }, []);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem", {
        className: "destructive"
      });
      return;
    }
    
    if (password.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres", {
        className: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      });
      
      if (error) throw error;
      
      toast.success("Senha atualizada com sucesso!", {
        className: "success"
      });
      
      // Redirecionar para a página de login após alguns segundos
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error: any) {
      toast.error(error.message || "Erro ao atualizar senha", {
        className: "destructive"
      });
      console.error("Erro na redefinição de senha:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isValidLink) {
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
            <h2 className="text-xl font-semibold mb-6 text-center">Link Inválido</h2>
            <p className="text-finance-muted text-center mb-6">
              Este link de redefinição de senha é inválido ou expirou.
            </p>
            
            <div className="mt-6 text-center">
              <Link to="/recuperar-senha" className="btn-finance inline-flex items-center justify-center">
                Solicitar novo link
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
          <h2 className="text-xl font-semibold mb-2 text-center">Redefinir Senha</h2>
          <p className="text-finance-muted text-center mb-6">
            Digite sua nova senha abaixo.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Nova senha"
                required
                className="input-finance pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting}
                minLength={6}
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
            
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirme a nova senha"
                required
                className="input-finance pr-10"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isSubmitting}
                minLength={6}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-finance-muted hover:text-finance-text"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={isSubmitting}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            
            <button 
              type="submit" 
              className="btn-finance w-full flex items-center justify-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <Save size={18} />
                  <span>Salvar Nova Senha</span>
                </>
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <Link to="/login" className="text-finance-income hover:underline">
              Voltar para o login
            </Link>
          </div>
        </div>
        
        <p className="text-finance-muted text-sm text-center mt-8">
          &copy; {new Date().getFullYear()} NoMoney. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
};

export default RedefinirSenha; 