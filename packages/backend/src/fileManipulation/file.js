import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

import '../../loadEnv.js';

export function createFilePath(fileName) {
  try {
    const filePath = join(__dirname, "../../bobards/", fileName);
    return filePath;
  } catch (error) {
    console.error(`An error occurred: ${error}`);
    console.log(`fileName: ${fileName}`);
    console.log(`__dirname: ${__dirname}`);
    console.log(`join(__dirname, "../bobards/", fileName): ${join(__dirname, "../../bobards/", fileName)}`);
  }
}

export function createFileName(testTitle) {
  const fileName = process.env.TEXT_TEST_FILE_BASE_TITLE + testTitle + process.env.TEXT_TEST_FILE_EXTENSION;

  return fileName;
}

// Remove all files in folder bobards, ending with .json.
export function removeRuleJsonFiles() {
  const directory = join(__dirname, "../../bobards/");
  readdir(directory, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      if (file.endsWith('.json')) {
        unlink(`${directory}/${file}`, err => {
          if (err) throw err;
        });
      }
    }
  });
}