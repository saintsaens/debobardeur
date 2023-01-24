const textManipulation = require('./textManipulation');
const capitalization = require('./capitalization');
const punctuation = require('./punctuation');
const notiondb = require('./notionCorrectionsDb');

var path = require('path');
const config = require(path.join(__dirname, "../../conf"));

const BOBARDS = notiondb.extractJsonIntoArray(config.BOBARDS_FILE_PATH);
const REMPLACEMENT = notiondb.extractJsonIntoArray(config.REMPLACEMENT_FILE_PATH);

function debobardize(textWithBobards) {
  var lines = textWithBobards.split("\n");

  for (let i = 0; i < lines.length; i++) {
    if (lines[i] != "") {
      console.log("lines[i]: " + lines[i]);
      let textWithRemovedElements = removeBobards(lines[i], BOBARDS);
      let textWithReplacedElements = replaceBobards(textWithRemovedElements, REMPLACEMENT);
      let textWithFixedPunctuation = punctuation.fixPunctuation(textWithReplacedElements);
      lines[i] = capitalization.fixCapitalization(textWithFixedPunctuation);
    }
  }

  const reunitedText = lines.join("\n");

  return reunitedText;
}

function removeBobards(text, bobards) {
  let newText = text;
  bobards.forEach(word => {
    if (text.toLowerCase().includes(word.toLowerCase())) {
      newText = textManipulation.removeElementFromText(text, word);
    }
  });
  return newText;
}

function replaceBobards(text, remplacement) {
  let newText = text;
  let keys = Object.keys(remplacement);
  let values = Object.values(remplacement);

  keys.forEach(key => {
    if (text.toLowerCase().includes(key)) {
      newText = textManipulation.replaceElementFromText(text, key, remplacement[key])
    }
  });
  return newText;
}

module.exports = {
  debobardize: debobardize,
  removeBobards: removeBobards,
  replaceBobards: replaceBobards
};