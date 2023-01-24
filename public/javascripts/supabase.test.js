const supabase = require('./supabase');

test('adds an entry to supabase table', async () => {
  const input = "Test text";
  expect(await supabase.addEntry(input)).toBeTruthy();
});