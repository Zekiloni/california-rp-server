import Vue from 'vue';
import App from './app.vue';
import router from './router';
import store from './store';
import VTooltip from 'v-tooltip'



Vue.config.productionTip = false;
// Vue.config.devtools = false;

//@ts-ignore
// import VueEllipseProgress from 'vue-ellipse-progress';
// Vue.use(VueEllipseProgress);

Vue.use(VTooltip)


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
      }
   }
 })

const Midnight = new Vue({
   router,
   store,
   render: (h) => h(App),
}).$mount('#app');

