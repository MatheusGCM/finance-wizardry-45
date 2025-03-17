
import { createClient } from '@supabase/supabase-js';

// Using environment variables for Supabase credentials
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create Supabase client with environment variables or fallback to hardcoded values
export const supabase = createClient(
  supabaseUrl || 'https://ghgglxnhgyawujomfuqv.supabase.co',
  supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdoZ2dseG5oZ3lhd3Vqb21mdXF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3MTQ1MjcsImV4cCI6MjA1NzI5MDUyN30.mZWZhSJbV4GqzZX4AtPiWrydjO2BUk2odaW8NdvRiJ8'
);

// Log warning if environment variables are missing
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase environment variables are missing, using fallback values");
}
