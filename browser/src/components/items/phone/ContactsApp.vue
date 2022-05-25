

<template>
   <div class="contacts-app">

      
      <transition name="fade"> 
         <ul class="contacts" v-if="!addingContact.opened && !selectedContact">
            <li v-for="contact in contacts" :key="contact.name" @click="call(contact.number)"> 
               {{ contact.name }}
            </li>
         </ul>
         
         <div class="add-contact" v-else-if="addingContact.opened && !selectedContact">
            <input type="text" v-model="addingContact.name">
            <input type="text" v-model="addingContact.number">
            <button @click="add"> add ocntact </button>
         </div>

         <div class="edit-contact" v-else-if="!addingContact.opened && selectedContact">
            
         </div>
         
      </transition>
   </div>

</template>

<script lang="ts">
   import Vue from 'vue'
   import Component from 'vue-class-component';

   import { PhoneContact } from '@/models';

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
   
</style>