import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

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