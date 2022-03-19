

<template>
   
   <div class="bank-withdraw">
      <input type="number" v-model="withdrawAmount" />

      <button @click="submitWithdraw"> </button>
   </div>

</template>

<script lang="ts">
   import Vue from 'vue';
   import Component from 'vue-class-component';
   import { Messages } from '@/globals';

   @Component
   export default class BankWithdraw extends Vue { 
      withdrawAmount: number = 0;

      submitWithdraw () {
         this.$emit('withdraw', this.withdrawAmount);
      }
   }
</script>