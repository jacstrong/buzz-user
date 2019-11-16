<template>
<div>
  <div v-if="!loaded">
    <v-card width="300px" loading>
      text
    </v-card>
  </div>
  <div v-else>
    <v-card width="300px">
      <v-card-title primary-title>
        {{item.name}}
      </v-card-title>
      <v-layout column>
        <v-flex
          v-for="res in item.queue"
          :key="res.phoneNumber"
          class="person"
          width="100%"
          ma-1
          pa-1
        >
          <v-row row wrap>
            <v-col cols="6">
              <span class="text--subtitle truncate">{{ res.name }}</span>
            </v-col>
            <v-col cols="3">
              <div class="text--primary">
                #: {{ res.partySize }}
              </div>
            </v-col>
            <v-col cols="3" class="justify-right">
              <v-menu offset-y>
                <template v-slot:activator="{ on }">
                  <v-btn rounded small slot="activator" v-on="on">
                    <v-icon>home</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item>
                    <v-list-item-title>Notify</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>Delete</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>

            </v-col>
          </v-row>

          <!-- <v-row>
            <v-col>
              <div class="text--primary">
                Status: {{ res.status }}
              </div>
            </v-col>
          </v-row> -->
          <!-- <v-card-text>
            <v-chip-group
              active-class="deep-purple accent-4 white--text"
            >
              <v-chip :color="getColor(res.tableStatus)"> Table is {{ res.tableStatus }}</v-chip>
              <v-chip v-on:click="notifyCustomer(res.name)"> Alert </v-chip>
            </v-chip-group>
          </v-card-text> -->
        </v-flex>
      </v-layout>
    </v-card>
  </div>
</div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  props: [
    'queueTarget',
    'loaded'
  ],
  data: () => ({
      
  }),
  methods: {
    notifyCustomer: (name) => {
      console.log("Texting customer " + name);
    },
    getColor: (tableStatus) => {
      if (tableStatus == "Ready")
      {
        return "green";
      }
      else if (tableStatus == "Being Prepared")
      {
        return "yellow";
      }
      else if (tableStatus  == "Occupied")
      {
        return "red";
      }
    }
  },
  computed: {
    item () {
      if (this.queueTarget === 'reservation') {
        return this.reservation
      } else if (this.queueTarget === 'walkin') {
        return this.walkin
      } else {
        console.error('invalid component prop')
      }

    },
    ...mapGetters({
      reservation: 'reservation',
      walkin: 'walkin'
    })
  }
}
</script>

<style lang="scss" scoped>
.person {
  border-width: 1px;
  border-radius: 3px;
  border-color: black;
  border-style: solid;
}
</style>
