

<template>
   <div class="overlays">
      <div class="slider" v-for="(overlay, i) in overlays" :key=i>
         <label> {{ Messages.HEAD_OVERLAYS_NAMES[i] }} </label>

         <input 
            type="checkbox" 
            id="checkbox" 
            v-model="overlaysToggle[i]" 
            v-on:change="changeOverlay(i, $event.target.checked ? 0 : 255)" 
            v-tooltip="overlaysToggle[i] ? (Messages.TURN_OFF + ' ' + Messages.HEAD_OVERLAYS_NAMES[i]) : (Messages.TURN_ON + ' ' + Messages.HEAD_OVERLAYS_NAMES[i]) "
         >

         <vue-slider 
            v-model=overlays[i] 
            :max=max[i]
            :min=0
            class="rail"
            :disabled="overlaysToggle[i] == false"
            :railStyle=slider.rail 
            :processStyle=slider.process
            :dotStyle=slider.dot
            :class="{ disabled : overlaysToggle[i] == false }"
            v-on:change="value => changeOverlay(i, value)"
            :dotOptions=slider.dotOptions
         />
      </div>
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
         overlays: {
            type: Array, 
            default () { return []; }
         },
         overlaysToggle: { 
            type: Array, 
            default () { return []; } 
         },
         slider: Object
      },

      data () {
         return {
            index: [0, 2, 3, 6, 7, 8, 9, 10],
            max: [23, 33, 14, 11, 10, 9, 17, 16],

            Messages
         }
      },

      methods: {
         changeOverlay: function (i, value) {
            const index = this.index[i];
            mp.events.call('CLIENT::CREATOR:OVERLAY', index, value);
         }
      }
   }
</script>

<style scoped>
   .overlays { 
      margin: auto;
   }

   .slider { 
      padding: 18px 20px;
      width: 300px; 
      box-shadow: 0 21px 29px 0 rgb(0 0 0 / 31%);
      background: #2a303c;
      border-radius: 10px;
      position: relative;
      margin: 15px auto;
   }

   label { 
      color: #cdcdcd;
      font-weight: 450;
      text-transform: uppercase;
   }
   
   .slider input[type="checkbox"] {
      position: absolute;
      top: 20px;
      right: 25px;
   }

   .slider .rail { margin: 10px 5px; position: relative; }
   .slider .rail.disabled { opacity: 0.35; }

</style>