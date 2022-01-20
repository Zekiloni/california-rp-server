

<template>
   <div class="hairines" >
      <div class="slider">
         <label> {{ Messages.HAIR_MODEL }} </label>
         <vue-slider 
            v-model=hair.style
            :max=max[gender]
            :min=0
            :railStyle=slider.rail 
            class="rail"
            :processStyle=slider.process
            :dotStyle=slider.dot
            v-on:change="value => changeHair('style', value)"
            :dotOptions=slider.dotOptions
         />
      </div>
      <div class="slider">
         <label> {{ Messages.HAIR_COLOR }} </label>
         <ul class="colors"> 
            <li class="color" v-for="(color, i) in Colors" :key=color :class="{ selected: hair.color == i }" :style="{ backgroundColor: color }" v-on:click="changeHair('color', i)">  </li> 
         </ul>
      </div>

      <div class="slider">
         <label> {{ Messages.HAIR_HIGHLIGHT }} </label>
         <ul class="colors"> 
            <li class="color" v-for="(color, i) in Colors" :key=color :class="{ selected: hair.highlight == i }" :style="{ backgroundColor: color }" v-on:click="changeHair('highlight', i)">  </li> 
         </ul>
      </div>

      <div class="slider" v-if="gender == 0">
         <label> {{ Messages.BEARD_MODEL }} </label>
         <input 
            type="checkbox" 
            id="checkbox" 
            :checked="beard.style == 0"
            v-on:input="changeBeard('style', beard.style ? 0 : 255)"
         >
         <vue-slider 
            v-model=beard.style
            :max=28
            :min=0
            class="rail"
            :railStyle=slider.rail 
            :disabled="beard.style == 255"
            :class="{ disabled : beard.style == 255 }"
            :processStyle=slider.process
            :dotStyle=slider.dot
            v-on:change="val => changeBeard('style', val)"
            :dotOptions=slider.dotOptions
         />
      </div>

      <transition name="fade" mode="out-in"> 
         <div class="slider" v-if="gender == 0 && beard.style != 255">
            <label> {{ Messages.BEARD_COLOR }} </label>
            <ul class="colors"> 
               <li class="color" v-for="(color) in beardColors" :key=color :class="{ selected: beard.color == color }" :style="{ backgroundColor: Colors[color] }" v-on:click="changeBeard('color', color)">  </li> 
            </ul>
         </div>
      </transition>
      
   </div>
</template>

<script>
   import VueSlider from 'vue-slider-component';
   import { Messages, Colors } from '../../globals';

   export default {
      components: { 
         VueSlider 
      },

      props: {
         beard: Object,
         hair: Object,
         gender: Number,
         slider: Object
      },

      data () {
         return { 
            max: {
               0: 75, 1: 79
            },

            beardColors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 26, 27, 28, 29, 55, 56, 57, 58, 59, 60, 61, 62, 63],

            Messages, Colors
         }
      },

      methods: { 
         changeBeard: function (i, value) {
            console.log('beard value ' + value)
            this.beard[i] = value;
            mp.events.call('CLIENT::CREATOR:BEARD', this.beard.style, this.beard.color);
         },

         changeHair: function (i, value) {
            this.hair[i] = value;
            mp.events.call('CLIENT::CREATOR:HAIR', this.hair.style, this.hair.color, this.hair.highlight);
         }
      }
   }
</script>

<style scoped>

   .hairines { 
      height: 70%;
      width: 100%;
      overflow: auto;
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

   .slider input[type="checkbox"] {
      position: absolute;
      top: 20px;
      right: 25px;
   }

   label { 
      color: #cdcdcd;
      font-weight: 450;
      text-transform: uppercase;
   }

   ul.colors { padding: 10px 0; list-style: none; display: grid; grid-gap: 0.7rem; grid-template-columns: repeat(8, 25px); grid-template-rows: repeat(4, 25px); justify-content: center; height: auto; overflow-y: auto; padding: 5px; }
   ul.colors li.color { width: 20px; height: 20px; border-radius: 100%; transition: all 0.35s ease; opacity: 0.7; border: 3px solid transparent; }
   ul.colors li.color:hover, ul.colors li.color.selected { opacity: 1; border-color: rgb(255 255 255 / 70%); box-shadow: 0 0 0 5px rgb(255 255 255 / 25%); }

   .slider .rail { margin: 10px 5px; }
   .slider .rail.disabled { opacity: 0.35; }

</style>