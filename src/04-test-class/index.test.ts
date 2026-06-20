import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

const firstAccauntBalance = 10000;
const secondAccauntBalance = 5000;
const firstAccaunt = getBankAccount(firstAccauntBalance);
const secondAccaunt = getBankAccount(secondAccauntBalance);

const startFirstBalance = firstAccaunt.getBalance();

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(firstAccaunt.getBalance()).toBe(firstAccauntBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => firstAccaunt.withdraw(firstAccauntBalance * 2)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() =>
      firstAccaunt.transfer(firstAccauntBalance * 2, secondAccaunt),
    ).toThrow(new InsufficientFundsError(firstAccauntBalance).message);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() =>
      firstAccaunt.transfer(firstAccauntBalance, firstAccaunt),
    ).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    expect(firstAccaunt.deposit(100).getBalance()).toBe(
      startFirstBalance + 100,
    );
  });

  test('should withdraw money', () => {
    const startFirstBalance = firstAccaunt.getBalance();
    expect(firstAccaunt.withdraw(100).getBalance()).toBe(
      startFirstBalance - 100,
    );
  });

  test('should transfer money', () => {
    const startSecondBalance = secondAccaunt.getBalance();
    firstAccaunt.transfer(100, secondAccaunt);
    expect(firstAccaunt.getBalance()).toBe(startFirstBalance - 100);
    expect(secondAccaunt.getBalance()).toBe(startSecondBalance + 100);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest
      .spyOn(firstAccaunt, 'fetchBalance')
      .mockResolvedValue(firstAccauntBalance);
    expect(await firstAccaunt.fetchBalance()).toEqual(expect.any(Number));
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest.spyOn(firstAccaunt, 'fetchBalance').mockResolvedValue(100);
    await firstAccaunt.synchronizeBalance();
    expect(firstAccaunt.getBalance()).toBe(100);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(firstAccaunt, 'fetchBalance').mockResolvedValue(null);
    await expect(firstAccaunt.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
