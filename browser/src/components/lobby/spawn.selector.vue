
<template>
  
   <div class="spawn-selector" id="spawn-selector" >  </div> 

</template>

<script >

   import 'leaflet/dist/leaflet.css';
   import L from 'leaflet';

   export default {
      
      props: { 
         spawnPoints: Array
      },

      data () { 
         return { 
            map: null,
            layer: null
         }
      },
      
      methods: { 

         getMapBounds: function (t) { 
            let e = 3 * t.options.tileSize,
               n = 2 * t.options.tileSize,
               i = this.map.unproject([0, e], 0),
               o = this.map.unproject([n, 0], 0);
            return new L.LatLngBounds(i, o);
         },

         convertToMap: function (e, n, i) {
            var o = 3 * e.options.tileSize,
               r = 2 * e.options.tileSize,
               s = this.map.unproject([0, 0], 0),
               a = this.map.unproject([r / 2, o - e.options.tileSize], 0),
               l = s.lng + ((n - -4230) * (s.lng - a.lng)) / (-4230 - 370);
            return { lat: s.lat + ((i - 8420) * (s.lat - a.lat)) / (8420 - (-640)), lng: l };
         },

         flyTo: function (order) { 
            const Coords = this.convertToMap(this.layer, order.Position.x, order.Position.y);
            this.map.flyTo([Coords.lat, Coords.lng], 0);
         },

         init: function () { 
            this.layer = L.tileLayer('http://020-oglasi.com/gtavmap/normal/minimap_sea_{y}_{x}.png', {
               minZoom: -2,
               maxZoom: -2,
               tileSize: 1024,
               zoomControl: false,
               maxNativeZoom: 0,
               minNativeZoom: 0,
               tileDirectory: 'tiles'
            });
               
            this.map = L.map('spawn-selector', { 
               crs: L.CRS.Simple, 
               layers: [this.layer] 
            }).setView([0, 0], 0);

         

            let r = this.getMapBounds(this.layer);
            this.map.setMaxBounds(r.pad(1));
            this.map.fitBounds(r);
            
            this.map.on('click', function(e){
               const coord = e.latlng;
               let lat = coord.lat;
               let lng = coord.lng;
               // console.log("You clicked the map at latitude: " + lat + " and longitude: " + lng);
            });

            const Icon = L.icon({
               iconUrl: 'https://cdn1.iconfinder.com/data/icons/color-bold-style/21/14_2-512.png',
               iconSize: [15, 15],
            });

            this.spawnPoints.forEach(point => {
               const coords = this.convertToMap(this.layer, point.position.x, point.position.y);
               point.marker = L.marker(new L.LatLng(coords.lat, coords.lng), { icon: Icon }).addTo(this.map);
            });

         }
      },

      mounted () { 
         console.log('this spawnpoints ' + JSON.stringify(this.spawnPoints))
         this.init();
      }
      
   }
</script>

<style scoped>

   .spawn-selector { 
      width: 100%;
      transform: scale(1.5);
      height: 100%;
   }


   img.leaflet-tile { 
      background: transparent;
      filter: grayscale(100%);
   }

   .spawn-point { 
      height: 15px;
      width: 15px;
      background: red;
      border-radius: 100%;
   }


</style>