<template>

   <div id="app">
      <Lobby v-if="interfaces.Lobby" />

      <Creator v-if="interfaces.Creator" />

      <GameInterface v-if="interfaces.GameInterface" />
      <Notifications v-if="interfaces.Notifications" />


      <Chat v-if="interfaces.Chat" />

      <transition name="fade"> 
         <Inventory v-if="interfaces.Inventory" /> 
      </transition>
      

      <Banking v-if="interfaces.Banking" />
      
      <!-- [HOUSES] -->
      <transition name="fade"> 
         <HouseInfo v-if="interfaces.HouseInfo" />
      </transition>

      <!-- [BUSINESSES] -->
      <Market v-if="interfaces.Market" />

      <transition name="bounce"> 
         <JobOffer v-if="interfaces.Job_Offer" />
      </transition>


      <!-- <transition name="bounce">
         <Lobby v-if="interfaces.Lobby" />
      </transition>      -->

         <!-- FOCUS ROLEPLAY BUTTON LOL 
         <button class="frp-1"> Test </button>
         <button class="frp-2"> Test </button>
         <button class="frp-3"> Test </button>
         <button class="frp-4"> Test </button>
         <button class="frp-red"> Test </button>
         <button class="frp-green"> Test </button> 
         -->

   </div>
</template>

<script>
   import { mapMutations, mapState } from 'vuex';
   import './assets/styles/main.css';
   import './assets/styles/font-awesome.css';

   import Lobby from '@/components/lobby.vue';
   import Creator from './components/Creator.vue';
   import Notifications from './components/notifications.hints.vue';
   import GameInterface from './components/game.interface.vue';
   import Chat from './components/chat';
   import Inventory from './components/items/inventory.vue';
   import Banking from './components/Banking.vue';
   import JobOffer from './components/jobs/job.offer.vue';
   import Market from './components/business/Market.vue';
   import HouseInfo from './components/houses/house.info.vue';

   export default { 

      components: { 
         Lobby, Creator, Notifications, GameInterface, Inventory, Chat, Banking, JobOffer,
         Market, HouseInfo
      },

      data () { 
         return {

         }
      },

      mounted () { 
         if (window.mp) { 
            mp.events.add('BROWSER::SHOW', data => { 
               this.show(data);
            });

            mp.events.add('BROWSER::HIDE', data => { 
               this.hide(data);
            }); 
         }
      },

      methods: {
         ...mapMutations('interfaces', [
            'show', 
            'hide'
         ])     
      },

      computed: {
         ...mapState(['interfaces'])
      }
   }
   

   

</script>

