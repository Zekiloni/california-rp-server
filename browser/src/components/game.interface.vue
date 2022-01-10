


<template>
   
   <div class="game-interface">
      
      <Offer />

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
         <h2 class="money"> {{ Helpers.Dollars(money) }} </h2>
      </div>
   </div>

</template>

<script>

   import Offer from './Offer.vue';
   import { Messages } from '../globals';
   import Helpers from '../helpers';
   import { VueSvgGauge } from 'vue-svg-gauge'


   export default { 

      components: {
         Offer, VueSvgGauge
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

            Driving: true,               
            Seatbelt: false,
            Driving_Info: { 
               Speed: 154,
               Max_Speed: 300,
               Indicators: [true, false],
               Lights: { lightsOn: true, highbeamsOn: true },
               Fuel: 0,
               Gear: 'N',
               Failure: { Engine: false },
               Mileage: 0.00
            },

            sounds: { 
               money: new Audio('src/sounds/money.mp3'),
               seatbelt: { 
                  put: new Audio('src/sounds/seatbelt_put.mp3'), remove: new Audio('src/sounds/seatbelt_remove.mp3')
               }
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
         },

         Seatbelt: function (toggle) { 
            toggle ? this.sounds.seatbelt.put.play() : this.sounds.seatbelt.remove.play();
         }
      },

      computed: { 
         Vehicle_Speed: function () { 
            const Speed = this.Driving_Info.Speed * 100 / this.Driving_Info.Max_Speed;
            return Speed + '%';
         },

         Vehicle_Lights: function () { 
            const Lights = this.Driving_Info.Lights;
            if (!Lights.lightsOn && !Lights.highbeamsOn) { return 'off'; }
            else if (Lights.lightsOn && !Lights.highbeamsOn) { return 'on'; }
            else if (!Lights.lightsOn && Lights.highbeamsOn) { return 'on-2'; }
            else if (Lights.lightsOn && Lights.highbeamsOn) { return 'on-2'; }
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


         Vehicle_Indicators: function (i) { 
            return this.Driving_Info.Indicators[i] ? 'blinking' : 'off';
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

   h3, h2 { margin: 0; text-shadow: 0 0 0.6px rgb(0 0 0 / 65%); }

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

   .player {  position: absolute; top: 70px; right: 10px; padding: 15px 10px; }

   .player h2.money { 
      font-family: 'Montserrat ExtraBold';
      color: #fffdf6;
      font-size: 1.65rem;
      font-weight: 500;
      text-shadow: none;
   }

   .info { 
      position: absolute;
      bottom: 20px;
      padding: 15px 10px;
      left: 315px;
      width: 300px;
      height: auto;
   }

   .date-time { margin-bottom: 25px; }
   .date-time h2 { color: #cdcdcd; font-weight: 350; }
   .date-time h3 { font-weight: 450; color: #848e9c; font-size: 0.9rem; }

   .location h2 { color: #fede29; font-weight: 500; }
   .location h3.street { color: #cdcdcd; font-weight: 350; }
   .location h3.zone { font-weight: 450; color: #848e9c; font-size: 0.9rem; }



   @keyframes blinking {
      50% { background: #00d474; }
   }


   


</style>