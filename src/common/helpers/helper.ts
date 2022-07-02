import * as referenceGenerator from 'random-string-generator';

export class Helper {
  static generateReference(prefix: string): string {
    return prefix + referenceGenerator(40, 'uppernumeric');
  }

  static calculateCreditBalanceAfter(balance: number, amount: number) {
    return {
      balance_before: balance,
      balance_after: balance + amount,
    };
  }

  static calculateDebitBalanceAfter(balance: number, amount: number) {
    return {
      balance_before: balance,
      balance_after: balance - amount,
    };
  }
}
