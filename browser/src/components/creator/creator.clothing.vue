
<template>
   <div class="clothing">
      <label> {{ Messages.CHOOSE_OUTFIT }} </label>
      <p> {{ Messages.OUTFIT_LATER_CLOTHE }} </p>
      <ul class="presets">
         <li v-for="(preset, i) in presets[gender]" :key="i" v-on:click="changeClothing(i, preset)" :class="{ selected: clothing == i } "> 
            {{ i + 1 }}
         </li>
      </ul>
   </div>
</template>

<script>
   import VueSlider from 'vue-slider-component';
   import { Messages } from '../../globals';

   export default {
      components: {
         VueSlider
      },

      props: { 
         clothing: Number,
         gender: Number
      },

      data () { 
         return { 
            presets: [
               [ [9, 15, 47, 31], [69, 2, 48, 42], [39, 15, 15, 7], [95, 15, 37, 29], [143, 15, 55, 48], [167, 109, 94, 1], [168, 71, 23, 1], [126, 15, 55, 61], [166, 65, 102, 31] ],
               [ [23, 15, 51, 3], [57, 51, 75, 8], [72, 15, 134, 66], [141, 15, 135, 49], [121, 15, 110, 32], [64, 23, 134, 30], [73, 15, 36, 42], [84, 15, 43, 40], [87, 15, 73, 103] ]
            ],

            Messages
         }
      },

      methods: { 
         changeClothing: function (index, outfit) {
            this.clothing = index;
            mp.events.call('CLIENT::CREATOR:CLOTHING', JSON.stringify(outfit));
         }
      }
   }
</script>

<style scoped>
   .clothing { 
      height: 400px;
      width: 350px;
      margin: auto;
      padding: 18px 20px;
      width: 300px; 
      border-radius: 10px;
   }

   ul.presets { 
      list-style: none;
      padding: 0;
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-wrap: wrap;
   }

   ul.presets li {
      width: 60px;
      background: #21252f;
      transition: all .3s ease;
      margin: 20px;
      color: #cdcdcd;
      box-shadow: 0 11px 29px 0 rgb(0 0 0 / 35%);
      border-radius: 100%;
      font-weight: 750;
      font-size: 25px;
      font-family: 'Montserrat Regular';
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
   }

   ul.presets li.selected { background: #7c5bf1; color: white; }

   label {
      color: #cdcdcd;
      font-weight: 450;
      text-transform: uppercase;
   }

   p {
      color: #848e9c;
   }

</style>