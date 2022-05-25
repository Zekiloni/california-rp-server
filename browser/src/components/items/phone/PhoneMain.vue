

<template>
   <div class="phone">
      <div class="screen">
         <div class="header" :class="{ opened: opened }">
            <h4> {{ time }} </h4>
            <div class="info">
               <img src="@/assets/images/icons/phone/signal.png" class="signal" /> 
               <div class="battery" /> 
            </div>
         </div>
         
         <transition name="app-bounce" mode="out-in"> 
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
                  :phone="phone"
               />

               <CallsApp 
                  v-if="opened.icon == 'calls'"
                  :contacts="phone.contacts"
                  @on-call="call"
               />

               <MessagesApp 
                  v-if="opened.icon == 'messages'" 
                  :phoneNumber="phone.number"
                  :contacts="phone.contacts"
                  :messages="phone.messages"
                  @send-message="sendMessage"
               />

               <ContactsApp
                  v-if="opened.icon == 'contacts'"
                  :contacts="phone.contacts"
                  @add-contact="addContact"
                  @on-call="call"
               />

               <TaxiApp
                  v-if="opened.icon == 'taxi'"
               />
            </div>

            <InCall
               v-if="inCall"
               :inCall="inCall"
               :contacts="phone.contacts"
               @on-answer="answer"
               @on-hangup="hangup"
               key=inCall
            />
         </transition>

         <div class="home-button" v-if="!inCall">
            <button @click="close(opened)"> <div class="icon"> </div> </button>
         </div>

      </div>
   </div>
</template>

