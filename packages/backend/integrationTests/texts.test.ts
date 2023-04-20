import { promises, readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { debobardize } from '../src/debobardeur';
import { test, expect } from "vitest";

const txtFiles: string[] = readdirSync(__dirname)
  .filter(file => file.endsWith('.txt'));

test.each(txtFiles)('debobardizes txt file: %s', (file) => {
  const filePath: string = join(__dirname, file);
  const data: string = readFileSync(filePath, 'utf8');
  const test: string[] = data.split("-----").map((element: string) => element.trim());
  const input: string = test[0];
  const output: string = test[1];

  expect(debobardize(input)).toBe(output);
});
