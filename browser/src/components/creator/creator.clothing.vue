
<template>
   <div class="clothing">
      <vue-slider 
         v-for="(cloth, i) in clothing" :key="i"
         v-model=clothing[i]
   
         class="rail"
         :min=0
         :max=200
         :railStyle=slider.rail 
         :processStyle=slider.process
         :dotStyle=slider.dot
         v-on:change="value => changeClothing(components[i], value)"
         :dotOptions=slider.dotOptions
      />
   </div>
</template>

<script>
   import VueSlider from 'vue-slider-component';
   import { Messages } from '../../globals';

   export default {
            // :data=clothings[i]

      components: {
         VueSlider
      },

      props: { 
         clothing: {
            type: Array,
            default () { 
               return [0, 0, 0, 0];
            }
         },
         slider: Object
      },

      data () { 
         return { 
            components: [11, 8, 4, 6],

            clothings: [
               [0, 1, 3, 4, 6], 
               [15], 
               [0, 1, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 15, 16, 17, 19, 20, 22, 23, 24, 25, 26, 27, 28, 35, 37, 42, 43, 45, 47, 48, 49, 50, 51, 52, 54, 55, 60, 63, 64, 65, 66, 71, 73, 75, 76, 78, 80, 82, 96, 129], 
               []
            ],

            Messages
         }
      },

      methods: { 
         changeClothing: function (i, value) {
            mp.events.call('CLIENT::CREATOR:CLOTHING', i, value);
         }
      }
   }
</script>

<style scoped>
   .clothing { 
      height: 400px;
      width: 350px;
      margin: auto
   }

   .rail { 
      margin: 20px 0;
   }
</style>