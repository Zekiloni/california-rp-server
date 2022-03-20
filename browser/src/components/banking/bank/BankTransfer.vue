
<template>
   <div class="bank-transfer">

      <div class="amount-input">
         <label> {{ Messages.BANK_ACCOUNT_TARGET }} </label>
         <input type="number" v-model="target" placeholder="1234 5678 9101">
      </div>

      <div class="amount-input">
         <label> {{ Messages.MONEY_QUANTITY }} </label>
         <input type="number" v-model="amount" placeholder="3422$">
      </div>

      <button @click="transferMoney"> submit </button>
   </div>
</template>

<script lang="ts">
   import Vue from 'vue'
   import Component from 'vue-class-component';
   import { Messages } from '@/globals';

   @Component
   export default class BankTransfer extends Vue { 
      amount: number | null = null;
      target: string | null = null;

      Messages = Messages;

      transferMoney () {
         if (!this.amount || !this.target) {
            return;
         }

         this.$emit(
            'transfer', this.target, Number(this.amount)
         );
      }
   }
</script>

<style scoped>
   .bank-transfer {
      padding: 15px 15px 5px 15px;
      background: #16151a;
   }

   .bank-deposit h2 { 
      margin: 0;
   }

   button {
      background: #FFBB1C;
      border-radius: 5px;
      margin: 15px 0;
      width: 220px;
      display: block;
      color: #151418;
      font-weight: 550;
      padding: 15px 0;
      font-size: 1.0rem;
      transition: all .3s ease;
   }

   button:hover {
      color: #794B20;
      background: #FFC940;
   }

   .amount-input { 
      margin: 10px 20px;
      max-width: 220px;
      display: inline-block;
      position: relative;
      border: 1px dashed #36353D;
      box-sizing: border-box;
      border-radius: 5px;
      padding-top: 10px;
   }

   .amount-input label {
      color: #424149;
      font-weight: 500;
      font-size: 1.1rem;
      position: absolute;
      left: 21px;
      top: -10px;
      background: #16151a;
      border-radius: 10px;
      padding: 0 10px;
   }

   .amount-input input[type=number] {
      background: transparent;
      font-weight: bold;
      font-size: 28px;
      padding: 10px 25px;
      width: 150px;
      color: #71707c;
      margin: auto;
   }

   ::placeholder {
      color: #454550;
   }
</style>