

<template>
   <div class="stations">
      <h2> {{ Messages.BUS_ROUTE }} </h2>
      <div class="info">
         <h4 class="number-of-stations"> <small> {{ Messages.BUS_STATIONS }} </small> </h4>

         <ul class="list">
            <li v-for="(station, i) in stations" :key="i"  :class="{ visited: station, next: currentStation == i }"> </li>
         </ul>

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
      stations: boolean[] = [];
      currentStation: number = 0;
      nextStation: NextStation | null = null

      Messages = Messages;

      isVisited (visited: boolean) {
         return visited ? true : false;
      }

      updateStation (stations: string, index: number, street: string, zone: string) {
         this.stations = JSON.parse(stations);
         this.currentStation = index;

         this.nextStation = {
            street: street,
            zone: zone
         }
      }

      mounted () {
         if (window.mp) {
            mp.events.add('BROWSER::BUS_STATIONS', this.updateStation);
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

   ul.list {
      display: flex;
      justify-content: space-between;
      list-style: none;
      padding: 0;
   }

   ul.list li {
      width: 10px; 
      height: 10px;
      transition: all .3s ease;
      border-radius: 100%;
      background: #21252f;
   }

   ul.list li.visited {
      background: #0cbe80 !important;
      animation: nice 1s ease-in-out;
   }
   
   ul.list li.next {
      margin: 0;
      background: #848e9c;
      padding: 0;
   }

   @keyframes nice {
      from { transform: scale(1); }
      from { transform: scale(2); }
   }
</style>