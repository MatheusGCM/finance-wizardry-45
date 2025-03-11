
import { ArrowDown, ArrowUp, X } from "lucide-react";
import { useContext, useState } from "react";
import { TransactionContext } from "../contexts/TransactionContext";

export const NewTransactionModal = () => {
  const { isTransactionModalOpen, closeTransactionModal, createTransaction } = useContext(TransactionContext);
  
  const [type, setType] = useState<"income" | "outcome">("income");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  
  const handleCreateNewTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    
    createTransaction({
      description,
      amount: Number(amount),
      category,
      type,
    });
    
    setType("income");
    setDescription("");
    setAmount("");
    setCategory("");
    closeTransactionModal();
  };
  
  if (!isTransactionModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 animate-fade-in">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeTransactionModal} />
      
      <div className="bg-finance-card rounded-xl p-6 md:p-8 w-full max-w-md mx-4 relative z-10 animate-slide-up shadow-xl">
        <button 
          onClick={closeTransactionModal}
          className="absolute top-4 right-4 text-finance-muted hover:text-finance-text"
        >
          <X className="h-5 w-5" />
        </button>
        
        <h2 className="text-xl font-semibold mb-6">Nova transação</h2>
        
        <form onSubmit={handleCreateNewTransaction}>
          <div className="space-y-4">
            <div>
              <input 
                type="text"
                placeholder="Descrição"
                required
                className="input-finance"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            
            <div>
              <input 
                type="number"
                placeholder="Valor"
                required
                className="input-finance"
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
                className="input-finance"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <button
                type="button"
                className={`flex items-center justify-center gap-2 py-4 rounded-lg ${
                  type === "income" 
                    ? "bg-finance-income/20 border-2 border-finance-income" 
                    : "bg-finance-card hover:bg-finance-income/10 border border-finance-card"
                }`}
                onClick={() => setType("income")}
              >
                <ArrowUp className={`h-5 w-5 ${type === "income" ? "text-finance-income" : "text-finance-muted"}`} />
                <span className={type === "income" ? "text-finance-text" : "text-finance-muted"}>Entrada</span>
              </button>
              
              <button
                type="button"
                className={`flex items-center justify-center gap-2 py-4 rounded-lg ${
                  type === "outcome" 
                    ? "bg-finance-expense/20 border-2 border-finance-expense" 
                    : "bg-finance-card hover:bg-finance-expense/10 border border-finance-card"
                }`}
                onClick={() => setType("outcome")}
              >
                <ArrowDown className={`h-5 w-5 ${type === "outcome" ? "text-finance-expense" : "text-finance-muted"}`} />
                <span className={type === "outcome" ? "text-finance-text" : "text-finance-muted"}>Saída</span>
              </button>
            </div>
          </div>
          
          <button 
            type="submit"
            className="btn-finance w-full mt-6"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};
