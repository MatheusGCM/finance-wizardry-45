import { CalendarDays, Tag, Trash2, Pencil } from "lucide-react";
import { useState } from "react";
import { useTransactions } from "../contexts/TransactionContext";
import { currencyFormatter, dateFormatter } from "../utils/formatter";
import { DeleteTransactionModal } from "./DeleteTransactionModal";
import { Transaction } from "@/services/transactionService";
import { EditTransactionModal } from "./EditTransactionModal";
import { Skeleton } from "./ui/skeleton";
interface TransactionToDelete {
  id: number;
  description: string;
}

export const TransactionsTable = () => {
  const { 
    transactions, 
    deleteTransaction,
    isLoading,
  } = useTransactions();

  const [transactionToDelete, setTransactionToDelete] = useState<TransactionToDelete | null>(null);
  const [transactionToEdit, setTransactionToEdit] = useState<Transaction | null>(null);

  const incomeTransactions = transactions.filter(transaction => transaction.type === "income");
  const outcomeTransactions = transactions.filter(transaction => transaction.type === "outcome");

  const handleDeleteClick = (transaction: TransactionToDelete) => {
    setTransactionToDelete(transaction);
  };

  const handleConfirmDelete = async () => {
    if (transactionToDelete !== null) {
      await deleteTransaction(transactionToDelete.id);
      setTransactionToDelete(null);
    }
  };

  const handleEditClick = (transaction: Transaction) => {
    setTransactionToEdit(transaction);
  };

  const renderTransactionsGrid = (transactionList: any[], title: string, isIncome: boolean) => (
    <div className="mb-8">
      <h2 className={`text-lg font-medium mb-3 ${isIncome ? "text-finance-income" : "text-finance-expense"}`}>
        {title} ({transactionList.length})
      </h2>

      {/* <TransactionList /> */}
      
      {transactionList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {transactionList.map((transaction) => (
            <div 
              key={transaction.id} 
              className="card-finance animate-fade-in p-4 md:p-5 h-full flex flex-col"
            >
              <div className="flex-1">
                <div className="flex justify-between items-start mb-3">
                  <p className="font-medium line-clamp-1 flex-1">
                    {transaction.description}
                  </p>
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={() => handleEditClick(transaction)}
                      className="text-finance-muted hover:text-finance-income transition-colors p-1 rounded-full hover:bg-finance-income/10"
                      aria-label="Editar transação"
                      title="Editar transação"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteClick({ id: transaction.id, description: transaction.description })}
                      className="text-finance-muted hover:text-finance-expense transition-colors p-1 rounded-full hover:bg-finance-expense/10"
                      aria-label="Excluir transação"
                      title="Excluir transação"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <p className={`text-xl font-semibold mb-4 ${isIncome ? "text-finance-income" : "text-finance-expense"}`}>
                  {!isIncome && "- "}
                  {currencyFormatter.format(transaction.amount)}
                </p>
              </div>
              
              <div className="flex justify-between text-finance-muted text-sm mt-auto pt-3 border-t border-finance-card/50">
                <div className="flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  <span className="line-clamp-1">{transaction.category}</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <CalendarDays className="w-3 h-3" />
                  <span>{new Date(transaction.created_at).toLocaleDateString("pt-BR")}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-4 text-center text-finance-muted animate-fade-in">
          <p>Nenhuma transação encontrada</p>
        </div>
      )}
    </div>
  );

  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto mt-4 md:mt-6 px-4 md:px-8 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="card-finance animate-fade-in p-4 md:p-5 h-full flex flex-col">
            <div className="space-y-2">
              <Skeleton className="h-5 w-[250px]" />
              <Skeleton className="h-3 w-[200px]" />
            </div>
          </div>
        ))}
        </div>
        
      </div>
    );
  }

  return (
    <>
      <div className="w-full max-w-7xl mx-auto mt-4 md:mt-6 px-4 md:px-8 pb-16">
        <div className="overflow-hidden">
          {transactions.length > 0 ? (
            <div>
              {renderTransactionsGrid(incomeTransactions, "Entradas", true)}
              {renderTransactionsGrid(outcomeTransactions, "Saídas", false)}
            </div>
          ) : (
            <div className="py-12 md:py-16 text-center text-finance-muted animate-fade-in">
              <p className="text-lg">Nenhuma transação encontrada</p>
              <p className="mt-2">Adicione uma nova transação para começar</p>
            </div>
          )}
        </div>
      </div>

      <DeleteTransactionModal 
        isOpen={transactionToDelete !== null}
        onClose={() => setTransactionToDelete(null)}
        onConfirm={handleConfirmDelete}
        transactionDescription={transactionToDelete?.description || ""}
      />

      <EditTransactionModal
        isOpen={transactionToEdit !== null}
        onClose={() => setTransactionToEdit(null)}
        currentTransaction={transactionToEdit}
      />
    </>
  );
};
