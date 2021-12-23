<template lang="pug">
    div(class="container")
        Nuxt
</template>

<script>
export default {
  name: 'LayoutDefault',
}
</script>

<style lang="scss" scoped>
.container {
  margin: 8px;

  @include lg() {
    margin: 26px auto;
    max-width: 900px;
  }
}
</style>
