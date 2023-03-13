import { createFileName } from "./file";

test('constructs file name', () => {
  const testTitle = "1";
  const output = process.env.TEXT_TEST_FILE_BASE_TITLE + testTitle + process.env.TEXT_TEST_FILE_EXTENSION;

  expect(createFileName(testTitle)).toBe(output);
});