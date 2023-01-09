const textManipulation = require('./textManipulation');
const capitalization = require('./capitalization');
const punctuation = require('./punctuation');

const ADVERBES = [ "extrêmement", "réellement", "vraiment", "à priori", "a priori", "très" ];

function debobardize(text_with_bobards) {
  if (text_with_bobards === "") {
    return "";
  }

  let text_being_debobardized = text_with_bobards;

  ADVERBES.forEach(function(i) {
    i = i.toLowerCase();
    text_being_debobardized = text_being_debobardized.toLowerCase();
    if (text_being_debobardized.indexOf(i) !== -1) {
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