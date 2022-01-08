import Vue from 'vue';
import Vuex from 'vuex';
import { InterfaceStore } from './modules/interface';

Vue.use(Vuex);

export default new Vuex.Store({
   state: {
      
   },
   
   mutations: {

   },

   actions: {

   },

   modules: {
      interfaces: InterfaceStore
   },
});
