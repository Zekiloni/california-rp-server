
<template>
   <div class="app">
      <h2 class="title"> {{ Messages.PHONE_PAGE_SETTINGS }} </h2>
      <div class="settings">
          <vue-slider 
            :value="brightness"
            :max='1.0'
            :min='0.4'
            :interval='0.1'
            :railStyraille=slider.rail 
            :processStyle=slider.process
            :dotStyle=slider.dot
            :dotOptions=slider.dotOptions
            v-on:change="value => brighntess(value)"
         />
      </div>
   </div>
</template>

<script lang="ts">
   import Vue from 'vue';
   import Component from 'vue-class-component';
   import VueSlider from 'vue-slider-component';
   import { Messages } from '@/globals';

   @Component({
      components: {
         VueSlider
      },
      props: {
         brightness: Number
      }
   })
   export default class SettingsApp extends Vue { 
      
      brighntess (i: number) {
         this.$emit('update-brightness', i);
      }

      Messages = Messages;

      slider = { 
         rail: { backgroundColor: '#0b0e11', borderRadius: '15px', boxShadow: '0 0 1px black' },
         process: { background: '#ffcc45', borderRadius: '25px' },
         dot: { backgroundColor: '#ffb901', borderColor: '#ffcc45' },
         dotOptions: { 
            focusStyle: { 
               background: '#fede29',
               boxShadow: '0 0 0 5px rgb(255 204 69 / 20%)'
            }
         }
      }

   }
</script>

<style scoped>
   .app {
      padding: 10px;
   }

   h2.title {
      margin: 0;
      font-size: 1.2rem;
      color: #cdcdcd;
      font-weight: 500;
   }
</style>