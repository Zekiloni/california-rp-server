
<template>
   <div class="msg-app">
      <div class="conversations">
         <input type="text" v-model="searchConversation" />
         <transition-group name="list" tag="ul">
            <li v-for="(conversation, i) in conversations" :key="i" style="color: white;">
               <!-- {{ conversation == phoneNumber ? isContact(getLastMessage(conversation).from) : isContact(conversation) }} -->
               <!-- {{ i == phoneNumber ? conversation.from : i }} {{ conversation.message }} -->
               {{ i }}
               <!-- <h4> {{ conversation.number == phoneNumber ? isContact(conversation.message.from) : isContact(conversation.number) }} </h4> -->
            </li>
         </transition-group>
      </div>

      
   </div>
</template>

<script lang="ts">
   import Vue from 'vue';
   import Component from 'vue-class-component';

   import { PhoneContact, PhoneMessage } from '@/models';

   interface ComposeMessage { 
      to: number | null,
      message: string
   }

   interface Conversation {
      from: number
      message: string
   }

   @Component({
      props: {
         phoneNumber: Number,
         messages: { type: Array, default () { return [] } },
         contacts: { type: Array, default () { return [] } }
      }
   })
   export default class MessagesApp extends Vue { 
      compose: ComposeMessage = {
         to: null,
         message: ''
      }
      
      searchConversation: string = '';
      selectedConversation: number | null = null;

      get conversations () {
         // let filtered = [... new Set(this.$props.messages.map(
         //    (msg: PhoneMessage) => msg.to)
         // )];

         // if (this.searchConversation.length > 0) {
         //    // return filtered // TO DO
         // } else {
         //    return filtered;
         // }
         let filtered: Record<number, Conversation> = {};

         this.$props.messages.sort().reverse().forEach(
            (message: PhoneMessage) => {
               filtered[message.to] = { 
                  from: message.from,
                  message: message.message
               }
            }
         );

         return filtered;
      }

      getLastMessage (phoneNumber: number) {
         return this.$props.messages.find((message: PhoneMessage) => message.to == phoneNumber);
      }
      
      isContact (number: number) {
         let inContacts = this.$props.contacts.find((contact: PhoneContact) => contact.number == number);
         return inContacts ? inContacts : number;
      }
   
      send () {
         if (this.compose.message.length == 0) {
            return;
         }
         
         this.$emit('send-message', this.compose);
      }

      mounted () {
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
