
import { Plus } from "lucide-react";
import { useContext } from "react";
import { TransactionContext } from "../contexts/TransactionContext";

export const NewTransactionButton = () => {
  const { openTransactionModal } = useContext(TransactionContext);
  
  return (
    <button 
      onClick={openTransactionModal}
      className="btn-finance flex items-center gap-2 group"
    >
      <span>Nova transação</span>
      <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" />
    </button>
  );
};
