import { promises, readFileSync } from 'fs';
import { join } from 'path';
import { debobardize } from '../src/debobardeur';
import { test, expect } from "vitest";

test('debobardizes txt files', async () => {
  let txtFiles: string[] = [];
  const files: string[] = await promises.readdir(__dirname);
  for (let file of files) {
    if (file.endsWith('.txt')) {
      txtFiles.push(file);
    }
  }

  for (let file of txtFiles) {
    const filePath: string = join(__dirname, "./" + file);
    const data: string = readFileSync(filePath, 'utf8');
    const test: string[] = data.split("-----").map((element: string) => element.trim());
    const input: string = test[0];
    const output: string = test[1];

    expect(debobardize(input)).toBe(output);
  }
});
