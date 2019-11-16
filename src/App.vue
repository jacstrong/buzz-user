<template>
  <v-app>
    <snackbar/>
    <router-view/>
    
  </v-app>
</template>

<script>
import snackbar from './components/Snackbar.vue'
import { mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  components: {
    snackbar
  },
  data: () => ({
    menuItems: [
      {title: 'Dashboard', icon: 'dashboard'},
      {title: 'Loads', icon: 'dashboard', subMenuItems: [
        {title: 'View Loads'},
        {title: 'New Load'}
      ]},
      {title: 'Dashboard', icon: 'dashboard'}
    ]
  }),
  methods: {
    ...mapMutations({
      setAuth: 'setAuth'
    }),
    ...mapActions({
      checkCurrentUser: 'checkCurrentUser'
    })
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'isLoggedIn'
    }),
  },
  beforeCreate() {
    if (!this.isLoggedIn) {
      // this.checkCurrentUser;
    }

  }
}
</script>

<style lang="scss">

</style>
