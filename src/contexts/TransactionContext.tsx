
import { ReactNode, createContext, useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

interface Transaction {
  id: number;
  description: string;
  type: "income" | "outcome";
  amount: number;
  category: string;
  createdAt: string;
}

interface CreateTransactionInput {
  description: string;
  type: "income" | "outcome";
  amount: number;
  category: string;
}

interface TransactionContextType {
  transactions: Transaction[];
  filteredTransactions: Transaction[];
  createTransaction: (data: CreateTransactionInput) => void;
  searchTransactions: (query: string) => void;
  isTransactionModalOpen: boolean;
  openTransactionModal: () => void;
  closeTransactionModal: () => void;
}

export const TransactionContext = createContext({} as TransactionContextType);

// Local storage key for persisting transactions
const LOCAL_STORAGE_KEY = "@dt-money:transactions-1.0.0";

// Load transactions from localStorage or use initial demo data
const loadTransactions = (): Transaction[] => {
  const storedTransactions = localStorage.getItem(LOCAL_STORAGE_KEY);
  
  if (storedTransactions) {
    return JSON.parse(storedTransactions);
  }
  
  // Initial demo data
  return [
    {
      id: 1,
      description: "Desenvolvimento de site",
      type: "income",
      amount: 12000,
      category: "Venda",
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      description: "Hambúrguer",
      type: "outcome",
      amount: 59.9,
      category: "Alimentação",
      createdAt: new Date().toISOString(),
    },
  ];
};

interface TransactionProviderProps {
  children: ReactNode;
}

export function TransactionProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>(loadTransactions);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(loadTransactions);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  
  // Save transactions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);
  
  const createTransaction = useCallback((data: CreateTransactionInput) => {
    const newTransaction: Transaction = {
      id: Math.floor(Math.random() * 1000000),
      description: data.description,
      type: data.type,
      amount: data.amount,
      category: data.category,
      createdAt: new Date().toISOString(),
    };
    
    setTransactions(state => [newTransaction, ...state]);
    setFilteredTransactions(state => [newTransaction, ...state]);
    
    toast.success("Transação cadastrada com sucesso!");
  }, []);
  
  const searchTransactions = useCallback(
    (query: string) => {
      const lowerCaseQuery = query.toLowerCase().trim();
      
      if (!lowerCaseQuery) {
        setFilteredTransactions(transactions);
        return;
      }
      
      const filtered = transactions.filter(transaction => 
        transaction.description.toLowerCase().includes(lowerCaseQuery) ||
        transaction.category.toLowerCase().includes(lowerCaseQuery) ||
        String(transaction.amount).includes(lowerCaseQuery)
      );
      
      setFilteredTransactions(filtered);
    },
    [transactions]
  );
  
  const openTransactionModal = useCallback(() => {
    setIsTransactionModalOpen(true);
  }, []);
  
  const closeTransactionModal = useCallback(() => {
    setIsTransactionModalOpen(false);
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        filteredTransactions,
        createTransaction,
        searchTransactions,
        isTransactionModalOpen,
        openTransactionModal,
        closeTransactionModal,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}
