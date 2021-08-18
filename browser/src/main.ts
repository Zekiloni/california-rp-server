import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';



Vue.config.productionTip = false;
// Vue.config.devtools = false;

//@ts-ignore
// import VueEllipseProgress from 'vue-ellipse-progress';
// Vue.use(VueEllipseProgress);

const Focus = new Vue({
   router,
   store,
   render: (h) => h(App),
}).$mount('#app');

