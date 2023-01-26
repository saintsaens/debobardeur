const { createClient } = require('@supabase/supabase-js');

var path = require('path');
const config = require(path.join(__dirname, "../../conf"));

// Create a single supabase client for interacting with your database
const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_KEY);

async function addEntry(input) {
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


module.exports = {
  addEntry: addEntry
};