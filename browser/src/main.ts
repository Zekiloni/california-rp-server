import Vue from 'vue';
import App from './app.vue';
import router from './router';
import store from './store';
import VTooltip from 'v-tooltip'
import { Ranks } from './globals';



Vue.config.productionTip = false;
Vue.config.devtools = true;

//@ts-ignore
Vue.use(VTooltip);


Vue.mixin({
   methods: {

      playAudio: function (audioSource) {
         const audio = new Audio(audioSource);
         audio.play();
      },
      
      dollars (i: number) { 
         return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(i); 
      },

      onSale (property: any) { 
         return property.owner == null || property.owner == 0 ? true : false;
      },

      getRank (i: number) {
         return Ranks[i];
      },

      truncate (str: string, n: number) { 
         return (str.length > n) ? str.substr(0, n-1) + '...' : str; 
      },

      isUpper: (str: string) => {
         return /[A-Z]/.test(str[0]);
      },

      capitalize: (text: string) => {
         return text.charAt(0).toUpperCase() + text.slice(1);
      },

      formatDate (i: Date) { 
         i = new Date(i); 
         return i.getDate() + '.' + (i.getMonth() + 1) + '.' + i.getFullYear() + ' - ' + i.getHours() + ':' + i.getMinutes() + ':' + i.getSeconds(); 
      },

      borderWarning (element: Element) {
         element.classList.add('border-warning');
         setTimeout(() => { element.classList.remove('border-warning'); }, 2500);
      }
   }
 })

const California = new Vue({
   router,
   store,
   render: (h) => h(App),
}).$mount('#app');

