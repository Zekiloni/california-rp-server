

<template>
   <div class="menu">
      <div class="box">
         <div class="header">
            <div class="logo">
               <div class="icon"> </div>
            </div>
            <div class="text">
               <h4> {{ Messages.VEHICLES_PANEL }} </h4>
               <h2 v-html="title"> </h2>
            </div>
         </div>

         <ul class="options" v-if="pages.main && !pages.management" >
            <h3 v-if="vehicles.length == 0"> ... </h3>
            <li v-for="(vehicle, i) in vehicles" :key="vehicle.id" :class="{ active: isActive(i) }">
               <h3> {{ i + 1 }} </h3>
               <h3 class="model"> {{ vehicle.model.toUpperCase() }} </h3>
               <h3 class="type"> {{ VehicleTypes[vehicle.type] }} </h3>
            </li>
         </ul>
         
         <div class="vehicle" v-if="pages.management && vehicle" >
            <div class="info">
               <span ><b> {{ Messages.VEHICLE_ID }} </b>  #{{ vehicle.id }} </span>
               <span class="unlocked" :class="{ locked: vehicle.locked }"> <b> {{ Messages.VEHICLE_STATUS }} </b> {{ vehicle.locked ? Messages.LOCKED : Messages.UNLOCKED }} </span>
               <span> <b> {{ Messages.VEHICLE_LOADED }} </b> {{ vehicle.spawned ? Messages.YES : Messages.NO }} </span>
            </div>

            <div class="info">
               <span> <b> {{ Messages.MILEAGE }} </b> {{ vehicle.mileage }}km </span> 
               <span> <b> {{ Messages.VEHICLE_FUEL_LEVEL }} </b> {{ vehicle.fuel }}l </span> 
            </div>

            <div class="info">
               <span ><b> {{ Messages.VEHICLE_ENGINE_LEVEL }} </b>  {{ vehicle.engineLevel }} / 3 </span>
               <span> <b> {{ Messages.VEHICLE_TRANSMISSION_LEVEL }} </b> {{ vehicle.transmissionLevel }} / 3 </span> 
               <span> <b> {{ Messages.VEHICLE_SUSPENSION_LEVEL }} </b> {{ vehicle.suspensionLevel }} / 3</span> 
            </div>

            <div class="info">
               <span ><b> {{ Messages.VEHICLE_LOCK_LEVEL }} </b>  {{ vehicle.lockLevel }} / 3 </span>
               <span> <b> {{ Messages.VEHICLE_TINT }} </b> {{ vehicle.tint }} / 3 </span> 
               <span> <b> {{ Messages.VEHICLE_TURBO }} </b> {{ vehicle.turbo ? Messages.YES : Messages.NO }} </span> 
            </div>
            
            <div class="info numberplate">
               <span ><b> {{ Messages.VEHICLE_REGISTRATION }} </b>  {{ vehicle.numberPlate ? vehicle.numberPlate.plate : Messages.VEHICLE_NOT_REGISTERED }} </span>
               <span> <b> {{ Messages.VEHICLE_REGISTRATION_DATE }}</b> {{ vehicle.numberPlate ? formatDate(vehicle.numberPlate.issued).split('-')[0] : 'N/A' }} </span>
               <span> <b> {{ Messages.VEHICLE_REGISTRATION_EXPIRE }} </b> {{ vehicle.numberPlate ? formatDate(vehicle.numberPlate.expiring).split('-')[0] : 'N/A'}} </span>
            </div>

            <ul class="options">
               <li v-for="(option, i) in actions" :key="option.event" :class="{ active: isActive(i) }">
                  {{ option.name }}
               </li>
            </ul>
         </div>
      </div>
   </div>
</template>

