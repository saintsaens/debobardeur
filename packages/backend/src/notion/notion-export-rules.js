import { removeRuleJsonFiles } from "../fileManipulation/file.js";
import { getAllPagesInDatabase } from "./notion-db.js";
import { getRulesRemplacer, getRulesSupprimer, writeRemplacerRulesIntoFile, writeSupprimerRulesIntoFile } from "./notion-rules.js";

import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

removeRuleJsonFiles()

// Write replacing rules into file.
const remplacerFilename = join(__dirname, "../../bobards/", process.env.REMPLACEMENT_FILENAME);

const pagesRemplacer = await getAllPagesInDatabase(process.env.NOTION_DATABASE_ID_REMPLACER);
const remplacerRulesObject = getRulesRemplacer(pagesRemplacer);
writeRemplacerRulesIntoFile(remplacerRulesObject, remplacerFilename);

// Write removing rules into file.
const supprimerFilename = join(__dirname, "../../bobards/", process.env.BOBARDS_FILENAME);

const pagesSupprimer = await getAllPagesInDatabase(process.env.NOTION_DATABASE_ID_BOBARDS);
const supprimerRulesArray = getRulesSupprimer(pagesSupprimer);
writeSupprimerRulesIntoFile(supprimerRulesArray, supprimerFilename);