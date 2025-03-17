
import { createClient } from '@supabase/supabase-js';

// Using provided Supabase credentials
const supabaseUrl = 'https://ghgglxnhgyawujomfuqv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdoZ2dseG5oZ3lhd3Vqb21mdXF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3MTQ1MjcsImV4cCI6MjA1NzI5MDUyN30.mZWZhSJbV4GqzZX4AtPiWrydjO2BUk2odaW8NdvRiJ8';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
