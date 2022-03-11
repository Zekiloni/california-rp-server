

<template>
   <div class="stations">
      
   </div>
</template>

<script lang="ts">
   import Vue from 'vue';
   import Component from 'vue-class-component';


   interface NextStation { 
      street: string
      zone: string
   }

   @Component
   export default class BusStations extends Vue {
      stations: number = 0;
      currentStation: number = 0;
      
      nextStation: NextStation | null = null;

      initStations (stationsNumber: number) {
         this.stations = stationsNumber;
      }

      updateStation (id: number, street: string, zone: string) {
         this.currentStation = id;

         this.nextStation = {
            street: street,
            zone: zone
         }
      }

      mounted () {
         if (window.mp) {
            mp.events.add('BROWSER::BUS_STATIONS', this.initStations);
            mp.events.add('BROWSER::BUS:STATIONS_UPDATE', this.updateStation);
         }
      }
   }
</script>