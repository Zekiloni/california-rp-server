

<template>
   <div class="bank-info">
      <h2> {{ Messages.BANK_ACCOUNT_INFO }} </h2>
      <ul>
         <li> {{ Messages.ACCOUNT_ACTIVE }} <b> {{ bank.active ? Messages.YES : Messages.NO }} </b></li>
         <li> {{ Messages.DATE_OF_REGISTRATION }} <b> {{ formatDate(bank.created_at) }} </b></li>
         <li> {{ Messages.SAVINGS_BALANCE }} <b> {{ dollars(bank.savings) }} </b> </li>
         <li> {{ Messages.PAYCHECK_BALANCE }} <b> {{ dollars(bank.paycheck) }} </b> </li>
         <li> <button class="take-card" @click="getCreditCard">  {{ Messages.REQUEST_CARD }} </button> </li>
      </ul>
   </div>
</template>

<script lang="ts">
   import Vue from 'vue';
   import Component from 'vue-class-component';
   import { Messages } from '@/globals';

   @Component({
      props: {
         bank: Object
      }
   })
   export default class BankInfo extends Vue { 

      Messages = Messages;

      getCreditCard () {
         this.$emit('get-card');
      }
   }
</script>

<style scoped>
   .bank-info {
      background: #16151a;
      padding: 15px;
   }

   .bank-info h2 { 
      margin: 0;
   }

   ul { 
      list-style: none; 
      max-width: 350px;
      padding: 0; 
   }

   ul li { color: #676572; font-weight: 450; display: flex; justify-content: space-between; margin: 5px 0; }
   ul li b { color: #cdcddc; }

   ul.actions {
      padding: 0;
      list-style: none;
   }

   button.take-card {
      padding: 10px 25px;
      font-weight: 700;
      font-size: 0.8rem;
      color: #E4E4E2;
      background: #302F36;
      border-radius: 5px;
      margin: 10px 0;
      transition: all .3s ease;
   }

   button.take-card:hover {
      background: #46454B;
      color: #fff;
   }
</style>