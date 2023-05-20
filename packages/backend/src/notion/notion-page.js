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

export function getAllPageProperties(pageObject) {
  const properties = pageObject.properties;
  const propertiesArray = Object.keys(properties).map(propertyName => {
    const property = properties[propertyName];
    return {
      ...property,
      name: propertyName
    };
  });
  return propertiesArray;
}

export function getPagePropertyByName(pageObject, propertyName) {
  const pageProperties = getAllPageProperties(pageObject);
  
  const property = pageProperties.find((obj) => obj.name === propertyName);

  return property
}

// Split the string into an array with elements of maximum length.
function splitStringIntoArray(str, maxLength) {
  const result = [];
  for (let i = 0; i < str.length; i += maxLength) {
    result.push(str.slice(i, i + maxLength));
  }
  return result;
}

export async function createPageInDatabase(databaseId, input, output) {
  const MAX_LENGTH = 1500;
  
  const inputArray = splitStringIntoArray(input, MAX_LENGTH);
  const truncated_input = input.slice(0, 50);

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
              "content": truncated_input
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
