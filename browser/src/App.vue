<template>

  

   <div id="app">
      <Notifications v-if="interfaces.Notifications" />
      <transition name="bounce">
         <Authorization v-if="interfaces.Authorization" />
      </transition>

   </div>
</template>

<script>
   import { mapMutations, mapState } from 'vuex';
   import './assets/styles/main.css';
   import './assets/styles/fonts.css';
   // import './assets/styles/font-awesome.css';

   import Authorization from './components/Authorization.vue';
   import Notifications from './components/Notifications.vue';

   export default { 

      components: { 
         Authorization, Notifications
      },

      data () { 
         return {

         }
      },

      mounted () { 
         // mp.events.add('Browser.ShowInterface', data => { 
         //    this.show(data);
         // });  

         this.show('Authorization');
      },

      methods: {
         ...mapMutations('interfaces', [
            'show'
         ])     
      },

      computed: {
         ...mapState(['interfaces'])
      }
   }

</script>

<style>

</style>
