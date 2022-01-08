import Vue from 'vue';
import App from './App.vue';
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
      }
   }
 })

const Midnight = new Vue({
   router,
   store,
   render: (h) => h(App),
}).$mount('#app');

