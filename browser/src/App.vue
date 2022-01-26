<template>

   <div id="app">

      <Lobby v-if="interfaces.lobby" />

      <Creator v-if="interfaces.characterCreator" />

      <GameInterface v-if="interfaces.gameInterface" />
      <Notifications v-if="interfaces.notifications" />


      <Chat v-if="interfaces.chat" />

      <!-- [MISC] -->
      <transition name="fade"> 
         <Inventory v-if="interfaces.inventory" /> 
      </transition>
      
      <transition name="fade">
         <Document v-if="interfaces.id_Document" />
      </transition>
      
      <transition> 
         <Phone v-if="interfaces.phone" />
      </transition>

      <transition name="fade"> 
         <Banking v-if="interfaces.banking" />
      </transition>
   
      
      <!-- [HOUSES] -->
      <transition name="fade"> 
         <HouseInfo v-if="interfaces.houseInfo" />
      </transition>

      <!-- [BUSINESSES] -->
      <Market v-if="interfaces.market" />

      <transition name="bounce"> 
         <JobOffer v-if="interfaces.job_Offer" />
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
   import Creator from './components/creator.vue';
   import Notifications from './components/notifications.hints.vue';
   import GameInterface from './components/game.interface.vue';
   import Chat from './components/chat';
   import Inventory from './components/items/inventory.vue';
   import Document from './components/misc/id.document.vue';
   import Banking from './components/banking.vue';
   import JobOffer from './components/jobs/job.offer.vue';
   import Market from './components/business/Market.vue';
   import HouseInfo from './components/houses/house.info.vue';
   import Phone from './components/phone.vue';

   export default { 

      components: { 
         Lobby, Creator, Notifications, GameInterface, Inventory, Chat, Banking, JobOffer,
         Market, HouseInfo, Phone, Document
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

