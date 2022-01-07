


<template>
   
   <div class="game-interface">
      
      <Offer />

      <div class="top-right">
         <ul class="server">
            <li> <div class="icon user"> </div> <h3> {{ Players }} </h3> </li>
            <li> <div class="icon users"> </div> <h3> {{ Remote_ID }} </h3> </li>
            <li> 
               <h2> 
                  {{ Messages.FOCUS }} 
                  <small> {{ Messages.ROLEPLAY }} </small> 
               </h2>
            </li>
         </ul>

         <div class="player">

            <h2 class="money"> {{ Helpers.Dollars(Money) }} </h2>
         </div>

      </div>
      

      <div class="bottom-left">
         <div class="location">
            <h2> {{ Location.Heading }} </h2>
            <h3> {{ Location.Zone }} </h3>
            <h4> {{ Location.Street }} </h4>
         </div>

         <div class="date-time">
            <h3> {{ cTime }} </h3>
            <h4> {{ cDate }} </h4>
         </div>
      </div>


      <div class="bottom-right">
         <div class="driving" v-if="Driving">
            <div class="speed">
               <div class="speedometer">
                  <div class="bar" :style="{ width: Vehicle_Speed }"> </div>
               </div>
               <h1 class="digi-speed"> 
                  {{ Driving_Info.Speed }} 
                  <small> km/h </small>
               </h1>
            </div>


            <div class="fuel">
               <vue-svg-gauge
                  :start-angle="-110"
                  :end-angle="0"
                  :value="3"
                  :separator-step="25"
                  :min="0"
                  :max="100"
                  gauge-color="#2fc782"
                  :scale-interval="5.0"
               />            
            </div>

            <ul class="v-indicators">
               <li> <div class="icon car-lights" :class="Vehicle_Lights"> </div> </li>
               <li> <div class="icon indicator-arrow-left" :class="Vehicle_Indicators(0)"> </div> </li>
               <li> <div class="icon indicator-arrow-right" :class="Vehicle_Indicators(1)"> </div> </li>
            </ul>
  
         </div>
      </div>


   </div>

</template>

