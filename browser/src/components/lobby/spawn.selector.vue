
<template>
  
   <div class="spawn-selector"> 
      <div class="map-container" id="map-container"> </div> 

      <transition name="fade"> 
         <div v-if="spawn.name" class="spawn-info" :style="{ left: spawn.left + 'px', top: spawn.top + 'px' }">
            <h2 class="name"> {{ spawn.name }} </h2>
            <p class="description"> {{ spawn.description }} </p>
         </div>
      </transition>
   </div> 

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
            layer: null,

            spawn: {
               name: null,
               description: null,
               left: null,
               top: null
            }
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

         play: function (spawnType, id = 0) { 
            mp.events.call('CLIENT::CHARACTER:PLAY', this.$parent.selectedCharacter, spawnType, id);
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
               
            this.map = L.map('map-container', { 
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

            const smallIcon = L.icon({
               iconUrl: 'https://i.imgur.com/Tt3Zcvy.png',
               iconSize: [15, 20],
            });

            this.spawnPoints.forEach(point => {
               const coords = this.convertToMap(this.layer, point.position.x, point.position.y);
               point.marker = L.marker(new L.LatLng(coords.lat, coords.lng), { icon: smallIcon }).addTo(this.map)
                  .on('click', e => { 
                     this.play(point.type, point.id);

                  })
                  .on('mouseover', async e => {
                        let mapWidth = this.map._container.offsetWidth;
                        let mapHeight = this.map._container.offsetHeight;


                        this.spawn.name = point.name;
                        this.spawn.description = point.description;
                        this.spawn.left = (e.containerPoint.x * window.screen.width / mapWidth) - 145;
                        this.spawn.top = (e.containerPoint.y * window.screen.height / mapHeight) - 70;

                  })
                  .on('mouseout', e => {
                     this.spawn.name = null;
                     this.spawn.description = null;
                  })
            });

         }
      },

      mounted () { 
         this.init();
      }
      
   }
</script>

<style scoped>

   .spawn-selector { 
      width: 100%;
      height: 100%;
      animation: fade-in 2s ease-in;
       background: radial-gradient(rgb(71 77 87 / 55%), rgb(11 14 17 / 95%));
   }

   .map-container {
      width: 100%;
      transform: scale(1.5);
      height: 100%;
   }

   .leaflet-container { background: transparent; }

   .leaflet-tile-container .leaflet-tile { 
      filter: grayscale(100%); 
      opacity: 0.7 !important; 
   }

   .leaflet-marker-icon { filter: none !important; }

   .spawn-info { 
      width: auto;
      height: auto;
      padding: 10px 5px;
      backdrop-filter: blur(5px);
      background: rgb(11 14 17 / 55%);
      border-radius: 10px;
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
   }

   h2.name { 
      color: #7c5bf1;
      margin: 5px 0;
   }

   p.description { 
      color: #cdcdcd;
      font-weight: 300;
      font-size: 0.7rem;
      width: 90%;
   }

   @keyframes fade-in {
      from { opacity: 0.2; transform: scale(3);}
      to { opacity: 1; transform: scale(1.5); }
   }


</style>