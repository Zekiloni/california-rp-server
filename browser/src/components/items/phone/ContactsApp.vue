

<template>
   <div class="contacts-app">
      <div class="home" v-if="!addingContact.opened && !selectedContact">
         <h2 class="title">
            {{ Messages.PHONE_APP_CONTACTS }} 
            <small class="number"> {{ contacts.length }} </small>
            <img class="add-contact" src="@/assets/images/phone/icons/add-contact.svg" @click="addingContact.opened = true" />
         </h2>

         <div class="search">
            <input type="text" v-model="searchContact" :placeholder="Messages.PHONE_CONTACTS_SEARCH" />
         </div>

         <ul class="contacts" >
            <li v-for="contact in getContacts" :key="contact.name" @dblclick="call(contact.number)" @click="selectedContact = contact"> 
               <img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" :alt="contact.name">
               <span> {{ contact.name }} </span>
            </li>
         </ul>
      </div>

      <div class="add-contact" v-else-if="addingContact.opened && !selectedContact">
         <input type="text" v-model="addingContact.name">
         <input type="text" v-model="addingContact.number">
         <button @click="add"> add ocntact </button>
      </div>

      <div class="selected-contact" v-else-if="selectedContact">
         <button class="go-back" @click="selectedContact = null"> {{ Messages.PHONE_BACK_TO_CONTACTS }} </button>

         <img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" :alt="selectedContact.name">

         <h3> {{ selectedContact.name }} </h3>
         <h4> {{ selectedContact.number }} </h4>

         <ul class="actions">
            <li @click="call(selectedContact.number)"> 
               <div class="call"> </div>
            </li>
            <li> 
               <div class="message"> </div> 
            </li>
         </ul>
         
         <h5 class="info"> {{ Messages.PHONE_CONTACT_CREATED }} <b>{{ formatDate(selectedContact.createdAt).split('-')[0] }}</b> </h5>
         
         <div class="options">
            <button class="delete-contact" @click="remove"> {{ Messages.PHONE_DELETE_CONTACT }} </button>
            <button> {{ Messages.PHONE_SHARE_CONTACT }} </button>
         </div>
      </div>
   </div>

</template>

<script lang="ts">
   import Vue from 'vue'
   import Component from 'vue-class-component';

   import { PhoneContact } from '@/models';
   import { Messages } from '@/globals';

   interface AddingContact {
      opened: boolean
      name: string
      number: string
   }

   @Component({
      props: {
         contacts: {
            type: Array,
            default () {
               return [];
            }
         }
      }
   })
   export default class ContactsApp extends Vue {
      selectedContact: PhoneContact | null = null;

      addingContact: AddingContact = {
         opened: false,
         name: '',
         number: '',
      }

      searchContact: string = '';
      Messages = Messages;

      get getContacts () {
         if (this.searchContact.length > 0) {
            return this.$props.contacts.filter(
               (contact: PhoneContact) => contact.name.toLowerCase().includes(this.searchContact.toLowerCase())
            );
         } else {
            return this.$props.contacts;
         }
      }

      call (number: number) {
         this.$emit('on-call', false, number, false);
      }

      remove () {
         if (!this.selectedContact) return;

         this.$emit('remove-contact', this.selectedContact);
         this.selectedContact = null;
      }

      add () {
         if (this.addingContact.name.length < 1 || this.addingContact.number.length < 1) return;

         this.$emit(
            'add-contact', this.addingContact.name, Number(this.addingContact.number)
         );
      }
   }
</script>

<style scoped>
   .contacts-app {
      width: 100%;
      height: 100%;
      background: #18171d;
   }

   h2.title {
      padding: 10px 15px;
      font-size: 1.25rem;
      margin: 0;
      color: #cdcdcd;
      position: relative;
   }

   h2.title small.number {
      color: grey;
   }

   ul.contacts {
      margin: 0;
      list-style: none;
      padding: 0;
   }

   ul.contacts li {
      display: flex;
      align-items: center;
      margin: 5px 0;
      padding: 5px 10px;
      background: #1f1e25;
   }


   ul.contacts li:hover span {
      color: #cdcdcd;
   }

   ul.contacts li img {
      width: 30px;
      height: 30px;
      background: #302f36;
      border: 1px solid #101015;
      border-radius: 100%;
   }

   ul.contacts li span {
      margin-left: 10px;
      color: grey;
      font-weight: 500;
      transition: all .2s ease;
   }

   img.add-contact { 
      width: 20px;
      transition: all .2s ease;
      margin-right: auto;
      position: absolute;
      right: 15px;
      top: 11.5px;
   }

   img.add-contact:hover {
      opacity: 0.7;
   }

   .search {
      width: auto;
      background: #101015;
      padding: 10px 0;
      display: grid;
   }

   .search input {
      margin: auto;
      padding: 10px;
      background: transparent;
      color: #cdcdcd;
   }

   .selected-contact {
      display: flex;
      flex-direction: column;
      align-items: center;
   }

   .selected-contact img {
      margin: 20px 0;
      width: 100px;
      height: 100px;
      background: #302f36;
      border: 1px solid #101015;
      border-radius: 100%;
   }
   
   .selected-contact h3 {
      color: #cdcdcd;
      margin: 0;
      max-width: 150px;
      font-size: 1.4rem;
      text-align: center;
   }

   .selected-contact h4 {
      margin: 5px 0;
      color: grey;
      font-size: 0.9rem;
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

   ul.actions {
      list-style: none;
      padding: 0;
      display: flex;
      justify-content: center;
   }

   ul.actions li {
      padding: 10px;
      background: #1f1e26;
      color: #667080;
      border-radius: 5px;
      margin: 0 5px;
      box-shadow: 0 0 5px -5px rgb(0 0 0 / 20%);
   }

   ul.actions li div {
      width: 25px; 
      height: 25px; 
      background-color: #848e9c;
      transition: all .2s ease;
   }


   ul.actions li:hover {
      background: whitesmoke;
   }
   
   ul.actions li:hover div {
      background: #18171d;
   }

   ul.actions li .call { mask: url('../../../assets/images/icons/phone.svg') no-repeat center; mask-size: cover; }
   ul.actions li .message { mask: url('../../../assets/images/icons/message.svg') no-repeat center; mask-size: cover; }

   h5.info {
      font-weight: 500;
      color: #858080;
   }
   
   .options {
      width: 100%;
   }

   .options button {
      display: block;
      margin: 5px 0;
      padding: 10px;
      width: 100%;
      color: #cdcdcd;
      background: #2a2930;
   }

   .options button:hover {
      color: #cdcdcd;
      background: #35333b;
   }
   
   .options button.delete-contact {
      color: #cf201d;
   }

</style>