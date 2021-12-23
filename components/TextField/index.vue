<template lang="pug">
    div(class="input")
        label(for="base-currency", class="input__label", v-if="label") {{ label }}
        div(class="input__field")
            input(v-model="value", id="base-currency", :class="['input__field-amount', {'input__field-amount_solo': !hasOptions}]")
            select(class="input__field-currency", v-if="hasOptions" v-model="selected")
                option(v-for="(option, index) in options", :key="index") {{ option }}
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'TextField',
  props: {
    label: {
      type: String,
      default: null,
    },
    options: {
      type: Array,
      default: null,
    },
  },
  data: () => ({
    value: 0,
    selected: '1',
  }),
  computed: {
    hasOptions(): Boolean {
      return !!this.options?.length
    },
  },
})
</script>

<style lang="scss" scoped>
.input {
  &_solo {
    border-radius: 3px;
  }

  &__label {
    display: block;
    margin-bottom: 0.6em;
  }

  &__field {
    display: flex;
    align-items: center;

    &-amount {
      border: 1px solid $color-primary;
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
      width: 100%;
      height: 42px;
      margin: 0;
      padding: 0;
      padding: 0.6rem 0.8rem;
      font-size: 16px; // Disable webkit zoom in mobile

      &_solo {
        border-radius: 3px;
      }
    }

    &-currency {
      cursor: pointer;
      border: 1px solid $color-primary;
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
      width: 95px;
      height: 42px;
      margin-left: 2px;
      padding: 0.6rem 0.8rem;
      font-size: 16px; // Disable webkit zoom in mobile
    }
  }
}
</style>
