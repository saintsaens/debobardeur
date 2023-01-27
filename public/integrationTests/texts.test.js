import { promises, readFileSync } from 'fs';

import { join } from 'path';
import { debobardize } from '../src/debobardeur';

test('debobardizes txt files', async () => {
  let txtFiles = [];
  const files = await promises.readdir(__dirname);
  for (let file of files) {
    if (file.endsWith('.txt')) {
      txtFiles.push(file);
    }
  }

  for (let file of txtFiles) {
    const filePath = join(__dirname, "./" + file);
    const data = readFileSync(filePath, 'utf8');
    const test = data.split("-----").map((element) => element.trim());
    const input = test[0];
    const output = test[1];

    expect(debobardize(input)).toBe(output);
  }
});