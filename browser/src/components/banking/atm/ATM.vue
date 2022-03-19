
<template>
   <div class="atm-wrapper">
      <div class="atm">

         <div class="header">
            <img src="@/assets/images/other/maze-bank-big.png" class="logo">

            <div class="date-time">
               <h4> {{ formatDate(Date.now()).split('-')[0] }} </h4>
               <h2> {{ time }} </h2>
            </div>
         </div>

         <div class="welcome">
            <h2> {{ Messages.WELCOME }}{{ logged ? (', ' + account.character.name) : '' }}. </h2>
            <transition name="fade" mode="out-in">
               <h4 v-if="logged" key="transactionText"> {{ Messages.ATM_PLEASE_SELECT_ACTION }} </h4>
               <h4 v-else key="loginText"> {{ Messages.PLEASE_ENTER_YOUR_PIN }} </h4>
            </transition>
            
            <transition name="fade"> 
               <button class="home" v-if="logged && !page.main" @click="page.main = true"> {{ Messages.BACK_TO_HOME }} </button>
            </transition>
         </div>

         <div class="box">
            <transition name="fade" mode="out-in"> 
               <ATMAuth v-if="!logged" :attempts="attempts" @authorization="login" :bankNumber="account.number" key="authorization" />
               
               <ul class="navigation" v-if="logged && page.main" key="navigation">

                  <li class="withdraw border" @click="page.main = false, page.withdraw = true"> 
                     <div class="icon">
                        <img src="@/assets/images/icons/bank/withdraw.png" />
                     </div>
                     <h4> {{ Messages.WITHDRAW_MONEY }} </h4>
                  </li>

                  <li class="deposit" @click="page.main = false, page.withdraw = true"> 
                     <div class="icon">
                        <img src="@/assets/images/icons/bank/deposit.png" />
                     </div>
                     <h4> {{ Messages.DEPOSIT_MONEY }} </h4>
                  </li>
                  
                  <li class="" @click="page.main = false, page.withdraw = true"> 
                     <div class="icon">
                        <img src="@/assets/images/icons/bank/balance.png" />
                     </div>
                     <h4> {{ Messages.SEE_BALANCE }} </h4>
                  </li>

                  <li class="" @click="page.main = false, page.withdraw = true"> 
                     <div class="icon">
                        <img src="@/assets/images/icons/bank/statement.png" />
                     </div>
                     <h4> {{ Messages.GET_STATEMENT }} </h4>
                  </li>

                  <li class="" @click="page.main = false, page.bills = true"> 
                     <div class="icon">
                        <img src="@/assets/images/icons/bank/pay.png" />
                     </div>
                     <h4> {{ Messages.PAYING }} </h4>
                  </li>
               </ul>

               <ATMWithdraw v-if="logged && page.withdraw" @withdraw="withdraw" :Messages="Messages" key="withdraw" />
               <ATMBills v-if="logged && page.bills" key="bills" />
            </transition>
         </div>

      </div>
   </div>
</template>

<script lang="ts">
   import Vue from 'vue'
   import Component from 'vue-class-component';
   import { BankAccount, CreditCard } from '@/models';
   import { Messages } from '@/globals';

   import ATMAuth from './ATMAuth.vue';
   import ATMWithdraw from './ATMWithdraw.vue';
   import ATMBills from './ATMBills.vue';
   
   @Component({
      components: { 
         ATMAuth, ATMWithdraw, ATMBills
      }
   })
   export default class ATM extends Vue {
      time: string = '';

      attempts: number = 0;
      logged: boolean = false;

      page = {
         main: false,
         withdraw: false,
         bills: false
      }
      
      get transactions () {
         return { 
            max: Math.max.apply(null, this.account?.transactions.map(transaction => transaction.balance)!) + 5000,
            history: this.account?.transactions.slice(Math.max(this.account?.transactions.length - 5, 1))
         };
      }
   
      account: BankAccount | null = {
         number: 134323242353,
         owner: 0,
         character: { name: 'Zeki' },
         balance: 213123,
         savings: 0,
         paycheck: 0,
         credit: null,
         active: true,
         transactions: [
            { id: 0, account_number: 134323242353, type: 0, balance: 333, info: 'Plaćanje proizvoda dekerove stare.', date: Date.now() },
            { id: 1, account_number: 134323242353, type: 0, balance: 656, info: 'adawdawdawdaw', date: Date.now() },
            { id: 2, account_number: 134323242353, type: 0, balance: 333, info: 'adawdawdawdaw', date: Date.now() },
            { id: 3, account_number: 134323242353, type: 0, balance: 333, info: 'adawdawdawdaw', date: Date.now() },
            { id: 4, account_number: 134323242353, type: 0, balance: 656, info: 'adawdawdawdaw', date: Date.now() },
            { id: 5, account_number: 134323242353, type: 0, balance: 333, info: 'adawdawdawdaw', date: Date.now() },            
            { id: 6, account_number: 134323242353, type: 0, balance: 333, info: 'adawdawdawdaw', date: Date.now() },
            { id: 7, account_number: 134323242353, type: 0, balance: 6556, info: 'Plaćanje proizvoda dekerove stare.', date: Date.now() },
            { id: 8, account_number: 134323242353, type: 0, balance: 3333, info: 'adawdawdawdaw', date: Date.now() }
         ],
         created_at: new Date(),
         updated_at: new Date()

      };

      card: CreditCard | null = {
         bank: 134323242353,
         pin: 8888,
      };

      Messages = Messages;

      init (info: string) {
         const [bankAccount, creditCard] = JSON.parse(info);

         this.account = bankAccount;
         this.card = creditCard;
      }

      transfer (bankAccount: number, amount: number) {
         mp.events.callProc('CLIENT::BANK:TRANSFER', bankAccount, amount).then(transferInfo => {
            if (transferInfo) {
               this.account!.balance -= transferInfo;
            }
         })
      }

      withdraw (amount: number) {
         mp.events.callProc('CLIENT::BANK:WITHDRAW', amount).then(withdrawInfo => {
            if (withdrawInfo) {
               this.account = withdrawInfo;
            }
         })
      }

      deposit (amount: number) {
         mp.events.callProc('CLIENT::BANK:DEPOSIT', amount).then(depositInfo => {
            if (depositInfo) {
               this.account = depositInfo;
            }
         })
      }

      close () {
         mp.events.call('');
      }

      clock () {
         const now = new Date();
         this.time = now.getHours() + ':' + (now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes());
         setTimeout(this.clock, 1000);
      }  

      login (pin: number) {
         if (this.card && this.card.pin == pin) {
            this.logged = true;
            this.page.main = true;
         } else { 
            if (this.attempts == 3) {
               // close interface && lock account
               return;
            }
            this.attempts ++;
         }
      }


      mounted () {
         if (window.mp) {
            mp.events.add('BROWSER::BANK:ATM', this.init);
         }

         this.clock();
      }
   }
