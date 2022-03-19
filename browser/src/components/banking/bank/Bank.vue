

<template>
   <div class="bank-wrapper">
      <div class="box">
         <div class="title">
            <h1> bank </h1>
         </div>

         <i class="fa fa-times close" aria-hidden="true" @click="close"> </i>

         <div class="account">
            <div class="info">
               <h2> {{ Messages.WELCOME_BANK }} <b> {{ character.name }} </b> </h2>

               <div class="bank-number">
                  <h4> {{ numberHidden ? hiddenBankNumber : formatedBankNumber }} </h4>
                  <i class="fa fa-eye-slash hide-number" aria-hidden="true" @click="numberHidden = !numberHidden"> </i>
               </div>

               <div class="balance">
                  <h4> {{ Messages.BALANCE }} </h4>
                  <h3>  {{ dollars(character.bank.balance) }} </h3>
               </div>
            </div>
            
            <ul class="navigation">
               <li v-for="(page, i) in pages" :key="page" @click="activePage = i" :class="{ active: activePage == i }"> {{ page }} </li>
            </ul>
            
         </div>
      </div>
   </div>
</template>

<script lang="ts">
   import Vue from 'vue';
   import Component from 'vue-class-component';
   import { Messages } from '@/globals';
   import { Character } from '@/models';

   @Component
   export default class Banking extends Vue {
      character: Character | null = null;


      pages: string[] = [
         Messages.WITHDRAW_MONEY, Messages.DEPOSIT_MONEY, Messages.MONEY_TRANSFER
      ]

      activePage: number = 0;
      numberHidden: boolean = true;

      Messages = Messages;
      
      close () {
         mp.events.call('CLIENT::BANKING:MENU', null);
      }

      
      get hiddenBankNumber () {
         return '**** **** ' + this.character?.bank.number.toString().match(/.{1,4}/g)![2];
      }

      get formatedBankNumber () {
         return this.character?.bank.number.toString().match(/.{1,4}/g)!.join(' ')!;
      }

      withdraw (amount: number) {

      }

      deposit (amount: number) {

      }

      mounted () {
         mp.events.add('BROWSER::BANK', (info: string) => {
            this.character = JSON.parse(info);
         });
      }

   }
</script>

<style scoped>
   .bank-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: grid;
      background: linear-gradient(0deg, #1a191e, transparent);
   }

   .box { 
      width: 650px;
      height: 500px;
      color: white;
      margin: auto;
      background: #100f14;
      display: flex;
      justify-content: space-between;
      overflow: hidden;
      border-radius: 20px;
      position: relative;
   }

   .title {
      width: 150px;
      height: 100%;
      background: #FFBB1C;
      display: grid;
      position: relative;
   }

   .title h1 {
      position: absolute;
      bottom: 5px;
      margin: 0;
      writing-mode: vertical-rl; 
      right: 5px;
      font-size: 6rem;
      transform: rotate(180deg);
   }

   .close { 
      position: absolute;
      top: 15px;
      right: 20px;
      padding: 5px 7px;
      font-size: 1.25rem;
      color: #999898;
      background: #1E1C24;
      border-radius: 5px;
      transition: all .3s ease;
   }

   .close:hover { 
      background: #313037;
      color: #D1D1D1;
   }

   .account {
      width: 100%;
      padding: 20px;
   }

   .account .info h2 { 
      margin: 0;
      font-weight: 450;
      color: grey;
   }

   .info h2 b { 
      display: block;
      color: whitesmoke;
   }

   .bank-number { 
      margin: 15px 0;
      background: #1e1e23;
      padding: 10px 15px;
      max-width: 205px;
      display: flex;
      border-radius: 5px;
      justify-content: space-between;
      align-items: center;
   }
   
   .bank-number h4 { 
      margin: 0;
      font-size: 1.3rem;
      color: #7f7f8b;
      font-weight: 450;
   }

   .hide-number { transition: all .3s ease; color: #cdcdcd; }
   .hide-number:hover { 
      color: whitesmoke;
   }

   .balance {
      background: rgba(24, 23, 29, 0.31);
      border: 1px dashed #232128;
      padding: 10px 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 5px;
   }

   .balance h4 {
      font-weight: 450;
      color: #7f7f8b;
      margin: 0;
      font-size: 1.25rem;
   }

   .balance h3 { 
      margin: 0;
      font-size: 1.5rem;
      text-align: left;
   }

   ul.navigation { 
      margin: 20px 0;
      list-style: none;
      padding: 10px 12px;
      background: #1C1B20;
      display: flex;
      border-radius: 5px;
      justify-content: space-between;
   }

   ul.navigation li {
      transition: all .3s ease;
      padding: 10px;
      border: 1px solid #2C2B31;
      border-radius: 3px;
      font-size: 0.75rem;
      color: rgb(172, 165, 165);
   }

   ul.navigation li:hover {
      border-color: grey;
      color: #cdcdcd;
   }
   
   ul.navigation li.active {
      color: #ffbb1c;
      border-color: grey;
   }
</style>