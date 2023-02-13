import { createClient } from '@supabase/supabase-js';

import * as dotenv from 'dotenv';
dotenv.config();


export function connectToSupabase(url, key) {
  const supabase = createClient(url, key);
  
  return supabase;
}

export async function addEntry(supabase, input) {
  try {
    console.log(supabase);
    const { data, error } = await supabase
    .from(process.env.SUPABASE_TABLE_TEXT_COLUMN)
    .insert([
      { Text: input },
    ])
  } catch (err) {
    console.error(err);
  }
}