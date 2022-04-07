
<template>
   <div class="electronic">
      <div class="box">
         <div class="top">
            <h2> duzina {{ powerFuses.length }}, ukljucenih {{ poweredFuses.length }} </h2>
         </div>
         
         <div class="switches">
            <div class="switch" v-for="(fuse, index) in powerFuses" :key="fuse.id" :class="{ on: fuse.toggle }">
               <button @click="toggleFuse(index)"> 
                  <div class="icon"> </div>
               </button>
            </div>
         </div>
      </div>
   </div>
</template>

<script lang="ts">
   import Vue from 'vue';
   import Component from 'vue-class-component';

   import switchSound from '@/assets/sounds/switch.mp3';

   interface PowerFuse {
      id: number
      toggle: boolean
   }

   @Component
   export default class ElectricBox extends Vue {
      possibleSwitches = [4, 6, 8, 16];
      
      powerFuses: PowerFuse[] = [];

      powerSound = new Audio(switchSound);
      
      get poweredFuses () {
         return this.powerFuses.filter(fuse => fuse.toggle == true);
      }

      toggleFuse (index: number) {
         this.powerSound.play();
         this.powerFuses[index].toggle = !this.powerFuses[index].toggle;

         if (this.powerFuses.length == this.poweredFuses.length) {
            mp.events.call('CLIENT::ELECTRICITY_FIX')
         }
      }

      mounted () {
         const max = this.possibleSwitches[Math.floor(Math.random() * this.possibleSwitches.length)];

         for (let i = 0; i < max; i ++) {
            const fuse = {
               id: i,
               toggle: Math.random() < 0.4
            } 

            this.powerFuses.push(fuse);
         } 
      }
   }
</script>

<style scoped>
   .electronic {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      display: grid;
      background: linear-gradient(0deg, #1a191e, transparent);
   }

   .box {
      width: 500px;
      min-height: 200px;
      height: auto;
      border: 1px dashed #3e3b46;
      border-radius: 10px;
      margin: auto;
   }

   .switches {
      width: 100%;
      display: flex;
      margin: auto;
      flex-wrap: wrap;
      justify-content: center;
   }

   .switches .switch {
      height: 120px;
      width: 100px;
      margin: 10px;
   }

   .switch button {
      width: 100px;
      height: 100px;
      background: #201f25;
      font-size: 0.85rem;
      text-align: center;
      border: 1px solid transparent;
      border-radius: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
   }

   button .icon {
      mask: url('../../assets/images/icons/power.svg') no-repeat center; 
      mask-size: cover;
      background: #100f14;
      width: 70px;
      height: 70px;
      transition: all .25s ease;
   }

   .switch.on button .icon {
      filter: brightness(1.5);
   }

</style>