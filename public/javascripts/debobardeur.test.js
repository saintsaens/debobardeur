const debobardize = require('./debobardeur');

test('debobardizes "Je suis vraiment content" into "Je suis content"', () => {
    const input = "Je suis vraiment content"
    const output = "Je suis content"
    expect(debobardize.debobardize(input)).toBe(output);
  });

  test('debobardizes "" into ""', () => {
    const input = ""
    const output = ""
    expect(debobardize.debobardize(input)).toBe(output);
  });

  test('removes bobard "très"', () => {
    const inputText = "Je suis très content";
    const bobards = ["très"];
    const outputText = "Je suis  content";
    expect(debobardize.removeBobards(inputText, bobards)).toBe(outputText);
  });

  test('replaces bobard "un moyen est d’"', () => {
    const inputText = "un moyen est d’utiliser";
    const remplacement = {"un moyen est d’": "vous pouvez "};
    const outputText = "vous pouvez utiliser";
    expect(debobardize.replaceBobards(inputText, remplacement)).toBe(outputText);
  });

  test('debobardizes "Un moyen est d’utiliser" into "Vous pouvez utiliser"', () => {
    const input = "Un moyen est d’utiliser"
    const output = "Vous pouvez utiliser"
    expect(debobardize.debobardize(input)).toBe(output);
  });