import Vue from 'vue';
import App from './app.vue';
import router from './router';
import store from './store';
import VTooltip from 'v-tooltip'


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
      
      formatDollars (i: number) { 
         return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(i); 
      },

      onSale (property: any) { 
         return property.owner == 0 ? true : false;
      },

      truncate (str: string, n: number) { 
         return (str.length > n) ? str.substr(0, n-1) + '...' : str; 
      },

      isUpper: (str: string) => {
         return /[A-Z]/.test(str[0]);
      },

      formatDate (i: Date) { 
         i = new Date(i); 
         return i.getDate() + '.' + (i.getMonth() + 1) + '.' + i.getFullYear() + ' - ' + i.getHours() + ':' + i.getMinutes() + ':' + i.getSeconds(); 
      }
   }
 })

const Midnight = new Vue({
   router,
   store,
   render: (h) => h(App),
}).$mount('#app');

