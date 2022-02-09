

<template>
   <div class="vehicle-info">
      <div class="driving-info"> 
         <h2 class="speed"> {{ speed }} <small> kmh </small> </h2>
         <h2 class="rpm"> {{ rpm }} <small> rpm </small> </h2>
      </div>

      <h4 class="vehicle-name" v-if="vehicleName"> {{ vehicleName }} </h4>
   </div>
</template>

<script>
   export default {
      data () { 
         return {
            vehicleName: null,
            seatbelt: false,
            speed: 0,
            maxSpeed: 300,
            rpm: 0,
            indicators: [true, false],
            lights: { daylights: true, highbeams: true },
            fuel: 0,
            gear: 'N',
            failures: { Engine: false },
            mileage: 0.00
         }
      },

      methods: { 

         update: function (speed, rpm, gear) { 
            this.speed = speed;
            this.rpm = rpm;
            this.gear = gear;
         }
      },

      mounted () { 
         if (window.mp) { 
            mp.events.add('BROWSER::GAME_UI:VEHICLE:NAME', name => this.vehicleName = name);
            mp.events.add('BROWSER::GAME_UI:VEHICLE:UPDATE', this.update)
         }
      }
   }
</script>

<style scoped>

   .vehicle-info { 
      position: absolute; bottom: 20px; padding: 15px 10px; right: 30px;
      display: flex; justify-content: center; flex-direction: column;
      text-shadow: 0 0.7px 1px rgb(0 0 0 / 90%);
   }

   .driving-info {
      width: 200px;
   }

   .driving-info h2 { position: relative; width: 120px; margin: 0 10px; text-align: center; color: #cdcdcd; font-weight: 450; }
   .driving-info h2 small { font-size: 0.75rem; color: #959eaa; text-transform: uppercase; display: block; letter-spacing: 1px; }


   h2.speed {
      font-family: 'digital-7', sans-serif;
      font-weight: 800;
      font-size: 3.2rem;
      opacity: 0.85;
      color: #cdcdcd;
   }


   h4.vehicle-name { text-align: center; margin: 25px 0 0 0; font-size: 0.8rem; font-weight: 350; color: #ffcc45; letter-spacing: 1.05px; }


   @keyframes blinking {
      50% { background: #00d474; }
   }

</style>