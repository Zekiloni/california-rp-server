



import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


interface uInterface {
   toggle: false,
   mouse: boolean
   hideChat?: boolean
   disableChat: boolean
   hideUI?: boolean
}

const InitialState = {
   notifications: { toggle: true },
   chat: { toggle: false },

   lobby: { toggle: true, mouse: true },
   characterCreator: { toggle: false, mouse: true },

   gameInterface: { toggle: false },
   deathScreen: { toggle: false },

   inventory: { toggle: false, mouse: true, },
   phone: { toggle: false, mouse: true },
   handheldRadio: { toggle: false, mouse: true },
   idDocument: { toggle: false, mouse: true },
   licenses: { toggle: false, mouse: true },
   
   // banking
   banking: { toggle: false, mouse: true },
   atm: { toggle: false, mouse: true },

   playerlist: { toggle: false, mouse: true },

   // jobs interfaces
   job_Offer: { toggle: false, mouse: true },
   Miner: { toggle: false },
   Food: { toggle: false },
   Transit: { toggle: false },

   // busines interfaces
   businessInfo: { toggle: false, mouse: true },
   businessManagement: { toggle: false, mouse: true },
   marketMenu: { toggle: false, mouse: true },
   clothingMenu: { toggle: false, mouse: true },
   dealershipMenu: { toggle: false, mouse: true },
   rentMenu: { toggle: false, mouse: true },

   drinks_Shop: { toggle: false, mouse: true },
   gas_Station: { toggle: false, mouse: true },
   dealership: { toggle: false, mouse: true },
   
   House: { toggle: false, mouse: true },

   DMV: { toggle: false, mouse: true },
      
   houseInfo: { toggle: false },

   // builder
   objectsMenu: { toggle: false },
   objectEditor: { toggle: false },

   // faction
   factionPanel: { toggle: false, mouse: true }
}

export const InterfaceStore = {

   namespaced: true,

   state: () => ({
      ...InitialState
   }),

   mutations: {
      show: function (state: typeof InitialState, payload: keyof typeof InitialState) { 
         state[payload].toggle = true;
      },

      hide: function (state: typeof InitialState, payload: keyof typeof InitialState) {
         state[payload].toggle = false;
      }
   },

   actions: {

   },

   modules: {
      
   },
};
