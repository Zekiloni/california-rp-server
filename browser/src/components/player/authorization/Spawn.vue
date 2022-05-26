
<template>
   <div class="spawn-selector">
      <Map @map="initializeMap" :width="'100'" :height="'100%'" :background="'transparent'" />
      
      <div class="point">
         <transition name="fade"> 
            <div class="selected" v-if="selected">
               <h2> {{ selected.name }} </h2>
               <p> {{ selected.description }} </p>

               <button class="play" @click="play()"> {{ Messages.PLAY }} </button>
            </div>
         </transition>
         <h4> {{ Messages.SPAWN_SELECTOR_INFO }} </h4>
      </div>

   </div>
</template>

<script lang="ts">
   import Vue from 'vue'
   import Component from 'vue-class-component';
   
   import Map from '@/components/Map.vue';
   import L, { LeafletMouseEvent, TileLayer } from 'leaflet';

   import { Messages } from '@/globals';

   interface SpawnPoint {
      name: string,
      description: string
      type: number
      position: { x: number, y: number, z: number }
      heading?: number
      id?: number,
      marker?: L.Marker
   }

   @Component({
      components: {
         Map
      },
      props: {
         points: {
            type: Array,
            default () {
               return [];
            }
         }
      }
   })
   export default class Spawn extends Vue {
      map: L.Map | null = null;
      layer: L.TileLayer | null = null;

      Messages = Messages;

      selected: SpawnPoint | null = null;
      
      play () {
         if (!this.selected) 
            return;

         this.$emit('select-spawn', this.selected.type, this.selected.id ? this.selected.id : 0);
      }

      convertToMap (e: TileLayer, n: number, i: number) {
         let o = 3 * <number>e.options.tileSize!, r = 2 * <number>e.options.tileSize,
            s = this.map!.unproject([0, 0], 0), a = this.map!.unproject([r / 2, o - <number>e.options.tileSize], 0),
            l = s.lng + ((n - -4230) * (s.lng - a.lng)) / (-4230 - 370);

         return { lat: s.lat + ((i - 8420) * (s.lat - a.lat)) / (8420 - (-640)), lng: l };
      }
      
      initializeMap (map: L.Map, layer: TileLayer) {
         this.map = map;
         this.layer = layer;
         map.setView(map.getCenter(), -1);
         
         const smallIcon = L.icon({
            iconUrl: 'https://i.imgur.com/Tt3Zcvy.png',
            iconSize: [15, 20],
         });
   
         this.$props.points.forEach((point: SpawnPoint) => {
            const position = this.convertToMap(this.layer!, point.position.x, point.position.y);
            
            point.marker = L.marker(new L.LatLng(position.lat, position.lng), { icon: smallIcon }).addTo(this.map!)
               .on('click', () => {
                  this.selected = point;
                  this.map?.setView(position, 2)
               });
         })

         map.on('click', (e: LeafletMouseEvent) => {
            console.log(e.latlng);
            if (this.selected) {
               this.selected = null;
            }
         })
      }
   }
</script>

<style scoped>
   .spawn-selector {
      width: 100%;
      height: 100%;
      position: relative;
   }

   .point {
      position: absolute;
      max-width: 300px;
      height: auto;
      bottom: 20px;
      left: 20px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
   }
   
   .selected { 
      height: auto;
      border-radius: 10px;
      padding: 20px;
      background: #1a1c23;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
   }

   .selected h2 {
      margin: 0;
      color: #ffffff;
   }

   .selected p {
      padding: 10px;
      border: 1px dashed #36353D;
      color: #E4E4E2;
      border-radius: 5px;
   }

   .point h4 { 
      font-weight: 500;
      color: #cdcdcdcd;
   }

   button.play {
      margin-top: 20px;
      width: 100%;
      padding: 20px 0;
      text-align: center;
      background: #FFBB1C;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 1rem;
      color: #151418;
      transition: all .3s ease;
   }

   button.play:hover {
      background: #FFC940;
      color: #794B20;
   }
</style>