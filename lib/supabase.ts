import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// createClient throws if the URL is empty. Use a harmless placeholder so the
// module can still be imported during build/prerender when env vars are absent;
// all database calls are gated behind isSupabaseConfigured at the call sites.
const SAFE_URL = supabaseUrl || 'https://placeholder.supabase.co';
const SAFE_KEY = supabaseAnonKey || 'placeholder-anon-key';

export const supabase = createClient(SAFE_URL, SAFE_KEY, {
  auth: { persistSession: false },
});
