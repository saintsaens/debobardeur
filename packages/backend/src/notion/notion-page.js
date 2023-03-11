import notion from "./index.js";

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

export async function createPageInDatabase(databaseId, input, output) {
  const response = await notion.pages.create({
    
    // Indicate it should be added to a database.
    "parent": {
      "type": "database_id",
      "database_id": databaseId
    },

    // Add the title of the page (no other property).
    "properties": {
      "Titre": {
        "title": [
          {
            "text": {
              "content": input
            }
          }
        ]
      }
    },

    // Fill in the body of the page.
    "children": [
      
      // First element is a paragraph of the input text.
      {
        "object": "block",
        "paragraph": {
          "rich_text": [
            {
              "text": {
                "content": input
              }
            }
          ]
        }
      },

      // Second element is a divider.
      {
        "object": "block",
        "divider": {}
      },

      // Third element is a paragraph of the output text.
      {
        "object": "block",
        "paragraph": {
          "rich_text": [
            {
              "text": {
                "content": output
              }
            }
          ]
        }
      }
    ]
  });
}
