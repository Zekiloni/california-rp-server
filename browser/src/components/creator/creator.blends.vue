

<template>
   
   <div class="blend-data">
      <div class="slider" v-for="(b, i) in blends" :key=i>
         <label> {{ Messages.BLEND_DATA[i] }} </label>
         <vue-slider 
            v-model=blends[i] 
            :max=max[i] 
            :min=min[i] 
            :interval=step[i] 
            class="rail"
            :railStyle=slider.rail 
            :processStyle=slider.process
            :dotStyle=slider.dot
            :dotOptions=slider.dotOptions
         />
      </div>

      <div class="eye-color">
         <label> {{ Messages.EYES_COLOR }} </label>
         <ul class="colors"> 
            <li class="color" v-for="color in eyeColors" :key=color :class="{ selected: eyeColor == color }" :style="{ backgroundColor: Colors[color] }" v-on:click="changeEyeColor(color)"> {{ color }} </li> 
            
         </ul>
      </div>

   </div>

</template>

<script>
   import { Colors, Messages } from '../../globals';
   import VueSlider from 'vue-slider-component';

   export default {
      components: { 
         VueSlider
      },
      
      props: { 
         blends: { 
            type: Array, 
            default () { return [0, 0, 0, 0, 0, 0]; } 
         }, 
         eyeColor: { 
            type: Number, 
            default: 0 
         }, 
         slider: Object 
      },

      data () { 
         return { 
            max: [45, 45, 45, 45, 1, 1], 
            min: [0, 0, 0, 0, -1, -1],
            step: [1, 1, 1, 1, 0.1, 0.1],
            eyeColors: [0, 40, 41, 4, 3, 6, 37, 36, 39],

            Messages, Colors
         }
      },

      methods:  {
         changeEyeColor: function (color) {
            this.eyeColor = color;
         }
      }
   }
</script>

<style scoped>

   .blend-data { 
      width: 100%;
      margin: auto;
   }

   .slider { 
      padding: 18px 20px;
      width: 300px; 
      box-shadow: 0 21px 29px 0 rgb(0 0 0 / 31%);
      background: #2a303c;
      border-radius: 10px;
      margin: 20px auto;
   }

   label { 
      color: #cdcdcd;
      font-weight: 450;
      text-transform: uppercase;
   }

   .slider .rail { margin: 10px 5px; }

   .eye-color { width: 300px; padding: 20px 20px; margin: 25px auto; }

   ul.colors { padding: 10px 0; list-style: none; display: flex; justify-content: space-between; height: auto; overflow-y: auto; padding: 5px; }
   ul.colors li.color { width: 20px; height: 20px; border-radius: 100%; transition: all 0.35s ease; opacity: 0.7; border: 3px solid transparent; }
   ul.colors li.color:hover, ul.colors li.color.selected { opacity: 1; border-color: rgb(255 255 255 / 70%); box-shadow: 0 0 0 5px rgb(255 255 255 / 25%); }
   

</style>