
<template>
   <ul class="hints">
      <li v-for="hint in hints" :key="hint">
         <span v-if="hint.key">{{ Messages.PRESS }} </span>
         <KeyHint v-if="hint.key" :keyName="hint.key" />
      </li>
   </ul>
</template>

<script>
   import { Messages } from '../../globals';
   import KeyHint from '../misc/key.hint.vue';
   
   export default {
      components: { 
         KeyHint
      },

      data () { 
         return {

            hints: [
               { content: 'adawdawda' },
               { content: 'adada', key: 'aada' }
            ],

            Messages
         }
      }
   }
</script>

<style scoped>
   .hints {
      list-style: none;
      padding: 0;
      position: fixed;
      width: 350px;
      height: auto;
      min-height: 50px;
      bottom: 20px;
      right: 40px;
   }

   ul.hints li { 
      margin: 10px 0;
      padding: 10px 25px;
      border-radius: 5px;
      text-shadow: 0 0 0.5px black;
      color: #cdcdcd;
   }
</style>