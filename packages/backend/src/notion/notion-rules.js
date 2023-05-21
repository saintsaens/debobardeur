import { getPagePropertyByName } from "./notion-page.js";
import { writeFileSync } from 'fs';

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

export function getRulesSupprimer(pages) {
  const rulesArray = [];

  pages.forEach(page => {
    const expressionToRemove = getPagePropertyByName(page, process.env.NOTION_DATABASE_SUPPRIMER_COLUMN_NAME_ONE).title[0].plain_text;
    rulesArray.push(expressionToRemove);
  });

  return rulesArray;
}

export function writeRemplacerRulesIntoFile(rulesObject, filename) {
  const jsonString = JSON.stringify(rulesObject, null, 2);
  writeFileSync(filename, jsonString, err => {
    if (err) {
      console.log('Error writing to file', err);
    } else {
      console.log('Object written to file');
    }
  });
}

export function writeSupprimerRulesIntoFile(rulesArray, filename) {
  const rulesString = rulesArray.join('\n');
  
  writeFileSync(filename, rulesString, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Rules written to file');
  });
}
