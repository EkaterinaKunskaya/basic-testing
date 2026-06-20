import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 6, b: 3, action: Action.Add })).toBe(9);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 12, b: 3, action: Action.Subtract })).toBe(9);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 3, b: 3, action: Action.Multiply })).toBe(9);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 18, b: 2, action: Action.Divide })).toBe(9);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 3, b: 2, action: Action.Exponentiate })).toBe(
      9,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 2, b: 2, action: 'invalid action' })).toBe(
      null,
    );
  });
  test('should return null for invalid arguments', () => {
    expect(
      simpleCalculator({
        a: 'invalid argument 1',
        b: 'invalid argument 2',
        action: Action.Add,
      }),
    ).toBe(null);
  });
});
