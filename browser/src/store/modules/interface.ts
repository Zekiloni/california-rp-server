



import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const InitialState = {
   notifications: true,
   chat: false,

   lobby: true,
   characterCreator: false,

   gameInterface: false,
   deathScreen: false,

   inventory: false,
   phone: false,
   handheldRadio: false,
   idDocument: false,
   licenses: false,
   
   // banking
   banking: false,
   atm: false,

   playerlist: false,

   // jobs interfaces
   job_Offer: false,
   Miner: false,
   Food: false,
   Transit: false,

   // busines interfaces
   businessInfo: false,
   businessManagement: false,
   marketMenu: false,
   clothingMenu: false,
   rentMenu: false,

   drinks_Shop: false,
   gas_Station: false,
   dealership: false,
   
   House: false,

   DMV: false,
      
   houseInfo: false,

   // builder
   objectsMenu: false,
   objectEditor: false,

   // faction
   factionPanel: false
}

export const InterfaceStore = {

   namespaced: true,

   state: () => ({
      ...InitialState
   }),

   mutations: {
      show: function (state: typeof InitialState, payload: keyof typeof InitialState) { 
         state[payload] = true;
      },

      hide: function (state: typeof InitialState, payload: keyof typeof InitialState) {
         state[payload] = false;
      }
   },

   actions: {

   },

   modules: {
      
   },
};
