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

export async function getAllPagesInDatabaseSorted(notionDatabaseId, sortingProperty, sortingDirection) {
  try {
    const response = await notion.databases.query({
      database_id: notionDatabaseId,
      sorts: [
        {
          // sortingProperty must be a string, the exact name of a database property.
          property: sortingProperty,

          // sortingDirection must be either "ascending" or "descending".
          direction: sortingDirection,
        },
      ],
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