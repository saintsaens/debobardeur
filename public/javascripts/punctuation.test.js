const punctuation = require('./punctuation');

test('replaces any variation of comma punctuation with comma+space', () => {
  const input = ["oui", " , ", "non", " ,", "peut-être", ",", "bref", "."];
  const output = ["oui", ", ", "non", ", ", "peut-être", ", ", "bref", "."];
  expect(punctuation.fixCommas(input)).toStrictEqual(output);
});

test('replaces any multiple space with single space', () => {
    const input = ["Oui", ",  ", "non", ".     ", "Peut-être", ",                ", "bref", "."];
    const output = ["Oui", ", ", "non", ". ", "Peut-être", ", ", "bref", "."];
    expect(punctuation.fixMultipleSpaces(input)).toStrictEqual(output);
});

test('removes any starting character that isn’t an alphabetic character', () => {
    const input = [".", ",  ", "-", ".     ", " ", "Oui", "."];
    const output = ["Oui", "."];
    expect(punctuation.fixLeadingPunctuation(input)).toStrictEqual(output);
});

test('fixes space before the final period', () => {
    const input = ['Hello', 'world', '  .'];
    const output = ['Hello', 'world', '.'];
    expect(punctuation.removeSpacesAfterFinalPeriod(input)).toStrictEqual(output);
});

test('fixes spaces before and after period', () => {
    const input = ['   .     ', '.', ' , '];
    const output = ['. ', '. ', ' , '];
    expect(punctuation.fixSpaceBeforeAndAfterPeriod(input)).toStrictEqual(output);
  });

test('turns ugly arrows (->) into nice arrows (→)', () => {
    const input = "Cliquez sur bon -> jour";
    const output = "Cliquez sur bon → jour";
    expect(punctuation.fixUglyArrows(input)).toStrictEqual(output);
});

test('fixes all punctuation', () => {
    const input = " .  Cliquez , puis cliquez peut-être  sur    bon -> aujourd’hui . ";
    const output = "Cliquez, puis cliquez peut-être sur bon → aujourd’hui.";
    expect(punctuation.fixPunctuation(input)).toStrictEqual(output);
});