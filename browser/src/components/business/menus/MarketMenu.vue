

<template>
   
   <div class="wrapper" v-if="business">
      <div class="market">
         {{ business }}
      </div>
   </div>

</template>

<script lang="ts">
   import Vue from 'vue'
   import Component from 'vue-class-component';
   import { Messages } from '@/globals';
   import { Business } from '@/models';

   @Component
   export default class MarketMenu extends Vue {

      business: Business | null = null;
      
      mounted () {
         // mp.invoke('focus', true);
         if (window.mp) {
            mp.events.add('BROWSER::MARKET:MENU', (business: string) => {
               this.business = JSON.parse(business);
            });
         }
      }
   }
</script>


<style scoped>

   .wrapper { 
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(rgb(71 77 87 / 55%), rgb(11 14 17 / 85%));
      display: grid;
   }

   .market { 
      width: 700px;
      height: 500px;
      margin: auto;
      background: rgb(0 0 0 / 45%);
   }

</style>