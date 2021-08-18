


<template>
   <div class="offer-holder">
      <transition name="offer">
         <div class="offer" v-if="Offer" >
            <i class="icon-offer"> </i>
            <h2> {{ Offer.Title }} </h2>
            <p v-html="Offer.Message"> </p>

            <ul class="actions">
               <li class="accept" ref="Offer_Accept"> Y </li>
               <li class="decline" ref="Offer_Decline"> N </li>
            </ul>

            <div class="progress">
               <div class="bar" :style="Animation(Offer.Time)"> </div>
            </div>
         </div>
      </transition>
   </div>
</template>

<script>

   import Offer_Sound from '../assets/sounds/offer.mp3';

   export default { 
      data () { 
         return { 
            Offer: null,
            Audio: new Audio(Offer_Sound),
         }
      },

      mounted () { 

         mp.events.add('BROWSER::OFFER', (Title, Message, Event, Time = 4) => { 
            if (this.Offer != null) return;
            this.Make(Title, Message, Event, Time);
         }); 
         
         window.addEventListener('keyup', (e) => { 
            switch (e.key) {
               case 'y': { if (this.Offer) this.Accept(); break; }
               case 'n': { if (this.Offer) this.Decline(); break; }
            }
         });
      },

      methods: { 
         Make: function (Title, Message, Event, Time) { 
            this.Audio.play();
            this.Offer = { 
               Title: Title, Message: Message, Event: Event, Time: Time
            }
            setTimeout(() => { this.Offer = null; }, Time * 1000);
         },

         Animation: (Time) => {
            return { 
               animationDuration: Time + 's'
            }
         },

         Accept: function () { 
            this.$refs.Offer_Accept.classList.add('clicked');
            mp.trigger('CLIENT::OFFER:ACCEPT', this.Offer.Event);
            setTimeout(() => { this.Offer = null; }, 500);         
         },

         Decline: function () { 
            this.$refs.Offer_Decline.classList.add('clicked');
            mp.trigger('CLIENT::OFFER:DECLINE', this.Offer.Event);
            setTimeout(() => { this.Offer = null; }, 500);         
            ;
         }
      }
   }

</script>

<style scoped>

   .offer-holder { 
      width: 100%;
      position: absolute;
      min-height: 150px;
      z-index: 98;
      top: 20px;
      height: auto;
      display: flex;
      justify-content: center;
      align-items: center;
   }

   .offer { 
      height: auto;
      width: 225px;
      min-height: 200px;
      padding: 0 15px;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
   }

   .offer h2 { color: whitesmoke; text-shadow: 0 0 0.75px rgb(0 0 0 / 45%); font-size: 21px; margin: 5px 0; }
   .offer p { margin: 5px 0; color: whitesmoke; text-shadow: 0 0 0.75px rgb(0 0 0 / 45%); font-size: 16px; font-weight: 300; text-align: center; }

   ul.actions { padding: 0; list-style: none; display: flex; justify-content: space-between; width: 140px; margin-top: 10px; }
   ul.actions li { width: 35px; height: 35px; display: flex; justify-content: center; align-items: center; color: white; font-weight: 400; border-radius: 5px; transition: all 0.35s ease; border-radius: 100%; }

   li.accept { background: rgb(68, 191, 103); }
   li.decline { background: #ff4422; }

   ul.actions li.accept.clicked { color:rgb(68, 191, 103); background: white; }
   ul.actions li.decline.clicked { color:#ff4422; background: white; }

   ul.actions li:focus { background: black !important; }

   .icon-offer { width: 45px; height: 45px; mask: url('../assets/images/icons/offer.svg') no-repeat center; background: white; }

   .progress { position: relative; bottom: 0; width: 200px; height: 5px; background: rgb(0 0 0 / 50%); }

   .bar { position: absolute; bottom: 0;  left: 0; width: 0%; height: 5px; animation: progress ease; background: white; }

   @keyframes progress {
      from { width: 100%; }
      to { width: 0%; }
   }

   .offer-enter-active { animation: offer-in 0.35s; }
   .offer-leave-active { animation: offer-in 0.55s reverse; }

   @keyframes offer-in {
      0% { transform: translateY(-200px); }
      100% { transform: translateY(0px); }
   }

</style>