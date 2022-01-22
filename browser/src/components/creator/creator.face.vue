

<template>
   <div class="faces">
      <div class="strucutres">
      <div class="slider" v-for="(f, i) in face" :key=i>
         <label> {{ Messages.FACE_FEATURES[i] }} </label>
         <vue-slider 
            v-model=face[i] 
            :max=max
            :min=min
            :interval=step
            class=""
            :railStyraille=slider.rail 
            :processStyle=slider.process
            :dotStyle=slider.dot
            :dotOptions=slider.dotOptions
            v-on:change="value => changeFace(i, value)"
         />
      </div>
      </div>

   </div>
</template>

<script>
   import VueSlider from 'vue-slider-component';
   import { Messages } from '../../globals';

   export default {
      components: { 
         VueSlider, 
      },

      props: { 
         face: { 
            type: Array, 
            default () { return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; } 
         }, 
         slider: Object 
      },

      data () { 
         return { 
            min: -1, 
            max: 1, 
            step: 0.1,

            Messages
         }
      },

      methods: {
         changeFace: (i, value) => {
            mp.trigger('CLIENT::CREATOR:FACE', i, value);
         }
      }
   }
</script>

<style scoped>
   .faces { 
      height: 100%;
      width: 100%;
      margin: auto;
   }

   .strucutres {
      width: 100%;
      height: 70%;
      margin-top: 70px;
      overflow: auto;
   }

   .slider { 
      padding: 10px 20px;
      width: 300px; 
      margin: 10px auto;
      box-shadow: 0 21px 29px 0 rgb(0 0 0 / 31%);
      background: #2a303c;
   }

   label { 
      color: #cdcdcd;
      font-weight: 450;
      text-transform: uppercase;
   }

   .slider .rail { margin: 10px 5px; }
</style>