


<template>
   <div class="banking"> 
      <div class="box">
         <div class="header">
            <div class="profile">
               <h3> {{ Name }} </h3>
               <div class="balance">
                  <h2> {{ Helpers.Dollars(Balance) }} </h2>
                  <small> {{ Messages.YOUR_BALANCE }} </small>
               </div>
            </div>
            <div v-on:click="Close()" class="logout"> </div>
         </div>
         <ul class="navigation">
            <li class="home-page" :class="{ 'active': Page == 'home' }" v-on:click="Navigate('home')" v-tooltip="Messages.HOME_PAGE"> </li>
            <li class="withdraw-page" :class="{ 'active': Page == 'withdraw' }" v-on:click="Navigate('withdraw')" v-tooltip="Messages.WITHDRAW_PAGE"> </li>
            <li class="deposit-page" :class="{ 'active': Page == 'deposit' }" v-on:click="Navigate('deposit')" v-tooltip="Messages.DEPOSIT_PAGE"> </li>
            <li class="transfer-page" :class="{ 'active': Page == 'transfer' }" v-on:click="Navigate('transfer')" v-tooltip="Messages.TRANSFER_PAGE"> </li>
         </ul>

         <div class="page" v-if="Page == 'home'">

            <div class="transaction-history">
               <h2 class="title"> {{ Messages.TRANSACTION_HISTORY }} </h2>
               <ul class="transactions"> 
                  <li v-for="Transaction in Transactions" :key="Transaction"> 
                     <h4 class="date"> {{ Transaction.Date }} </h4>
                     <h4 class="amount"> {{ Helpers.Dollars(Transaction.Amount) }} </h4>
                  </li>
               </ul>
            </div>
         </div>

         <div class="page" v-else-if="Page == 'withdraw'">

         </div>
         <div class="page" v-else-if="Page =='deposit'">

         </div>
      </div>
   </div>
</template>

<script>

   import { Messages } from '@/Globals';
   import Helpers from '@/Helpers';

   export default { 
      data () { 
         return { 
            Page: 'home',

            Name: 'Zachary Parker',
            Number: 342343,
            Balance: 34343,
            Paycheck: 33,
            Savings: 0,
            Transactions: [
               { Date: '11.06.2001 - 20:23', Amount: 300, Type: 0, Description: 'aaa' },
               { Date: '11.06.2001 - 20:23', Amount: 300, Type: 0, Description: 'aaa' },
               { Date: '11.06.2001 - 20:23', Amount: 300, Type: 0, Description: 'aaa' }
            ],

            Inputs: { 
               Withdraw: '', Deposit: '', Transfer_Target: '', Transfer_Amount: ''
            },

            Messages, Helpers
         }
      },

      methods: { 

         Close: () => { 
            mp.trigger('CLIENT::BANKING:TOGGLE');
         },

         Navigate: function (i) { 
            this.Page = i;
         },

         Withdraw: function () { 
            mp.trigger('CLIENT::BANKING:WITHDRAW', this.Inputs.Withdraw);
         },

         Deposit: function () { 
            mp.trigger('CLIENT::BANKING:DEPOSIT', this.Inputs.Deposit);
         },

         Transfer: function () { 
            mp.trigger('CLIENT::BANKING:TRANSFER', this.Inputs.Transfer_Target, this.Inputs.Transfer_Amount);
         }
    
      },

      mounted () {
         mp.invoke('focus', true);

      },

      beforeDestroy () { 
         mp.invoke('focus', false);
      }
   }


</script>

<style scoped>

   .banking { 
      background: radial-gradient(circle, rgb(45 53 72 / 75%) 0%, rgb(19 22 29 / 85%) 90%); top: 0; left: 0; 
      position: absolute; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;
   }

   .box { 
      width: 450px;
      height: 625px;
      border-radius: 15px;
      background: linear-gradient(90deg, rgba(29,34,45,1) 0%, rgba(19,22,29,1) 100%);
      box-shadow: rgb(0 0 0 / 15%) 0px 1px 20px 0px;
      overflow: hidden;
   }

   .box .header { 
      width: 100%; height: 180px; display: flex; justify-content: center; align-items: center;
      background: linear-gradient(141deg, rgba(104,69,234,1) 0%, rgba(66,54,128,1) 100%);
      box-shadow: inset rgb(255 255 255 / 20%) 0px 1px 20px -10px; position: relative; overflow: hidden;
   }

   .header::after { 
      position: absolute; content: ''; bottom: -5px; right: 60px; width: 160px; height: 160px; background: url('../assets/images/icons/bank.svg'); background-size: cover; filter: grayscale(1); opacity: 0.45;
   }

   .header .profile { width: 300px; height: 100px; }
   .profile h3 { margin: 0; color: whitesmoke; letter-spacing: 0.7px; font-weight: 200; font-size: 16px; }
   .profile .balance { margin-top: 5px; }
   .profile .balance h2 { margin: 0; font-size: 26px; color: rgb(221, 221, 221); letter-spacing: 1.5px; }
   .profile .balance small { text-transform: uppercase; letter-spacing: 3.5px; color: whitesmoke; font-weight: 100; }

   ul.navigation { 
      list-style: none; display: flex; width: 255px; justify-content: space-between; align-items: center;
      margin: 0 auto; position: relative; padding: 10px 20px; margin-top: -15px; border-radius: 15px; z-index: 10;
      background: #1d222d; box-shadow: rgb(0 0 0 / 10%) 0px 1px 20px 0px;
   }

   ul.navigation li { transition: all 0.35s ease; width: 30px; height: 30px; background: whitesmoke; opacity: 0.5; mask-size: cover; }
   ul.navigation li:hover { opacity: 1; }
   ul.navigation li.home-page { mask: url('../assets/images/icons/home-page.svg') no-repeat center; }
   ul.navigation li.withdraw-page { mask: url('../assets/images/icons/withdraw-money.svg') no-repeat center; }
   ul.navigation li.deposit-page { mask: url('../assets/images/icons/deposit-money.svg') no-repeat center; }
   ul.navigation li.transfer-page { mask: url('../assets/images/icons/transfer-money.svg') no-repeat center; }
   ul.navigation li.active { opacity: 1; }

   .logout { position: absolute; top: 10px; right: 5px; width: 30px; height: 30px; background: whitesmoke; opacity: 0.5; transition: all .35s ease; mask-size: cover; mask: url('../assets/images/icons/logout.svg') no-repeat center;  }
   .logout:hover { background: white; opacity: 0.8; }

   .transaction-history { width: 370px; margin: 0 auto; }
   .transaction-history ul.transactions { padding: 0; list-style: none; }
   ul.transactions li { 
      width: 100%; padding: 5px 0; background: #212733; margin: 5px 0; border-radius: 5px;
      color: rgb(211, 211, 211); display: flex; justify-content: space-between; align-items: center;
   }
   
   ul.transactions li h4 { margin: 0; }
   ul.transactions li h4.date { font-size: 11px; color: #cdcdcd; font-weight: 400; margin: 0 10px; }


   h2.title { color: rgb(211, 211, 211); font-weight: 200; font-size: 18px; }
   

</style>