
<template>
   <div class="msg-app">
      
   </div>
</template>

<script lang="ts">
   import Vue from 'vue';
   import Component from 'vue-class-component';
   import { PhoneMessage } from '@/models';

   interface ComposeMessage { 
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
      
      compose: ComposeMessage = {
         to: null,
         message: ''
      }
      
      searchConversation: string = '';

      get conversations () {
         let filtered = [... new Set(this.$props.messages.map((message: PhoneMessage) => message.from))]

         if (this.searchConversation.length > 0 && filtered.length > 0) {
            return filtered.sort().filter(name => name)
         }
      }
   
      send () {
         if (this.compose.message.length == 0) {
            return;
         }
         
         this.$emit('send-message', this.compose);
      }
   }
</script>

<style scoped>
   .msg-app {
      background: #18171d;
      width: 100%;
      height: 100%;
   }
</style>
