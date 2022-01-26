



import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const InitialState = {
   notifications: true,
   chat: false,

   lobby: true,
   characterCreator: false,

   gameInterface: false,
   inventory: false,
   phone: false,
   id_Document: false,
   licenses: false,
   
   banking: false,
   atm: false,

   Playerlist: false,
   job_Offer: false,
   Miner: false,
   Food: false,
   Transit: false,

   Clothing: false,
   Market: false,
   Drinks: false,
   Rent: false,
   Fuel: false,
   Dealership: false,
   House: false,
   Business: false,

   DMV: false,
   
   houseInfo: false
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
