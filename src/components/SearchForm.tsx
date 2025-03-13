import { Search } from "lucide-react";
import { useState } from "react";
import { useTransactions } from "../contexts/TransactionContext";
import { NewTransactionButton } from "./NewTransactionButton";
import { Skeleton } from "./ui/skeleton";

export const SearchForm = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { searchTransactions, isLoading } = useTransactions();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    await searchTransactions(searchQuery);
  };

  // useEffect(() => {
  //   const debounceTimeout = setTimeout(() => {
  //     searchTransactions(query);
  //   }, 300);

  //   return () => clearTimeout(debounceTimeout);
  // }, [query, searchTransactions]);

  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto mt-4 md:mt-6 px-4 md:px-8">
        <div className="flex md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-10 w-36" />
        </div>
        <div className="flex items-center justify-between gap-4">
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto mt-4 md:mt-6 px-4 md:px-8">
      <div className="flex md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold">Transações</h2>
        <NewTransactionButton />
      </div>
      <div className="flex items-center justify-between gap-4">
        <form onSubmit={handleSearch} className="relative flex-1">
          <input
            type="text"
            placeholder="Buscar transações..."
            className="input-finance pl-4 pr-10 py-3 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-finance-muted pointer-events-none">
            <Search className="h-5 w-5" />
          </div>
        </form>

        {/* <button className="hidden md:flex items-center gap-2 px-5 py-3 rounded-lg border border-finance-income text-finance-income hover:bg-finance-income/10 transition-colors">
          <Search className="h-4 w-4" />
          <span>Buscar</span>
        </button> */}
      </div>
    </div>
  );
};
