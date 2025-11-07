const { sum } = require('../index');

test('soma dois números corretamente', () => {
  expect(sum(1, 2)).toBe(3);
  expect(sum(-1, 1)).toBe(0);
});
