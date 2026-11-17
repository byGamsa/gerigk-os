import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL?.trim();
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim();

// Shared Supabase client – `null` without configuration (features then show a hint)
export const supabase = url && key ? createClient(url, key) : null;
