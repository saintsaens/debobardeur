import { splitTextWithPunctuation, reuniteTextWithPunctuation } from './textManipulation.js';

export function capitalizeString(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function capitalizeElementAfterPeriod(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] === ". ") {
      arr[i + 1] = capitalizeString(arr[i + 1]);
    }
  }
  return arr;
}


export function fixCapitalization(text) {
  const splitText = splitTextWithPunctuation(text);

  let capitalizedSplitText = splitText;
  // Capitalize the first word of the text.
  capitalizedSplitText[0] = capitalizeString(capitalizedSplitText[0]);

  const capitalizedSplitFullText = capitalizeElementAfterPeriod(capitalizedSplitText);
  const reunitedText = reuniteTextWithPunctuation(capitalizedSplitFullText);

  return reunitedText;
}