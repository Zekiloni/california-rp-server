<template>

   <div id="app">
      <GameInterface v-if="interfaces.GameInterface" />
      <Chat v-if="interfaces.Chat" />
      <Creator v-if="interfaces.Creator" />
      <transition name="bounce">
         <Authorization v-if="interfaces.Authorization" />
      </transition>
      <Notifications v-if="interfaces.Notifications" />


         <!-- FOCUS ROLEPLAY BUTTON LOL 
         <button class="frp-1"> Test </button>
         <button class="frp-2"> Test </button>
         <button class="frp-3"> Test </button>
         <button class="frp-4"> Test </button>
         <button class="frp-red"> Test </button>
         <button class="frp-green"> Test </button> 
         -->

   </div>
</template>

<script>
   import { mapMutations, mapState } from 'vuex';
   import './assets/styles/main.css';
   import './assets/styles/fonts.css';
   import './assets/styles/font-awesome.css';

   import Authorization from './components/Authorization.vue';
   import Creator from './components/Creator.vue';
   import Notifications from './components/Notifications.vue';
   import GameInterface from './components/Game.Interface.vue';
   import Chat from './components/Chat';

   export default { 

      components: { 
         Authorization, Creator, Notifications, GameInterface, Chat
      },

      data () { 
         return {

         }
      },

      mounted () { 
         mp.events.add('BROWSER::SHOW', data => { 
            this.show(data);
         });

         mp.events.add('BROWSER::HIDE', data => { 
            console.log('Datta is ' + data);
            this.hide(data);
         }); 

         console.log('Focus Roleplay - Game Interface');
         // this.show('Authorization');
      },

      methods: {
         ...mapMutations('interfaces', [
            'show', 
            'hide'
         ])     
      },

      computed: {
         ...mapState(['interfaces'])
      }
   }
   

   

</script>

<style>

</style>
