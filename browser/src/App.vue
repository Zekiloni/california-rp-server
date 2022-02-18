<template>

   <div id="app">

      <Lobby v-if="interfaces.lobby" />

      <Creator v-if="interfaces.characterCreator" />

      <GameInterface v-if="interfaces.gameInterface" />
      <Notifications v-if="interfaces.notifications" />

      <DeathScreen v-if="interfaces.deathScreen" />


      <Chat v-if="interfaces.chat" />

      <!-- [MISC] -->
      <transition name="fade"> 
         <Inventory v-if="interfaces.inventory" /> 
      </transition>
      
      <transition name="fade">
         <Document v-if="interfaces.idDocument" />
      </transition>
      
      <transition> 
         <Phone v-if="interfaces.phone" />
      </transition>

      <Playerlist v-if="interfaces.playerlist" />

      <transition name="fade-with-bottom-slide"> 
         <Banking v-if="interfaces.banking" key=banking />\
         <ATM v-if="interfaces.atm" key=atm />
      </transition>
   

      <!-- [ITEMS] -->
      <HandheldRadio v-if="interfaces.handheldRadio" />

      <!-- [HOUSES] -->
      <transition name="fade"> 
         <HouseInfo v-if="interfaces.houseInfo" />
      </transition>


      <!-- [BUSINESSES] -->
      <transition-group name="fade-with-bottom-slide">
         <BusinessInfo v-if="interfaces.businessInfo" key=businessInfo />
         <BusinessManagement v-if="interfaces.businessManagement" key=businessManagement />
      </transition-group>
      
      <transition name="fade"> 
         <MarketMenu v-if="interfaces.marketMenu" key=marketMenu />
         <ClothingMenu v-if="interfaces.clothingMenu" key=clothingMenu />
         <RentMenu v-if="interfaces.rentMenu" key=rentMenu />
      </transition>


      <transition name="fade"> 
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
   import './assets/styles/animations.css'
   import './assets/styles/font-awesome.css';

   import Lobby from '@/components/lobby.vue';
   import Creator from '@/components/creator.vue';
   import Notifications from '@/components/Notifications.vue';
   import Chat from '@/components/TextChat';
   import GameInterface from '@/components/GameInterface.vue';
   import DeathScreen from '@/components/player/DeathScreen.vue';
   import Playerlist from '@/components/misc/Playerlist.vue';
   import Document from './components/misc/id.document.vue';
   import Banking from './components/other/banking.vue';
   import ATM from './components/other/atm.vue';
   import JobOffer from './components/jobs/job.offer.vue';

   import Inventory from '@/components/items/Items.vue';

   import Phone from '@/components/phone.vue';
   import HandheldRadio from '@/components/misc/HandheldRadio.vue';

   import HouseInfo from '@/components/houses/HouseInfo.vue';
   
   import BusinessInfo from '@/components/business/BusinessInfo.vue';
   import BusinessManagement from '@/components/business/BusinessManagement.vue';
   import MarketMenu from '@/components/business/menus/MarketMenu.vue';
   import ClothingMenu from '@/components/business/menus/ClothingMenu.vue';
   import RentMenu from '@/components/business/menus/RentVehicle.vue';
   
   export default { 

      components: { 
         Lobby, Creator, Notifications, GameInterface, Playerlist,
         Inventory, Chat, Banking, ATM, JobOffer, HouseInfo, 
         Phone, Document, HandheldRadio, DeathScreen,
         
         BusinessInfo, BusinessManagement, MarketMenu, ClothingMenu, RentMenu
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

