import { createClient } from '@supabase/supabase-js';

import { join } from 'path';
const config = require(join(__dirname, "../../conf"));

// Create a single supabase client for interacting with your database
const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_KEY);

export async function addEntry(input) {
  try {
    const { data, error } = await supabase
      .from(config.SUPABASE_TABLE_TEXT_COLUMN)
      .insert([
        { Text: input },
      ])
  } catch (err) {
    console.error(err);
  }
}