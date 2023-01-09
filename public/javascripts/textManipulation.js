function removeElementFromText(text, element) {
    const textWithRemovedElement = text.replace(element, "");
  
    return textWithRemovedElement;
  }

  function splitTextWithPunctuation(text) {
    // Split the string on spaces, but keep all punctuation including spaces; ignore hyphens, apostrophes and accentuated characters.
    const substrings = text.split(/(\s+|[^a-zA-ZÀ-ÿ-'’]+)/);

    // Remove squash all non-character elements in the array (which can happen because of the "+"" in the regex).
    for (let i = 0; i < substrings.length - 1; i++) {
      if (!substrings[i].match(/\w/) && !substrings[i+1].match(/\w/)) {
        substrings[i] += substrings[i+1];
        substrings.splice(i+1, 1);
        i--;
      }
    }
  
    return substrings;
  }

  function reuniteTextWithPunctuation(arr) {
    let reunitedText = "";
    for (let i = 0; i < arr.length; i++) {
      reunitedText = reunitedText + arr[i];
    }
  
    return reunitedText;
  }

  module.exports = {
    removeElementFromText: removeElementFromText,
    splitTextWithPunctuation: splitTextWithPunctuation,
    reuniteTextWithPunctuation: reuniteTextWithPunctuation
};