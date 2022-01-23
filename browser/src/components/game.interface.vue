


<template>
   
   <div class="game-interface">
      
      <Offer />

      <transition name="fade"> 
         <VehicleInterface v-if="driving" />
      </transition>


      <div class="server-info">
         <div class="player-id"> 
            <h2> # {{ playerId }}</h2>
            <h3> {{ Messages.YOUR_ID }} </h3>
         </div>
         <div class="online-players"> 
            <h2 class="online"> {{ onlinePlayers }} </h2>
            <h3> {{ Messages.ONLINE_PLAYERS }} </h3>
         </div>
         <img class="logo" src="@/assets/images/logo.png" />
      </div>

      <div class="info"> 
         <div class="date-time"> 
            <h2> {{ rightNow.time }}</h2>
            <h3> {{ rightNow.date }}</h3>
         </div>

         <div class="location"> 
            <h2> {{ location.heading }} </h2>
            <h3 class="street"> {{ location.street }} </h3>
            <h3 class="zone"> {{ location.zone }} </h3>
         </div>
      </div>

      <div class="player"> 
         <h2 class="money"> {{ formatDollars(money) }} </h2>
      </div>
   </div>

</template>

<script>

   import Offer from './offer.vue';
   import { Messages } from '../globals';
   import Helpers from '../helpers';
   import VehicleInterface from './vehicles/vehicle.main.vue';

   export default { 

      components: {
         Offer, VehicleInterface
      },

      data () { 
         return { 

            blackScreen: false,

            money: 0,

            rightNow: { date: '', time: '' },

            playerId: 0,
            onlinePlayers: 3250,

            location: { 
               street: 'Miletova',
               zone: '',
               heading: 'N'
            },
           
            driving: false,

            sounds: { 
               money: new Audio('src/sounds/money.mp3'),
            },

            Messages, Helpers
         }
      },

      watch: { 
         money: function (value, oldValue) { 
            if (oldValue == 0) return;
            value > oldValue ? this.change = 0 : this.change = 1;
            this.changeValue = value - oldValue;
            setTimeout(() => { this.change = null; }, 3000);
            this.sounds.money.play();
         }
      },

      methods: { 
         update: function () {

            const nowDateTime = this.Helpers.dateTime();
            this.rightNow.time = nowDateTime.getHours() + ':' +(nowDateTime.getMinutes() < 10 ? 0 + '' + nowDateTime.getMinutes() : nowDateTime.getMinutes());

            let Month = new Intl.DateTimeFormat('sr-Latn-RS', { month: 'long' }).format(nowDateTime);
            this.rightNow.date = nowDateTime.getDate() + '. ' + Month + ', ' + nowDateTime.getFullYear();

            setTimeout(this.update, 1000);
         },

         toggleDriving: function (toggle) {
            this.driving = toggle;
         }
      },

      mounted () { 
         if (window.mp) { 
            mp.events.add('BROWSER::GAME_UI:UPDATE_LOCATION', (street, zone, heading) => { 
               this.location.street = street;
               this.location.zone = zone;
               this.location.heading = heading;
            });

            mp.events.add('BROWSER::GAME_UI:PLAYER_ID', id => this.playerId = id);
            mp.events.add('BROWSER::GAME_UI:UPDATE_PLAYERS', players => this.onlinePlayers = players);

            mp.events.add('BROWSER::GAME_UI:UPDATE_MONEY', money => this.money = money);

            mp.events.add('BROWSER::GAME_UI:VEHICLE:TOGGLE', this.toggleDriving)
         }

         this.update();
      }
   }

</script>

<style scoped>


   .game-interface { width: 100%; height: 100%; position: absolute; }

   .server-info { 
      position: absolute;
      top: 10px;
      right: 10px;
      padding: 15px 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
   }
   
   .server-info img.logo { width: 65px; opacity: 0.75; }

   .online-players { margin: 0 25px; }
   .player-id { margin: 0 25px; }

   h3, h2 { margin: 0; text-shadow: 0 0 0.7px rgb(0 0 0 / 95%); }

   .online-players h3, .player-id h3 { font-weight: 450; color: #848e9c; font-size: 0.8rem; }
   .player-id h2 { color: #cdcdcd; font-weight: 350; }

   .online-players .online { position: relative; font-weight: 350; padding-left: 25px; color: #00d474; }

   .online::before { 
      position: absolute;
      left: 2px;
      top: 8px;
      content: '';
      width: 8px;
      height: 8px;
      border-radius: 100%;
      background: #00d474;
      box-shadow: 0 0 0 4px rgb(0 212 116 / 45%);
   }

   .player { position: absolute; top: 70px; right: 10px; padding: 15px 10px; }

   .player h2.money { 
      font-family: 'Montserrat ExtraBold';
      color: #fffdf6;
      font-size: 1.65rem;
      font-weight: 500;
      text-shadow: none;
   }

   .info { position: absolute; bottom: 20px; padding: 15px 10px; left: 315px; width: 300px; height: auto; }

   .date-time { margin-bottom: 25px; }
   .date-time h2 { color: #cdcdcd; font-weight: 350; }
   .date-time h3 { font-weight: 450; color: #959fae; font-size: 0.9rem; }

   .location h2 { color: #ffcc45; font-weight: 500; }
   .location h3.street { color: #cdcdcd; font-weight: 350; }
   .location h3.zone { font-weight: 450; color: #959fae; font-size: 0.9rem; }
</style>