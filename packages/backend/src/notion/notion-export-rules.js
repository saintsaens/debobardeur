import { removeRuleJsonFiles } from "../fileManipulation/file.js";
import { getAllPagesInDatabase } from "./notion-db.js";
import { getRulesRemplacer, writeRemplacerRulesIntoFile } from "./notion-rules.js";

import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

removeRuleJsonFiles()

const pages = await getAllPagesInDatabase(process.env.NOTION_DATABASE_ID_REMPLACER);
const remplacerFilename = join(__dirname, "../../bobards/", process.env.REMPLACEMENT_FILENAME);

const remplacerRulesObject = getRulesRemplacer(pages);
writeRemplacerRulesIntoFile(remplacerRulesObject, remplacerFilename);