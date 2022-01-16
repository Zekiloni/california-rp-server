

<template>
   
   <div class="job-offer" v-if="job">
      <div class="box"> 
         <div class="header"> 
            <div class="offer"> 
               <div class="icon handshake"> </div>
            </div>
            <h2> {{ Messages.JOB_OFFER }} </h2>
         </div>

   
         <p class="info"> 
            {{ Messages.JOB_OFFER_CONFIRM }} 
            <b>{{ job.description }}</b> 
            {{ Messages.IN }} 
            <b>{{ job.name }}</b> ?
         </p>

         <h3> adadqa </h3>

      </div>
   </div>

</template>

<script>
   import { Messages } from '@/globals';

   export default { 
      data () { 
         return { 
            decision: false,
            job: null,
            
            Messages
         }
      },

      methods: { 
         Cancel: function (element) {
            this.Descision = true;
            element.classList.add('canceled');
            mp.trigger('CLIENT::JOB:OFFER');
         },

         Accept: function (element) { 
            this.Descision = true;
            element.classList.add('accepted');
            mp.trigger('CLIENT::JOB:ACCEPT');
         }
      },

      mounted () { 
         if (window.mp) { 
            mp.events.add('BROWSER::JOB:OFFER', info => this.job = JSON.parse(info));
         }
      }
   }
</script>


<style scoped>

   .job-offer { position: absolute; bottom: 0; width: 100%; display: flex; justify-content: center; align-items: center; left: 0; bottom: 15px; height: 250px; }

   .box { 
      width: 350px; height: 100%; border-radius: 20px; display: flex; align-items: center; flex-direction: column;
      background: linear-gradient(180deg, rgb(11 14 17 / 85%), transparent);
   }

   .header { 
      position: relative; width: 100%; border-top-left-radius: 10px;
   }

   .header h2 {
      margin: 0; color: #cdcdcd; font-weight: 450; margin-top: 15px; text-align: center; font-size: 1.1rem;
   }

   .offer { 
      margin: 0 auto;
      margin-top: 25px;
      border-radius: 100%;
      height: 60px; width: 60px;
      display: flex; justify-content: center; align-items: center;
      background: #4c318e;
   }

   .offer .icon.handshake { 
      width: 35px; height: 35px; background: whitesmoke; mask-size: cover;
      mask: url('../../assets/images/icons/handshake.svg') no-repeat center;
   }

   * { text-shadow: 0 0 0.6px rgb(0 0 0 / 65%); }

   p.info { width: 280px; color: #939dac; font-weight: 350; text-align: center; margin: 0; }
   p.info b { color: #9ca5b3; font-weight: 650; }

   h3.hint { margin: 0; }
   
</style>