const textManipulation = require('./textManipulation');

test('removes stuff from "Lorem ipsum dolor"', () => {
    const input = "Lorem ipsum dolor"
    const element = "ipsum"
    const output = "Lorem  dolor"
    expect(textManipulation.removeElementFromText(input, element)).toBe(output);
});

test('removes "lorem" from "Lorem ipsum dolor" even if case is different', () => {
  const input = "Lorem ipsum dolor"
  const element = "lorem"
  const output = " ipsum dolor"
  expect(textManipulation.removeElementFromText(input, element)).toBe(output);
});

test('removes "ipsum dolor" from "Lorem ipsum dolor sit"', () => {
    const input = "Lorem ipsum dolor sit"
    const element = "ipsum dolor"
    const output = "Lorem  sit"
    expect(textManipulation.removeElementFromText(input, element)).toBe(output);
});

test('replaces "ipsum" with "truc" from "Lorem ipsum dolor"', () => {
  const input = "Lorem ipsum dolor"
  const element1 = "ipsum"
  const element2 = "truc"
  const output = "Lorem truc dolor"
  expect(textManipulation.replaceElementFromText(input, element1, element2)).toBe(output);
});

test('replaces "Lorem" with "Truc" from "Lorem ipsum dolor"', () => {
  const input = "Lorem ipsum dolor"
  const element1 = "Lorem"
  const element2 = "truc"
  const output = "truc ipsum dolor"
  expect(textManipulation.replaceElementFromText(input, element1, element2)).toBe(output);
});

test("split text into array keeping punctuation", () => {
    const inputText = "Oui, non mais peut-être aujourd’hui."
    const outputArray = ["Oui", ", ", "non", " ", "mais", " ", "peut-être", " ", "aujourd’hui", "."]
    expect(textManipulation.splitTextWithPunctuation(inputText)).toStrictEqual(outputArray);
  })
  
  test("reunites array into text keeping punctuation", () => {
    const inputArray = ["Oui", ", ", "non", " ", "mais", " ", "peut-être", " ", "aujourd’hui", "."]
    const outputText = "Oui, non mais peut-être aujourd’hui."
    expect(textManipulation.reuniteTextWithPunctuation(inputArray)).toStrictEqual(outputText);
  })