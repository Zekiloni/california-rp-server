<template>

   <div id="app">
      <!-- <Map /> -->
      <Notifications />

      <transition name="fade" mode="out-in"> 
         <Authorization v-if="interfaces.authorization.toggle" key=authorization />
         <Creator v-if="interfaces.characterCreator.toggle" key=creator />
      </transition>

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

      <transition name="fade"> 
         <Banking v-if="interfaces.banking.toggle" key=banking />
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
         <BusinesInfo v-if="interfaces.businessInfo.toggle" key=businessInfo />
         <BusinesManagement v-if="interfaces.businessManagement.toggle" key=businessManagement />
      </transition-group>
      
      <transition name="fade"> 
         <MarketMenu v-if="interfaces.marketMenu.toggle" key=marketMenu />
         <ClothingMenu v-if="interfaces.clothingMenu.toggle" key=clothingMenu />
         <RentMenu v-if="interfaces.rentMenu.toggle" key=rentMenu />
         <VehicleDealership v-if="interfaces.dealershipMenu.toggle" key=dealershipMenu />
      </transition>


      <!-- [VEHICLES MENU] -->
      <transition name="fade-with-bottom-slide"> 
         <VehiclesMenu v-if="interfaces.vehiclesMenu.toggle" key=vehicleMenu />
         <VehicleTrunk v-if="interfaces.trunk.toggle" key=vehicleTrunk />
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


      <!-- [POLICE] -->
      <PoliceRadar v-if="interfaces.policeRadar.toggle" />

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

      <!-- [JOBS] -->
      <transition name="fade-with-bottom-slide">
         <BusStations v-if="interfaces.busStations.toggle" />
      </transition>
      <transition name="fade"> 
         <TaxiMenu v-if="interfaces.taxiMenu.toggle" />
      </transition>

      <transition name="fade"> 
         <ElectricBox v-if="interfaces.electricBox.toggle" />
      </transition>

   </div>
</template>

<script>
   import { mapMutations, mapState } from 'vuex';
   import './assets/styles/main.css';
   import './assets/styles/animations.css'
   import './assets/styles/font-awesome.css';


   import Notifications from '@/components/player/Notifications.vue';
   import Authorization from '@/components/player/Authorization.vue';
   import Creator from '@/components/creator.vue';
   import Offer from '@/components/player/Offer.vue';
   import Hints from '@/components/Hints.vue';
   import Chat from '@/components/TextChat';
   import GameInterface from '@/components/GameInterface.vue';
   import PlayerMenu from '@/components/player/PlayerMenu.vue';
   import DeathScreen from '@/components/player/DeathScreen.vue';
   import Playerlist from '@/components/misc/Playerlist.vue';
   import Document from './components/misc/id.document.vue';

   import Banking from '@/components/banking/bank/Bank.vue';
   import ATM from '@/components/banking/atm/ATM.vue';
   
   import Inventory from '@/components/items/Items.vue';

   import VehiclesMenu from '@/components/vehicles/VehiclesMenu.vue';
   import VehicleTrunk from '@/components/vehicles/VehicleTrunk.vue';

   import Phone from '@/components/items/phone/PhoneMain.vue';
   import HandheldRadio from '@/components/misc/HandheldRadio.vue';

   import HouseInfo from '@/components/houses/HouseInfo.vue';
   
   import BusinesInfo from '@/components/business/BusinesInfo.vue';
   import BusinesManagement from '@/components/business/BusinesManagement.vue';
   import MarketMenu from '@/components/business/menus/MarketMenu.vue';
   import ClothingMenu from '@/components/business/menus/ClothingMenu.vue';
   import VehicleDealership from '@/components/business/menus/VehicleDealership.vue';
   import RentMenu from '@/components/business/menus/RentVehicle.vue';

   import ObjectsMenu from '@/components/builder/ObjectsMenu.vue';
   import ObjectEditor from '@/components/builder/ObjectEditor.vue';

   import FactionPanel from '@/components/faction/FactionPanel.vue';
   import FactionGarage from '@/components/faction/FactionGarage.vue';

   import PoliceRadar from './components/faction/police/PoliceRadar.vue';

   import BusStations from '@/components/jobs/BusStations.vue';
   import TaxiMenu from '@/components/jobs/TaxiMenu.vue';
   import ElectricBox from '@/components/jobs/ElectricBox.vue';

      
   export default { 
      components: { 
         Authorization, Creator, Notifications, Hints, GameInterface, Playerlist,
         Offer, PlayerMenu, Inventory, Chat, Banking, ATM, HouseInfo,
         Phone, Document, HandheldRadio, DeathScreen,

         VehiclesMenu, VehicleTrunk,

         ObjectsMenu, ObjectEditor,
         
         BusinesInfo, BusinesManagement, MarketMenu, ClothingMenu, RentMenu, VehicleDealership,

         FactionPanel, FactionGarage, 
         PoliceRadar, 

         BusStations, TaxiMenu, ElectricBox
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

<style>
   body {
      /* For Development Streaming */
      /* background: black; */
   }

   input::-webkit-outer-spin-button,
   input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
   }
   
</style>

