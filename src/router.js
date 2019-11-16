import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path:'/',
      component: () => import(/* webpackChunkName: "StoreIndex" */ './views/store/StoreIndex.vue'),
      children: [
        {
          path: '/', name: 'Store Landing', component: () => import(/* webpackChunkName: "StoreLanding" */ './views/store/StoreLanding.vue')
        }
      ]
    },
    // {
    //   path: '/',
    //   name: 'Login',
    //   component: () => import(/* webpackChunkName: "Login" */ './views/Login.vue')
    // },
    // {
    //   path: '/signup/',
    //   name: 'Signup',
    //   component: () => import(/* webpackChunkName: "Signup" */ './views/Signup.vue')
    // },
    // {
    //   path: '/emailconfirmation/:id',
    //   name: 'Email Confirmation',
    //   component: () => import(/* webpackChunkName: "EmailConfirmation" */ './views/EmailConfirmation.vue')
    // },
    // {
    //   path: '/cancelemailconfirmation/:id',
    //   name: 'Cancel EmailVerification',
    //   component: () => import(/* webpackChunkName: "CancelEmailVerification" */ './views/CancelEmailConfirmation.vue')
    // },
    // {
    //   path: '/passwordreset/',
    //   name: 'Password Reset',
    //   component: () => import(/* webpackChunkName: "CancelEmailVerification" */ './views/PasswordReset.vue')
    // },
    // {
    //   path: '/passwordreset/:id',
    //   name: 'Password Set',
    //   component: () => import(/* webpackChunkName: "CancelEmailVerification" */ './views/PasswordReset.vue')
    // }
  ]
})
