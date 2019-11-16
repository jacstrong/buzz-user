import Vue from 'vue'
import Vuex from 'vuex'
import cookie from 'js-cookie'
import localStorage from './plugins/localStorage'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [localStorage],
  state: {
    snack: '',
    auth: {
      firstName: '',
      email: '',
      token: '',
      id: ''
    },
    cart: [],
    isLoggedIn: false,
    authChecked: false,
    storeID: '',
    storeName: '',
    storeDescription: '',
    storeCustomerName: ''
  },
  mutations: {
    setAuth (state, auth) {
      state.auth.firstName = auth.firstName;
      state.auth.email = auth.email;
      state.auth.token = `Token ${auth.token}`;
      state.auth.id = auth._id;
      cookie.set('token', `Token ${auth.token}`)
      cookie.set('email', auth.email)
      cookie.set('id', auth._id)
      cookie.set('firstName', auth.firstName)
      state.isLoggedIn = true;
    },
    setCart (state, cart) {
      state.cart = cart
    },
    setSnack (state, snack) {
      state.snack = snack;
    },
    setStoreData (state, storeID, storeName, storeDescription, storeCustomerName) {
      state.storeID = storeID
      state.storeName = storeName
      state.storeDescription = storeDescription
      state.storeCustomerName = storeCustomerName
    },
    clearAuth (state) {
      state.auth = {
        firstName: '',
        email: '',
        token: '',
        id: ''
      }
      state.isLoggedIn = false
      cookie.remove('token')
      cookie.remove('email')
      cookie.remove('id')
      cookie.remove('firstName')
    },
    getAuthFromCookie (state) {
      state.auth.firstName = cookie.get('firstName');
      state.auth.email = cookie.get('email');
      state.auth.token = cookie.get('token');
      state.auth.id = cookie.get('id');
      state.isLoggedIn = true;
    },
  },
  getters: {
    isLoggedIn: (state) => {
      return state.isLoggedIn;
    },
  },
  actions: {
    checkCurrentUser: (context, callback) => {
      Vue.prototype.$http.get(`/api/user/`)
        .then(response => {
          if (response.data.success === true) context.commit('getAuthFromCookie');
          if (callback) callback();
        })
        .catch(err => {
          console.log(err)
        });
    }

  }
})
