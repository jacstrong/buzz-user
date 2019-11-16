<template>
    <div>
        <div></div>
        <v-row class="d-flex ma-3" justify="start" align="start">
            <div class="pa-2" width="300px">
                <Queue queue-target="reservation" :loaded="reservationLoaded"></Queue>
            </div>
            <div class="pa-2" width="300px">
                <Queue queue-target="walkin" :loaded="walkinLoaded"></Queue>
            </div>
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
