import { useState } from "react";
import { Plus } from "lucide-react";
import { NewTransactionModal } from "./NewTransactionModal";

export const NewTransactionButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
      onClick={() => setIsOpen(true)}
      className="btn-finance flex items-center gap-1 md:gap-2 px-4 py-2 md:px-6 md:py-3 text-sm md:text-base group"
    >
      <span>Nova Transação</span>
      <Plus className="w-3 h-3 md:w-4 md:h-4 group-hover:rotate-90 transition-transform duration-200" />
    </button>

      <NewTransactionModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
