

<template>
   <div class="dealership">
      <ul v-if="vehicleInfo">
         <li> {{ vehicleInfo.name }} </li>
         <li> {{ vehicleInfo.class }} </li>
         <li> {{ vehicleInfo.maxSpeed }} </li>
         <li> {{ vehicleInfo.maxBraking }} </li>
         <li> {{ vehicleInfo.maxAcceleration }} </li>
         <li> {{ vehicleInfo.maxPassengers }} </li>
         <li> {{ vehicleInfo.maxTraction }} </li>   
      </ul>
   </div>
</template>

<script lang="ts">
   import Vue from 'vue';
   import Component from 'vue-class-component';
   import { Business } from '@/models';

   interface VehicleInfo { 
      name: string
      class: string
      maxSpeed: number
      maxBraking: number
      maxAcceleration: number
      maxPassengers: number
      maxTraction: number
   }

   @Component
   export default class VehicleDealership extends Vue { 
      
      busines: Business | null = null;
      
      currentVehicle: number = 0;
      vehicleInfo: VehicleInfo | null = null;

      mounted () {
         if (window.mp) {
            mp.invoke('focus', true);

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

               console.log(JSON.stringify(this.vehicleInfo))
            })
         }
      }

      beforeDestroy () {
         if (window.mp) {
            mp.invoke('focus', false);
         }
      }
   }
</script>
