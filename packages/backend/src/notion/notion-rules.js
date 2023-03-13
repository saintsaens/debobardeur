import { getPagePropertyByName } from "./notion-page";

import '../../loadEnv.js';

export function getRulesRemplacer(pages) {
  const rulesObject = {};

  pages.forEach(page => {
    const expressionToReplace = getPagePropertyByName(page, process.env.NOTION_DATABASE_REMPLACER_COLUMN_NAME_ONE).title[0].plain_text;
    const expressionReplacing = getPagePropertyByName(page, process.env.NOTION_DATABASE_REMPLACER_COLUMN_NAME_TWO).rich_text[0].plain_text;
    rulesObject[expressionToReplace] = expressionReplacing;
  });

  return rulesObject;
}