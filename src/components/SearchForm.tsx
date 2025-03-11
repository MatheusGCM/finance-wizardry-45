
import { Search } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { TransactionContext } from "../contexts/TransactionContext";

export const SearchForm = () => {
  const [query, setQuery] = useState("");
  const { searchTransactions } = useContext(TransactionContext);
  
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      searchTransactions(query);
    }, 300);
    
    return () => clearTimeout(debounceTimeout);
  }, [query, searchTransactions]);

  return (
    <div className="w-full max-w-7xl mx-auto mt-4 md:mt-6 px-4 md:px-8">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1">
          <input 
            type="text" 
            placeholder="Busque uma transação"
            className="input-finance pl-4 pr-10 py-3 w-full"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-finance-muted pointer-events-none">
            <Search className="h-5 w-5" />
          </div>
        </div>
        
        <button className="hidden md:flex items-center gap-2 px-5 py-3 rounded-lg border border-finance-income text-finance-income hover:bg-finance-income/10 transition-colors">
          <Search className="h-4 w-4" />
          <span>Buscar</span>
        </button>
      </div>
    </div>
  );
};
