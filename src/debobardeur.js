import { removeElementFromText, replaceElementFromText } from './textManipulation.js';
import { fixCapitalization } from './capitalization.js';
import { fixPunctuation } from './punctuation.js';
import { extractJsonIntoArray } from './notion/index.js';

import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

import * as dotenv from 'dotenv';
dotenv.config();

function createFilePath(fileName) {
  const filePath = join(__dirname, "../bobards/", fileName);
  return filePath;
}

export function debobardize(textWithBobards) {
  var lines = textWithBobards.split("\n");

  const bobardsfilePath = createFilePath(process.env.BOBARDS_FILENAME);
  const remplacementsFilePath = createFilePath(process.env.REMPLACEMENT_FILENAME);
  
  const bobards = extractJsonIntoArray(bobardsfilePath);
  const remplacements = extractJsonIntoArray(remplacementsFilePath);

  for (let i = 0; i < lines.length; i++) {
    if (lines[i] != "") {
      let textWithRemovedElements = removeBobards(lines[i], bobards);
      let textWithReplacedElements = replaceBobards(textWithRemovedElements, remplacements);
      let textWithFixedPunctuation = fixPunctuation(textWithReplacedElements);
      lines[i] = fixCapitalization(textWithFixedPunctuation);
    }
  }

  const reunitedText = lines.join("\n");

  return reunitedText;
}

export function removeBobards(text, bobards) {
  let newText = text;
  bobards.forEach(word => {
    if (text.toLowerCase().includes(word.toLowerCase())) {
      newText = removeElementFromText(text, word);
    }
  });
  return newText;
}

export function replaceBobards(text, remplacement) {
  let newText = text;
  let keys = Object.keys(remplacement);

  keys.forEach(key => {
    if (text.toLowerCase().includes(key)) {
      newText = replaceElementFromText(text, key, remplacement[key])
    }
  });
  return newText;
}