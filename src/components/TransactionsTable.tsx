
import { CalendarDays, Grid3X3, List, Tag, Trash2 } from "lucide-react";
import { useContext, useState } from "react";
import { TransactionContext } from "../contexts/TransactionContext";
import { currencyFormatter, dateFormatter } from "../utils/formatter";

export const TransactionsTable = () => {
  const { filteredTransactions: transactions, deleteTransaction } = useContext(TransactionContext);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  return (
    <div className="w-full max-w-7xl mx-auto mt-4 md:mt-6 px-4 md:px-8 pb-16">
      {transactions.length > 0 && (
        <div className="flex items-center justify-end mb-4">
          <div className="bg-finance-card rounded-lg p-1 flex">
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded ${viewMode === "list" ? "bg-finance-income/20" : ""}`}
              aria-label="Visualização em lista"
              title="Visualização em lista"
            >
              <List className={`w-4 h-4 ${viewMode === "list" ? "text-finance-income" : "text-finance-muted"}`} />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded ${viewMode === "grid" ? "bg-finance-income/20" : ""}`}
              aria-label="Visualização em grid"
              title="Visualização em grid"
            >
              <Grid3X3 className={`w-4 h-4 ${viewMode === "grid" ? "text-finance-income" : "text-finance-muted"}`} />
            </button>
          </div>
        </div>
      )}
      
      <div className="overflow-hidden">
        {transactions.length > 0 ? (
          viewMode === "list" ? (
            <div className="grid gap-3 md:gap-4">
              {transactions.map((transaction) => (
                <div 
                  key={transaction.id} 
                  className="card-finance animate-fade-in p-4 md:p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4">
                    <div className="flex-1">
                      <p className="font-medium mb-1 line-clamp-1">{transaction.description}</p>
                      <p className={`text-xl font-semibold ${transaction.type === "income" ? "text-finance-income" : "text-finance-expense"}`}>
                        {transaction.type === "outcome" && "- "}
                        {currencyFormatter.format(transaction.amount)}
                      </p>
                    </div>
                    
                    <div className="flex flex-row md:flex-col justify-between md:items-end gap-2 text-finance-muted text-sm">
                      <div className="flex items-center gap-1">
                        <Tag className="w-3 h-3 md:w-4 md:h-4" />
                        <span className="line-clamp-1">{transaction.category}</span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <CalendarDays className="w-3 h-3 md:w-4 md:h-4" />
                        <span>{dateFormatter.format(new Date(transaction.createdAt))}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3 md:mt-4 flex justify-end">
                    <button 
                      onClick={() => deleteTransaction(transaction.id)}
                      className="text-finance-muted hover:text-finance-expense transition-colors p-1 rounded-full hover:bg-finance-expense/10"
                      aria-label="Excluir transação"
                      title="Excluir transação"
                    >
                      <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {transactions.map((transaction) => (
                <div 
                  key={transaction.id} 
                  className="card-finance animate-fade-in p-4 md:p-5 h-full flex flex-col"
                >
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-3">
                      <p className="font-medium line-clamp-1 flex-1">{transaction.description}</p>
                      <button 
                        onClick={() => deleteTransaction(transaction.id)}
                        className="text-finance-muted hover:text-finance-expense transition-colors p-1 rounded-full hover:bg-finance-expense/10 ml-2"
                        aria-label="Excluir transação"
                        title="Excluir transação"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <p className={`text-xl font-semibold mb-4 ${transaction.type === "income" ? "text-finance-income" : "text-finance-expense"}`}>
                      {transaction.type === "outcome" && "- "}
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
                      <span>{dateFormatter.format(new Date(transaction.createdAt))}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="py-12 md:py-16 text-center text-finance-muted animate-fade-in">
            <p className="text-lg">Nenhuma transação encontrada</p>
            <p className="mt-2">Adicione uma nova transação para começar</p>
          </div>
        )}
      </div>
    </div>
  );
};
