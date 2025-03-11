
import { Header } from "../components/Header";
import { NewTransactionModal } from "../components/NewTransactionModal";
import { SearchForm } from "../components/SearchForm";
import { Summary } from "../components/Summary";
import { TransactionsTable } from "../components/TransactionsTable";

const Index = () => {
  return (
    <div className="min-h-screen bg-finance-dark overflow-x-hidden">
      <Header />
      
      <main className="pt-32 pb-16">
        <Summary />
        <SearchForm />
        <TransactionsTable />
      </main>
      
      <NewTransactionModal />
    </div>
  );
};

export default Index;
