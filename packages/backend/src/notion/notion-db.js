import notion from ".";

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