const capitalization = require('./capitalization');

test('capitalizes "oui" into "Oui"', () => {
  const inputText = "oui"
  const outputText = "Oui"
  expect(capitalization.capitalizeString(inputText)).toBe(outputText);
});

test("capitalizes first word after period", () => {
  const inputArray = ["Oui", ". ", "non"]
  const outputArray = ["Oui", ". ", "Non"]
  expect(capitalization.capitalizeElementAfterPeriod(inputArray)).toStrictEqual(outputArray);
})

test("fixes capitalization of a full text", () => {
  const inputText = "oui. non."
  const outputText = "Oui. Non."
  expect(capitalization.fixCapitalization(inputText)).toBe(outputText);
})