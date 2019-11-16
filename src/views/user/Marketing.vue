<template>
  <div class="ma-3">
    <span class="display-3">Marketing</span>
    <hr>
    <v-layout class="pt-2" column>
      <v-flex py-2>
        <v-card>
          <v-card-text>
            <p>Total Contacts: {{totalContacts}}</p>
            <p>Engaged Contacts: {{engaged}}</p>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex>
        <v-card>
          <v-card-title primary-title>
            Campaigns
          </v-card-title>
          <v-card-text>
            <v-textarea
              outlined
              v-model="message"
              label="Message"
              counter="140"
              textarea
            ></v-textarea>
            <v-combobox
              label="To"
              v-model="to"
              :items="contacts"
              dense
              outlined
              item-text="name"
            ></v-combobox>
            <v-card-actions>  
              <v-btn color="primary" @click="allConf = true">Send to all</v-btn>
              <v-btn color="primary" @click="targetConf = true">Send targeted</v-btn>
            </v-card-actions>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-dialog
      v-model="allConf"
      scrollable
      persistent :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title primary-title>
          Confirmation
        </v-card-title>
        <v-card-text class="body-1">
          <p>You are about to send a message to {{engaged}} people.</p>
          <p>Message:</p>
          <v-textarea
            outlined
            readonly
            :value="message"
          ></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-btn color="success" @click="sendCampaign()">send</v-btn>
          <v-btn color="success" @click="allConf = false">cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="targetConf"
      scrollable
      persistent :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title primary-title>
          Confirmation
        </v-card-title>
        <v-card-text class="body-1">
          <p>Douple check your message</p>
          <p>Message:</p>
          <v-textarea
            outlined
            readonly
            :value="message"
          ></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-btn color="success" @click="sendTargeted()">send</v-btn>
          <v-btn color="success" @click="targetConf = false">cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Queue from '../../components/Queue'
import { mapMutations, mapGetters, mapActions } from 'vuex'

export default {
    components: {
      Queue
    },
    data: () => ({
      walkinLoaded: false,
      reservationLoaded: false,
      message: '',
      totalContacts: 0,
      engaged: 0,
      allConf: false,
      targetConf: false,
      to: '',
      contacts: []
    }),
    methods: {
      sendCampaign () {
        let data = {
          message: this.message
        }
        this.$http.post('/api/marketing/campaign', data)
          .then(response => {
            this.setSnack('Messages are sending')
          })
          .catch(err => {
            console.error(err)
            this.setSnack('An error occured, try again')
          })
          .finally(() => {
            this.allConf = false
          })
      },
      sendTargeted () {
        let data = {
          message: this.message,
          to: this.to
        }
        this.$http.post('/api/marketing/targeted', data)
          .then(response => {
            this.setSnack('Message is sending')
          })
          .catch(err => {
            console.error(err)
            this.setSnack('An error occured, try again')
          })
          .finally(() => {
            this.targetConf = false
          })
      },
      getTotals () {
        this.$http.get('/api/marketing/stats')
          .then(response => {
            this.totalContacts = response.data.totalContacts
            this.engaged = response.data.engaged
          })
          .catch(err => {
            console.log(err.response)
          })
      },
      getContacts () {
        this.$http.get('/api/contact')
          .then(response => {
            this.contacts = response.data
          })
      },
      ...mapMutations({
          setSnack: 'setSnack'
      }),
      ...mapActions({}),
    },
    computed: {
        ...mapGetters({})
    },
    mounted () {
      this.getTotals()
      this.getContacts()
    }
}
</script>
