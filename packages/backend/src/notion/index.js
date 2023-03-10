import { Client } from '@notionhq/client';
import { getAllPagesInDatabase } from './notion-db';
import { getAllBlocksInPage, getPageId, getPageTitle } from './notion-page';
import { getInputText, getOutputTextBlocks, getTextFromParagraphBlocks } from './notion-block';

// Create the __dirname variable in ES6.
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

// Configure dotenv to use process.env for environment variables.
import * as dotenv from 'dotenv'
dotenv.config()

import { readdir, unlink, writeFileSync, existsSync, readFileSync } from 'fs';

const notion = new Client({ auth: process.env.NOTION_KEY });

const textsTestsDatabaseId = process.env.NOTION_DATABASE_ID_TEXTS_TESTS;

export function createFileName(testTitle) {
  const fileName = process.env.TEXT_TEST_FILE_BASE_TITLE + testTitle + process.env.TEXT_TEST_FILE_EXTENSION;

  return fileName;
}

export async function getTexts() {
  const pages = await getAllPagesInDatabase(textsTestsDatabaseId);
  for (let i = 0; i < pages.results.length; i++) {
    const page = pages.results[i];
    const pageTitle = getPageTitle(page);
    const pageId = getPageId(page);
    const pageBlocks = await getAllBlocksInPage(pageId);
    const inputText = getInputText(pageBlocks);
    const outputTextBlocks = getOutputTextBlocks(pageBlocks);
    const outputText = getTextFromParagraphBlocks(outputTextBlocks);

    writeTestIntoFile(pageTitle, inputText, outputText);
  }
}

export function removeOldTestFiles() {
  const directory = join(__dirname, "../../integrationTests/");
  readdir(directory, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      if (file.endsWith('.txt')) {
        unlink(`${directory}/${file}`, err => {
          if (err) throw err;
        });
      }
    }
  });
}

export function writeTestIntoFile(testTitle, testInputText, testOutputText) {
  const fileTitle = createFileName(testTitle);
  const array = [];
  array.push(testInputText.join("\n"));
  array.push("-----");
  array.push(testOutputText.join("\n"));
  const arrayAsString = array.join("\n")
  writeFileSync(join(__dirname, "../../integrationTests/", fileTitle), arrayAsString, { flag: 'w' });

  return true;
}

export function extractJsonIntoArray(filePath) {
  let array = [];
  if (existsSync(filePath)) {
    try {
      const data = readFileSync(filePath, 'utf8');

      const jsonData = JSON.parse(data);
      array = jsonData;
    } catch (err) {
      console.error(`Error occurred while reading or parsing JSON: ${err}`);
    }
  } else {
    console.error(`Error: file not found at path: ${filePath}`)
  }
  return array;
}

export default notion;