import * as referenceGenerator from 'random-string-generator';

export class Helper {
  static generateReference(prefix: string): string {
    return prefix + referenceGenerator(40, 'uppernumeric');
  }
}
