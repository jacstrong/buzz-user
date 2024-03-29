<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on }">
                <v-btn color="primary" dark v-on="on">New Reservation</v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="headline">New Reservation</span>
                </v-card-title>
                <v-card-text>
                    <v-form
                        ref="form"
                        v-model="valid"
                        lazy-validation
                    >
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="12">
                                <v-text-field 
                                    v-model="name" 
                                    label="Name *" 
                                    outlined 
                                    :rules="nameRules" 
                                    required
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="14" sm="8">
                                <v-text-field 
                                    v-model="phoneNumber" 
                                    v-mask="mask" 
                                    label="Phone *"  
                                    outlined 
                                    :rules="phoneRules" 
                                    required 
                                ></v-text-field>
                            </v-col>
                            <v-col cols="10" sm="4">
                                <v-text-field
                                    v-model="partyNum"
                                    label="Party Size *"
                                    type="number"
                                    outlined
                                    :rules="[v => !!v || 'Item is required']"
                                    required
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="6">
                                <v-dialog
                                        ref="dialog1"
                                        v-model="modal1"
                                        :return-value.sync="date"
                                        persistent
                                        width="290px"
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-text-field
                                                v-model="date"
                                                label="Reservation Date"
                                                prepend-icon="event"
                                                readonly
                                                outlined
                                                :rules="[v => !!v || 'Item is required']"
                                                required
                                                v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker v-model="date" scrollable>
                                        <v-spacer></v-spacer>
                                        <v-btn text color="primary" @click="modal1 = false">Cancel</v-btn>
                                        <v-btn text color="primary" @click="$refs.dialog1.save(date)">OK</v-btn>
                                    </v-date-picker>
                                </v-dialog>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-dialog
                                        ref="dialog2"
                                        v-model="modal2"
                                        :return-value.sync="time"
                                        persistent
                                        width="290px"
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-text-field
                                                v-model="time"
                                                label="Reservation Time"
                                                prepend-icon="access_time"
                                                readonly
                                                outlined
                                                :rules="[v => !!v || 'Item is required']"
                                                required
                                                v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-time-picker
                                            v-if="modal2"
                                            v-model="time"
                                            full-width
                                    >
                                        <v-spacer></v-spacer>
                                        <v-btn text color="primary" @click="modal2 = false">Cancel</v-btn>
                                        <v-btn text color="primary"  @click="$refs.dialog2.save(time)">OK</v-btn>
                                    </v-time-picker>
                                </v-dialog>
                            </v-col>
                        </v-row>
                    </v-container>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="warning" text @click="dialog = false">Cancel</v-btn>
                    <v-btn color="blue darken-1" text :disabled="!valid" @click="save">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
import { mask } from 'vue-the-mask'
import { mapMutations, mapGetters, mapActions } from 'vuex'

export default {
    directives: {
        mask
    },
    data: () => ({
        valid: true,
        dialog: false,
        mask: '+1(###)###-####',
        nameRules: [
            v => !!v || 'Name is required'
        ],
        phoneRules: [
            v => !!v || 'Valid Phone number is required'
        ],
        time: null,
        date: null,
        modal1: false,
        modal2: false,
        lazy: false,
        name: '',
        phoneNumber: '',
        partyNum: 0
    }),
    methods: {
        clear () {
            this.valid = true
            this.time = null
            this.date = null
            this.modal1 = false
            this.modal2 = false
            this.lazy = false
            this.name = ''
            this.phoneNumber = ''
            this.partyNum = 0
        },
        save () {
            let data = {
                name: this.name,
                phoneNumber: this.phoneNumber,
                partyNum: this.partyNum,
                date: this.date,
                time: this.time,
                state: 'waiting'
            }

            this.$http.post('/api/reservations', data)
                .then(response => {
                    console.log(response)
                    
                    // this.setReservation(response.data)
                    this.dialog = false
                    this.setSnack('Saved reservation')
                    this.clear()
                })
                .catch((err) => {
                    this.setSnack('Error')
                    this.dialog = false
                    this.clear()
                })
        },
        ...mapMutations({
            addToReservation: 'addToReservation',
            setReservation: 'setReservation',
            setSnack: 'setSnack'
        })
    }
}

</script>

<style scoped>

</style>