</script>

<style scoped>
   .atm-wrapper {
      top: 0;
      left: 0;
      position: absolute;
      height: 100%;
      width: 100%;
      display: grid;
      background:  linear-gradient(135deg, rgb(124 91 241 / 75%), rgb(32 20 63 / 95%)), url('https://i.ytimg.com/vi/d74REG039Dk/maxresdefault.jpg');
      background-size: cover;
   }

   .atm { 
      position: relative;
      width: 900px;
      height: 575px;
      background: url('../../../assets/images/backgrounds/patterns/abstract-1.png'), radial-gradient(#21252f, #181a20);
      background-size: cover;
      display: grid;
      margin: auto;
      padding-bottom: 50px;
   }
   
   .header {
      padding: 25px;
   }

   .header img.logo {
      width: 200px;
   }

   .header .date-time {
      text-align: right;
      float: right;
   }

   .date-time h4 {
      margin: 0;
      font-weight: 450;
      letter-spacing: 0.1rem;
      color: #696d77;
   }

   .date-time h2 { 
      margin: 3px 0;
      font-size: 2.7rem;
      color: #cdcdcd;
   }

   .box {
      width: 650px;
      height: 350px;
      margin: auto;
      background: #21252f;
      border-radius: 15px;
      display: grid;
      overflow: hidden;
      box-shadow: rgba(0, 0, 0, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.7) 0px 8px 16px -8px;
   }

   .welcome { 
      position: relative;
      width: 650px;
      margin: auto;
   }

   .welcome h2 {
      margin: 0;
      font-size: 1.35rem;
      color: #e7e7e7;
   }

   .welcome h4 { 
      margin: 5px 0;
      font-size: 0.9rem;
      color: #a2a4aa;
      font-weight: 400;
   }
   
   .icon {
      width: 35px;
      height: 35px;
   }


   ul.navigation li:hover h4 { 
      color: white !important;
   }

   ul.navigation {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-wrap: wrap;
   }

   ul.navigation li {
      transition: all .3s ease;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 185px;
      height: 175px;
      box-shadow: rgba(50, 50, 93, 0.4) 0px 6px 12px -2px, rgba(0, 0, 0, 0.8) 0px 3px 7px -3px;
   }

   ul.navigation li h4 {
      color: #cdcdcd;
      margin: 20px 0 0 0;
      font-size: 1rem;
      text-align: center;
   }

   li.withdraw, li.deposit {
      width: 325px !important;
      background: #fed02a;
      flex-direction: row !important;
   }

   li.withdraw h4, li.deposit h4 {    
      width: 100px; 
      margin: 0 15px !important;
      color: #181a20 !important;
   }

   ul.navigation li .icon {
      position: relative;
      border-radius: 100%;
      width: 80px;
      height: 80px;
      background: linear-gradient(#fede29, #ffc62c);
      box-shadow: rgba(50, 50, 93, 0.3) 0px 13px 27px -5px, rgba(0, 0, 0, 0.5) 0px 8px 16px -8px;
      display: grid;
   }

   ul.navigation li .icon::after {
      position: absolute;
      content: '';
      width: 65px;
      height: 65px;
      background: linear-gradient(#21252f, #181a20);
      border-radius: 100%;
      top: 8px;
      lefT: 8px;
   }

   ul.navigation li .icon img {
      position: relative;
      z-index: 9999;
      width: 40px;
      margin: auto;
   }

   button.home {
      position: absolute;
      top: 15px;
      right: 5px;
      padding: 7px 20px;
      background: #474d57;
      color: #cdcdcd;
      transition: all .3s ease;
      border-radius: 4px;
   }

   button.home:hover { 
      opacity: 0.65;
   }

</style>