

<template>
   <div class="lobby">

      <Authorization v-if="!logged"/>

      <CharacterSelector v-else-if="logged && account && spawnSelector == false" :account="account"/>

      <SpawnSelector v-else-if="spawnSelector && selectedCharacter" :spawnPoints="spawnPoints" />
         
   </div>
        
</template>

<script> 

   import Authorization from './lobby/authorization.vue';
   import CharacterSelector from './lobby/character.selector.vue';
   import SpawnSelector from './lobby/spawn.selector.vue';

   import Helpers from '../helpers';
   import { Messages } from '../globals';

   export default { 

      components: {
         Authorization, CharacterSelector, SpawnSelector    
      }, 

      data () { 
         return { 
            logged: false, // false default
            account: null, // nul ldefault
            selectedCharacter: null, // null default
            spawnPoints: null, // null default
            spawnSelector: false, // false default

            Helpers, Messages,
         }
      },
      
      methods: { 
         
      },
      
      mounted () { 
         if (window.mp) { mp.invoke('focus', true); }
      },

      beforeDestroy () { 
         if (mp) mp.invoke('focus', false);
      }
   }

</script>

<style scoped>

   .lobby {
      position: absolute;
      top: 0;
      left: 0;
      background: radial-gradient(ellipse at center top, rgb(76 49 142 / 45%) 0%, rgb(32 20 63 / 30%) 50%, rgb(0 0 0 / 90%) 90%) top right / 150% 100%;
      width: 100%;
      height: 100%;      
      animation: animated-radial 5s infinite alternate;
      display: grid;
   }


   @keyframes animated-radial {
      to { background-position: top left; }
   }

</style>


