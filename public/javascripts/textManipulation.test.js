const textManipulation = require('./textManipulation');

test('removes "ipsum" from "Lorem ipsum dolor"', () => {
    const input = "Lorem ipsum dolor"
    const element = "ipsum"
    const output = "Lorem  dolor"
    expect(textManipulation.removeElementFromText(input, element)).toBe(output);
});

test('removes "ipsum dolor" from "Lorem ipsum dolor sit"', () => {
    const input = "Lorem ipsum dolor sit"
    const element = "ipsum dolor"
    const output = "Lorem  sit"
    expect(textManipulation.removeElementFromText(input, element)).toBe(output);
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