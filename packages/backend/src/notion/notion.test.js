import { extractJsonIntoArray } from '../notion';
import { writeFileSync, existsSync, unlinkSync } from 'fs';

test('checks JSON file is correctly read and parsed', () => {
  const output = ["très", "vraiment"];
  const filepath = './testFile.json';

  writeFileSync(filepath, JSON.stringify(output));
  expect(existsSync(filepath)).toBe(true);
  expect(extractJsonIntoArray(filepath)).toStrictEqual(output);
});

afterEach(() => {
  const filepath = './testFile.json';
  if (existsSync(filepath)) {
    unlinkSync(filepath);
  }
});
