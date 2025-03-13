import { X, LogOut } from "lucide-react";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

export const LogoutModal = ({ isOpen, onClose, onConfirm, isLoading }: LogoutModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 animate-fade-in px-4 md:px-0">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="bg-finance-card rounded-xl p-5 md:p-6 w-full max-w-sm relative z-10 animate-slide-up shadow-xl">
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 md:top-4 md:right-4 text-finance-muted hover:text-finance-text"
          disabled={isLoading}
        >
          <X className="h-5 w-5" />
        </button>
        
        <div className="flex flex-col items-center mb-4">
          <div className="w-16 h-16 bg-finance-expense/10 rounded-full flex items-center justify-center mb-4">
            <LogOut className="h-8 w-8 text-finance-expense" />
          </div>
          
          <h2 className="text-xl font-semibold mb-2 text-center">Confirmar Logout</h2>
          <p className="text-finance-muted text-center">
            Tem certeza que deseja sair da sua conta?
          </p>
        </div>
        
        <div className="flex gap-3 mt-6">
          <button 
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-lg border border-finance-card bg-finance-dark/50 text-finance-muted hover:bg-finance-dark hover:text-finance-text transition-colors"
            disabled={isLoading}
          >
            Cancelar
          </button>
          
          <button 
            onClick={onConfirm}
            className="flex-1 py-2.5 px-4 rounded-lg bg-finance-expense/80 text-white hover:bg-finance-expense transition-colors flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Sair"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}; 