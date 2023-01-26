const fs = require('fs');

const path = require('path');
const debobardize = require(path.join(__dirname, "../javascripts/debobardeur"));

test('debobardizes txt files', async () => {
  let txtFiles = [];
  const files = await fs.promises.readdir(__dirname);
  for (let file of files) {
    if (file.endsWith('.txt')) {
      txtFiles.push(file);
    }
  }

  for (let file of txtFiles) {
    const filePath = path.join(__dirname, "./" + file);
    const data = fs.readFileSync(filePath, 'utf8');
    const test = data.split("-----").map((element) => element.trim());
    const input = test[0];
    const output = test[1];

    expect(debobardize.debobardize(input)).toBe(output);
  }
});