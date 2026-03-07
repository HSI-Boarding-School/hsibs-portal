import { createClient } from '@supabase/supabase-js';

import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

const supabaseUrl = CONFIG.supabase.url;
const supabaseKey = CONFIG.supabase.key;

// Always create Supabase client regardless of auth method
// We use Supabase for database operations even with JWT auth
export const supabase = createClient(supabaseUrl, supabaseKey);
