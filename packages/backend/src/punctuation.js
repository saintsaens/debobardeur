import { splitTextWithPunctuation, reuniteTextWithPunctuation } from './textManipulation.js';

export function fixCommas(arr) {
  // Replace all variations of comma punctuation with comma+space.
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].replace(/\s*,\s*/g, ", ");
  }
  return arr;
}

export function fixApostrophes(arr) {
  // Replace all straight apostrophes with curved apostrophes.
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].replace(/'/g, "’");
  }
  return arr;
}

export function fixMultipleSpaces(arr) {
  // Replace multiple spaces with single space.
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].replace(/\s{2,}/g, " ");
  }
  return arr;
}

export function fixLeadingPunctuation(arr) {
  // Remove leading punctuation, if there is one — except opening square brackets.
  while (arr[0] && !arr[0][0].match(/[a-zA-ZÀ-ÿ]/) && !arr[0][0].match(/\[/)) {
    arr.shift();
  }
  return arr;
}

export function removeSpacesAfterFinalPeriod(arr) {
  if (arr.length > 0 && arr[arr.length - 1].includes('.')) {
    arr[arr.length - 1] = arr[arr.length - 1].replace(/\s*\.\s*$/, '.');
  }  
  return arr;
}

export function removeSpacesAfterFinalComma(arr) {
  if (arr.length > 0 && arr[arr.length - 1].includes(',')) {
    arr[arr.length - 1] = arr[arr.length - 1].replace(/\s+$/, '');
  }  
  return arr;
}

export function removeSpacesAfterFinalEllipsis(arr) {
  if (arr.length > 0) {
    if (arr[arr.length - 1].includes('…')) {
      arr[arr.length - 1] = arr[arr.length - 1].trim();
    }
  }
  return arr;
}

export function fixSpaceBeforeAndAfterPeriod(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].replace(/ *\. +/g, ". ");
    arr[i] = arr[i].replace(/ *\… +/g, "… ");
  }
  return arr;
}

export function fixSpaceBetweenTwoPeriods(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].replace(/\.\s+\./g, ".");
  }
  return arr;
}

export function fixDoublePeriods(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].replace(/\.{2}(?!\.)/g, ".");
  }
  return arr;
}

export function fixPeriodComma(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].replace(/\.,\s/g, ". ");
  }
  return arr;
}

export function fixUglyArrows(text) {
  const niceArrowedText = text.replace(/->/g, '→');
  return niceArrowedText;
}

export function fixSpacedBrackets(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].replace(/\( +/g, "(").replace(/ +\)/g, ")");
  }
  return arr;
}

export function fixPunctuation(text) {
  // Create a list of the text, including punctuation.
  var split_text = splitTextWithPunctuation(text);

  // Run the fixing train.
  split_text = fixCommas(split_text);
  split_text = fixApostrophes(split_text);
  split_text = fixMultipleSpaces(split_text);
  split_text = fixLeadingPunctuation(split_text);
  split_text = fixSpaceBeforeAndAfterPeriod(split_text);
  split_text = fixPeriodComma(split_text);
  split_text = removeSpacesAfterFinalComma(split_text);
  split_text = removeSpacesAfterFinalPeriod(split_text);
  split_text = removeSpacesAfterFinalEllipsis(split_text);
  split_text = fixSpaceBetweenTwoPeriods(split_text);
  split_text = fixSpacedBrackets(split_text);

  // Stitch the list back together.
  var reunited_text = reuniteTextWithPunctuation(split_text);

  var fixed_text = fixUglyArrows(reunited_text);

  return fixed_text;
}