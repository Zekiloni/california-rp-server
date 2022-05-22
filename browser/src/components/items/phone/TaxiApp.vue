
<template>
   <div class="app">
      <Map @map="initAppMap" :width="'100%'" :height="'445px'" :background="'#1b1920'" class="map" />

      <div class="taxi">
         <h4> {{ Messages.TAXI_APP_WHERE_TO }} </h4>
      </div>
   </div>
</template>

<script lang="ts">
   import Vue from 'vue'
   import Component from 'vue-class-component';
   
   import { Messages } from '@/globals';
   import Map from '@/components/Map.vue';
   import { LeafletMouseEvent } from 'leaflet';
   
   interface IVehPosition {
      x: number
      y: number
      z: number
   }

   @Component({
      components: {
         Map
      }
   })
   export default class TaxiApp extends Vue {
      map: L.Map | null = null;
      layer: L.TileLayer | null = null;
      

      Messages = Messages;

      makePoint (e: LeafletMouseEvent) {
         console.log(e.latlng.lat)
      }

      initAppMap (map: L.Map, layer: L.TileLayer) {
         this.map = map;
         this.layer = layer;

         this.map.setView(map.getCenter(), -1);

         this.map.on('click', this.makePoint);
      }

      mounted () {
         if (window.mp) {

         }

         const element = document.getElementsByClassName('leaflet-control');
         (<HTMLElement>element[0]).style.display = 'none';
      }
   }
</script>

<style scoped>
   .map {
      z-index: 0;
      position: relative;
      height: 450px;
   }

   .taxi {
      position: absolute;
      width: 100%;
      bottom: 10px;
   }

   .leaflet-control-zoom leaflet-bar leaflet-control {
      display: none;
   }
</style>