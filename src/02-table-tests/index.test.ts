import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },

  { a: 4, b: 3, action: Action.Subtract, expected: 1 },
  { a: 5, b: 5, action: Action.Subtract, expected: 0 },
  { a: 6, b: 3, action: Action.Subtract, expected: 3 },

  { a: 4, b: 3, action: Action.Multiply, expected: 12 },
  { a: 5, b: 5, action: Action.Multiply, expected: 25 },
  { a: 6, b: 3, action: Action.Multiply, expected: 18 },

  { a: 4, b: 3, action: Action.Divide, expected: 1.3333333333333333 },
  { a: 5, b: 5, action: Action.Divide, expected: 1 },
  { a: 6, b: 3, action: Action.Divide, expected: 2 },

  { a: 4, b: 3, action: Action.Exponentiate, expected: 64 },
  { a: 5, b: 5, action: Action.Exponentiate, expected: 3125 },
  { a: 6, b: 3, action: Action.Exponentiate, expected: 216 },

  { a: 4, b: 3, action: 'invalid action', expected: null },

  {
    a: 'invalid argument 1',
    b: ['invalid argument 2'],
    action: Action.Add,
    expected: null,
  },
  {
    a: 'invalid argument 3',
    b: { 'invalid argument 4': true },
    action: Action.Subtract,
    expected: null,
  },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'Should test all the elements of the testCases array using Jest for tests in tables',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
