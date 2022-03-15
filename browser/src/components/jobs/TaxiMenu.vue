
<template>
   <div class="taxi-menu">
      <div class="taxi">
         <div class="header">
            <div class="logo"> 
               <div class="icon"> </div>
            </div>
            <div class="text">
               <h4> {{ Messages.ACTIVE_TAXI_DRIVERS }} <b> {{ activeWorkers }} </b></h4>
               <h2> {{ Messages.TAXI_MENU }} </h2>
            </div>
         </div>
         
         <transition name="fade" mode="out-in"> 

            <div class="menu" v-if="pages.menu" key="menu">
               <button @click="isWorking ? stop : (pages.work = true, pages.menu = false)"> {{ isWorking ? 'prekini posao' : 'zapocni posao' }} </button>
               <button @click="menu = false" :disabled="!isWorking"> calls </button>
            </div>

            <div class="calls" v-if="pages.calls" key="calls">
               <h2> calls </h2>
               <button @click="menu = true"> </button>
               <h4 v-if="calls.length == 0"> </h4>
               <ul v-else> 
                  <li v-for="(call, i) in calls" :key="i"> {{ call }} </li>
               </ul>
            </div>
            
            <div class="work" v-if="pages.work" key="work">
               <button @click="start(true)"> {{ Messages.S_TX }} </button>
               <button @click="start(false)"> {{ Messages.S_TX_PRIVATE }} </button>
               <button class="cancel" @click="pages.menu = true, pages.work = false"> {{ Messages.CANCEL }} </button>
            </div>

         </transition>
      </div>
   </div>
</template>

<script lang="ts">
   import Vue from 'vue';
   import Component from 'vue-class-component';
   import { Messages } from '@/globals';

   enum TaxiCallStatus {
      NONE, ACCEPTED
   }

   interface TaxiCall {
      caller: string
      phone: number
      status: TaxiCallStatus
      position: { x: number, y: number, z: number }
   }

   @Component
   export default class TaxiMenu extends Vue {
      
      pages = {
         menu: true,
         startWork: false,
         calls: false
      };

      activeWorkers: number = 0;
      isWorking: boolean = false;

      calls: TaxiCall[] = [];

      Messages = Messages;

      stop () {
         mp.events.callProc('CLIENT::TAXI:STOP').then((isStoped: boolean) => { 
            if (isStoped) {
               this.isWorking = isStoped;
            }
         });
      }

      start (rentVehicle: boolean) {
         mp.events.callProc('CLIENT::TAXI:START', rentVehicle).then((started: boolean) => {
            console.log('started')
            if (started) {
               console.log('started')
               this.pages.startWork = false;
               this.isWorking = true;
               this.pages.menu = true;
            }
         });
      }

      mounted () {
         if (window.mp) {
            mp.events.add('BROWSER::TAXI_INFO', (isWorking: boolean, workers: number, calls: string) => {
               this.isWorking = isWorking;
               this.activeWorkers = workers;
               this.calls = JSON.parse(calls);
            });
         }
      }
   }
</script>

<style scoped>
   .taxi-menu { 
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(rgb(71 77 87 / 45%), rgb(11 14 17 / 85%));
      display: grid;
   }

   .taxi { 
      width: auto;
      min-width: 450px;
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
      box-shadow: 0 0 3px #ffcc45;
      background: linear-gradient(-45deg, #ffcc45, #ffb901);
      display: grid;
   }

   .header .logo .icon {
      width: 60px;
      height: 60px;
      margin: auto;
      mask-size: cover; 
      background: rgb(15, 15, 15);
      mask: url('../../assets/images/icons/taxi.svg') no-repeat center;
   }

   .header .text {
      margin: 0 20px;
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

   .menu {
      display: flex;
      margin-top: 50px;
      justify-content: space-between;
      align-items: center;
   }

   button {
      width: 220px;
      padding: 15px 0;
      font-size: 1rem;
      border-radius: 4px;
      transition: all .3s ease;
      font-weight: 500;
   }

   button:disabled {
      opacity: 0.5;
   }

   button:hover { 
      filter: brightness(1.15);
   }
   
   button:disabled:hover {
      filter: none;
   }

   .work button {
      width: 350px;
      display: block;
      margin: 20px auto;
      background: linear-gradient(45deg, #6749d6, #4c318e);
      color: whitesmoke;
   }
   

   .work button.cancel { 
      background: rgb(255 255 255 / 5%);
      backdrop-filter: brightness(1.1);
      color: #cdcdcd;
   }
</style>