

<template>
   <div class="bank-info">
      <h2> {{ Messages.BANK_ACCOUNT_INFO }} </h2>
      <ul>
         <li> {{ Messages.ACCOUNT_ACTIVE }} <b> {{ bank.active ? Messages.YES : Messages.NO }} </b></li>
         <li> {{ Messages.DATE_OF_REGISTRATION }} <b> {{ formatDate(bank.created_at) }} </b></li>
         <li> {{ Messages.SAVINGS_BALANCE }} <b> {{ dollars(bank.savings) }} </b> </li>
         <li> {{ Messages.PAYCHECK_BALANCE }} <b> {{ dollars(bank.paycheck) }} </b> </li>
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

   ul { list-style: none; max-width: 350px; padding: 0; }
   ul li { color: #676572; font-weight: 450; display: flex; justify-content: space-between; margin: 5px 0; }
   ul li b { color: #cdcddc; }
</style>