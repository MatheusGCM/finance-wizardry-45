
import { CalendarDays, Tag } from "lucide-react";
import { useContext } from "react";
import { TransactionContext } from "../contexts/TransactionContext";
import { currencyFormatter, dateFormatter } from "../utils/formatter";

export const TransactionsTable = () => {
  const { filteredTransactions: transactions } = useContext(TransactionContext);

  return (
    <div className="w-full max-w-7xl mx-auto mt-6 px-6 md:px-8 pb-16">
      <div className="overflow-hidden">
        {transactions.length > 0 ? (
          <div className="grid gap-4">
            {transactions.map((transaction) => (
              <div 
                key={transaction.id} 
                className="card-finance animate-fade-in grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_auto] gap-4"
              >
                <div>
                  <p className="font-medium mb-1">{transaction.description}</p>
                  <p className={`text-xl font-semibold ${transaction.type === "income" ? "text-finance-income" : "text-finance-expense"}`}>
                    {transaction.type === "outcome" && "- "}
                    {currencyFormatter.format(transaction.amount)}
                  </p>
                </div>
                
                <div className="flex items-center gap-2 text-finance-muted self-end">
                  <Tag className="w-4 h-4" />
                  <span>{transaction.category}</span>
                </div>
                
                <div className="flex items-center gap-2 text-finance-muted self-end">
                  <CalendarDays className="w-4 h-4" />
                  <span>{dateFormatter.format(new Date(transaction.createdAt))}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center text-finance-muted animate-fade-in">
            <p className="text-lg">Nenhuma transação encontrada</p>
            <p className="mt-2">Adicione uma nova transação para começar</p>
          </div>
        )}
      </div>
    </div>
  );
};
