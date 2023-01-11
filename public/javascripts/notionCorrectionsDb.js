const { Client } = require('@notionhq/client');
var path = require('path');
const config = require(path.join(__dirname, "../../conf"));
const fs = require('fs');

const notion = new Client({ auth: config.CLIENT_SECRET })

const databaseId = config.DATABASE_ID_CORRECTIONS

async function findElementInDatabase(text) {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      "filter": {
        "property": "Nom",
        "rich_text": {
            "contains": text
        }
      }
    });

    return isElementPresent(response);

  } catch (error) {
    console.error(error.body)
    return false;
  }
}

function isElementPresent(notionQuery){
  if (notionQuery.results.length > 0) {
    return true;
  }
  return false;
}

async function getAllElementsInDatabase() {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
    });

    return mapPageNamesIntoArray(response);

  } catch (error) {
    console.error(error.body)
  }
}

function mapPageNamesIntoArray(pages) {
  const array = pages.results.map(result => result.properties.Nom.title[0].plain_text);

  return array;
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
  findElementInDatabase: findElementInDatabase,
  isElementPresent: isElementPresent,
  getAllElementsInDatabase: getAllElementsInDatabase,
  mapPageNamesIntoArray: mapPageNamesIntoArray,
  extractJsonIntoArray: extractJsonIntoArray
};