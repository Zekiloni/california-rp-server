
<template>
   <div class="dealership" v-if="busines">
      <div class="header">
         <h4> {{ Messages.VEHICLE_DEALERSHIP }} </h4>
         <h2> {{ busines.name }} </h2>
      </div>

      <ul class="vehicles">
         <li v-for="(vehicle, i) in busines.products" :key="vehicle.name" @click="select(i)" :class="{ active: selected == i }"> 
            <h3 class="name"> {{ vehicle.name }} </h3>
            <h3 class="price"> {{ dollars(vehicle.price) }} </h3>
         </li>
      </ul>

      <div class="info">
         <ul v-if="vehicleInfo">
            <li> <b> {{ Messages.VEHICLE_NAME }} </b> <h3> {{ vehicleInfo.name }}  </h3> </li>

            <li> <b> {{ Messages.MAX_SPEED }} </b> <h3> {{ vehicleInfo.maxSpeed }} <small>kmh</small> </h3> </li>

            <li>
               <b> {{ Messages.PRIMARY_COLOR }} </b>
               <div class="color">
                  <div class="icon-picker" @click="selectedColor == 0 ? selectedColor = null : selectedColor = 0" :style="{ backgroundColor: primaryColor }" > </div>

                  <transition name="fade"> 
                     <div class="colors" v-if="selectedColor == 0">
                        <div class="color" v-for="(color, i) in colors" :key="color" @click="changeColor(0, i), primaryColor = color" :style="{ backgroundColor: color }"> </div>
                     </div>
                  </transition>
               </div>
            </li>

            <li>
               <b> {{ Messages.SECONDARY_COLOR }} </b>
               <div class="color">
                  <div class="icon-picker" @click="selectedColor == 1 ? selectedColor = null : selectedColor = 1" :style="{ backgroundColor: secondaryColor }" > </div>

                  <transition name="fade"> 
                     <div class="colors" v-if="selectedColor == 1">
                        <div class="color" v-for="(color, i) in colors" :key="color" @click="changeColor(1, i), secondaryColor = color" :style="{ backgroundColor: color }"> </div>
                     </div>
                  </transition>
               </div>
            </li>

            <li>
               <b> {{ Messages.NUMBER_OF_PASSENGERS }} </b>
               <div class="passengers"  > 
                  <img v-for="passenger in vehicleInfo.maxPassengers" :key="passenger" src="https://i.imgur.com/M7j0tac.png" width="30" >
               </div>
            </li>

            <li> 
               <b> ubrzanje </b>
               <div class="bar">
                  <div class="fill" :style="{ width: (vehicleInfo.maxAcceleration * 10) + '%' }"> </div>
               </div>
            </li>

            <li> 
               <b> kocenje </b>
               <div class="bar">
                  <div class="fill" :style="{ width: (vehicleInfo.maxBraking * 10) + '%' }"> </div>
               </div>
            </li>

            <li> 
               <b> maxTraction </b>
               <div class="bar">
                  <div class="fill" :style="{ width: (vehicleInfo.maxTraction * 10) + '%' }"> </div>
               </div>
            </li>

            <li>
               <b> {{ Messages.PRICE }} </b>
               <h3 class="price"> {{ dollars(busines.products[selected].price) }} </h3>
            </li>

            <li>
               <button class="buy" @click="buy()"> {{ Messages.BUY_VEHICLE }} </button>
            </li>
         </ul>
      </div>
   </div>
</template>

<script lang="ts">
   import Vue from 'vue';
   import Component from 'vue-class-component';
   import { Business } from '@/models';
   import { Messages, vehicleColors } from '@/globals';
   
   interface VehicleInfo { 
      name: string
      class: string
      maxSpeed: number
      maxBraking: number
      maxAcceleration: number
      maxPassengers: number
      maxTraction: number
   }
   
   type RGB = [number, number, number];

   @Component
   export default class VehicleDealership extends Vue { 
      
      busines: Business | null = null;

      color: [number, number] = [0, 0];
      selectedColor: number | null = null;

      selected: number = 0;
      vehicleInfo: VehicleInfo | null = null;

      primaryColor: string = '#ffffff';
      secondaryColor: string = '#ffffff';

      Messages = Messages;
      colors = vehicleColors;
      
      select (i: number) {
         this.selected = i;
         mp.events.call('CLIENT::DEALERSHIP:PREVIEW', this.busines?.products[i].name);

         const [primary, secondary] = this.color;
         mp.events.call('CLIENT::DEALERSHIP:COLOR', Number(primary),  Number(secondary));
      }

      changeColor (index: number, color: number) {
         this.color[index] = color;

         const [primary, secondary] = this.color;
         mp.events.call('CLIENT::DEALERSHIP:COLOR', Number(primary),  Number(secondary));
      }

      buy () {
         const productID = this.busines?.products[this.selected].id;
         mp.events.call('CLIENT::DEALERSHIP:BUY', this.busines?.id, productID);
      }

      mounted () {
         if (window.mp) {

            mp.events.add('BROWSER::DEALERSHIP:MENU', (info: string) => { 
               this.busines = JSON.parse(info);
            });

            mp.events.add('BROWSER::DEALERSHIP:VEHICLE_INFO', (name: string, vClass: string, mSped: number, mBraking: number, acceleration: number, traction: number, passengers: number ) => {
               this.vehicleInfo = {
                  name: name, 
                  class: vClass, 
                  maxSpeed: mSped,
                  maxBraking: mBraking, 
                  maxAcceleration: acceleration,
                  maxPassengers: passengers, 
                  maxTraction: traction
               }
            });

         }
      }

   }
