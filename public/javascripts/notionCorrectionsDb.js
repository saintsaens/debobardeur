const { Client } = require('@notionhq/client');

const config = require('../../conf');

const notion = new Client({ auth: config.CLIENT_SECRET })

const databaseId = config.DATABASE_ID_CORRECTIONS

async function findElement(text) {
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

    if (response.results.length > 0) {
      return true;
    }

    return false;

  } catch (error) {
    console.error(error.body)
    return false;
  }
}

module.exports = {
  findElement: findElement
};