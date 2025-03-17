
import { createClient } from '@supabase/supabase-js';

// Using environment variables for Supabase credentials
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if environment variables are loaded
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase environment variables are missing");
  // Fallback to hardcoded values if env vars are not available
  const fallbackUrl = 'https://ghgglxnhgyawujomfuqv.supabase.co';
  const fallbackKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdoZ2dseG5oZ3lhd3Vqb21mdXF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3MTQ1MjcsImV4cCI6MjA1NzI5MDUyN30.mZWZhSJbV4GqzZX4AtPiWrydjO2BUk2odaW8NdvRiJ8';
  
  // Create Supabase client with fallback values
  export const supabase = createClient(fallbackUrl, fallbackKey);
} else {
  // Create Supabase client with environment variables
  export const supabase = createClient(supabaseUrl, supabaseAnonKey);
}
