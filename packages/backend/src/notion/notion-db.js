import notion from "./index.js";

export async function getAllPagesInDatabase(notionDatabaseId) {
  try {
    const response = await notion.databases.query({
      database_id: notionDatabaseId,
    });

    const pagesArray = getArrayOfPages(response);

    return pagesArray;

  } catch (error) {
    console.error(error.body)
  }
}

export function getArrayOfPages(pagesObject) {
  const pagesArray = pagesObject.results.map(page => page);

  return pagesArray;
}