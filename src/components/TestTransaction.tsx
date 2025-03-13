import { useState } from "react";
import { useTransactions } from "../contexts/TransactionContext";
import { Button } from "./ui/button";
import { toast } from "sonner";

export const TestTransaction = () => {
  const { addTransaction } = useTransactions();
  const [isLoading, setIsLoading] = useState(false);

  const handleTestTransaction = async () => {
    setIsLoading(true);
    try {
      await addTransaction({
        description: "Teste de transação",
        amount: 100,
        type: "income",
        category: "Teste",
      });
      toast.success("Transação de teste criada com sucesso!");
    } catch (error: any) {
      console.error("Erro ao criar transação de teste:", error);
      toast.error(`Erro ao criar transação: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 bg-[#1E1E1E] rounded-lg mb-4">
      <h3 className="text-lg font-medium mb-2">Teste de Transação</h3>
      <p className="text-gray-400 mb-4">
        Clique no botão abaixo para testar a criação de uma transação.
      </p>
      <Button 
        onClick={handleTestTransaction} 
        disabled={isLoading}
        className="bg-emerald-600 hover:bg-emerald-700"
      >
        {isLoading ? "Criando..." : "Criar Transação de Teste"}
      </Button>
    </div>
  );
}; 