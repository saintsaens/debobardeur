import { Client } from '@notionhq/client';

import { join } from 'path';

import { readdir, unlink, writeFileSync, existsSync, readFileSync } from 'fs';

const notion = new Client({ auth: process.env.NOTION_CLIENT_SECRET });
const bobardsDatabaseId = process.env.NOTION_DATABASE_ID_BOBARDS;
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
    const inputTextBlocks = getInputTextBlocks(pageBlocks);
    const inputText = getTextFromParagraphBlocks(inputTextBlocks);
    const outputTextBlocks = getOutputTextBlocks(pageBlocks);
    const outputText = getTextFromParagraphBlocks(outputTextBlocks);

    writeTestIntoFile(pageTitle, inputText, outputText);
  }
}

export function removeOldTestFiles() {
  const directory = join(__dirname, "../integrationTests/");
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
  writeFileSync(join(__dirname, "../integrationTests/", fileTitle), arrayAsString, { flag: 'w' });

  return true;
}

export function getInputTextBlocks(blocks) {
  const array = []
  for (let i = 0; i < blocks.results.length; i++) {
    if (blocks.results[i].type == "divider") {
      return array;
    }

    else if (blocks.results[i].type == "paragraph") {
      array.push(blocks.results[i]);
    }
  }
  return array;
}

export function getTextFromParagraphBlocks(paragraphBlocks) {
  const array = []
  for (let i = 0; i < paragraphBlocks.length; i++) {
    array.push(paragraphBlocks[i].paragraph.rich_text[0].plain_text);
  }
  return array;
}

export function getOutputTextBlocks(blocks) {
  const array = [];
  let afterDivider = false;
  for (let i = 0; i < blocks.results.length; i++) {
    if (blocks.results[i].type == "divider") {
      afterDivider = true;
    }
    else if (afterDivider == true) {
      if (blocks.results[i].type == "paragraph") {
        array.push(blocks.results[i]);
      }
    }
  }
  return array;
}

export async function getAllBlocksInPage(pageId) {
  const pageBlocks = await notion.blocks.children.list({
    block_id: pageId,
  });
  return pageBlocks;
}

export function getPageTitle(pageObject) {
  const pageTitle = pageObject.properties.Titre.title[0].plain_text;

  return pageTitle;
}

export function getPageId(pageObject) {
  const pageId = pageObject.id;

  return pageId;
}

export async function getAllPagesInDatabase(notionDatabaseId) {
  try {
    const response = await notion.databases.query({
      database_id: notionDatabaseId,
    });

    return response;

  } catch (error) {
    console.error(error.body)
  }
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