</script>

<style scoped>
   .dealership {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      min-width: 425px;
      z-index: 999;
      max-width: 500px;
      background: linear-gradient(120deg, rgb(11 14 17 / 65%), rgb(71 77 87 / 10%));
      overflow: auto;
   }

   .header {
      width: auto;
      padding: 20px;
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

   ul.vehicles {
      list-style: none;
      padding: 10px 0;
      width: 420px;
      height: 225px;
      margin: 0 auto;
      margin-bottom: 10px;
      overflow-y: scroll;
      border-radius: 5px;
      background: linear-gradient(120deg, rgb(11 14 17 / 85%), rgb(11 14 17 / 15%));
   }

   ul.vehicles li { 
      background: rgb(255 255 255 / 5%);
      padding: 20px 10px;
      backdrop-filter: brightness(1.1);
      transition: all .3s ease;
      border: 1px solid transparent;
      border-radius: 4px;
      margin: 5px 0;
      color: #cdcdcd;
      width: 85%;
      margin: 10px auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
   }

   ul.vehicles li:hover {
      border-color: rgb(205 205 205 / 35%);
      backdrop-filter: brightness(1.8);
      box-shadow: 0 1px 2px rgb(0 0 0 / 25%);
   }

   ul.vehicles li.active {
      border-color: rgb(205 205 205 / 20%);
      backdrop-filter: brightness(1.8);
   }

   ul.vehicles li.active h3 {
      color: whitesmoke;
   }

   ul.vehicles li h3 { 
      transition: all .3s ease;
      margin: 0 5px;
      text-transform: capitalize;
      color: #aaaaaa;
   }

   ul.vehicles li h3.price {
      color: #848e9c;
      opacitY: 0.35;
   }

   .info {
      margin: auto;
      width: 420px;
   }

   .passengers img {
      display: inline;
      margin: 5px 10px;
   }

   .info ul {
      list-style: none;
      padding: 15px;
      margin: 0;
      border-radius: 5px;
      background: linear-gradient(120deg, rgb(11 14 17 / 85%), rgb(11 14 17 / 15%));
   }
   
   .info ul li { 
      margin: 20px 0;
      display: gr;
   }

   .info ul li b {
      display: block;
      text-transform: uppercase;
      color: #848e9c;
      font-size: 0.8rem;
      font-weight: 600;
      font-family: 'Montserrat Light', sans-serif;
      letter-spacing: 0.3rem;
   }

   .info ul li h3 {
      margin: 5px 0;
      font-size: 1.25rem;
      color: #cdcdcd;
      font-weight: 500;
   }

   .info ul li h3.price { 
      color: #0db87c;
      font-size: 2.55rem;
      font-weight: 600;
   }

   .bar { 
      margin: 5px 0;
      width: 100%; 
      height: 10px;
      background: rgb(100 100 100 / 75%);
      position: relative;
      border-radius: 2px;
      overflow: hidden;
   }

   .bar .fill { 
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 0%;
      background: #ffcc45;
      transition: all 0.5s ease;
   }

   .icon-picker {
      mask: url('../../../assets/images/icons/color-picker.svg') no-repeat center; 
      mask-size: cover; 
      width: 25px;
      height: 25px;
      background: white;
      margin: 5px 0;
   }

   .colors { 
      display: flex;
      flex-wrap: wrap;
      height: 150px;
      overflow-y: scroll;
      overflow-x: hidden;
   }

   .colors .color { 
      width: 25px;
      height: 25px;
      border-radius: 5px;
      margin: 5px; 
      box-shadow: rgb(0 0 0 / 10%) 0px 1px 3px 1px;
      transition: all 0.35s ease;
      border: 2px solid transparent;
   }

   .colors .color:hover { border-color: white; }
   .colors .color.selected { border-color: white; }

   button.buy {
      width: 250px;
      margin: auto;
      padding: 15px 0;
      font-size: 1rem;
      font-weight: 500;
      color: #d4d4d4;
      background: #4c318e;
      transition: all .3s ease;
   }

   button.buy:hover {
      color: whitesmoke;
      filter: brightness(1.2);
   }
</style>
