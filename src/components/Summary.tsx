
import { ArrowDown, ArrowUp, DollarSign } from "lucide-react";
import { useContext } from "react";
import { TransactionContext } from "../contexts/TransactionContext";
import { currencyFormatter } from "../utils/formatter";

export const Summary = () => {
  const { transactions } = useContext(TransactionContext);
  
  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "income") {
        acc.income += transaction.amount;
        acc.total += transaction.amount;
      } else {
        acc.outcome += transaction.amount;
        acc.total -= transaction.amount;
      }
      return acc;
    },
    {
      income: 0,
      outcome: 0,
      total: 0,
    }
  );

  return (
    <section className="w-full max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-4 -mt-20">
      <div className="card-finance animate-slide-up" style={{ animationDelay: "0ms" }}>
        <div className="flex items-start justify-between mb-3">
          <span className="text-finance-muted">Entradas</span>
          <ArrowUp className="text-finance-income h-5 w-5" />
        </div>
        <strong className="text-3xl font-medium block">
          {currencyFormatter.format(summary.income)}
        </strong>
      </div>

      <div className="card-finance animate-slide-up" style={{ animationDelay: "100ms" }}>
        <div className="flex items-start justify-between mb-3">
          <span className="text-finance-muted">Saídas</span>
          <ArrowDown className="text-finance-expense h-5 w-5" />
        </div>
        <strong className="text-3xl font-medium block">
          {currencyFormatter.format(summary.outcome)}
        </strong>
      </div>

      <div className={`card-finance animate-slide-up ${summary.total >= 0 ? 'bg-finance-total' : 'bg-finance-expense/90'}`} style={{ animationDelay: "200ms" }}>
        <div className="flex items-start justify-between mb-3">
          <span className="text-white/80">Total</span>
          <DollarSign className="text-white h-5 w-5" />
        </div>
        <strong className="text-3xl font-medium block text-white">
          {currencyFormatter.format(summary.total)}
        </strong>
      </div>
    </section>
  );
};
