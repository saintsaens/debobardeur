const notiondb = require('./notionCorrectionsDb');

test('checks the Notion database contains "bien"', async () => {
  const trueInput = "bien";
  const falseInput = "blablabla";
  expect(await notiondb.findElement(trueInput)).toBeTruthy();
  expect(await notiondb.findElement(falseInput)).toBeFalsy();
});