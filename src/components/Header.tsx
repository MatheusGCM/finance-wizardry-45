import { DollarSign } from "lucide-react";
import { NewTransactionButton } from "./NewTransactionButton";
import { useEffect, useState } from "react";
import { UserMenu } from "./UserMenu";
import { useTransactions } from "@/contexts/TransactionContext";
import { LoadingTester } from "./LoadingTester";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const { isLoading, setManualLoading } = useTransactions();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full py-3 md:py-4 px-4 md:px-8 z-10 transition-all duration-300 ease-in-out ${
        scrolled
          ? "bg-finance-dark/95 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-finance-income rounded-md flex items-center justify-center animate-pulse-subtle">
            <DollarSign className="text-white h-5 w-5 md:h-6 md:w-6" />
          </div>
          <h1 className="text-lg md:text-xl font-bold tracking-tight">
            NoMoney
          </h1>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {/* <NewTransactionButton /> */}
          {/* <LoadingTester
            onToggleLoading={setManualLoading}
            isCurrentlyLoading={isLoading}
          /> */}
          <UserMenu />
        </div>
      </div>
    </header>
  );
};