<script lang="ts">
   import Vue from 'vue';
   import Component from 'vue-class-component';
   import { Messages, VehicleTypes } from '@/globals';


   export enum VehicleType {
      OWNED, FACTION, BUSINES, JOB, DMV, ADMIN
   }

   interface Numberplate {
      plate: string
      issued: number
      expiring: number
   }


   interface Action {
      name: string
      action: string
   }

   interface Vehicle {
      id: number
      type: VehicleType
      name?: string
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

      option: number = 0;

      vehicles: Vehicle[] | null = null;
      vehicle: Vehicle | null = null;
      
      title: string = Messages.YOUR_VEHICLES;

      Messages = Messages;
      VehicleTypes = VehicleTypes;

      get actions () {
         let list: Action[] = [];

         if (!this.vehicle) {
            return;
         }

         if (this.vehicle.type == VehicleType.OWNED) {
            if (!this.vehicle.spawned) {
               list.push( { name: 'Stvori vozilo', action: 'get' } )
            } else {
               list.push( { name: 'Parkiraj vozilo', action: 'park' } )
            }
         }

         if (this.vehicle.type == VehicleType.OWNED) {
            list.push( { name: 'Novo parking mesto', action: 'newparking' } )
         }

         if (this.vehicle.locked) {
            list.push( { name: 'Otkljucaj vozilo', action: 'unlock' } )
         } else { 
            list.push( { name: 'Zakljucaj vozilo', action: 'lock' } )
         }

         return list;
      }

      dateFormat (i: number) {
         const date = new Date(i);
         return date.toLocaleString()
      }

      isActive (index: number) {
         return this.option == index ? true : false;
      }
 
      up () {
         if (this.pages.main) {
            this.option --;
            if (this.option < 0) {
               this.option = this.vehicles!.length - 1;
            }
         } else if (this.pages.management) {
            this.option --;
            if (this.option < 0) {
               this.option = this.actions!.length - 1;
            }
         }

         const activeElement = document.getElementsByClassName('active')[0];
         activeElement.scrollIntoView({ behavior: 'smooth', block: 'end'});
      }

      down () {
         if (this.pages.main) {
            this.option ++;
            if (this.option >= this.vehicles!.length) {
               this.option = 0;
            }
         } else if (this.pages.management) {
            this.option ++;
            if (this.option >= this.actions!.length) {
               this.option = 0;
            }
         }
         const activeElement = document.getElementsByClassName('active')[0];
         activeElement.scrollIntoView({ behavior: 'smooth', block: 'end'});
      }

      enter () {
         if (this.pages.main) {
            this.vehicle = this.vehicles![this.option];
            this.title = this.vehicle.model.toUpperCase();
            this.pages.main = false;
            this.pages.management = true;
            this.option = 0;
         } else { 
            const selectedOption = this.actions![this.option];
            this.call(selectedOption.action)
         }
      }

      back () {
         if (this.pages.main) {
            mp.events.call('CLIENT::VEHICLES:MENU');
         } else { 
            this.title = this.Messages.YOUR_VEHICLES;
            this.vehicle = null;
            this.pages.management = false;
            this.pages.main = true;
            this.option = 0;
         }
      }

      binds (event: KeyboardEventInit) {
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

      call (action: string) {
         mp.events.callProc('CLIENT::VEHICLES:MENU_ACTION', this.vehicle?.id, action).then(nData => {
            console.log('ndata is ' + JSON.stringify(nData))
            // this.vehicle = JSON.parse(nData);
         });
      }

      mounted () {
         mp.events.add('BROWSER::VEHICLES:MENU', (info: string) => {
            this.vehicles = JSON.parse(info);
         });


         window.addEventListener('keydown', this.binds);
      }

      beforeDestroy () {
         window.removeEventListener('keydown', this.binds);
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
      width: 650px;
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
      background:whitesmoke;
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
      padding: 5px 15px;
      border-radius: 4px;
      transition: all .3s ease;
      border: 1px solid transparent;
      text-align: le;
      margin: 10px 0;
      color: rgb(138, 138, 138);
      display: flex;
      justify-content: space-between;
      background: rgb(255 255 255 / 5%);
      backdrop-filter: brightness(1.1);
   }

   h3.model {
      font-weight: 350;
   }
   
   h3.type {
      font-weight: 350;
      color: #848e9c;
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

   ul.options li.active {
      border-color: rgb(205 205 205 / 25%);
      backdrop-filter: brightness(1.3);
      box-shadow: 0 1px 3px rgb(0 0 0 / 25%);
      color: white;
   }

   .vehicle { 
      padding: 0;
      width: 100%;
      height: auto;
      overflow-y: auto;
      border-radius: 10px;
      padding: 20px 0;
      background: linear-gradient(120deg, rgb(11 14 17 / 55%), transparent);
      display: flex;
      flex-wrap: wrap;
   }

   .vehicle .info {
      width: 275px;
      margin: 5px 25px;
   }

   .center { 
      margin: auto;
   }
   
   .vehicle .info span {
      display: flex;
      justify-content: space-between;
      margin: 5px 0;
      font-weight: 550;
      color: whitesmoke;
   }

   .vehicle .info span b {
      color: #848e9c;
      font-weight: 400;
   }

   .vehicle ul.options {
      width: 100%;
      background: transparent;
   }

   .vehicle ul.options li {
      height: 35px;
      align-items: center;
      text-transform: uppercase;
      letter-spacing: 0.1rem;
   }

   .info span.unlocked { 
      color: #0cbe80;
   }

   .info span.locked { 
      color: tomato;
   }
   
</style>