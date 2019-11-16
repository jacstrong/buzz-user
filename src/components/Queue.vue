<template>
<v-card>
  <v-card 
    v-for="res in reservations" 
    class="mx-auto"
    max-width="344">
    <v-card-text>
      <p class="display-1 text--primary">
        {{ res.name }}
      </p>
      <div class="text--primary">
        Party of: {{ res.partySize }}
      </div>

      <div class="text--primary">
        Status: {{ res.status }}
      </div>
    </v-card-text>
    <v-card-text>
      <v-chip-group
        active-class="deep-purple accent-4 white--text"
      >
        <v-chip :color="getColor(res.tableStatus)"> Table is {{ res.tableStatus }}</v-chip>
        <v-chip v-on:click="notifyCustomer(res.name)"> Alert </v-chip>
      </v-chip-group>
    </v-card-text>

  </v-card>
  </v-card>
</template>

<script>
export default {
data: () => ({
    reservations: [{
        name: "John",
        status: "Checked In",
        phoneNumber: "18004359111",
        partySize: 5,
        tableStatus: "Occupied",
        time: new Date(),
        notifyCount: 0        
    },
    {
        name: "Charlie",
        status: "Call in Reservation",
        phoneNumber: "18004359111",
        partySize: 15,
        tableStatus: "Being Prepared",
        time: new Date(),
        notifyCount: 0        
    },
    {
        name: "Jim",
        status: "Checked In",
        phoneNumber: "18004359111",
        partySize: 8,
        tableStatus: "Ready",
        time: new Date(),
        notifyCount: 0        
    },
    {
        name: "Jane",
        status: "Notified",
        phoneNumber: "18004359111",
        partySize: 2,
        tableStatus: "Ready",
        time: new Date(),
        notifyCount: 2        
    },
    
    ]    
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
}
</script>
