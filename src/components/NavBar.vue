<template>
  <div id="NavBar">
    <v-toolbar color="primary">
      <v-toolbar-title>Dispatch</v-toolbar-title>
      <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn icon><v-icon>notifications</v-icon></v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-navigation-drawer
      permanent
      dark>
      <v-list>
        <div
          v-for="item in menuItems"
          :key="item.title"
          >
          <div
            v-if="item.subMenuItems === undefined"
            >

          <v-list-tile>
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          </div>
          <div
            v-else
            >
          <v-list-group
            prepend-icon="item.icon"
            no-action
          >
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile>
            </template>
            <v-list-tile
              v-for="subMenuItem in item.subMenuItems"
              :key="subMenuItem.title"
              >
              <v-list-tile-action>
                <v-icon v-text="subMenuItem.title"></v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>
          </div>
        </div>
      </v-list>
    </v-navigation-drawer>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