<script lang="ts">
   import Vue from 'vue';
   import Component from 'vue-class-component';
   import { PhoneData, PhoneMessage } from '@/models';
   import { Messages } from '@/globals';

   import SettingsApp from './SettingsApp.vue';
   import CallsApp from './CallsApp.vue';
   import MessagesApp from './MessagesApp.vue';
   import ContactsApp from './ContactsApp.vue';
   import InCall from './inCall.vue';
   import TaxiApp from './TaxiApp.vue';

   interface PhoneApp {
      name: string
      icon: string
      opened: boolean
      disabled?: true
   }

   interface Call {
      incoming: boolean
      number: number | null
      started: number | null
      inCall: boolean
   }

   @Component({
      components: {
         SettingsApp, CallsApp, MessagesApp, ContactsApp, InCall, TaxiApp
      }
   })
   export default class Phone extends Vue { 
      phone: PhoneData | null = {
         personName: null,
         number: 321199,
         power: true,
         brightness: 1.0,
         contacts: [
            {
               id: 1,
               name: 'Čovek',
               number: 4444,
               createdAt: new Date()
            },
            {
               id: 2,
               name: 'Stefania',
               number: 908,
               createdAt: new Date()
            }
         ],
         messages: [
            {
               id: 1,
               from: 321199,
               to: 6591511,
               message: 'eej si tu',
               seen: false,
               sent: new Date(),
            },
            {
               id: 2,
               from: 6591511,
               to: 321199,
               message: 'Da',
               seen: false,
               sent: new Date(),
            },
            {
               id: 3,
               from: 321199,
               to: 54676,
               message: 'Pozdrav',
               seen: false,
               sent: new Date(),
            },
            {
               id: 4,
               from: 321199,
               to: 4444,
               message: 'hej',
               seen: false,
               sent: new Date()
            },
            {
               id: 4,
               from: 321199,
               to: 65757,
               message: 'lorem ipsuj kisum tisum supak',
               seen: false,
               sent: new Date()
            },
            {
               id: 4,
               from: 321199,
               to: 87686,
               message: 'lorem ipsuj kisum tisum supak',
               seen: false,
               sent: new Date()
            },
            {
               id: 4,
               from: 321199,
               to: 87686,
               message: 'lorem ipsuj kisum tisum supak',
               seen: false,
               sent: new Date()
            },
            {
               id: 4,
               from: 321199,
               to: 908,
               message: 'lorem ipsuj kisum tisum supak',
               seen: false,
               sent: new Date()
            },
            {
               id: 4,
               from: 321199,
               to: 908,
               message: 'hoćemo danas u guzu ?',
               seen: false,
               sent: new Date()
            },
            {
               id: 4,
               from: 321199,
               to: 86786786,
               message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis quis convallis nunc. Maecenas cursus lorem et est lacinia mattis. Donec tristique velit augue, non tempus sapien tristique ut. Cras tempus eu risus sit amet euismod. Nullam venenatis arcu nisi, nec imperdiet lectus rutrum non. ',
               seen: false,
               sent: new Date()
            }
         ]
      }

      messages: PhoneMessage[] = [];
      inCall: Call | null = null;

      applications: PhoneApp[] = [
         {
            name: Messages.PHONE_APP_SETTINGS,
            icon: 'settings',
            opened: false
         },
         {
            name: Messages.PHONE_APP_CALLS,
            icon: 'calls',
            opened: false
         },
         {
            name: 'Messages',
            icon: 'messages',
            opened: false
         },
         {
            name: 'Kontakti',
            icon: 'contacts',
            opened: false
         },
         {
            name: 'Wallet',
            icon: 'wallet',
            opened: false
         },
         {
            name: 'Downtown Cab',
            icon: 'taxi',
            opened: false
         }
      ];

      Messages = Messages;
      time: string = '';

      get opened () {
         return this.applications.find(application => application.opened == true);
      }

      clock () {
         const now = new Date();
         this.time = now.getHours() + ':' + (now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes());
   
         setTimeout(this.clock, 1000);
      }

      open (application: PhoneApp) {
         if (application.disabled) return;
         application.opened = true;
      }

      close (application: PhoneApp) {
         if (application) {
            application.opened = false;
         }
      }

      call (incoming: boolean, number: number, inCall: boolean) {
         if (this.opened) {
            this.opened.opened = false;
         }

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

      sendMessage (to: number, message: string) {
         if (!to || !message) {
            return;
         }

         console.log('send 2')

         this.phone?.messages.push(
            {
               id: Math.random(),
               from: this.phone?.number!,
               to: to,
               message: message,
               seen: false,
               sent: new Date()
            }
         )
      }

      addContact (name: string, contactNumber: number) {
         this.phone?.contacts.push({
            id: 0,
            name: name,
            number: contactNumber,
            createdAt: new Date()
         })
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
      /* font-family: 'Montserrat', sans-serif; */
      position: absolute;
      bottom: 5vh;
      right: 35vh;
      width: 290px;
      height: 545px;
      background: url('../../../assets/images/phone/bg-2.png');
      background-size: cover;
      border-radius: 30px;
      box-shadow: 0 1.5px 7px rgb(0 0 0 / 55%);
      /* border: 1px solid #100f14; */
      /* overflow: hidden; */
   }

   .screen { 
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: 25px;
      overflow: hidden;
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
      transition: all .2s ease;
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
      -webkit-user-drag: none;
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
      background: #100f14;
      left: 0;
      width: 100%;
      display: grid;
   }

   .home-button button { 
      margin: auto;
      width: 45px;
      height: 45px;
      display: grid;
      box-shadow: 0 0 3px #302f36;
      background: linear-gradient(-45deg, #1c1b22, #302f36);
      border-radius: 100%;
      color: whitesmoke;
      transition: all .3s ease;
   }

   .home-button button .icon {
      width: 15px;
      height: 15px;
      background: transparent;
      margin: auto;
      border-radius: 5px;
      border: 2px solid grey;
   }

   .home-button button:hover {
      filter: brightness(1.15);
   }

   .app-bounce-enter-active {
      animation: app-bounce 0.15s;
   }

   .app-bounce-leave-active {
      animation: app-bounce 0.15s reverse;
   }

   @keyframes app-bounce {
      from { transform: scale(0.5); opacity: 0.5; }
      to { transform: scale(1); }
   }
   
</style>