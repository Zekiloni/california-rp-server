<template>

   <div id="app">

      <Notifications />

      <Lobby v-if="interfaces.lobby.toggle" />
      <Creator v-if="interfaces.characterCreator.toggle" />

      <GameInterface v-if="interfaces.gameInterface.toggle" />
      <Offer />
      <Hints v-if="interfaces.hints.toggle" />

      <DeathScreen v-if="interfaces.deathScreen.toggle" />

      <Chat v-if="interfaces.chat.toggle" />

      <!-- [MISC] -->

      <transition name="fade"> 
         <PlayerMenu v-if="interfaces.playerMenu.toggle" />
      </transition>

      <transition name="fade"> 
         <Inventory v-if="interfaces.inventory.toggle" /> 
      </transition>
      
      <transition name="fade">
         <Document v-if="interfaces.idDocument.toggle" />
      </transition>
      
      <transition name="fade-with-bottom-slide"> 
         <Phone v-if="interfaces.phone.toggle" />
      </transition>

      <Playerlist v-if="interfaces.playerlist.toggle" />

      <transition name="fade-with-bottom-slide"> 
         <Banking v-if="interfaces.banking.toggle" key=banking />\
         <ATM v-if="interfaces.atm.toggle" key=atm />
      </transition>
   

      <!-- [ITEMS] -->
      <HandheldRadio v-if="interfaces.handheldRadio.toggle" />

      <!-- [HOUSES] -->
      <transition name="fade"> 
         <HouseInfo v-if="interfaces.houseInfo.toggle" />
      </transition>


      <!-- [BUSINESSES] -->
      <transition-group name="fade-with-bottom-slide">
         <BusinessInfo v-if="interfaces.businessInfo.toggle" key=businessInfo />
         <BusinessManagement v-if="interfaces.businessManagement.toggle" key=businessManagement />
      </transition-group>
      
      <transition name="fade"> 
         <MarketMenu v-if="interfaces.marketMenu.toggle" key=marketMenu />
         <ClothingMenu v-if="interfaces.clothingMenu.toggle" key=clothingMenu />
         <RentMenu v-if="interfaces.rentMenu.toggle" key=rentMenu />
         <VehicleDealership v-if="interfaces.dealershipMenu.toggle" key=dealershipMenu />
      </transition>


      <transition name="fade"> 
         <JobOffer v-if="interfaces.job_Offer.toggle" />
      </transition>

      <!-- [VEHICLES MENU] -->
      <transition name="fade-with-bottom-slide"> 
         <VehiclesMenu v-if="interfaces.vehiclesMenu.toggle" />
      </transition>

      <!-- [BUILDER] -->
      <transition-group name="fade-with-bottom-slide"> 
         <ObjectsMenu v-if="interfaces.objectsMenu.toggle" key=objectsMenu />
         <ObjectEditor v-if="interfaces.objectEditor.toggle" key=objectEditor />
      </transition-group>



      <!-- [FACTION] -->
      <transition name="fade">
         <FactionPanel v-if="interfaces.factionPanel.toggle" />
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

   import Notifications from '@/components/player/Notifications.vue';
   import Lobby from '@/components/lobby.vue';
   import Creator from '@/components/creator.vue';
   import Offer from '@/components/player/Offer.vue';
   import Hints from '@/components/Hints.vue';
   import Chat from '@/components/TextChat';
   import GameInterface from '@/components/GameInterface.vue';
   import PlayerMenu from '@/components/player/PlayerMenu.vue';
   import DeathScreen from '@/components/player/DeathScreen.vue';
   import Playerlist from '@/components/misc/Playerlist.vue';
   import Document from './components/misc/id.document.vue';
   import Banking from './components/other/banking.vue';
   import ATM from './components/other/atm.vue';
   import JobOffer from './components/jobs/job.offer.vue';

   import Inventory from '@/components/items/Items.vue';

   import VehiclesMenu from '@/components/vehicles/VehiclesMenu.vue';

   import Phone from '@/components/items/phone/PhoneMain.vue';
   import HandheldRadio from '@/components/misc/HandheldRadio.vue';

   import HouseInfo from '@/components/houses/HouseInfo.vue';
   
   import BusinessInfo from '@/components/business/BusinessInfo.vue';
   import BusinessManagement from '@/components/business/BusinessManagement.vue';
   import MarketMenu from '@/components/business/menus/MarketMenu.vue';
   import ClothingMenu from '@/components/business/menus/ClothingMenu.vue';
   import VehicleDealership from '@/components/business/menus/VehicleDealership.vue';
   import RentMenu from '@/components/business/menus/RentVehicle.vue';

   import ObjectsMenu from '@/components/builder/ObjectsMenu.vue';
   import ObjectEditor from '@/components/builder/ObjectEditor.vue';

   import FactionPanel from '@/components/faction/FactionPanel.vue';
   import FactionGarage from '@/components/faction/FactionGarage.vue';
   
      
   export default { 

      components: { 
         Lobby, Creator, Notifications, Hints, GameInterface, Playerlist,
         Offer, PlayerMenu, Inventory, Chat, Banking, ATM, JobOffer,
         HouseInfo, Phone, Document, HandheldRadio, DeathScreen,

         VehiclesMenu,

         ObjectsMenu, ObjectEditor,
         
         BusinessInfo, BusinessManagement, MarketMenu, ClothingMenu, RentMenu, VehicleDealership,

         FactionPanel, FactionGarage
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

