import notion from "./index.js";

export async function getAllPagesInDatabase(notionDatabaseId) {
  try {
    const response = await notion.databases.query({
      database_id: notionDatabaseId,
    });

    let pagesArray = getArrayOfPages(response);

    while (response.has_more) {
      const nextResponse = await notion.databases.query({
        database_id: notionDatabaseId,
        start_cursor: response.next_cursor,
      });

      response = nextResponse;
      pagesArray = pagesArray.concat(getArrayOfPages(nextResponse));
    }
    return pagesArray;

  } catch (error) {
    console.error(error.body)
  }
}

export async function getAllPagesInDatabaseSorted(notionDatabaseId, sortingProperty, sortingDirection) {
  try {
    let response = await notion.databases.query({
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

    let pagesArray = getArrayOfPages(response);

    while (response.has_more) {
      const nextResponse = await notion.databases.query({
        database_id: notionDatabaseId,
        sorts: [
          {
            // sortingProperty must be a string, the exact name of a database property.
            property: sortingProperty,
  
            // sortingDirection must be either "ascending" or "descending".
            direction: sortingDirection,
          },
        ],
        start_cursor: response.next_cursor,
      });

      response = nextResponse;
      pagesArray = pagesArray.concat(getArrayOfPages(nextResponse));
    }
    return pagesArray;

  } catch (error) {
    console.error(error.body)
  }
}

export function getArrayOfPages(pagesObject) {
  const pagesArray = pagesObject.results.map(page => page);

  return pagesArray;
}