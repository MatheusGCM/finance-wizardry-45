import { useTransactions } from "@/contexts/TransactionContext";
import { ArrowDown, ArrowUp, X } from "lucide-react";
import { useState } from "react";

interface NewTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewTransactionModal = ({
  isOpen,
  onClose,
}: NewTransactionModalProps) => {
  const { addTransaction } = useTransactions();
  const [type, setType] = useState<"income" | "outcome">("income");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const handleAddNewTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addTransaction({
        description,
        amount: Number(amount),
        category,
        type,
      });

      setType("income");
      setDescription("");
      setAmount("");
      setCategory("");

      onClose();
    } catch (error) {
      console.error("Erro ao salvar transação:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 animate-fade-in px-4 md:px-0">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="bg-finance-card rounded-xl p-5 md:p-8 w-full max-w-md relative z-10 animate-slide-up shadow-xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 md:top-4 md:right-4 text-finance-muted hover:text-finance-text"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-xl font-semibold mb-5 md:mb-6">
          {"Nova transação"}
        </h2>

        <form onSubmit={handleAddNewTransaction}>
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
                <ArrowUp
                  className={`h-4 w-4 ${
                    type === "income"
                      ? "text-finance-income"
                      : "text-finance-muted"
                  }`}
                />
                <span
                  className={`text-sm ${
                    type === "income"
                      ? "text-finance-text"
                      : "text-finance-muted"
                  }`}
                >
                  Entrada
                </span>
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
                <ArrowDown
                  className={`h-4 w-4 ${
                    type === "outcome"
                      ? "text-finance-expense"
                      : "text-finance-muted"
                  }`}
                />
                <span
                  className={`text-sm ${
                    type === "outcome"
                      ? "text-finance-text"
                      : "text-finance-muted"
                  }`}
                >
                  Saída
                </span>
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn-finance w-full mt-5 md:mt-6 text-sm md:text-base"
          >
            {"Adicionar"}
          </button>
        </form>
      </div>
    </div>
  );
};
