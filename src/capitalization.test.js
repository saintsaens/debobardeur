import { capitalizeString, capitalizeElementAfterPeriod, fixCapitalization } from './capitalization.js';

test('capitalizes "oui" into "Oui"', () => {
  const inputText = "oui"
  const outputText = "Oui"
  expect(capitalizeString(inputText)).toBe(outputText);
});

test("capitalizes first word after period", () => {
  const inputArray = ["Oui", ". ", "non"]
  const outputArray = ["Oui", ". ", "Non"]
  expect(capitalizeElementAfterPeriod(inputArray)).toStrictEqual(outputArray);
})

test("fixes capitalization of a full text", () => {
  const inputText = "oui. non."
  const outputText = "Oui. Non."
  expect(fixCapitalization(inputText)).toBe(outputText);
})