

<template>
   <div class="stations">
      <h2> {{ Messages.BUS_ROUTE }} </h2>
      <div class="info">
         <h4 class="number-of-stations"> <small> {{ Messages.BUS_STATIONS }} </small> {{ currentStation + 1 }} / {{ stations }} </h4>
         <div class="next">
            <small> {{ Messages.NEXT_BUS_STATION }} </small>
            <h3> {{ nextStation.street }} </h3>
            <h4> {{ nextStation.zone }} </h4>
         </div>
      </div>
   </div>
</template>

<script lang="ts">
   import Vue from 'vue';
   import Component from 'vue-class-component';
   import { Messages } from '@/globals';

   interface NextStation { 
      street: string
      zone: string
   }

   @Component
   export default class BusStations extends Vue {
      stations: number = 0;
      currentStation: number = 0;
      
      nextStation: NextStation | null = null

      Messages = Messages;

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

<style scoped>
   .stations {
      position: absolute;
      bottom: 30px;
      left: 500px;
      background: linear-gradient(120deg, rgb(11 14 17 / 55%), rgb(11 14 17 / 5%));
      padding: 15px;
      border-radius: 10px;
      width: 250px;
   }

   .stations h2 { 
      text-transform: uppercase;
      color: whitesmoke;
      margin: 2px 0;
   }

   .info {
      padding: 5px; 
   }

   h4.number-of-stations {
      font-size: 1rem;
      margin: 10px 0;
      color: rgb(228, 228, 228);
   }

   small {
      font-size: 0.65rem;
      display: block;
      color: #ffcc45;
      text-transform: uppercase;
      font-weight: 550;
   }

   .next { margin-top: 15px; }

   .next h3, .next h4 { margin: 2px 0; }

   .next h3 { color: #e2e2e2; font-weight: 350; }
   .next h4 { font-weight: 550; color: #959fae; font-size: 0.75rem; }
</style>