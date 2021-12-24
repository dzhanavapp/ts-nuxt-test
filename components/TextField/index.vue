<template lang="pug">
    div(class="input")
        label(for="base-currency", class="input__label", v-if="label") {{ label }}
        div(class="input__field")
            input(@input="handleInput", v-bind="$attrs" @blur="handleBlurInput" :value="value", id="base-currency", :class="['input__field-text', {'input__field-amount_solo': !hasOptions}]")
            select(@input="handleChange", class="input__field-currency", v-if="hasOptions")
                option(v-for="(option, index) in options", :selected="option === selected", :value="option", :key="option") {{ option }}
</template>

<script>
export default {
  name: 'TextField',
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    label: {
      type: String,
      default: null,
    },
    options: {
      type: Array,
      default: null,
    },
    selected: {
      type: String,
    },
    value: {
      type: String,
      required: true,
    },
    validate: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    hasOptions() {
      return !!this.options?.length
    },
  },
  watch: {
    selected(value) {
      this.$emit('change', value)
    },
  },
  methods: {
    handleChange({ target }) {
      this.$emit('change', target.value)
    },
    handleInput({ target }) {
      let value = target.value

      this.$emit('input', value)
    },
    handleBlurInput() {
      let value = null
      if (this.validate) {
        const formattedFloat = this.value.replace(/\,/g, '.').replace(/\s/, '')
        const isValid = /^\d+(\.\d+)?$/.test(formattedFloat)
        if (!isValid) value = ''
        else value = formattedFloat
        this.$emit('input', value)
      }
    },
  },
}
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

    &-text {
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
