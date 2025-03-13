import { useState } from "react";
import { Link } from "react-router-dom";
import { DollarSign, KeyRound, ArrowLeft } from "lucide-react";
import { supabase } from "../lib/supabase";
import { toast } from "sonner";

const RecuperarSenha = () => {
  const [email, setEmail] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Enviar email de recuperação de senha via Supabase
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/redefinir-senha`,
      });
      
      if (error) throw error;
      
      setEnviado(true);
      toast.success("Email de recuperação enviado com sucesso!", {
        className: "success"
      });
    } catch (error: any) {
      toast.error(error.message || "Erro ao enviar email de recuperação", {
        className: "destructive"
      });
      console.error("Erro na recuperação de senha:", error);
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
          <h2 className="text-xl font-semibold mb-2 text-center">Recuperar Senha</h2>
          <p className="text-finance-muted text-center mb-6">
            {!enviado 
              ? "Informe seu e-mail para receber instruções de recuperação de senha." 
              : "Verifique seu e-mail para instruções de recuperação de senha."}
          </p>
          
          {!enviado ? (
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
              
              <button 
                type="submit" 
                className="btn-finance w-full flex items-center justify-center gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <KeyRound size={18} />
                    <span>Recuperar Senha</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center py-4 animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-finance-income/20 mb-4">
                <KeyRound className="h-8 w-8 text-finance-income" />
              </div>
              <p className="mb-4">
                Enviamos um e-mail para <strong>{email}</strong> com instruções para recuperar sua senha.
              </p>
              <p className="text-finance-muted text-sm">
                Não recebeu o e-mail? Verifique sua caixa de spam ou tente novamente.
              </p>
            </div>
          )}
          
          <div className="mt-6 text-center">
            <Link to="/login" className="text-finance-income hover:underline inline-flex items-center gap-1">
              <ArrowLeft size={16} />
              <span>Voltar para o login</span>
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

export default RecuperarSenha; 