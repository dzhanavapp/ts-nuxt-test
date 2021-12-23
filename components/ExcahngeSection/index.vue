<template lang="pug">
  div
      h1(class="title") Обмен криптовалюты
      section(class="exchange")
          Card(class="exchange__card") 
            div(class="exchange__fields")
              h3(class="subtitle") Обменять EUR на BCH
              
              TextField(label="Вы платите", :options="['BTC', 'SOL']", class="input__base-amount")
              TextField(label="Вы получаете", :options="['ETH', 'BTC']")

          Card(class="exchange__card") 
            div(class="exchange__info")
              div
                h3(class="subtitle") Краткое описание

                div(class="exchange__row")
                  span Курс
                  b(class="exchange__row-value") 1 EUR = 0.00002194 BTC

                div(class="exchange__row")
                  span Следующее обновление
                  b(class="exchange__row-value") через 26 секунд

              Button(block, primary, class="exchange__button") Обменять
</template>

<script>
export default {
  name: 'ExcahngeSection',
}
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
