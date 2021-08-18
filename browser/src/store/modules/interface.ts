



import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const InitialState = {
   Notifications: true,
   Authorization: false,
   Creator: false,
   GameInterface: false,
   Inventory: false,
   Playerlist: false,
   Chat: false,
   Banking: true,
   Job_Offer: false,
   Miner: false,
   Food: false,
   Transit: false,
   CharacterLicenses: false,
   CharacterIdentity: false,
   Clothing: false,
   Market: false,
   Drinks: false,
   Rent: false,
   Fuel: false,
   Dealership: false,
   House: false,
   Business: false,
   Phone: false,
   DMV: false
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