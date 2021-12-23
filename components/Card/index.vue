<template lang="pug">
    div(class="card")
        slot
</template>

<style lang="scss" scoped>
.card {
  background-color: white;
  border-radius: 4px;
  border: 1px solid $color-gray--dark;
  padding: 40px;
  font-weight: 400;
}
</style>
