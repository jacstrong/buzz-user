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
    isLoggedIn: false,
    authChecked: false,
    reservation: {},
    walkin: {}
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
    setSnack (state, snack) {
      state.snack = snack;
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
    setReservation (state, queues) {
      state.reservation = queues
    },
    setWalkin (state, queues) {
      state.walkin = queues
    },
    addToWalkin (state, contact) {
      contact.timeStamp = new Date()
      state.walkin.queue.push(contact)
    },
    addToReservation (state, contact) {
      state.reservation.queue.push(contact)
    },
    changeWalkinStateToNotified(state, index) {
      state.walkin.queue[index].state = "Notified"
      state.walkin.queue[index].timeStamp = new Date()
    },
    removeWalkin (state, index) {
      state.walkin.queue.splice(index, 1)
    }
  },
  getters: {
    isLoggedIn: (state) => {
      return state.isLoggedIn;
    },
    queues: (state) => {
      return state.queues
    },
    reservation: (state) => {
      return state.reservation
    },
    walkin: (state) => {
      return state.walkin
    },
    walkinQueueID: (state) => (index) => {
      console.log(index)
      return state.walkin.queue[index].contactID
    },
    reservationQueueID: (state) => (index) => {
      console.log(index)
      return state.reservation.queue[index].contactID
    }
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
    },
    getReservation: (context, callback) => {
      Vue.prototype.$http.get('/api/queue/reservation')
        .then(response => {
          context.commit('setReservation', response.data)
          if (callback) callback()
        })
        .catch(err => {
          if (err.response) {
            console.log(err.response)
          }
          // context.mutations.setSnack('Unable to get queues')
          context.snack = 'Could not get data'
        }) 
    },
    getWalkin: (context, callback) => {
      Vue.prototype.$http.get('/api/queue/walkin')
        .then(response => {
          context.commit('setWalkin', response.data)
          if (callback) callback()
        })
        .catch(err => {
          if (err.response) {
            console.log(err.response)
          }
          // context.mutations.setSnack('Unable to get queues')
          context.snack = 'Could not get data'
        }) 
    }

  },
  
})
