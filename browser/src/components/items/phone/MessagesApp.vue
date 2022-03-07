
<template>
   <div class="app">
      
   </div>
</template>

<script lang="ts">
   import Vue from 'vue';
   import Component from 'vue-class-component';
   import { PhoneMessage } from '@/models';

   interface Compose { 
      to: number | null,
      message: string
   }
   
   
   @Component({
      props: {
         messages: Array,
         contacts: Array
      }
   })
   export default class MessagesApp extends Vue { 
      
      compose: Compose = {
         to: null,
         message: ''
      }
      
      searchConversation: string = '';

      get conversations () {
         let filtered = [... new Set(this.$props.messages.map((message: PhoneMessage) => message.sender))]

         if (this.searchConversation.length > 0 && filtered.length > 0) {
            return filtered.sort().filter(name => name)
         }
      }
   
      send () {
         this.$emit('send-message', this.compose);
      }
   }
</script>
