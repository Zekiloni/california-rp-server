

<template>
   <div class="phone">
      <div class="screen" :style="{ opacity: settings.brightness }">
         <div class="header">
            <h4> {{ time }} </h4>
            <div class="info">
               <div class="wifi" /> 
               <div class="battery" /> 
            </div>

         </div>
         
         <transition name="fade" mode="out-in"> 
            <div class="applications" v-if="!opened" key=applications>
               <ul class="list">
                  <li v-for="application in applications" :key="application.name" @click="open(application)"> 
                     <img :src="require('@/assets/images/icons/phone/' + application.icon + '.png')" />
                     <h4> {{ application.name }} </h4>
                  </li>
               </ul>
            </div>
         
            <div class="application" v-else key=openedApplication >

               <SettingsApp 
                  v-if="opened.icon == 'settings'" 
                  @brightness="settings.brightness"
                  @update-brightness="brightness"
                  
               />

               <MessagesApp 
                  v-if="opened.icon == 'messages'" 
               />

               <div class="home-button">
                  <button @click="close(opened)"> H </button>
               </div>
            </div>
         </transition>
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

   interface Application {
      name: string
      icon: string
      opened: boolean
   }

   interface Settings {
      brightness: number
      background?: string | null
      number?: string | null
      volume: number
      notifications: boolean
   }

   @Component({
      components: {
         SettingsApp, MessagesApp
      }
   })
   export default class Phone extends Vue { 

      Messages = Messages;
      time: string = '';

      settings: Settings | null = {
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
      
      notifications (toggle: boolean) {
         this.settings!.notifications = toggle;
      }

      open (application: Application) {
         application.opened = true;
      }

      close (application: Application) {
         application.opened = false;
      }

      mounted () {
         this.clock();
      }
   }
   
</script>

<style scoped>
   .phone { 
      position: absolute;
      bottom: 30px;
      right: 350px;
      width: 290px;
      height: 525px;
      background: linear-gradient(120deg, rgb(11 14 17 / 75%), rgb(11 14 17 / 15%));
      border-radius: 25px;
      box-shadow: 0 1px 5px rgb(0 0 0 / 55%);
      border: 1px solid rgb(205 205 205 / 15%);
      overflow: hidden;
   }

   .screen { 
      position: relative;
      width: 100%;
      height: 100%;
      transition: all .3s ease;
   }

   .header { 
      display: flex;
      justify-content: space-between;
      padding: 10px 20px;
      background: rgb(20 20 20 / 55%);
   }

   .header h4 {
      color: whitesmoke;
      margin: 0;
      font-weight: 500;
      letter-spacing: 1.2px;
   }

   .info {
      widows: auto;
      height: auto;
      display: flex;
   }
   
   .header .battery {
      width: 28px;
      background: white;
      mask: url('../../../assets/images/icons/phone-baterry.svg') no-repeat center;
      mask-size: cover; 
   }

   .header .wifi { 
      width: 17px;
      background: #cdcdcd;
      mask: url('../../../assets/images/icons/wifi.svg') no-repeat center;
      mask-size: cover;
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

   ul.list li * {
      transition: all .3s ease;
   }

   ul.list li:hover img { 
      opacity: 0.9;
   }

   ul.list li:hover h4 {
      color: #cdcdcd;
   }

   ul.list li img {
      opacity: 0.75;
      width: 50px;
   }

   ul.list li h4 {
      margin: 0;
      font-size: 0.7rem;
      color: #848e9c;
      font-weight: 400;
   }

   .application { 
      width: 100%;
      position: relative;
      height: 490px;
   }

   .home-button {
      position: absolute;
      height: 45px;
      padding: 10px 0;
      bottom: 0;
      left: 0;
      background: rgb(50 50 50 / 45%);
      width: 100%;
      display: grid;
   }

   .home-button button { 
      margin: auto;
      width: 45px;
      height: 45px;
      box-shadow: 0 0 3px #623fdc;
      background: linear-gradient(-45deg, #623fdc, #4c318e);
      border-radius: 100%;
      color: whitesmoke;
      transition: all .3s ease;
   }

   .home-button button:hover {
      filter: brightness(1.15);
   }
   
</style>