import { AlertTriangle } from "lucide-react";

interface DeleteTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  transactionDescription: string;
}

export const DeleteTransactionModal = ({ 
  isOpen, 
  onClose, 
  onConfirm,
  transactionDescription 
}: DeleteTransactionModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      <div className="bg-finance-card rounded-2xl p-6 md:p-8 w-full max-w-md mx-4 relative animate-fade-in">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-12 h-12 bg-finance-expense/10 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-6 h-6 text-finance-expense" />
          </div>
          
          <h2 className="text-xl font-semibold mb-2">
            Excluir transação
          </h2>
          
          <p className="text-finance-muted">
            Tem certeza que deseja excluir a transação <strong>"{transactionDescription}"</strong>? 
            Esta ação não pode ser desfeita.
          </p>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-lg bg-finance-card-light hover:bg-finance-card-light/80 transition-colors"
          >
            Cancelar
          </button>
          
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 py-3 px-4 rounded-lg bg-finance-expense hover:bg-finance-expense/90 transition-colors"
          >
            Sim, excluir
          </button>
        </div>
      </div>
    </div>
  );
}; 