
<template>
   <div class="msg-app">
      <div class="conversations">
         <input type="text" v-model="searchConversation" />
         <transition-group name="list" tag="ul">
            <li v-for="conversation in getConversations" :key="conversation.id" style="color: white;">
               {{ conversation }}
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
      id: number
      number: number
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
      
      conversations: Conversation[] = [];
      searchConversation: string = '';
      selectedConversation: number | null = null;

      get getConversations () {
         if (this.searchConversation.length > 0) {
            return []
         } else {
            return this.conversations;
         }
      }
      
      isContact (number: number) {
         let inContacts = this.$props.contacts.find((contact: PhoneContact) => contact.number == number);
         return inContacts ? inContacts : number;
      }

      initConversations () {
         let filtered = [... new Set(this.$props.messages.map((msg: PhoneMessage) => msg.from && msg.to))];
         let id = 0;

         for (const conversationNumber of filtered) {
            let lastMsg = this.$props.messages.find((message: PhoneMessage) => message.from == conversationNumber || message.to == conversationNumber);
            this.conversations.push(
               {
                  id: id ++,
                  number: Number(conversationNumber),
                  message: lastMsg
               }
            )
         }

      }
   
      send () {
         if (this.compose.message.length == 0) {
            return;
         }
         
         this.$emit('send-message', this.compose);
      }

      mounted () {
         this.initConversations();
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
