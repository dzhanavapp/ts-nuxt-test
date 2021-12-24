import { Plugin } from '@nuxt/types'
import { IApi, ApiInstance } from './setup'

declare module 'vue/types/vue' {
  interface Vue {
    $api: IApi
  }
}

declare module '@nuxt/types' {
  // nuxtContext.app.$api inside asyncData, fetch, plugins, middleware, nuxtServerInit
  interface NuxtAppOptions {
    $api: IApi
  }
  // nuxtContext.$api
  interface Context {
    $api: IApi
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $api: IApi
  }
}

const apiPlugin: Plugin = (context, inject) => {
  const api: IApi = ApiInstance

  context.$api = api
  inject('api', api)
}

export default apiPlugin
