import { fixCommas, fixMultipleSpaces, fixLeadingPunctuation, removeSpacesAfterFinalPeriod, fixSpaceBeforeAndAfterPeriod, fixUglyArrows, fixSpacedBrackets, fixPunctuation, fixSpaceBetweenTwoPeriods, fixApostrophes, fixPeriodComma, removeSpacesAfterFinalEllipsis, removeSpacesAfterFinalComma } from './punctuation.js';

test('replaces any variation of comma punctuation with comma+space', () => {
  const input = ["oui", " , ", "non", " ,", "peut-être", ",", "bref", "."];
  const output = ["oui", ", ", "non", ", ", "peut-être", ", ", "bref", "."];
  expect(fixCommas(input)).toStrictEqual(output);
});

test('replaces any straight apostrophes with curved apostrophes', () => {
  const input = ["aujourd'hui"];
  const output = ["aujourd’hui"];
  expect(fixApostrophes(input)).toStrictEqual(output);
});

test('replaces any multiple space with single space', () => {
  const input = ["Oui", ",  ", "non", ".     ", "Peut-être", ",                ", "bref", "."];
  const output = ["Oui", ", ", "non", ". ", "Peut-être", ", ", "bref", "."];
  expect(fixMultipleSpaces(input)).toStrictEqual(output);
});

test('removes any starting character that isn’t an alphabetic character, or a curved opening bracket', () => {
  const input1 = [".", ",  ", "-", ".     ", " ", "Oui", "."];
  const output1 = ["Oui", "."];
  const input2 = ["[", "Oui", "."];
  const output2 = ["[", "Oui", "."];
  expect(fixLeadingPunctuation(input1)).toStrictEqual(output1);
  expect(fixLeadingPunctuation(input2)).toStrictEqual(output2);
});

test('removes space after the final period', () => {
  const input1 = ['Hello', 'world', '. '];
  const output1 = ['Hello', 'world', '.'];
  const input2 = [' [', 'OÙ', ' ?]. '];
  const output2 = [' [', 'OÙ', ' ?].'];
  expect(removeSpacesAfterFinalPeriod(input1)).toStrictEqual(output1);
  expect(removeSpacesAfterFinalPeriod(input2)).toStrictEqual(output2);
});

test('removes space after the final comma', () => {
  const input = ['Hello', 'world', ', '];
  const output = ['Hello', 'world', ','];
  expect(removeSpacesAfterFinalComma(input)).toStrictEqual(output);
});

test('removes space before and after the final ellipsis', () => {
const input = ['Hello', 'world', ' … '];
  const output = ['Hello', 'world', '…'];
  expect(removeSpacesAfterFinalEllipsis(input)).toStrictEqual(output);
});

test('fixes spaces before and after period', () => {
  const input = ['   .     ', ' , '];
  const output = ['. ', ' , '];
  expect(fixSpaceBeforeAndAfterPeriod(input)).toStrictEqual(output);
});

test('fixes spaces between two periods in case of removal of the whole sentence', () => {
  const input = [ 'Blabla', ' ', 'ça', ' ', 'fonctionne', '. .' ];
  const output = [ 'Blabla', ' ', 'ça', ' ', 'fonctionne', '.' ];
  expect(fixSpaceBetweenTwoPeriods(input)).toStrictEqual(output);
});

test('fixes period+comma into period in case of removal of an expression', () => {
  const input = [ 'Blabla', '., ', 'la', ' ', 'seule', '.' ];
  const output = [ 'Blabla', '. ', 'la', ' ', 'seule', '.' ];
  expect(fixPeriodComma(input)).toStrictEqual(output);
});

test('does not change spacing if period is a dot', () => {
  const input = ['WordPress', '.', 'com'];
  const output = ['WordPress', '.', 'com'];
  expect(fixSpaceBeforeAndAfterPeriod(input)).toStrictEqual(output);
});

test('turns ugly arrows (->) into nice arrows (→)', () => {
  const input = "Cliquez sur bon -> jour et sur bon -> soir.";
  const output = "Cliquez sur bon → jour et sur bon → soir.";
  expect(fixUglyArrows(input)).toStrictEqual(output);
});

test('removes spaces after opening brackets and before closing brackets', () => {
  const input = ["( ", "salut", " )"];
  const output = ["(", "salut", ")"];
  expect(fixSpacedBrackets(input)).toStrictEqual(output);
});

test('fixes all punctuation', () => {
  const input = " .  Cliquez , puis cliquez peut-être  sur    bon -> aujourd’hui . ";
  const output = "Cliquez, puis cliquez peut-être sur bon → aujourd’hui.";
  expect(fixPunctuation(input)).toStrictEqual(output);
});