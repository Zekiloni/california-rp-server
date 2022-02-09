

<template>
   <div class="vehicle-info">
      <div class="main">
         <h1> {{ vehicleName }} </h1>
         <div class="speed">
            <h2 class="number"> {{ speed }} </h2>
            <small> km/h</small>
         </div>
         <div class="fuel-bar">
            <div class="bar" :style="{ width: fuel + '%' }" > </div>
         </div>
         <h4> {{ rpm }} </h4>
         <h4> {{ mileage }} </h4>
      </div>
   </div>
</template>

<script lang="ts">
   import Vue from 'vue'
   import Component from 'vue-class-component';
   
   interface VehicleLights {
      daylights: boolean
      highbeams: boolean
   };

   @Component
   export default class VehicleDashboard extends Vue {

      vehicleName: string | null = null;
      
      maxSpeed: number = 200;
      maxFuel: number = 100;
      speed: number = 0;
      rpm: number = 0;
      fuel: number = 5;
      mileage: number = 0.0;
      gear: string = 'N';
      
      seatbelt: boolean = false;
      indicators: boolean[] = [false, false];
      lights: VehicleLights = { 
         daylights: false,
         highbeams: false
      };


      update (speed: number, rpm: number, gear: string, mileage: number) {
         this.speed = speed;
         this.rpm =rpm;
         this.gear = gear;
         this.mileage = mileage;
      }
      
      mounted () {
         //@ts-ignore
         if (window.mp) {
            //@ts-ignore
            mp.events.add('BROWSER::GAME_UI:VEHICLE:NAME', name => this.vehicleName = name);
            //@ts-ignore
            mp.events.add('BROWSER::GAME_UI:VEHICLE:UPDATE', this.update)
         }
      }
   }

</script>

<style scoped>

   .vehicle-info {
      position: absolute;
      bottom: 30px;
      right: 20px;
      width: 250px;
      min-height: 100px;
      height: auto;
   }

   .main {
      margin: auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
   }
   
   .speed h2.number {
      width: 150px;
      margin: auto;
      font-size: 5rem;
      font-weight: 800;
      margin: 10px 0;
      color: whitesmoke;
      letter-spacing: 0.35rem;
      text-shadow: 0 1px 1.5px rgb(0 0 0 / 45%);
      position: relative;
      text-align: right;
      z-index: 1;
      font-family: 'digital-7', sans-serif;
   }

   h2.speed small { 
      font-family: 'Montserrat', sans-serif;
      font-size: 0.7rem;
      background: red;
      font-weight: 300;
      letter-spacing: 0;
   }
   
   .speed h2.number::after {
      width: 150px;
      font-size: 5rem;
      font-weight: 800;
      letter-spacing: 0.35rem;
      z-index: -1;
      position: absolute;
      width: 100%;
      top: 0;
      opacity: 0.35;
      right: 0;
      content: '888';
      color: #cdcdcd;
   }


   .fuel-bar {
      width: 125px;
      height: 6px;
      border-radius: 5px;
      overflow: hidden;
      background: rgb(0 0 0 / 45%);
   }

   .fuel-bar .bar {
      height: 100%;
      transition: all .3s ease;
      background: #ffcc45;
   }

   @keyframes blinking {
      50% { background: #00d474; }
   }

</style>