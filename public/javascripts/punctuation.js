const textManipulation = require('./textManipulation');

function fixCommas(arr) {
    // Replace all variations of comma punctuation with comma+space.
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].replace(/\s*,\s*/g, ", ");
    }
    return arr;
  }

  function fixMultipleSpaces(arr) {
    // Replace multiple spaces with single space.
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].replace(/\s{2,}/g, " ");
    }
    return arr;
  }

  function fixLeadingPunctuation(arr) {
    // Remove leading punctuation, if there is one.
    while (arr[0] && !arr[0][0].match(/[a-zA-ZÀ-ÿ]/)) {
      arr.shift();
    }
    return arr;
  }

  function removeSpacesAfterFinalPeriod(arr) {
    if (arr[arr.length - 1].includes('.')) {
      arr[arr.length - 1] = arr[arr.length - 1].trim();
    }
    return arr;
  }  
  
  function fixSpaceBeforeAndAfterPeriod(arr) {
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].replace(/ *\. +/g, ". ");
      }
      return arr;
  }

  function fixUglyArrows(text) {
    const niceArrowedText = text.replace('->', '→');
    return niceArrowedText;
  }
  
  function fixPunctuation(text) {
    // Create a list of the text, including punctuation.
    var split_text = textManipulation.splitTextWithPunctuation(text);
    split_text = fixCommas(split_text);
    split_text = fixMultipleSpaces(split_text);
    split_text = fixLeadingPunctuation(split_text);
    split_text = fixSpaceBeforeAndAfterPeriod(split_text);
    split_text = removeSpacesAfterFinalPeriod(split_text);
  
    // Stitch the list back together.
    var reunited_text = textManipulation.reuniteTextWithPunctuation(split_text);
  
    var fixed_text = fixUglyArrows(reunited_text);
  
    return fixed_text;
  }
  
  
  module.exports = {
    fixCommas: fixCommas,
    fixMultipleSpaces: fixMultipleSpaces,
    fixLeadingPunctuation: fixLeadingPunctuation,
    removeSpacesAfterFinalPeriod: removeSpacesAfterFinalPeriod,
    fixSpaceBeforeAndAfterPeriod: fixSpaceBeforeAndAfterPeriod,
    fixUglyArrows: fixUglyArrows,
    fixPunctuation: fixPunctuation
};