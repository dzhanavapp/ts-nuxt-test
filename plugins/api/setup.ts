import currency, { CurrencyApi } from './currency'

export interface IApi extends CurrencyApi {}

export const ApiInstance = { ...currency }
