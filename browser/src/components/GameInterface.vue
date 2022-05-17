


<template>
   
   <div class="game-interface" :style="{ opacity: hidden ? '0' : '1' }">
      
      <transition name="fade"> 
         <VehicleInterface v-if="driving" />
      </transition>

      <div class="server">
         <img src="@/assets/images/text-logo.png" />
         <h4 class="online"> {{ Messages.ONLINE_PLAYERS }} <b> {{ onlinePlayers }} </b> </h4>
         <h4 class="id"> id <b>#{{ playerId }} </b> </h4>
      </div>

      <div class="money">
         <h2> {{ dollars(money) }} </h2>
      </div>

      <div class="info"> 
         <div class="date-time"> 
            <h2> {{ rightNow.time }}</h2>
            <h3> {{ rightNow.date }}</h3>
         </div>

         <div class="location"> 
            <h2> {{ location.heading }} </h2>
            <h3 class="street "> {{ location.street }} </h3>
            <h3 class="zone"> {{ location.zone }} </h3>
         </div>
      </div>
   </div>

</template>

<script>

   import { Messages } from '@/globals';
   import Helpers from '@/helpers';
   import VehicleInterface from '@/components/vehicles/VehicleDashboard.vue';

   export default { 

      components: {
         VehicleInterface
      },

      data () { 
         return { 

            hidden: false,
            blackScreen: false,

            money: 0,

            rightNow: { date: '', time: '' },

            playerId: 0,
            onlinePlayers: 3250,

            location: { 
               street: 'kurvo jedna',
               zone: 'bedna picko smrdljiva',
               heading: 'N'
            },
           
            driving: false,

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

            mp.events.add('BROWSER::GAME_UI:HIDDEN', hidden => this.hidden = hidden);

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

   .game-interface { 
      width: 100%; 
      height: 100%; 
      position: absolute; 
      transition: all .3s ease;
      /* background: url('https://i.imgur.com/XUJTwKm.png');
      background-position: center;
      background-repeat: no-repeat; */
      text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
   }

   .server { 
      position: absolute;
      top: 0;
      right: 0;
      padding: 25px 20px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      text-align: right;
   }

   .server img {
      width: 125px;
      margin-right: -2.5px;
      margin-bottom: 10px;
   }

   .server h4 {
      font-size: 0.95rem;
      font-weight: 500;
      margin: 3px 0;
      color: #fefefe;
   }

   .server h4.id {
      color: #c2c2c2;
      text-transform: uppercase;
   }

   .money {
      position: absolute;
      top: 125px;
      right: 0;
      padding: 25px 20px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      text-align: right;
   }

   .money h2 {
      font-size: 3vh;
      color: #fefefe;
   }

   h3, h2, h4 { margin: 0; }

   .info { 
      position: absolute; 
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      bottom: 25px; 
      left: 30vh; 
      width: 300px; 
      height: auto;
   }

   .date-time { 
      margin: 15px 0; 
   }

   .date-time h2 { 
      color: #fefefe; 
      font-weight: 450; 
      font-size: 1.2rem;
   }

   .date-time h3 { 
      font-weight: 500; 
      color: #c2c2c2; 
      font-size: 1rem; 
   }

   .location {
      margin: 15px 0; 
   }

   .location h2 { 
      color: #fcb91f;
      font-weight: 800; 
      font-size: 1.75rem;
   }
   
   .location h3.street { 
      color: #fefefe; 
      font-weight: 450;
      font-size: 1.2rem; 
   }

   .location h3.zone { 
      font-weight: 500; 
      color: #c2c2c2; 
      font-size: 1rem; 
      text-transform: capitalize; 
   }
   
</style>