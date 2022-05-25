
<template>
   <div class="msg-app">
      <div class="conversations">
         <h2 class="title"> {{ Messages.PHONE_APP_SETTINGS }} </h2>
         <input type="text" v-model="searchConversation" />
         <transition-group name="contact" tag="ul">
            <li v-for="conversation in conversations" :key="conversation" @click="selectedConversation = conversation">
               <h4> {{ getContact(conversation) ? getContact(conversation).name : conversation }} </h4>
            </li>
         </transition-group>
      </div>

   </div>
</template>

<script lang="ts">
   import Vue from 'vue';
   import Component from 'vue-class-component';

   import { PhoneContact, PhoneMessage } from '@/models';
   import { Messages } from '@/globals';

   interface ComposeMessage { 
      to: number | null,
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
      
      Messages = Messages;

      get conversations () {
         let filtered = [...new Set(this.$props.messages.map(
            (msg: PhoneMessage) => msg.to || msg.from)
         )].filter(number => number !== this.$props.phoneNumber);

         if (this.searchConversation.length < 1) {
            return filtered;
         } else {
            if (isNaN(Number(this.searchConversation))) {
               return this.$props.contacts.sort().map((contact: PhoneContact) => contact.name).filter(
                  (contact: string) => {
                     contact.toLowerCase().includes(this.searchConversation.toLowerCase())
                  }
               );
            } else {
               return filtered.sort().filter((conversation) => {
                  return String(conversation).includes(this.searchConversation)
               })
            }
         }
      }

      getLastMessage (phoneNumber: number) {
         return this.$props.messages.find((message: PhoneMessage) => message.to == phoneNumber);
      }
      
      getContact (number: number) {
         return this.$props.contacts.find((contact: PhoneContact) => contact.number == number);
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

   h2.title {
      padding: 10px;
      font-size: 1.25rem;
      margin: 0;
      color: #cdcdcd;
   }

   .contact-enter-active,
   .contact-leave-active {
      transition: all 0.15s ease;
   }
   .contact-enter-from,
   .contact-leave-to {
      opacity: 0;
      transform: translateY(30px);
   }
</style>
