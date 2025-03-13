import { ArrowDownCircle, ArrowUpCircle, CircleDollarSign } from "lucide-react";
import { useTransactions } from "../contexts/TransactionContext";
import { formatCurrency } from "../utils/formatter";
import { Card, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export const TransactionSummary = () => {
  const { transactions, isLoading } = useTransactions();

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

  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 md:gap-4 -mt-16 sm:-mt-20">
        {[1, 2, 3].map((i) => (
          <Card
            key={i}
            className={`bg-[#1E1E1E] md:col-span-1 ${i === 3 && "col-span-2"}`}
          >
            <CardContent className="p-6">
              <Skeleton className="h-5 w-[120px] mb-4" />
              <Skeleton className="h-8 w-[120px] md:w-[150px]" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 md:gap-4 -mt-16 sm:-mt-20">
      <div
        className="card-finance animate-slide-up"
        style={{ animationDelay: "0ms" }}
      >
        <div className="flex items-start justify-between mb-3">
          <span className="text-finance-muted">Entradas</span>
          <ArrowUpCircle className="text-finance-income size-5 md:size-6" />
        </div>
        <strong className="text-xl md:text-3xl font-medium block">
          {formatCurrency(summary.income)}
        </strong>
      </div>

      <div
        className="card-finance animate-slide-up"
        style={{ animationDelay: "100ms" }}
      >
        <div className="flex items-start justify-between mb-3">
          <span className="text-finance-muted">Saídas</span>
          <ArrowDownCircle className="text-finance-expense size-5 md:size-6" />
        </div>
        <strong className="text-xl md:text-3xl font-medium block">
          {formatCurrency(summary.outcome)}
        </strong>
      </div>

      <div
        className={`card-finance animate-slide-up ${
          summary.total >= 0 ? "bg-finance-total" : "bg-finance-expense/90"
        } col-span-2 md:col-span-1`}
        style={{ animationDelay: "200ms" }}
      >
        <div className="flex items-start justify-between mb-3">
          <span className="text-white/80">Total</span>
          <CircleDollarSign className="text-white size-5 md:size-6" />
        </div>
        <strong className="text-xl md:text-3xl font-medium block text-white">
          {formatCurrency(summary.total)}
        </strong>
      </div>
    </section>
  );
};
