import { debobardize as _debobardize, removeBobards, replaceBobards } from './debobardeur';

test('debobardizes "Je suis vraiment content" into "Je suis content"', () => {
  const input = "Je suis vraiment content"
  const output = "Je suis content"
  expect(_debobardize(input)).toBe(output);
});

test('debobardizes "" into ""', () => {
  const input = ""
  const output = ""
  expect(_debobardize(input)).toBe(output);
});

test('removes bobard "très"', () => {
  const inputText = "Je suis très content";
  const bobards = ["très"];
  const outputText = "Je suis  content";
  expect(removeBobards(inputText, bobards)).toBe(outputText);
});

test('replaces bobard "un moyen est d’"', () => {
  const inputText = "un moyen est d’utiliser";
  const remplacement = { "un moyen est d’": "vous pouvez " };
  const outputText = "vous pouvez utiliser";
  expect(replaceBobards(inputText, remplacement)).toBe(outputText);
});

test('debobardizes "Un moyen est d’utiliser" into "Vous pouvez utiliser"', () => {
  const input = "Un moyen est d’utiliser"
  const output = "Un autre moyen est d’utiliser"
  expect(_debobardize(input)).toBe(output);
});

test('debobardizes several lines', () => {
  const input = "lorem\n\nipsum"
  const output = "Lorem\n\nIpsum"
  expect(_debobardize(input)).toBe(output);
});