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
  });