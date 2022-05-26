
<template>
   <div class="settings">
      <h2 class="title"> {{ Messages.PHONE_APP_SETTINGS }} </h2>

      <div class="info">
         <h4> {{ Messages.PHONE_NUMBER }} </h4>
         <span> {{ phone.number }} </span>
      </div>

      <div class="info">
         <h4> {{ Messages.DEVICE_VERSION }} </h4>
         <span> 0.2.7 </span>
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
         phone: Object
      }
   })
   export default class SettingsApp extends Vue { 
      
      brighntess (i: number) {
         this.$emit('update-brightness', i);
      }

      power () {
         this.$emit('update-power');
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
   .settings {
      background: #18171d;
      width: 100%;
      height: 100%;
   }

   h2.title {
      padding: 10px;
      font-size: 1.25rem;
      margin: 0;
      color: #cdcdcd;
   }

   .info { 
      background: #100f14;
      width: auto;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      color: grey;
      margin: 5px 0;
   }

   .info h4 { margin: 0; }
</style>