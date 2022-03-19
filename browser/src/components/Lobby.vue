

<template>
   <div class="lobby">

      <Authorization v-if="!logged"/>

      <CharacterSelector v-else-if="logged && account && spawnSelector == false" :account="account" />

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
         
      }
   }

</script>

<style scoped>

   .lobby {
      position: absolute;
      top: 0;
      left: 0;
      background: rgb(16 15 20 / 85%);
      width: 100%;
      height: 100%;      
      display: grid;
   }

</style>


