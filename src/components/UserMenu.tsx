import { LogOut, User, Settings, CreditCard } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { LogoutModal } from "./LogoutModal";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const UserMenu = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  const handleConfirmLogout = async () => {
    setIsLoggingOut(true);
    
    try {
      await logout();
      toast.success("Logout realizado com sucesso!", {
        className: "success"
      });
      setShowLogoutModal(false);
      navigate("/login");
    } catch (error: any) {
      toast.error(error.message || "Erro ao fazer logout", {
        className: "destructive"
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="p-2 rounded-md bg-finance-card hover:bg-finance-card/80 text-finance-muted hover:text-finance-text transition-colors flex items-center gap-2">
            <User size={18} />
            <span className="hidden md:inline text-sm">{user?.name || "Usuário"}</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 shadow-lg bg-[#121212] border-[#2A2A2E] p-0">
          <DropdownMenuLabel className="text-[#AAAAAA] font-normal px-3 py-2 border-b border-[#2A2A2E]">
            Conectado como
            <div className="font-medium text-white truncate max-w-[200px]">
              {user?.email || "usuario@exemplo.com"}
            </div>
          </DropdownMenuLabel>
          {/* <div className="py-1">
            <DropdownMenuItem 
              onClick={() => navigate("/opcao1")}
              className="hover:bg-transparent focus:bg-transparent px-3 py-2"
            >
              <CreditCard className="mr-2 h-4 w-4 text-[#AAAAAA]" />
              <span>Opção 1</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => navigate("/opcao2")}
              className="hover:bg-transparent focus:bg-transparent px-3 py-2"
            >
              <Settings className="mr-2 h-4 w-4 text-[#AAAAAA]" />
              <span>Opção 2</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => navigate("/opcao3")}
              className="hover:bg-transparent focus:bg-transparent px-3 py-2"
            >
              <Settings className="mr-2 h-4 w-4 text-[#AAAAAA]" />
              <span>Opção 3</span>
            </DropdownMenuItem>
          </div>
          <DropdownMenuSeparator className="bg-[#2A2A2E] m-0" /> */}
          <DropdownMenuItem 
            className="text-[#FF6B6B] hover:bg-transparent focus:bg-transparent hover:text-[#FF8080] focus:text-[#FF8080] px-3 py-2"
            onClick={handleLogoutClick}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <LogoutModal 
        isOpen={showLogoutModal}
        onClose={handleCancelLogout}
        onConfirm={handleConfirmLogout}
        isLoading={isLoggingOut}
      />
    </>
  );
}; 