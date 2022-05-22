

<template>
   <div class="phone">
      <div class="screen" :style="{ opacity: settings.brightness }">
         <div class="header" :class="{ opened: opened }">
            <h4> {{ time }} </h4>
            <div class="info">
               <img src="@/assets/images/icons/phone/signal.png" class="signal" /> 
               <div class="battery" /> 
            </div>
         </div>
         
         <div class="applications" v-if="!opened && !inCall" key=applications>
            <ul class="list">
               <li v-for="application in applications" :key="application.name" @click="open(application)"> 
                  <img :src="require('@/assets/images/icons/phone/' + application.icon + '.png')" />
                  <h4> {{ application.name }} </h4>
               </li>
            </ul>
         </div>
      
         <div class="application" v-else-if="opened" key=openedApplication >
            <SettingsApp 
               v-if="opened.icon == 'settings'" 
               @brightness="settings.brightness"
               @update-brightness="brightness"
               @update-power="power"
            />

            <MessagesApp 
               v-if="opened.icon == 'messages'" 
               @send-message="send"
            />

            <TaxiApp
               v-if="opened.icon == 'taxi'"
            />
         </div>

            <div class="home-button">
               <button @click="close(opened)"> H </button>
            </div>

         <InCall
            v-if="inCall"
            :inCall="inCall"
            @on-answer="answer"
            @on-hangup="hangup"
            key=inCall
         />
      </div>
   </div>
</template>

<script lang="ts">
   import Vue from 'vue';
   import Component from 'vue-class-component';
   import { PhoneContact, PhoneMessage } from '@/models';
   import { Messages } from '@/globals';

   import SettingsApp from './SettingsApp.vue';
   import MessagesApp from './MessagesApp.vue';
   import InCall from './inCall.vue';
   import TaxiApp from './TaxiApp.vue';

   interface Application {
      name: string
      icon: string
      opened: boolean
   }

   interface Settings {
      power: boolean
      brightness: number
      background?: string | null
      number?: string | null
      volume: number
      notifications: boolean
   }

   interface Call {
      incoming: boolean
      number: number | null
      started: number | null
      inCall: boolean
   }


   @Component({
      components: {
         SettingsApp, MessagesApp, InCall, TaxiApp
      }
   })
   export default class Phone extends Vue { 

      Messages = Messages;
      time: string = '';

      focused: boolean = true;

      inCall: Call | null = null;

      settings: Settings | null = {
         power: true,
         brightness: 1.0,
         volume: 1,
         background: null,
         number: null,
         notifications: true
      }

      messages: PhoneMessage[] = [];
      contacts: PhoneContact[] = [];

      applications: Application[] = [
         {
            name: 'Settings',
            icon: 'settings',
            opened: false
         },
         {
            name: 'Calls',
            icon: 'calls',
            opened: false
         },
         {
            name: 'Messages',
            icon: 'messages',
            opened: false
         },
         {
            name: 'Downtown Cab',
            icon: 'taxi',
            opened: false
         },
         {
            name: 'Wallet',
            icon: 'wallet',
            opened: false
         }
      ];

      get opened () {
         return this.applications.find(application => application.opened == true);
      }

      clock () {
         const now = new Date();
         
         this.time = now.getHours() + ':' + (now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes());
   
         setTimeout(this.clock, 1000);
      }

      brightness (i: number) {
         this.settings!.brightness = i;
      }

      background (url: string) {
         this.settings!.background= url;
      }
      
      power () {
         this.settings!.power = !this.settings?.power;
      }

      notifications (toggle: boolean) {
         this.settings!.notifications = toggle;
      }

      open (application: Application) {
         application.opened = true;
      }

      close (application: Application) {
         if (application) {
            application.opened = false;
         }
      }

      call (incoming: boolean, number: number, inCall: boolean) {
         this.inCall = {
            incoming: incoming,
            number: number,
            inCall: inCall,
            started: Date.now()
         }
      }

      answer () {
         this.inCall!.inCall = true;
         this.inCall!.started = Date.now();
         mp.events.call('CLIENT::PHONE:CALL');
      }

      hangup () {
         this.inCall = null;
      }

      send (compose: { to: number, message: string } ) {
         if (!compose.to || !compose.message) {
            return;
         }
      }

      mounted () {
         if (window.mp) {
            mp.events.add('BROWSER::PHONE:CALL', (info: string) => {
               const [incoming, number, inCall] = JSON.parse(info);

               this.call(incoming, number, inCall);
            });
         }

         this.clock();
      }
   }
   
</script>

<style scoped>
   .phone { 
      font-family: 'Montserrat', sans-serif;
      position: absolute;
      bottom: 5vh;
      right: 35vh;
      width: 290px;
      height: 545px;
      background: url('../../../assets/images/phone/bg-1.png');
      background-size: cover;
      background-size: cover;
      border-radius: 30px;
      box-shadow: 0 1px 5px rgb(0 0 0 / 55%);
      border: 1px solid #100f14;
      overflow: hidden;
   }

   .screen { 
      position: relative;
      width: 100%;
      height: 100%;
      transition: all .3s ease;
   }

   .header { 
      position: relative;
      z-index: 1;
      display: flex;
      justify-content: space-between;
      padding: 10px 20px;
   }
   
   .header.opened {
      backdrop-filter: blur(5px);
      background: #100f14;
   }

   .header h4 {
      color: whitesmoke;
      margin: 0;
      font-size: 0.825rem;
      font-weight: 450;
      letter-spacing: 1px;
   }

   .info {
      width: auto;
      height: auto;
      display: flex;
   }
   
   .header .battery {
      width: 25px;
      background: white;
      mask: url('../../../assets/images/icons/phone-baterry.svg') no-repeat center;
      mask-size: cover; 
   }

   .header .signal { 
      height: 14px;
      margin-top: 1.5px;
      margin-right: 5px;
   }
   
   .applications ul.list {
      list-style: none;
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
   }

   ul.list li {
      display: flex;
      flex-direction: column;
      width: 90px;
      height: 90px;
      align-items: center;
      justify-content: center;
   }

   ul.list li {
      transition: all .3s ease;
   }

   ul.list li:hover { 
      filter: brightness(1.15);
   }

   ul.list li img {
      margin-bottom: 2px;
      width: 55px;
   }

   ul.list li h4 {
      margin: 0;
      font-size: 0.55rem;
      color: whitesmoke;
      max-width: 75px;
      text-align: center;
      font-weight: 450;
   }

   .application { 
      width: 100%;
      height: 445px;
      position: relative;
   }

   .home-button {
      position: absolute;
      height: 45px;
      padding: 10px 0;
      bottom: 0;
      backdrop-filter: blur(5px);
      background: #100f14;
      left: 0;
      width: 100%;
      display: grid;
   }

   .home-button button { 
      margin: auto;
      width: 45px;
      height: 45px;
      box-shadow: 0 0 3px #302f36;
      background: linear-gradient(-45deg, #1c1b22, #302f36);
      border-radius: 100%;
      color: whitesmoke;
      transition: all .3s ease;
   }

   .home-button button:hover {
      filter: brightness(1.15);
   }
   
</style>