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
      <v-card-actions>
        <WalkIn block v-if="queueTarget === 'walkin'"></WalkIn>
        <Reservation block v-if="queueTarget === 'reservation'"></Reservation>
      </v-card-actions>
      <v-layout column>
        <v-flex
          v-for="(res, i) in item.queue"
          :key="res.phoneNumber"
          :class="res.state === 'Waiting' ? 'person' : 'person red lighten-2'"
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
                #: {{ res.partyNum }}
              </div>
            </v-col>
            <v-col cols="3" class="justify-right">
              <v-menu offset-y>
                <template v-slot:activator="{ on }">
                  <v-btn text small slot="activator" v-on="on">
                    <v-icon>more_vert</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item>
                    <v-list-item-title @click="notify(i)">Notify</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title @click="remove(i)">Delete</v-list-item-title>
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
import WalkIn from '../components/WalkIn.vue'
import Reservation from '../components/Reservation.vue'

export default {
  props: [
    'queueTarget',
    'loaded'
  ],
  components: {
    WalkIn,
    Reservation
  },
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
    },
    notify (index) {
      if (this.queueTarget === 'walkin') {

        this.changeWalkinStateToNotified(index)
        let walkinData = {
          queue: this.walkin
        }
        console.log('before', walkinData.queue)
        this.$http.post('/api/queue/walkin', walkinData)
          .then(response => {
            // this.setWalkin(response.data)
          })
          .catch(err => {
            if (err.response) {
              console.log("queue 126", err.response)
            }
          })

        this.$http.post('/api/notify/ready', {contactID: this.walkinQueueID(index)})
          .then(response => {
            this.setSnack('Message sent')
          })
          .catch(err => {
            if (err.response) {
              this.setSnack('Something went wrong 1')
              console.log('queue 137', err.response)
            }
          })
        }
    },
    remove (index) {
      if (this.queueTarget === 'walkin') {
        this.removeWalkin(index)
        let walkinData = {
          queue: this.walkin
        }
        this.$http.post('/api/queue/walkind', walkinData)
          .then(response => {})
          .catch(err => {
            if (err.response) {
              console.log('Queue 151', err)
            }
          })
        
        }
    },
    ...mapMutations({
        addToWalkin: 'addToWalkin',
        setWalkin: 'setWalkin',
        setSnack: 'setSnack',
        changeWalkinStateToNotified: 'changeWalkinStateToNotified',
        removeWalkin: 'removeWalkin'
    })
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
      walkin: 'walkin',
      walkinQueueID: 'walkinQueueID'
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
