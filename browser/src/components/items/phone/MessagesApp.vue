
<template>
   <div class="msg-app">
      <div class="conversations" v-if="!selectedConversation">
         <h2 class="title">
            {{ Messages.PHONE_APP_MESSAGES }} 
            <img class="compose-message" src="@/assets/images/phone/icons/compose-message.svg" @click="compose.opened = true" />
         </h2>

         <div class="search">
            <input type="text" v-model="searchConversation" :placeholder="Messages.PHONE_MESSAGES_SEARCH" />
         </div>

         <transition-group name="contact" tag="ul">
            <li v-for="conversation in conversations" :key="conversation" @click="selectedConversation = conversation">
               <h4> {{ getContact(conversation) ? getContact(conversation).name : conversation }} </h4>
               <div class="last-message">
                  <small> {{ truncate(getLastMessage(conversation).message, 35) }} </small>
               </div>
            </li>
         </transition-group>
      </div>

      <div class="conversation" v-if="selectedConversation">
         <div class="header">
            <button class="go-back" @click="selectedConversation = null"> {{ Messages.PONE_BACK_TO_MESSAGES }} </button>
            <div class="contact">
               <h4> {{ getContact(selectedConversation) ? getContact(selectedConversation).name : selectedConversation }} </h4>
               <small> {{ selectedConversation }} </small>
            </div>
         </div>
         
         <div class="chat">
            <ul class="messages" id="conversation-messages">
               <li v-for="message in conversationMessages" :key="message.id" :class="{ received: message.from != phoneNumber }">
                  {{ message.message }}
               </li>
            </ul>
         </div>

         <div class="new-message">
            <input type="text" v-model="compose.message" @keydown.enter="send" :placeholder="Messages.TYPE_YOUR_MESSAGE" autofocus>
            <button @click="send">
               <img src="@/assets/images/phone/icons/send-message.svg" />
            </button>
         </div>
      </div>

   </div>
</template>

<script lang="ts">
   import Vue from 'vue';
   import Component from 'vue-class-component';

   import { PhoneContact, PhoneMessage } from '@/models';
   import { Messages } from '@/globals';

   interface ComposeMessage { 
      opened: boolean
      to: number | null
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
         opened: false,
         to: null,
         message: ''
      }
      
      antiSpam: boolean = false;
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
            // @ts-ignore
            if (isNaN(this.searchConversation)) {
               return this.$props.contacts.filter(
                  (contact: PhoneContact) => {
                     contact.name.toLowerCase().includes(this.searchConversation.toLowerCase())
                  }
               ).map((contact: PhoneContact) => contact.number);
            } else {
               return filtered.sort().filter((conversation) => {
                  return String(conversation).includes(this.searchConversation)
               })
            }
         }
      }

      get conversationMessages () {
         if (this.selectedConversation) {
            return this.$props.messages.filter(
               (message: PhoneMessage) => message.from == this.selectedConversation || message.to == this.selectedConversation
            )
         } else {
            return [];
         }
      }

      getLastMessage (phoneNumber: number) {
         return this.$props.messages.filter((message: PhoneMessage) => message.to == phoneNumber || message.from == phoneNumber).reduce(
            (firstMsg: PhoneMessage, secondMsg: PhoneMessage) => 
               firstMsg.id > secondMsg.id ? firstMsg : secondMsg
            ) 
      }

      getMessageDate () {
         
      }
      
      getContact (number: number) {
         return this.$props.contacts.find((contact: PhoneContact) => contact.number == number);
      }
      
      getContactNumber (name: string) {
         return this.$props.contacts.find((contact: PhoneContact) => contact.name == name).number;
      }
   
      send () {
         if (this.compose.message.length == 0 || this.antiSpam) {
            return;
         }

         this.$emit('send-message', this.selectedConversation ? this.selectedConversation : this.compose.to, this.compose.message);
         this.compose.message = '';
         this.antiSpam = true;

         const conversationElement = document.getElementById('conversation-messages');
         if (conversationElement) {
            Vue.nextTick(() => {
               conversationElement.scrollTo({ top: conversationElement.scrollHeight, behavior: 'smooth' })
            })
         }
         
         const disableSpam = () => {
            this.antiSpam = false;
         }

         setTimeout(disableSpam, 1000);
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
      padding: 10px 15px;
      font-size: 1.25rem;
      margin: 0;
      color: #cdcdcd;
      position: relative;
   }

   .conversations ul {
      margin-right: 10px;
      height: 315px;
      overflow-y: scroll;
      overflow-x: hidden;
      padding: 0 10px;
      list-style: none;
   }

   .conversations ul li {
      margin: 10px 0;
      border-radius: 5px;
      background: #100f14;
      padding: 10px;
   }

   .conversations ul li h4 {
      font-size: 1.05rem;
      color: #cdcdcd;
      margin: 0;
   }
   
   .conversations ul li small {
      margin-top: 10px;
      color: grey;
      font-size: 0.8rem;
   }

   .conversation .chat {
      height: 295px;
      background: #100f14;
      overflow: hidden;
   }

   .conversation .chat ul.messages {
      height: 100%;
      overflow-y: scroll;
      margin: 0;
      list-style: none;
      padding: 10px;
   }

   .conversation .chat ul.messages li {
      width: auto;
      max-width: 125px;
      padding: 5px 10px;
      color: whitesmoke;
      border-radius: 10px 10px 0 10px;
      background: linear-gradient(45deg, #4c318e, #7c5bf1);
      margin: 15px 0 15px auto;
   }
   
   .conversation .chat ul.messages li.received {
      margin-right: auto;
      background: #302f36;
      border-radius: 10px 10px 10px 0;
      margin-left: 0;
      color: #b9b5b5;
   }

   .new-message {
      padding: 10px 0;
      width: auto;
      display: flex;
      justify-content: space-around;
   }

   .new-message input {
      background: transparent;
      border-radius: 20px;
      padding: 5px;
      background: linear-gradient(90deg, #16151c, #16151c);
      color: whitesmoke;
   }

   .new-message button {
      border-radius: 100%;
      width: 35px;
      height: 35px;
      background: linear-gradient(45deg, #4c318e, #7c5bf1);
   }
   
   .new-message button:hover {
      filter: brightness(1.15);
   }

   .new-message button img {
      margin-top: 2px;
      margin-left: 2px;
      width: 15px;
   }

   .search {
      width: auto;
      background: #101015;
      padding: 10px 0;
      display: grid;
   }

   .compose-message { 
      width: 19px;
      transition: all .2s ease;
      margin-right: auto;
      position: absolute;
      right: 15px;
      top: 11.5px;
   }

   .compose-message:hover {
      opacity: 0.7;
   }

   .search input {
      margin: auto;
      padding: 10px;
      background: transparent;
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

   button.go-back {
      padding: 7px 0;
      width: 100%;
      background: #2a2930;
      text-transform: uppercase;
      font-size: 0.675rem;
      color: #81868d;
   }

   button.go-back:hover {
      color: #cdcdcd;
      background: #35333b;
   }

   ::-webkit-scrollbar-thumb {
      border-radius: 40px;
   }
</style>
