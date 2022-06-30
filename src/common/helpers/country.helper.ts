import * as LookUp from 'country-code-lookup';

export class CountryHelper {
  static getCountry(name: string) {
    return LookUp.byCountry(name);
  }
}
