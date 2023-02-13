import { createClient } from '@supabase/supabase-js';
import { addEntry, connectToSupabase, deleteEntry, getEntry } from './supabase';

import * as dotenv from 'dotenv';
dotenv.config();

test("connects to supabase", () => {
  expect(connectToSupabase(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)).toBeDefined();
});

test("adds entry to supabase", async () => {
  const supabase = connectToSupabase(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
  expect(await addEntry(supabase, "coucou")).toBeDefined();
});