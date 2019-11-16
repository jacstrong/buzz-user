import Vue from 'vue'
import Vuetify, { colors } from 'vuetify/lib'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import cookie from 'js-cookie'
import './plugins/filters'

Vue.config.productionTip = false
Vue.config.debug = true

Vue.prototype.$imageURL = '/'

if (process.env.NODE_ENV === 'production') {
  Vue.prototype.$imageURL = 'https://api.badgerprints.com/'
}
if (process.env.VUE_APP_STAGE === 'true') {
  Vue.prototype.$imageURL = 'https://api.justtaller.com/'
}
if (process.env.NODE_ENV === 'development') {
  Vue.prototype.$imageURL = 'http://localhost:3030/'
}

axios.interceptors.request.use(
  function (config) {
    const token = cookie.get('token');
    config.headers = {
      'X-Requested-With': 'XMLHttpRequest',
      withCredentials: true,
      'Access-Control-Allow-Credentials': true,
      'Authorization': token
    };
    if (process.env.NODE_ENV === 'production') {
      config.baseURL = 'https://api.badgerprints.com/'
    }
    if (process.env.VUE_APP_STAGE === 'true') {
      config.baseURL = 'https://api.justtaller.com/'
    }
    if (process.env.NODE_ENV === 'development') {
      config.baseURL = 'http://localhost:3030/'
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
)

axios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error.response.data.code && error.response.data.error.code === "invalid_credentials") {
      store.commit('setSnack', 'Login timed out')
      router.push({ name: 'Login' })
    }
    return Promise.reject(error)
  }
)

Vue.prototype.$http = axios;

const opts = {
  // options: {
  //   customProperties: true
  // },
  theme: {
    themes: {
      light: {
        primary: colors.blue.base,
        secondary: colors.blue.darken4,
        accent: colors.cyan.darken4, // accent should be dark, used as button default
        error: '#C62828',
        info: '#3F51B5',
        warning: colors.red.darken4,
        success: colors.blue.darken2
      },
      dark: {
        primary: colors.blue.base,
        accent: colors.blue.darken4, // accent should be dark, used as button default
        error: '#C62828',
        info: '#3F51B5',
        warning: '#FFA000',
        success: colors.blue.darken2
      }
    }
  },
  icons: {
    iconfont: 'mdiSvg', // default - only for display purposes
  },
}

router.beforeEach((to, from, next) => {
  document.title = to.name
  next()
})

Vue.use(Vuetify)

// Vue.filter('formatDate', function (value) { // TODO: Make this it's own file
//   return dateFNS.format(value, 'MM/DD/YYYY')
// })

new Vue({
  vuetify: new Vuetify(opts),
  router,
  store,
  render: h => h(App)
}).$mount('#app')
