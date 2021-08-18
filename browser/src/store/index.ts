import Vue from 'vue';
import Vuex from 'vuex';
import { InterfaceStore } from './modules/interface';
import VTooltip from 'v-tooltip'

Vue.use(Vuex);
Vue.use(VTooltip)

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
