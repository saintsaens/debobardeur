import { extractJsonIntoArray } from '../notion';
import { createFileName } from '../fileManipulation/file';
import { writeFileSync, existsSync, unlinkSync } from 'fs';

test('checks JSON file is correctly read and parsed', () => {
  const output = ["très", "vraiment"];
  const filepath = './testFile.json';

  writeFileSync(filepath, JSON.stringify(output));
  expect(existsSync(filepath)).toBe(true);
  expect(extractJsonIntoArray(filepath)).toStrictEqual(output);
});

test('constructs file name', () => {
  const testTitle = "1";
  const output = process.env.TEXT_TEST_FILE_BASE_TITLE + testTitle + process.env.TEXT_TEST_FILE_EXTENSION;

  expect(createFileName(testTitle)).toBe(output);
});

afterEach(() => {
  const filepath = './testFile.json';
  if (existsSync(filepath)) {
    unlinkSync(filepath);
  }
});
