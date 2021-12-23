<template lang="pug">
    button(:class="['button', { 'button_primary': primary, 'button_block': block }]")
        slot
</template>

<script lang="ts">
export default {
  name: 'Button',
  props: {
    block: {
      type: Boolean,
      default: false,
    },
    primary: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.button {
  border: none;
  margin: 0;
  padding: 0;
  border-radius: 3px;
  border: 1px solid $color-primary;
  background: none;
  padding: 0.8rem;
  cursor: pointer;

  &_block {
    display: block;
    width: 100%;
  }

  &_primary {
    background-color: $color-primary;
    color: white;
  }
}
</style>
