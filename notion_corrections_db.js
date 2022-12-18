import { Client } from "@notionhq/client"

import { CLIENT_SECRET, DATABASE_ID_CORRECTIONS } from './conf.js';

const notion = new Client({ auth: CLIENT_SECRET })

const databaseId = DATABASE_ID_CORRECTIONS

async function readItem(text) {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      "filter": {
        "property": "Nom",
        "rich_text": {
            "contains": text
        }
      }
    })
    console.log(response)
    console.log("Found: " + text)
  } catch (error) {
    console.error(error.body)
  }
}

readItem("bien")