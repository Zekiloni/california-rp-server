

<template>
   
</template>

<script>

   

   export default {
      data () { 
         return {
            seatbelt: false,
            speed: 154,
            maxSpeed: 300,
            indicators: [true, false],
            lights: { daylights: true, highbeams: true },
            fuel: 0,
            gear: 'N',
            failures: { Engine: false },
            mileage: 0.00
         }
      },

      methods: { 

         update: function (speed, gear, fuel, rpm) { 

         }

      },

      mounted () { 
         if (window.mp) { 
            mp.events.add('BROWSER::GAME_UI:VEHICLE:UPDATE', update)
         }
      }
   }
</script>