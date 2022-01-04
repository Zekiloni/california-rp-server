

<template>
   
   <div class="job-offer">
      <div class="box"> 
         <div class="offer"> 
            <div class="icon handshake"> </div>
         </div>
   
         <div class="text"> 
            <h2> {{ Messages.JOB_OFFER }} </h2>
            <p> 
               {{ Messages.JOB_OFFER_CONFIRM }} 
               <b>{{ Job.Description }}</b> 
               {{ Messages.IN }} 
               <b>{{ Job.Name }}</b> ?
            </p>
         </div>

         <div class="actions"> 
            <button class="frp-1 accept" v-on:click="Accept($event.target)" :disabled="Descision"> {{ Messages.ACCEPT }} </button>
            <button class="frp-2 cancel" v-on:click="Cancel($event.target)" :disabled="Descision"> {{ Messages.CANCEL }} </button>
         </div>
      </div>
   </div>

</template>

<script>
   import { Messages } from '@/Globals';

   export default { 
      data () { 
         return { 
            Descision: false,
            Job: { 
               Name: 'Gradska Cistoca Los Santos',
               Description: 'Smećar'
            },
            
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
         mp.invoke('focus', true);
         
         mp.events.add('BROWSER::JOB_OFFER', (Info) => { 
            this.Job = Info;
         });
      },

      destroyed () { 
         mp.invoke('focus', false);
      }
   }
</script>


<style scoped>
   .job-offer { 
      position: absolute;
      bottom: 0;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      left: 0;
      bottom: 15px;
      height: 200px;
   }

   .box { 
      width: 380px;
      height: 100%;
      border-radius: 15px;
      display: flex;
      align-items: center;
      flex-direction: column;
      background: linear-gradient(90deg, #21252f 0%, #13161c 100%);
      box-shadow: rgb(0 0 0 / 15%) 0px 1px 20px 0px;
   }

   .offer { 
      border-radius: 100%;
      height: 75px; width: 75px;
      margin-top: -30px;
      display: flex; justify-content: center; align-items: center;
      background: linear-gradient(141deg, rgba(104,69,234,1) 0%, rgba(66,54,128,1) 100%);
   }

   .offer .icon.handshake { 
      width: 45px; height: 45px; background: whitesmoke; mask-size: cover;
      mask: url('../../assets/images/icons/handshake.svg') no-repeat center;
   }

   .text { width: 320px; }
   .text h2 { color: rgb(223, 223, 223); margin: 5px 0; }
   .text p { color: rgb(209, 209, 209); font-weight: 200; }

   button { font-size: 15px; }
   button:disabled { opacity: 0.5; }
   button:disabled:hover { box-shadow: none; color: whitesmoke; }
   button.accepted { background: rgb(68, 191, 103); color: whitesmoke; }
   button.canceled { background: tomato; color: whitesmoke; }

   
</style>