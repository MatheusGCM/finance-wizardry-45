
import { CalendarDays, Tag } from "lucide-react";
import { useContext } from "react";
import { TransactionContext } from "../contexts/TransactionContext";
import { currencyFormatter, dateFormatter } from "../utils/formatter";

export const TransactionsTable = () => {
  const { filteredTransactions: transactions } = useContext(TransactionContext);

  return (
    <div className="w-full max-w-7xl mx-auto mt-4 md:mt-6 px-4 md:px-8 pb-16">
      <div className="overflow-hidden">
        {transactions.length > 0 ? (
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
              </div>
            ))}
          </div>
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
