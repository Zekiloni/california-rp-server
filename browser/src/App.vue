<template>

   <div id="app">
      <transition name="bounce">
         <Authorization v-if="interfaces.Authorization" />
      </transition>      
      <Creator v-if="interfaces.Creator" />

      <GameInterface v-if="interfaces.GameInterface" />
      <Notifications v-if="interfaces.Notifications" />
      <Chat v-if="interfaces.Chat" />

      <Inventory v-if="interfaces.Inventory" />
      <Banking v-if="interfaces.Banking" />


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
   import Inventory from './components/Inventory/Inventory.vue';
   import Banking from './components/Banking.vue';

   export default { 

      components: { 
         Authorization, Creator, Notifications, GameInterface, Inventory, Chat, Banking
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
