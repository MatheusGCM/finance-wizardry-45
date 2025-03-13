import { Header } from "../components/Header";
import { TransactionSummary } from "../components/TransactionSummary";
import { SearchForm } from "@/components/SearchForm";
import { TransactionsTable } from "@/components/TransactionsTable";

const Index = () => {
  return (
    <div className="min-h-screen bg-finance-dark overflow-x-hidden">
      <Header />

      <main className="pt-40 md:pt-44 pb-12 md:pb-16">
        <TransactionSummary />
        <SearchForm />
        <TransactionsTable />
      </main>
    </div>
  );
};

export default Index;
