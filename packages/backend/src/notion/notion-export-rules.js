import { removeRuleJsonFiles } from "../fileManipulation/file.js";
import { getAllPagesInDatabaseSorted, getAllPagesInDatabase } from "./notion-db.js";
import { getRulesRemplacer, getRulesSupprimer, writeRemplacerRulesIntoFile, writeSupprimerRulesIntoFile } from "./notion-rules.js";

import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

removeRuleJsonFiles()

// Write replacing rules into file.
const remplacerFilename = join(__dirname, "../../bobards/", process.env.REMPLACEMENT_FILENAME);

const pagesRemplacer = await getAllPagesInDatabaseSorted(process.env.NOTION_DATABASE_ID_REMPLACER, process.env.NOTION_SORTING_PROPERTY_REMPLACER, process.env.NOTION_SORTING_PROPERTY_DIRECTION);
const remplacerRulesObject = getRulesRemplacer(pagesRemplacer);
writeRemplacerRulesIntoFile(remplacerRulesObject, remplacerFilename);

// Write removing rules into file.
const supprimerFilename = join(__dirname, "../../bobards/", process.env.BOBARDS_FILENAME);

const pagesSupprimer = await getAllPagesInDatabaseSorted(process.env.NOTION_DATABASE_ID_BOBARDS, process.env.NOTION_SORTING_PROPERTY_SUPPRIMER, process.env.NOTION_SORTING_PROPERTY_DIRECTION);
const supprimerRulesArray = getRulesSupprimer(pagesSupprimer);
writeSupprimerRulesIntoFile(supprimerRulesArray, supprimerFilename);