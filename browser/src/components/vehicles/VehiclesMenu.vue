

<template>
   <div class="menu">
      <div class="box">
         <div class="header">
            <div class="logo">
               <div class="icon"> </div>
            </div>
            <div class="text">
               <h4> {{ Messages.VEHICLES_PANEL }} </h4>
               <h2> {{ title }} </h2>
            </div>

         </div>

         <ul class="options" v-if="pages.main && !pages.management" >
            <li class="action" v-for="(vehicle, i) in vehicles" :key="vehicle.id" :class="{ active: isActive(i) }">
               {{ i + 1 }} {{ vehicle.model }}
            </li>
         </ul>
         
         <ul class="options" v-if="pages.management && vehicle" >
            <li> <b> {{ Messages.MILEAGE }} </b> <span> {{ vehicle.mileage }}km </span> </li>
            <li class="action"> lock </li>
         </ul>
      </div>
   </div>
</template>

<script lang="ts">
   import Vue from 'vue';
   import Component from 'vue-class-component';
   import { Messages } from '@/globals';

   export enum Type {
      OWNED, FACTION, BUSINES, JOB, DMV, ADMIN
   }

   interface Numberplate {
      plate: string
      issued: number
      expiring: number
   }
   

   interface Vehicle {
      id: number
      type: number
      model: string
      locked: boolean
      spawned: boolean
      temporary: boolean
      mileage: number
      numberPlate: Numberplate | null
      engineLevel: number
      suspensionLevel: number
      transmissionLevel: number
      lockLevel: number
      turbo: number
      price: number
      tint: number
   }

   @Component
   export default class VehiclesMenu extends Vue {

      pages = {
         main: true,
         management: false
      }

      actions = [
         
      ]

      option: number = 0;

      vehicles: Vehicle[] | null = null;
      vehicle: Vehicle | null = null;
      
      title: string = Messages.YOUR_VEHICLES;

      Messages = Messages;

      isActive (index: number) {
         if (this.pages.main) {
            return this.option == index ? true : false;
         } else {

         }
      }
 
      up () {
         switch (true) {
            case this.pages.main: {
               this.option --;
               if (this.option < 0) {
                  this.option = this.vehicles!.length - 1;
               }
               break;
            }

            case this.pages.management: {
               this.option --;
               break;
            }
         }
      }

      down () {
         if (this.pages.main) {
            this.option ++;
            if (this.option >= this.vehicles!.length) {
               this.option = 0;
            }
         } else {

         }
      }

      enter () {
         if (this.pages.main) {
            this.vehicle = this.vehicles![this.option];
            this.pages.main = false;
            this.pages.management = true;
         }
      }

      back () {
         if (this.pages.main) {
            mp.events.call('CLIENT::VEHICLES:MENU');
         } else { 
            this.vehicle = null;
            this.pages.management = false;
            this.pages.main = true;
         }
      }

      mounted () {
         mp.events.add('BROWSER::VEHICLES:MENU', (info: string) => {
            this.vehicles = JSON.parse(info);
         });

         window.onkeydown = (event: KeyboardEvent) => {
            switch (event.key) {
               case 'ArrowUp': {
                  this.up();
                  break;
               }

               case 'ArrowDown': {
                  this.down();
                  break;
               }

               case 'Backspace': {
                  this.back();
                  break;
               }

               case 'Enter': {
                  this.enter();
                  break;
               }
            }
         }
      }
   }

</script>

<style scoped>

   .menu { 
      position: absolute;
      z-index: 125;
      right: 0;
      top: 0;
      background: radial-gradient(rgb(71 77 87 / 65%), rgb(11 14 17 / 85%));
      width: 100%;
      height: 100%;
      display: grid;
   }

   .box {
      min-width: 500px;
      height: auto;
      margin: auto;
   }

   .header {
      width: auto;
      margin: 15px 0;
      display: flex;
      align-items: center;
   }

   .header .logo {
      width: 90px;
      height: 90px;
      border-radius: 10px;
      box-shadow: 0 0 3px #fede29;
      background: linear-gradient(-45deg, #ffcc45, #ffb901);
      display: grid;
   }

   .header .text {
      margin: 0 20px;
   }

   .header .logo .icon {
      width: 60px;
      height: 60px;
      margin: auto;
      mask-size: cover; 
      background: #181a20;
      mask: url('../../assets/images/icons/vehicles.svg') no-repeat center;
   }

   .header h2 { 
      position: relative;
      font-size: 2.8rem;
      font-weight: 350;
      font-family: 'Montserrat Regular', sans-serif;
      margin: 0;
      color: whitesmoke;
   }

   .header h4 {
      font-size: 1.45rem;
      font-weight: 550;
      font-family: 'Montserrat Light', sans-serif;
      letter-spacing: 0.6rem;
      margin: 0;
      text-transform: uppercase;
      color: #848e9c;
   }

   ul.options {
      list-style: none;
      padding: 0;
      width: auto;
      height: auto;
      max-height: 350px;
      overflow-y: auto;
      border-radius: 10px;
      padding: 20px;
      background: linear-gradient(120deg, rgb(11 14 17 / 55%), transparent);
   }

   ul.options li {
      padding: 10px 15px;
      border-radius: 4px;
      transition: all .3s ease;
      border: 1px solid transparent;
      justify-content: space-between;
      text-align: le;
      margin: 10px 0;
      flex-direction: column;
      color: rgb(138, 138, 138);
   }

   ul.options li.action {
      background: rgb(255 255 255 / 5%);
      backdrop-filter: brightness(1.1);
   }

   li b {
      color: #848e9c;
      font-weight: 500;
      text-transform: uppercase;
   }

   li span {
      color: #cdcdcd;
      font-weight: 700;
   }

   ul.options li.action.active {
      border-color: rgb(205 205 205 / 25%);
      backdrop-filter: brightness(1.3);
      box-shadow: 0 1px 3px rgb(0 0 0 / 25%);
      color: white;
   }
   
</style>