const { Client } = require('@notionhq/client');

var path = require('path');
const config = require(path.join(__dirname, "../../conf"));

const fs = require('fs');

const notion = new Client({ auth: config.NOTION_CLIENT_SECRET });
const bobardsDatabaseId = config.NOTION_DATABASE_ID_BOBARDS;
const textsTestsDatabaseId = config.NOTION_DATABASE_ID_TEXTS_TESTS;

function createFileName(testTitle) {
  const fileName = config.TEXT_TEST_FILE_BASE_TITLE + testTitle + config.TEXT_TEST_FILE_EXTENSION;

  return fileName;
}

async function getTexts() {
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

function removeOldTestFiles() {
  const directory = path.join(__dirname, "../texts_tests/");
  fs.readdir(directory, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      if (file.endsWith('.txt')) {
        fs.unlink(`${directory}/${file}`, err => {
          if (err) throw err;
        });
      }
    }
  });
}

function writeTestIntoFile(testTitle, testInputText, testOutputText) {
  const fileTitle = createFileName(testTitle);
  const array = [];
  array.push(testInputText.join("\n"));
  array.push("-----");
  array.push(testOutputText.join("\n"));
  const arrayAsString = array.join("\n")
  fs.writeFileSync(path.join(__dirname, "../texts_tests/", fileTitle), arrayAsString, { flag: 'w' });

  return true;
}

function getInputTextBlocks(blocks) {
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

function getTextFromParagraphBlocks(paragraphBlocks) {
  const array = []
  for (let i = 0; i < paragraphBlocks.length; i++) {
    array.push(paragraphBlocks[i].paragraph.rich_text[0].plain_text);
  }
  return array;
}

function getOutputTextBlocks(blocks) {
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

async function getAllBlocksInPage(pageId) {
  const pageBlocks = await notion.blocks.children.list({
    block_id: pageId,
  });
  return pageBlocks;
}

function getPageTitle(pageObject) {
  const pageTitle = pageObject.properties.Titre.title[0].plain_text;

  return pageTitle;
}

function getPageId(pageObject) {
  const pageId = pageObject.id;

  return pageId;
}

async function getAllPagesInDatabase(notionDatabaseId) {
  try {
    const response = await notion.databases.query({
      database_id: notionDatabaseId,
    });

    return response;

  } catch (error) {
    console.error(error.body)
  }
}

function extractJsonIntoArray(filePath) {
  let array = [];
  if (fs.existsSync(filePath)) {
    try {
      const data = fs.readFileSync(filePath, 'utf8');

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



module.exports = {
  getAllPagesInDatabase: getAllPagesInDatabase,
  extractJsonIntoArray: extractJsonIntoArray,
  getPageId: getPageId,
  getPageTitle: getPageTitle,
  getInputTextBlocks: getInputTextBlocks,
  getOutputTextBlocks: getOutputTextBlocks,
  getTextFromParagraphBlocks: getTextFromParagraphBlocks,
  createFileName: createFileName,
  writeTestIntoFile: writeTestIntoFile,
  getTexts: getTexts,
  getAllBlocksInPage: getAllBlocksInPage,
  removeOldTestFiles: removeOldTestFiles
};