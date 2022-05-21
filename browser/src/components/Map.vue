
<template>
      <div 
         class="map-container" 
         id="map-container" 
         :style="{ 
            width: width ? width : '100%',
            height: height ? height : '100%' ,
            background: background ? background : 'transparent'
         }"
      >  </div> 
</template>

<script lang="ts">
   import Vue from 'vue'
   import Component from 'vue-class-component';

   import 'leaflet/dist/leaflet.css';
   import L, { LeafletMouseEvent, TileLayer } from 'leaflet';

   @Component({
      props: {
         width: String,
         height: String,
         background: String
      }
   })
   export default class Map extends Vue {
      layer: L.TileLayer | null = null;
      map: L.Map | null = null;
      
      getMapBounds (t: any) { 
         let e = 3 * t.options.tileSize,
            n = 2 * t.options.tileSize,
            i = this.map!.unproject([0, e], 0),
            o = this.map!.unproject([n, 0], 0);
         return new L.LatLngBounds(i, o);
      };

      convertToMap (e: TileLayer, n: number, i: number) {
         let o = 3 * <number>e.options.tileSize!, r = 2 * <number>e.options.tileSize,
            s = this.map!.unproject([0, 0], 0), a = this.map!.unproject([r / 2, o - <number>e.options.tileSize], 0),
            l = s.lng + ((n - -4230) * (s.lng - a.lng)) / (-4230 - 370);

         return { lat: s.lat + ((i - 8420) * (s.lat - a.lat)) / (8420 - (-640)), lng: l };
      }

      init () {
         this.layer = L.tileLayer('http://020-oglasi.com/gtavmap/normal/minimap_sea_{y}_{x}.png', { // http://020-oglasi.com/gtavmap/normal/minimap_sea_{y}_{x}.png
            minZoom: -2,
            maxZoom: 0,
            tileSize: 1024,
            maxNativeZoom: 0,
            minNativeZoom: 0,
            attribution: 'california roleplay',
         });
               
         this.map = L.map('map-container', { 
            crs: L.CRS.Simple, 
            layers: [this.layer],
         });

         let r = this.getMapBounds(this.layer);
         this.map.setMaxBounds(r.pad(1));
         this.map.fitBounds(r);
         
         this.map.on('click', function (e: LeafletMouseEvent) {
            const coord = e.latlng;
            let lat = coord.lat;
            let lng = coord.lng;
         });

         this.$emit('map', this.map, this.layer);
      }

      mounted () {
         this.init();
         
         const element = document.getElementsByClassName('leaflet-control-attribution');
         (<HTMLElement>element[0]).style.display = 'none';
      }
   }
</script>

<style scoped>
   .map-container {
      background: #1a191e;
      width: 100%;
      height: 100%;
      margin: auto;
      color: white;
   }
   
</style>