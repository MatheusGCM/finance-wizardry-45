import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import {
  type Transaction,
  type CreateTransactionInput,
  transactionService,
} from "../services/transactionService";
import { toast } from "sonner";
import { useAuth } from "../hooks/useAuth";

interface TransactionContextType {
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
  addTransaction: (transaction: CreateTransactionInput) => Promise<void>;
  updateTransaction: (
    id: number,
    transaction: CreateTransactionInput
  ) => Promise<void>;
  deleteTransaction: (id: number) => Promise<void>;
  refreshTransactions: () => Promise<void>;
  searchTransactions: (query: string) => Promise<void>;
  setManualLoading: (isLoading: boolean) => void;
}

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [manualLoadingMode, setManualLoadingMode] = useState(false);
  const { user } = useAuth();

  const setManualLoading = useCallback((loading: boolean) => {
    setManualLoadingMode(loading);
  }, []);

  const fetchTransactions = useCallback(async () => {
    if (!user) {
      setTransactions([]);
      setIsLoading(false);
      return;
    }

    if (manualLoadingMode) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await transactionService.getTransactions();
      setTransactions(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao carregar transações"
      );
      toast.error("Erro ao carregar transações");
    } finally {
      if (!manualLoadingMode) {
        setIsLoading(false);
      }
    }
  }, [user, manualLoadingMode]);

  useEffect(() => {
    setIsLoading(manualLoadingMode);
  }, [manualLoadingMode]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const addTransaction = async (transaction: CreateTransactionInput) => {
    setIsLoading(true);
    setError(null);

    try {
      const newTransaction = await transactionService.createTransaction(
        transaction
      );
      setTransactions((prev) => [newTransaction, ...prev]);
      toast.success("Transação adicionada com sucesso!");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao adicionar transação"
      );
      toast.error("Erro ao adicionar transação");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateTransaction = async (
    id: number,
    transaction: CreateTransactionInput
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const updatedTransaction = await transactionService.updateTransaction(
        id,
        transaction
      );
      setTransactions((prev) =>
        prev.map((item) => (item.id === id ? updatedTransaction : item))
      );
      toast.success("Transação atualizada com sucesso!");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao atualizar transação"
      );
      toast.error("Erro ao atualizar transação");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTransaction = async (id: number) => {
    setIsLoading(true);
    setError(null);

    try {
      await transactionService.deleteTransaction(id);
      setTransactions((prev) => prev.filter((item) => item.id !== id));
      toast.success("Transação excluída com sucesso!");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao excluir transação"
      );
      toast.error("Erro ao excluir transação");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const refreshTransactions = async () => {
    await fetchTransactions();
  };

  const searchTransactions = async (query: string) => {
    if (!query.trim()) {
      return refreshTransactions();
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await transactionService.searchTransactions(query);
      setTransactions(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao pesquisar transações"
      );
      toast.error("Erro ao pesquisar transações");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        isLoading,
        error,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        refreshTransactions,
        searchTransactions,
        setManualLoading,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error(
      "useTransactions deve ser usado dentro de um TransactionProvider"
    );
  }
  return context;
};
