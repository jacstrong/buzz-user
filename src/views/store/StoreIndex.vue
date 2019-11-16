<template>
  <div>
    <v-app-bar
      v-scroll="onScroll"
      app
      height="70"
      class="elevation-0"
      :color="offsetTop ? 'rgb(33, 150, 243, .7)' : 'rgb(0,0,0,0)'"
    >
      <a href="">
        <v-img
          contain
          src="https://elated-panini-0f998b.netlify.com/site/badger-logo.png"
          max-width="300px"
          max-height="70px"
        />
      </a>
          <!-- @click="$router.push('/')" -->
      <v-spacer></v-spacer>
      <v-badge overlap color="primary">
        <template v-slot:badge>
          {{ cartSize }}
        </template>
        <v-btn
          icon
          :color="offsetTop ? 'rgb(0, 0, 0)' : 'rgb(200,200,200)'"
          @click="goToCheckout"
        >
          <v-icon large>{{ icons.mdiCartOutline }}</v-icon>
        </v-btn>
      </v-badge>
      <template v-slot:extension v-if="this.$route.name == 'Cart'">
        <v-btn
          color="primary"
          small
          absolute
          bottom
          left
          fab
          @click="backToStore"
        >
          <v-icon>{{ icons.mdiArrowLeft }}</v-icon>
        </v-btn>
      </template>
    </v-app-bar>
    <v-img
      id="header-image"
      height="150px"
      width="100%"
      src="https://elated-panini-0f998b.netlify.com/site/header.jpg"
    >
    </v-img>
    <v-content class="pa-0">
      <router-view/>
    </v-content>
  </div>
</template>


<script>
import { mapGetters } from 'vuex'
import { mdiCartOutline, mdiArrowLeft } from '@mdi/js'
import router from '../../router'

export default {
  data: () => ({
    icons: {
      mdiCartOutline, mdiArrowLeft
    },
    offsetTop: 0
  }),
  methods: {
    backToStore () {
      router.push({name: 'Store', params: { slug: this.$route.params.slug}})
    },
    onScroll () {
      this.offsetTop = window.pageYOffset
    },
    goToCheckout () {
      if (this.$route.name == 'Store Landing' || this.$route.name == 'Cart') return
      router.push({name: 'Cart', params: { slug: this.$route.params.slug }})
    }
  },
  computed: {
    ...mapGetters ([
      'cartSize'
    ])
  },
  
}
</script>
