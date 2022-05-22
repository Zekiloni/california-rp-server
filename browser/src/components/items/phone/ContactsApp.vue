

<template>
   <div class="contacts-app">
      <input type="text" v-model="addingContact.name">
      <input type="text" v-model="addingContact.number">
      <button @click="add"> add ocntact </button>
      
      <ul class="list">
         <li v-for="contact in contacts" :key="contact.name"> 
            {{ contact.name }}
         </li>
      </ul>
   </div>

</template>

<script lang="ts">
   import Vue from 'vue'
   import Component from 'vue-class-component';

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
      
      addingContact: AddingContact = {
         opened: false,
         name: '',
         number: '',

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