<script>

   import Offer from './Offer.vue';
   import { Messages } from '../Globals';
   import Helpers from '../Helpers';
   import { VueSvgGauge } from 'vue-svg-gauge'


   export default { 

      components: {
         Offer, VueSvgGauge
      },

      data () { 
         return { 

            Toggle: true,
            Blackscreen: false,

            cTime: '',
            cDate: '',

            Money: 0,
            Remote_ID: 0,
            Players: 0,

            Location: { 
               Street: 'Miletova Ulica',
               Zone: 'ustaghajebem',
               Heading: 'N'
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
         Money: function (newValue, oldValue) { 
            if (oldValue == 0) return;
            newValue > oldValue ? this.change = 0 : this.change = 1;
            this.changeValue = newValue - oldValue;
            setTimeout(() => { this.change = null; }, 3000);
            this.sounds.money.play();
         },

         Seatbelt: function (toggle) { 
            toggle ? this.sounds.seatbelt.put.play() : this.sounds.seatbelt.remove.play();
         }
      },

      mounted: function () { 
        this.Update();
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
         Update: function () {

            const Now = new Date();
            this.cTime = Now.getHours() + ':' +(Now.getMinutes() < 10 ? 0 + '' + Now.getMinutes() : Now.getMinutes());

            let Month = new Intl.DateTimeFormat('sr-Latn-RS', { month: 'long' }).format(Now);
            this.cDate = Now.getDate() + '. ' + Month + ', ' + Now.getFullYear();


            this.Driving_Info.Speed = Math.floor(Math.random() * 250);;

            setTimeout(() => { this.Update(); }, 1000);
         },


         Vehicle_Indicators: function (i) { 
            return this.Driving_Info.Indicators[i] ? 'blinking' : 'off';
         }
      },

      mounted () { 
         mp.events.add('BROWSER::GAME_UI:UPDATE_LOCATION', (street, zone, heading) => { 
            this.Location.Street = street;
            this.Location.Zone = zone;
            this.Location.Heading = heading;
         });
      }
   }

</script>

<style scoped>

   @import url('http://fonts.cdnfonts.com/css/road-rage');

   .game-interface { 
      width: 100%;
      height: 100vh;
      overflow: hidden;
      background: rgb(0 0 0 / 35%);
   }

   .bottom-left { 
      position: absolute;
      width: 400px;
      min-height: 100px;
      height: auto;
      left: 355px;
      bottom: 15px;
   }

   .top-right { 
      position: absolute;
      top: 15px;
      right: 20px;
      width: 285px;
      height: auto;
      min-height: 100px;
   }

   .bottom-right { 
      position: absolute;
      bottom: 15px;
      right: 20px;
      width: 300px;
      height: auto;
      min-height: 100px;
   }

   .location { width: 100%; position: relative; }
   .location h2, .location h3, .location h4 { margin: 0; letter-spacing: 0.55px; }
   .location h2 { color: whitesmoke; text-transform: uppercase; }
   .location h3 { color: whitesmoke; font-weight: 200; font-size: 16px; }
   .location h4 { color: #c7c7c7; font-weight: 200; font-size: 13px; }
   .location::before { 
      position: absolute; left: -25px; top: 5px; content: '';
      mask: url('../assets/images/icons/location.svg') no-repeat center; mask-size: cover;
      width: 17px; height: 17px; background: #fed52e;
   }

   .date-time { width: 100%; position: relative; margin-top: 15px; }
   .date-time h3, .date-time h4 { margin: 0; letter-spacing: 0.55px; font-weight: 200; }
   .date-time h3 { color: whitesmoke; font-size: 16px; }
   .date-time h4 { color: #d0d0d0; font-size: 13px; }
   .date-time::before { 
      position: absolute; left: -25px; top: 5px; content: '';
      mask: url('../assets/images/icons/clock.svg') no-repeat center; mask-size: cover;
      width: 17px; height: 17px; background: #fed52e;
   }

   .icon { width: 17px; height: 17px; background: #fed52e; }
   .icon.user { mask: url('../assets/images/icons/user.svg') no-repeat center; mask-size: cover; }
   .icon.users { mask: url('../assets/images/icons/users.svg') no-repeat center; mask-size: cover; }

   ul.server { display: flex; list-style: none; padding: 0; justify-content: space-between; align-items: center; margin: 0; height: 65px; }
   ul.server li { display: flex; justify-content: center; align-items: center; }
   ul.server li h2 { position: relative; text-transform: uppercase; color: white; letter-spacing: 2px; font-weight: 800; font-size: 30px; }
   ul.server li h3 { margin: 0 7px; color: whitesmoke;  }
   ul.server li h2 small { position: absolute; bottom: 0px; left: 1px; font-size: 15px; font-weight: 300; color: #fed52e; letter-spacing: 0.7px; font-family: 'Road Rage', sans-serif; }

   .player { display: flex; flex-direction: column; }
   .player h2.money { color: whitesmoke; width: 100%; text-align: right; font-size: 25px; }

   .speed { width: 100%; display: flex; justify-content: space-between; align-items: center; }
   .speedometer { width: 200px; height: 45px; background: rgb(0 0 0 / 30%); position: relative; clip-path: polygon(50% 50%, 100% 0, 100% 100%, 0% 100%); overflow: hidden; border-radius: 5px; }
   .speedometer .bar { position: absolute; top: 0; transition: all 0.35s ease; left: 0; height: 100%; background: #fed52e; width: 0%; }
   .speed h1.digi-speed { color: whitesmoke; width: 100px; text-align: center; margin: 0; }
   h1.digi-speed small { display: block; color: #d0d0d0; font-size: 12px; font-weight: 300; text-transform: uppercase; letter-spacing: 1.25px; font-size: 11px; }

   ul.v-indicators { width: 100%; display: flex; align-items: center; padding: 0; list-style: none; }
   ul.v-indicators li { width: 30px; margin: 0 6px; height: 30px; display: flex; align-items: center; justify-content: center; background: rgb(0 0 0 / 60%); border-radius: 5px; }
   ul.v-indicators li .icon { width: 17px; height: 17px; background: rgb(245 245 245 / 70%); }
   .icon.car-lights { mask: url('../assets/images/icons/car-lights.svg') no-repeat center; mask-size: cover; }
   .icon.car-lights.on { background: #00b865; }
   .icon.car-lights.on-2 { background: #0b70cf; }
   .icon.indicator-arrow-right { mask: url('../assets/images/icons/right-arrow.svg') no-repeat center; mask-size: cover; }
   .icon.indicator-arrow-left { mask: url('../assets/images/icons/right-arrow.svg') no-repeat center; mask-size: cover; transform: rotate(180deg); }
   .blinking { animation: blinking 1s step-start 0s infinite; }

   .fuel { width: 200px; height: 200px; }

   @keyframes blinking {
      50% { background: #00d474; }
   }


   


</style>