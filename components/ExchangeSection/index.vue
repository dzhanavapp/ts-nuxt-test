<template lang="pug">
  div
      h1(class="title") Обмен криптовалюты
      section(class="exchange")
          Card(class="exchange__card") 
            div(class="exchange__fields")
              h3(class="subtitle") Обменять EUR на BCH
              
              TextField(
                label="Вы платите", 
                placeholder="Сумма платежа"
                :value="calculatedBaseAmount"
                @input="handleInputBaseAmount"
                :selected="baseCurrency",
                :options="baseOptions",
                validate
                @change="handleChangeBaseCurrency"
                class="input__base-amount"
              )

              TextField(
                label="Вы получаете",
                placeholder="Сумма получения"
                :value="calculatedQuoteAmount"
                @input="handleInputQuoteAmount"
                :selected="quoteCurrency",
                :options="quoteOptions"
                validate
                @change="handleChangeQuoteCurrency"
              )

          Card(class="exchange__card") 
            div(class="exchange__info")
              div
                h3(class="subtitle") Краткое описание

                div(class="exchange__row")
                  span Курс
                  b(class="exchange__row-value") {{ 1 }} {{ baseCurrency }} = {{ calculateRatequote }} {{ quoteCurrency }}

                div(class="exchange__row")
                  span Следующее обновление
                  b(class="exchange__row-value") через {{ secondsLeft }} секунд
              Button(block, primary, class="exchange__button") Обменять
</template>

<script lang="ts">
import Vue from 'vue'
import { ICurrencyPair, IPairRate } from '~/plugins/api/currency'

interface IExchangeSectionData {
  pairs: ICurrencyPair[]
  rates: IPairRate[]
  baseCurrency: string
  baseAmount: string
  quoteCurrency: string
  quoteAmount: string
  calculatedBaseAmount: string
  calculatedQuoteAmount: string
  secondsLeft: number
  secondsIntervalId: NodeJS.Timeout | null
}

const DEFAULT_UPDATE_TIMEOUT = 30

export default Vue.extend({
  name: 'ExchangeSection',
  data: (): IExchangeSectionData => ({
    pairs: [],
    rates: [],
    baseCurrency: '',
    baseAmount: '',
    quoteCurrency: '',
    quoteAmount: '',
    calculatedBaseAmount: '',
    calculatedQuoteAmount: '',
    secondsLeft: DEFAULT_UPDATE_TIMEOUT,
    secondsIntervalId: null,
  }),
  async fetch() {
    try {
      this.pairs = await this.$api.getСurrencyPairs()
      this.rates = await this.$api.getPairRates()

      if (this.pairs.length) {
        const [pair] = this.pairs
        this.baseCurrency = pair.base
        this.quoteCurrency = pair.quote
      }
    } catch (e) {
      console.log(e)
    }
  },
  watch: {
    quoteOptions() {
      if (this.baseCurrency === this.quoteCurrency) {
        this.quoteCurrency = this.quoteOptions[0]
      }
    },
    baseAmount(val) {
      this.updateQuoteAmount(val)
    },
    quoteAmount(val) {
      this.updateBaseAmount(val)
    },
    calculateRatequote() {
      this.handleUpdateRates()
    },
  },
  computed: {
    baseOptions() {
      return [...new Set(this.pairs.map((pair) => pair.base))]
    },
    quoteOptions() {
      return this.pairs
        .filter((pair) => pair.base === this.baseCurrency)
        .map((pair) => pair.quote)
    },
    currentRate() {
      const rate = this.rates.find((rate) => {
        return rate.pair === `${this.baseCurrency}/${this.quoteCurrency}`
      })

      const emptyRate = { rate: 0 }

      return rate || emptyRate
    },
    currentPair() {
      const pair = this.pairs.find((pair) => {
        return (
          pair.base === this.baseCurrency && pair.quote === this.quoteCurrency
        )
      })

      const emptyPair = {
        comission: 0,
      }

      return pair || emptyPair
    },
    calculateRatequote(): number {
      return this.currentRate.rate
    },
  },
  methods: {
    handleUpdateRates() {
      this.updateQuoteAmount(this.calculatedBaseAmount)
    },
    updateBaseAmount(amount: string) {
      const sum = +amount / this.calculateRatequote
      const result = sum + this.getComission(sum)
      this.calculatedBaseAmount = !Number.isNaN(result) ? String(result) : ''
    },
    updateQuoteAmount(amount: string) {
      const sum = +amount * this.calculateRatequote
      const result = sum - this.getComission(sum)
      this.calculatedQuoteAmount = !Number.isNaN(result) ? String(result) : ''
    },
    handleChangeBaseCurrency(newCurrency: string) {
      this.baseCurrency = newCurrency
    },
    handleChangeQuoteCurrency(newCurrency: string) {
      this.quoteCurrency = newCurrency
    },
    handleInputBaseAmount(value: string) {
      this.baseAmount = this.calculatedBaseAmount = value
    },
    handleInputQuoteAmount(value: string) {
      this.quoteAmount = this.calculatedQuoteAmount = value
    },
    getComission(sum: number) {
      return sum * (this.currentPair.comission / 100)
    },
    async startSeconds() {
      if (this.secondsLeft) {
        this.secondsLeft -= 1
      } else {
        this.rates = await this.$api.getPairRates()
        this.secondsLeft = DEFAULT_UPDATE_TIMEOUT
      }
    },
  },
  mounted() {
    this.secondsIntervalId = setInterval(this.startSeconds, 1000)
  },
  destroyed() {
    if (this.secondsIntervalId) {
      clearInterval(this.secondsIntervalId)
    }
  },
})
</script>

<style lang="scss" scoped>
.title {
  font-size: 1.6em;
  font-weight: 600;

  @include lg() {
    font-size: 2em;
  }
}

.subtitle {
  font-size: 1.2em;
  margin: 0;
  border-bottom: 1px solid #e1e4e8;
  padding-bottom: 20px;
  margin-bottom: 20px;
  font-weight: 500;

  @include lg() {
    font-size: 1.8em;
  }
}

.exchange {
  display: flex;
  flex-direction: column;
  gap: 18px;

  @include lg() {
    flex-direction: row;
    gap: 6px;
  }

  &__card {
    flex: 1;
  }

  &__row {
    padding: 4px;
    display: flex;
    justify-content: space-between;

    &-value {
      text-align: right;
      margin-left: 0.2em;
    }
  }

  &__info {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__button {
    margin-top: 2em;
  }
}

.input {
  &__base-amount {
    margin-bottom: 1.2em;
  }
}
</style>
