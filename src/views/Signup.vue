<template>
<div class="home">
  <v-content>
    <v-container fluid fill-height>
      <v-layout fill-height align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="light-blue darken-4">
              <v-toolbar-title>Signup Form</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn  @click="nav('/login')" color="light-blue darken-3">Login</v-btn>
              </v-toolbar-items>
            </v-toolbar>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation>
              <v-card-text>
                  <v-text-field v-model="name" :rules="nameRules" prepend-icon="person" label="Name" type="text"></v-text-field>
                  <!-- <v-text-field v-model="lastName" :rules="lastRules" prepend-icon="person" label="Last Name" type="text"></v-text-field> -->
                  <v-text-field v-model="email" :rules="emailRules" prepend-icon="email" label="Email" type="text"></v-text-field>
                  <v-text-field v-model="password" :rules="passwordRules" id="password" prepend-icon="lock" label="Password" type="password"></v-text-field>
                  <div class="mb-2 ml-2" align="left">
                    <p class="body-2 mb-1">Password must contain:</p>
                    <ul>
                      <li class="caption"  v-if="containsUpper">Upper case letters <v-icon color="#388E3C" small>check_circle</v-icon></li>
                      <li class="caption" v-else>Upper case letters <v-icon color="#B71C1C" small>highlight_off</v-icon></li>
                      <li class="caption" v-if="containsLower">Lower case letters <v-icon color="#388E3C" small>check_circle</v-icon></li>
                      <li class="caption" v-else>Lower case letters <v-icon color="#B71C1C" small>highlight_off</v-icon></li>
                      <li class="caption" v-if="containsNumber">Number <v-icon color="#388E3C" small>check_circle</v-icon></li>
                      <li class="caption" v-else>Number <v-icon color="#B71C1C" small>highlight_off</v-icon></li>
                      <li class="caption" v-if="containsSymbol">Symbol <v-icon color="#388E3C" small>check_circle</v-icon></li>
                      <li class="caption" v-else>Symbol <v-icon color="#B71C1C" small>highlight_off</v-icon></li>
                      <li class="caption" v-if="isLongEnough">At least 10 characters <v-icon color="#388E3C" small>check_circle</v-icon></li>
                      <li class="caption" v-else>At least 10 characters <v-icon color="#B71C1C" small>highlight_off</v-icon></li>
                    </ul>
                  </div>
                  <v-text-field v-model="passwordConf" :rules="passwordConfRules" id="password" prepend-icon="lock" label="Confirm Password" type="password"></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :disabled="!formComplete" @click="submit()" :loading="loading">Create Account</v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</div>
</template>

<script>
import router from '../router.js';
import { mapMutations } from 'vuex';
// import axios from 'axios';

export default {
  name: 'Signup',
  components: {
    // router
  },
  data: () => ({
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
    name: '',
    nameRules: [
      v => !!v || 'First name is required',
      v => (v && v.length <= 20) || 'Last name must be less than 20 characters'
    ],
    loading: false,
    password: '',
    passwordConf: '',
    passwordConfRules: [
      v => !!v || 'Password verification is required' 
    ],
    passwordRules: [
      v => !!v || 'Password is required'
    ],
    valid: false
  }),
  methods: {
    nav (url) {
      router.push(url);
    },
    submit () {
      let data = {
        name: this.name,
        email: this.email,
        password: this.password
      }
      this.loading = true;
      this.$http.post('/api/user', data)
        .then(response => {
          if (response.data.success === true) {
            this.loading = false;
            this.setSnack('Account successfully created');
            this.setUserInfo(response.data.user)
            this.nav('app/');
          } else {
            console.log('not success')
          }
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          console.log(err)
        })
    },
    ...mapMutations([
      'setSnack' // maps to this.setSnack(snack)
    ])
  },
  computed: {
    containsLower: function () {
      return /[a-z]/.test(this.password);
    },
    containsNumber: function () {
      return /[0-9]/.test(this.password);
    },
    containsSymbol: function () {
      return /[^a-zA-Z0-9]/.test(this.password);
    },
    containsUpper: function () {
      return /[A-Z]/.test(this.password);
    },
    formComplete: function () {
      return this.valid && this.containsLower && this.containsNumber && this.containsSymbol && this.containsUpper && this.passwordsMatch;
    },
    isLongEnough: function () {
      return this.password.length > 10;
    },
    passwordsMatch: function () {
      return this.password === this.passwordConf;
    }
  }
}
</script>

<style lang="scss">
#home {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#content {
  padding-top: 48px;
  padding-left: 300px;
}
#nav {
  padding: 40px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.success {
  color: #388E3C;
}
.failure {
  color: #B71C1C;
}
</style>
