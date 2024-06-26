



import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


type uInterface = {
   [key: string]: {
      toggle: boolean
      mouse?: boolean
      hideUI?: boolean
      escClose?: string
   }
}


const InitialState:uInterface = {
   hints: { toggle: true },
   chat: { toggle: false },

   authorization: { toggle: false, mouse: true },
   characterCreator: { toggle: false, mouse: true },

   gameInterface: { toggle: false },

   playerMenu: {
      toggle: false,
      mouse: true,
      escClose: 'CLIENT::PLAYER_MENU:TOGGLE',
      hideUI: true
   },

   inventory: { 
      toggle: false, 
      mouse: true, 
      escClose: 'CLIENT::INVENTORY:TOGGLE'
   },

   phone: { 
      toggle: false, 
      mouse: true,
      escClose: 'CLIENT::PHONE:TOGGLE'
   },

   handheldRadio: { toggle: false, mouse: true },
   idDocument: { toggle: false, mouse: true },
   licenses: { toggle: false, mouse: true },
   
   deathScreen: { toggle: false },

   // banking
   banking: { toggle: false, mouse: true, escClose: 'CLIENT::BANKING:MENU' },
   atm: { toggle: false, mouse: true, escClose: '', hideUI: true },

   playerlist: { 
      toggle: false, 
      mouse: true 
   },

   // jobs interfaces
   job_Offer: { toggle: false, mouse: true },
   Miner: { toggle: false },
   Food: { toggle: false },
   Transit: { toggle: false },

   // busines interfaces
   businessInfo: { toggle: false },
   businessManagement: { toggle: false, mouse: true, hideUI: true, escClose: 'CLIENT::BUSINES_MANAGEMENT' },
   marketMenu: { toggle: false, mouse: true },
   clothingMenu: { toggle: false, mouse: true },

   dealershipMenu: { 
      toggle: false, 
      mouse: true, 
      hideUI: true, 
      escClose: 'CLIENT::DEALERSHIP:MENU' 
   },

   rentMenu: { toggle: false, mouse: true },

   drinks_Shop: { toggle: false, mouse: true },
   gas_Station: { toggle: false, mouse: true },
   
   House: { toggle: false, mouse: true },

   DMV: { toggle: false, mouse: true },
      
   houseInfo: { toggle: false },

   // builder
   objectsMenu: { toggle: false },
   objectEditor: { toggle: false },

   // faction
   factionPanel: { 
      toggle: false, 
      mouse: true,
      escClose: 'CLIENT::FACTION:PANEL' 
   },

   factionGarage: {
      toggle: false,
      mouse: true,
      escClose: 'CLIENT::FACTION:GARAGE'
   },

   // police
   policeRadar: { toggle: false },

   // vehicles
   vehiclesMenu: { toggle: false },
   trunk: { toggle: false, mouse: true },

   // jobs
   busStations: { toggle: false },
   taxiMenu: { toggle: false, mouse: true, escClose: 'CLIENT::TAXI:MENU', hideUI: true },
   electricBox: { toggle: false, mouse: true }

}

export const InterfaceStore = {

   namespaced: true,

   state: () => ({
      ...InitialState
   }),

   mutations: {
      show: function (state: typeof InitialState, payload: keyof typeof InitialState) { 
         state[payload].toggle = true;

         if (state[payload].mouse) {
            mp.invoke('focus', true);
         }

         if (state[payload].hideUI) {
            mp.events.call('CLIENT::GAME_UI:HIDDEN', true);
         }

         if (state[payload].escClose) {
            mp.events.call('CLIENT::PREVENT_ESC', true);
            document.onkeydown = close;

            function close (event: KeyboardEvent) {
               if (event.key == 'Escape') {
                  mp.events.call(state[payload].escClose!);
                  document.onkeydown = null;
               }
            }

         }
      },

      hide: function (state: typeof InitialState, payload: keyof typeof InitialState) {
         state[payload].toggle = false;

         if (state[payload].mouse) {
            mp.invoke('focus', false);
         }

         if (state[payload].hideUI) {
            mp.events.call('CLIENT::GAME_UI:HIDDEN', false);
         }

         if (state[payload].escClose) {
            mp.events.call('CLIENT::PREVENT_ESC', false);
            document.onkeydown = null;
         }
      },

      canOpenChat: function () {
         return; 
      },

   },

   actions: {

   },

   modules: {
      
   },
};
