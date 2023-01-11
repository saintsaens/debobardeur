const textManipulation = require('./textManipulation');
const capitalization = require('./capitalization');
const punctuation = require('./punctuation');
const notiondb = require('./notionCorrectionsDb');
var path = require('path');
const config = require(path.join(__dirname, "../../conf"));

const bobardsFilePath = config.BOBARDS_FILE_PATH

const BOBARDS = notiondb.extractJsonIntoArray(bobardsFilePath);

function debobardize(text_with_bobards) {
  if (text_with_bobards === "") {
    return "";
  }

  let text_being_debobardized = text_with_bobards;

  BOBARDS.forEach(function(i) {
    i = i.toLowerCase();
    lowerText = text_being_debobardized.toLowerCase();
    if (lowerText.indexOf(i) !== -1) {
      text_being_debobardized = textManipulation.removeElementFromText(text_being_debobardized, i);
    }
  });

  text_being_debobardized = punctuation.fixPunctuation(text_being_debobardized);
  text_being_debobardized = capitalization.fixCapitalization(text_being_debobardized);

  const text_without_bobards = text_being_debobardized;

  return text_without_bobards;
}

module.exports = {
  debobardize: debobardize
};