import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseApiKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY ?? supabaseAnonKey;

if (!supabaseUrl || !supabaseAnonKey || !supabaseApiKey) {
  throw new Error("Supabase environment variables are not configured.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export const supabaseUploadClient = createClient(supabaseUrl, supabaseApiKey);
