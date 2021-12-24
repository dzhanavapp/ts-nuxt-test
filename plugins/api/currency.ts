import currencyList from '~/mocks/currencies'
import comissionList from '~/mocks/comissions'

export interface ICurrencyPair {
  base: string
  quote: string
  comission: number
}

export interface IPairRate {
  pair: string
  rate: number
}

const generateCurrencyPairs = () => {
  const reslut = []
  for (const base of currencyList) {
    for (const quote of currencyList) {
      if (base != quote) {
        const pair: ICurrencyPair = {
          base,
          quote,
          comission:
            comissionList[Math.floor(Math.random() * comissionList.length)],
        }
        reslut.push(pair)
      }
    }
  }

  return reslut
}

const generateCurrencyRates = (pairs: ICurrencyPair[]): IPairRate[] => {
  return pairs.map((pair) => {
    return {
      pair: `${pair.base}/${pair.quote}`,
      rate: Math.round(Math.random() * 100),
    }
  })
}

const getСurrencyPairs = (throwError?: boolean): Promise<ICurrencyPair[]> => {
  return new Promise((resolve, reject) => {
    if (throwError) reject(new Error('Error fetch currency pairs'))

    const currencyPairs = generateCurrencyPairs()
    resolve(currencyPairs)
  })
}

const getPairRates = (throwError?: boolean): Promise<IPairRate[]> => {
  return new Promise((resolve, reject) => {
    if (throwError) reject(new Error('Error fetch currency rates'))

    const rates = generateCurrencyRates(generateCurrencyPairs())

    resolve(rates)
  })
}

export interface CurrencyApi {
  getСurrencyPairs: () => Promise<ICurrencyPair[]>
  getPairRates: () => Promise<IPairRate[]>
}

export default {
  getСurrencyPairs,
  getPairRates,
}
