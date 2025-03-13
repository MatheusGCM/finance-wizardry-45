import { supabase } from "../lib/supabase";

export interface Transaction {
  id: number;
  description: string;
  type: "income" | "outcome";
  amount: number;
  category: string;
  created_at: string;
  user_id: string;
}

export interface CreateTransactionInput {
  description: string;
  type: "income" | "outcome";
  amount: number;
  category: string;
}

export const transactionService = {
  // Buscar todas as transações do usuário logado
  async getTransactions(): Promise<Transaction[]> {
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Erro ao buscar transações:", error);
      throw new Error(error.message);
    }

    return data || [];
  },

  // Buscar uma transação específica
  async getTransaction(id: number): Promise<Transaction | null> {
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(`Erro ao buscar transação ${id}:`, error);
      throw new Error(error.message);
    }

    return data;
  },

  // Criar uma nova transação
  async createTransaction(transaction: CreateTransactionInput): Promise<Transaction> {
    // Obter o usuário atual
    const { data: userData, error: userError } = await supabase.auth.getUser();
    
    if (userError) {
      console.error("Erro ao obter usuário atual:", userError);
      throw new Error(userError.message);
    }
    
    if (!userData.user) {
      throw new Error("Usuário não autenticado");
    }
    
    // Incluir o ID do usuário na transação
    const transactionWithUserId = {
      ...transaction,
      user_id: userData.user.id
    };
    
    const { data, error } = await supabase
      .from("transactions")
      .insert([transactionWithUserId])
      .select()
      .single();

    if (error) {
      console.error("Erro ao criar transação:", error);
      throw new Error(error.message);
    }

    return data;
  },

  // Atualizar uma transação existente
  async updateTransaction(id: number, transaction: CreateTransactionInput): Promise<Transaction> {
    const { data, error } = await supabase
      .from("transactions")
      .update(transaction)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error(`Erro ao atualizar transação ${id}:`, error);
      throw new Error(error.message);
    }

    return data;
  },

  // Excluir uma transação
  async deleteTransaction(id: number): Promise<void> {
    const { error } = await supabase
      .from("transactions")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(`Erro ao excluir transação ${id}:`, error);
      throw new Error(error.message);
    }
  },

  // Buscar transações por texto (pesquisa)
  async searchTransactions(query: string): Promise<Transaction[]> {
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .or(`description.ilike.%${query}%,category.ilike.%${query}%`)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(`Erro ao pesquisar transações com '${query}':`, error);
      throw new Error(error.message);
    }

    return data || [];
  }
}; 