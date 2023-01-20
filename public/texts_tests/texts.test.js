const fs = require('fs');
const path = require('path');
const debobardize = require(path.join(__dirname, "../javascripts/debobardeur"));

test('debobardizes txt files', () => {
  const filePath = path.join(__dirname, "./support-answer.txt");
  const data = fs.readFileSync(filePath, 'utf8');
  const test = data.split("-----").map((element) => element.trim());
  const input = test[0];
  const output = test[1];
  console.log("debobd: ", debobardize.debobardize(test[0]));
  console.log("output: ", test[1]);
  expect(debobardize.debobardize(input)).toStrictEqual(output);
});