

<template>
   <div class="vehicle-info">
      <div class="main">
         <div class="speedo">
            <div class="speed">
               <h2> {{ speed }} </h2>
            </div>
            <div class="line" :style="{ transform: 'rotate(' + speed + 'deg)'}"> </div>
            <div class="blinkers">
               <div class="blinker"> <div class="icon left"> </div> </div>
               <div class="blinker"> <div class="icon right"> </div> </div>
            </div>
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


   @keyframes blinking {
      50% { background: #00d474; }
   }

   .speedo {
      width: 180px;
      height: 180px;
      position: relative;
      border: 1px solid rgb(132 142 156 / 15%);
      background: linear-gradient(120deg, rgb(11 14 17 / 25%), transparent);
      border-radius: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
   }

   .speedo .line {
      position: absolute;
      top: 90px;
      height: 8px;
      width: 180px;
      background: linear-gradient(90deg, transparent 0%, #ff2121 50%, transparent 55%);
   }

   .speedo .speed { text-align: center; }
   .speedo .speed h2 {
      margin: 0;
      margin-top: 25px;
      font-size: 3rem;
      background: -webkit-linear-gradient(whitesmoke, rgb(80, 80, 80));
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      -webkit-text-fill-color: transparent;
   }

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