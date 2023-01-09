const textManipulation = require('./textManipulation');

function capitalizeString(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function capitalizeElementAfterPeriod(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] === ". ") {
      arr[i + 1] = capitalizeString(arr[i + 1]);
    }
  }
  return arr;
}


function fixCapitalization(text) {
  let splitText = textManipulation.splitTextWithPunctuation(text);

  // Capitalize the first word of the text.
  splitText[0] = capitalizeString(splitText[0]);

  splitText = capitalizeElementAfterPeriod(splitText);
  reunitedText = textManipulation.reuniteTextWithPunctuation(splitText);

  return reunitedText;
}



module.exports = {
    capitalizeString: capitalizeString,
    capitalizeElementAfterPeriod: capitalizeElementAfterPeriod,
    fixCapitalization: fixCapitalization
};