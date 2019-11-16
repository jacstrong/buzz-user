<template>
    <div>
        <div></div>
        <v-row class="d-flex ma-3" justify="start" align="start">
            <v-container fluid ma-0 pa-0 fill-heigh>
                <div class="d-flex flex-column-reverse">
                    <v-row>
                        <v-col>
                            <Queue queue-target="reservation" :loaded="reservationLoaded"></Queue>
                        </v-col>
                        <v-col>
                            <Queue queue-target="walkin" :loaded="walkinLoaded"></Queue>
                        </v-col>
                    </v-row>
                </div>
            </v-container>
        </v-row>
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
        reservationLoaded: false
    }),
    methods: {
        ...mapMutations({
            setSnack: 'setSnack'
        }),
        ...mapActions({
            getWalkin: 'getWalkin',
            getReservation: 'getReservation'
        }),
    },
    computed: {
        ...mapGetters({
            queues: 'queues'
        })
    },
    mounted () {
        this.getWalkin(() => {
            this.walkinLoaded = true
            
        })
        this.getReservation(() => {
            this.reservationLoaded = true
        })
    }
}
</script>
