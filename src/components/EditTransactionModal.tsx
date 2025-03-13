
import { ArrowDown, ArrowUp, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTransactions } from "../contexts/TransactionContext";
import { Transaction } from "@/services/transactionService";
interface EditTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTransaction: Transaction;
}

export const EditTransactionModal = ({ isOpen, onClose, currentTransaction }: EditTransactionModalProps) => {
  const { updateTransaction } = useTransactions();
  
  const [type, setType] = useState<"income" | "outcome">("income");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  // Atualiza os estados quando currentTransaction mudar
  useEffect(() => {
    if (currentTransaction) {
      setType(currentTransaction.type);
      setDescription(currentTransaction.description);
      setAmount(currentTransaction.amount.toString());
      setCategory(currentTransaction.category);
    }
  }, [currentTransaction]);
  
  const handleEditTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    
    updateTransaction(currentTransaction.id,{
      description,
      amount: Number(amount),
      category,
      type,
    });
    
    onClose();
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 animate-fade-in px-4 md:px-0">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="bg-finance-card rounded-xl p-5 md:p-8 w-full max-w-md relative z-10 animate-slide-up shadow-xl">
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 md:top-4 md:right-4 text-finance-muted hover:text-finance-text"
        >
          <X className="h-5 w-5" />
        </button>
        
        <h2 className="text-xl font-semibold mb-5 md:mb-6">{"Editar transação"}</h2>
        
        <form onSubmit={handleEditTransaction}>
          <div className="space-y-3 md:space-y-4">
            <div>
              <input 
                type="text"
                placeholder="Descrição"
                required
                className="input-finance text-sm md:text-base"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            
            <div>
              <input 
                type="number"
                placeholder="Valor"
                required
                className="input-finance text-sm md:text-base"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min={0.01}
                step={0.01}
              />
            </div>
            
            <div>
              <input 
                type="text"
                placeholder="Categoria"
                required
                className="input-finance text-sm md:text-base"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3 md:gap-4 mt-4">
              <button
                type="button"
                className={`flex items-center justify-center gap-2 py-3 rounded-lg ${
                  type === "income" 
                    ? "bg-finance-income/20 border-2 border-finance-income" 
                    : "bg-finance-card hover:bg-finance-income/10 border border-finance-card"
                }`}
                onClick={() => setType("income")}
              >
                <ArrowUp className={`h-4 w-4 ${type === "income" ? "text-finance-income" : "text-finance-muted"}`} />
                <span className={`text-sm ${type === "income" ? "text-finance-text" : "text-finance-muted"}`}>Entrada</span>
              </button>
              
              <button
                type="button"
                className={`flex items-center justify-center gap-2 py-3 rounded-lg ${
                  type === "outcome" 
                    ? "bg-finance-expense/20 border-2 border-finance-expense" 
                    : "bg-finance-card hover:bg-finance-expense/10 border border-finance-card"
                }`}
                onClick={() => setType("outcome")}
              >
                <ArrowDown className={`h-4 w-4 ${type === "outcome" ? "text-finance-expense" : "text-finance-muted"}`} />
                <span className={`text-sm ${type === "outcome" ? "text-finance-text" : "text-finance-muted"}`}>Saída</span>
              </button>
            </div>
          </div>
          
          <button 
            type="submit"
            className="btn-finance w-full mt-5 md:mt-6 text-sm md:text-base"
          >
            {"Atualizar"}
          </button>
        </form>
      </div>
    </div>
  );
};
