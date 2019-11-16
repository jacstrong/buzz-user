<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on }">
                <v-btn color="primary" dark v-on="on">New Walk-In</v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="headline">New Walk-In</span>
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
                                    :rules="[v => !!v || 'Item is required']" 
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
                                    :rules="[v => !!v || 'Item is required']" 
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
                    </v-container>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="warning" text @click="dialog = false">cancel</v-btn>
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
        phoneNumber: '',
        name: '',
        partyNum: 0
    }),
    methods: {
        save () {
            let data = {
                name: this.name,
                phoneNumber: this.phoneNumber,
                partyNum: this.partyNum,
                state: 'waiting',
                timestamp: new Date()
            }
            this.$http.post('/api/contact', data)
                .then(response => {
                    console.log(response)
                    this.setWalkin(response.data)
                    this.dialog = false
                })
                .catch()
        },
        ...mapMutations({
            addToWalkin: 'addToWalkin',
            setWalkin: 'setWalkin'
        })
    }
}

</script>

<style scoped>

</style>
