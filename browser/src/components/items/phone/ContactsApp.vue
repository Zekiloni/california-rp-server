

<template>
   <div class="contacts-app">
      <div class="home" v-if="!addingContact.opened && !selectedContact">
         <h2 class="title">
            {{ Messages.PHONE_APP_CONTACTS }} 
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

      <div class="selected-contact" v-else-if="!addingContact.opened && selectedContact">
         <img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" :alt="selectedContact.name">

         <h3> {{ selectedContact.name }} </h3>
         <h4> {{ selectedContact.number }} </h4>
         {{ selectedContact }}
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
      margin: 10px 0;
      width: 80px;
      height: 80px;
      background: #302f36;
      border: 1px solid #101015;
      border-radius: 100%;
   }
   
   .selected-contact h3 {
      color: #cdcdcd;
      margin: 0;
   }

   .selected-contact h4 {
      margin: 5px 0;
      color: grey;
      font-size: 0.9rem;
   }
</style>