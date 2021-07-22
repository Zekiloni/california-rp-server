<template>

  

   <div id="app">
      <Notifications v-if="interfaces.Notifications" />
      <GameInterface v-if="interfaces.GameInterface" />
      <Chat v-if="interfaces.Chat" />
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
   import GameInterface from './components/Game.Interface.vue';
   import Chat from './components/Chat';

   export default { 

      components: { 
         Authorization, Notifications, GameInterface, Chat
      },

      data () { 
         return {

         }
      },

      mounted () { 
         // mp.events.add('Browser.ShowInterface', data => { 
         //    this.show(data);
         // });  
         console.log('Focus Roleplay - Game Interface');
         // this.show('Authorization');
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
