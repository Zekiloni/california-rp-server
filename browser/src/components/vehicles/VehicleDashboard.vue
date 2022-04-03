

<template>
   <div class="vehicle-info">
      <div class="main">

         <div class="speedo">
            <h2> {{ speed }} <small>kmh</small> </h2>
            <div class="bars">
               <div class="bar" v-for="bar in bars" :key="'bar' + bar" :class="{ active: speed > bar }" > </div>
            </div>
         </div>
        
         <div class="dashboard">
            <div class="fuel">
               <h2> {{ (100 - (speed / 10)).toFixed(0) }} <small>l</small> </h2>  
               <div class="tank">
                  <div class="amount" :style="{ width: (100 - (speed / 10)) + '%'}"> </div>
               </div>
            </div>
            <h3 class="mileage"> {{ mileage }} <small>km</small> </h3>
         </div>
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

      bars: number[] = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270]

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
         if (window.mp) {
            mp.events.add('BROWSER::GAME_UI:VEHICLE:NAME', (name: string) => this.vehicleName = name);

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
      max-width: 250px;
      min-height: 100px;
      height: auto;
   }

   .main {
      width: 100%;
      margin: auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: flex-end;
   }

   @keyframes blinking {
      50% { background: #00d474; }
   }

   .speedo {
      display: flex;
      padding: 10px 0;
      flex-direction: column;
      align-items: flex-end;
      width: 100%;
   }

   .speedo h2 {
      width: 100%;
      text-align: right;
      font-size: 2rem;
      color: whitesmoke;
      margin: 0;
   }

   .speedo h2 small {
      text-transform: uppercase;
      font-size: 0.95rem;
      color: grey;
   }

   .bars { 
      display: flex;
      justify-content: flex-end;
   }

   .bars .bar { 
      width: .4vw;
      height: 2.05vw;
      border-radius: .5vw;
      margin: 0 0.25vw;
      background-color: rgba(16, 15, 20, 0.75);
      transition: all .15s ease;
   }

   .bars .bar.active {
      background: #fdb91b;
   }

   .fuel {
      width: 100px;
      height: auto;
      margin: 5px 0;
      display: grid;
   }

   .fuel h2 { 
      width: 100%;
      text-align: right;
      font-size: 1.25rem;
      color: whitesmoke;
      margin: 0;
   }

   .fuel h2 small {
      font-size: 0.95rem;
      color: grey;
   }

   .fuel .tank {
      width: 100%;
      height: 10px;
      position: relative;
      overflow: hidden;
      border-radius: 3px;
      background-color: rgba(16, 15, 20, 0.75);
   }

   .fuel .tank .amount {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background: #fdb91b;
   }

   .dashboard {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 5px 0;
   }
   
   .dashboard h3.mileage {
      color: white;
      margin: 0;
   }

   h3.mileage small { color: grey; }

   .blinkers {
      display: flex;
      margin-top: 30px;
      justify-content: center;
   }

   .blinkers .blinker { 
      margin: 0 10px;
      width: 30px;
      height: 30px;
      border-radius: 100%;
      background: rgb(11 14 17 / 15%);
      backdrop-filter: brightness(1.1);
      display: grid;
   }

   .icon {
      margin: auto;
      mask: url('../../assets/images/icons/arrow-down.svg') no-repeat center; 
      mask-size: cover; 
      width: 20px;
      height: 20px;
      background: white;
   }

   .icon.left {
      transform: rotate(90deg);
   }

   .icon.right {
      transform: rotate(-90deg);
   }

</style>