

<template>
   <div class="bank-deposit">
      <h2> {{ Messages.DEPOSIT_MONEY }} </h2>

      <div class="amount-input">
         <label> {{ Messages.MONEY_QUANTITY }} </label>
         <input type="number" v-model="deposit" placeholder="3422$">
      </div>

      <button @click="createDeposit"> {{ Messages.SUBMIT }} </button>
   </div>
</template>

<script lang="ts">
   import Vue from 'vue';
   import Component from 'vue-class-component';
   import { Messages } from '@/globals';

   @Component
   export default class BankDeposit extends Vue { 
      deposit: number | null = null;

      Messages = Messages;

      createDeposit () {
         if (!this.deposit) {
            return;
         }

         this.$emit('deposit', Number(this.deposit));
      }
   }
</script>

<style scoped>
   .bank-deposit {
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
      margin-top: 20px;
      max-width: 220px;
      display: block;
      position: relative;
      border: 1px dashed #36353D;
      box-sizing: border-box;
      border-radius: 5px;
      padding-top: 10px;
      display: grid;
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