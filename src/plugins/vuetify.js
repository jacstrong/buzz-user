import Vue from 'vue'
import Vuetify, { colors } from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  options: {
    customProperties: true
  },
  theme: {
    primary: colors.lightBlue.darken4,
    // error: colors.red.darken1,
    accent: '#424242', // accent should be dark, used as button default
    error: '#C62828',
    info: '#3F51B5',
    warning: '#FFA000',
    success: '#388E3C'
  },
  iconfont: 'md',
})
