
import { DollarSign } from "lucide-react";
import { NewTransactionButton } from "./NewTransactionButton";
import { useEffect, useState } from "react";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 w-full py-4 px-6 md:px-8 z-10 transition-all duration-300 ease-in-out ${scrolled ? 'bg-finance-dark/95 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-finance-income rounded-md flex items-center justify-center animate-pulse-subtle">
            <DollarSign className="text-white h-6 w-6" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">DT Money</h1>
        </div>
        
        <NewTransactionButton />
      </div>
    </header>
  );
};
