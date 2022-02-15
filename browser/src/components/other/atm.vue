


<template>
   <div class="banking"> 
      <div class="box">
         <div class="header">
            <div class="profile">
               <h3> {{ Name }} </h3>
               <div class="balance">
                  <h2> {{ dollars(Balance) }} </h2>
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
            <li class="savings-page" :class="{ 'active': Page == 'savings' }" v-on:click="Navigate('savings')" v-tooltip="Messages.SAVINGS_PAGE"> </li>
         </ul>

         <transition name="slide-fade" mode="out-in"> 
            <div class="page" v-if="Page == 'home'" key=Home>

               <div class="paycheck">
                  <h2 class="title"> {{ Messages.PAYCHECK }} </h2>
                  <h4 class="payment" v-html="Paycheck > 0 ? '<b>' + dollars(Paycheck) + '</b>' + Messages.WAITING_FOR_PAYMENT : Messages.THERE_IS_NO_PAYCHECK"> </h4>
                  <button class="get-payment frp-green" v-if="Paycheck > 0"> {{ Messages.GET_PAYMENT }} </button>
               </div>

               <div class="transaction-history">
                  <h2 class="title"> {{ Messages.TRANSACTION_HISTORY }} </h2>
                  <ul class="transactions"> 
                     <li v-for="Transaction in Transactions" :key="Transaction"> 
                        <h4 class="date"> {{ Transaction.Date }} </h4>
                        <h4 class="description" v-html="Transaction.Description"> </h4>
                        <h4 class="amount"> {{ dollars(Transaction.Amount) }} </h4>
                     </li>
                  </ul>
               </div>
            </div>

            <div class="page" v-if="Page == 'withdraw'" key=Withdraw>
               <div class="withdraw"> 
                  <h2 class="title"> {{ Messages.WITHDRAW_PAGE }} </h2>
                  <input type="number" :placeholder="Messages.MONEY_AMOUNT" v-model="Inputs.Withdraw" />
                  <button class="money"> {{ Messages.WITHDRAW_THE_MONEY }} </button>
               </div>
            </div>

            <div class="page" v-if="Page =='deposit'" key=Deposit>
               <div class="deposit"> 
                  <h2 class="title"> {{ Messages.DEPOSIT_PAGE }} </h2>
                  <input type="number" :placeholder="Messages.MONEY_AMOUNT" v-model="Inputs.Deposit" />
                  <button class="money"> {{ Messages.DEPOSIT_THE_MONEY }} </button>
               </div>
            </div>

            <div class="page" v-if="Page == 'transfer'"> 
               <div class="transfer"> 
                  <h2 class="title"> {{ Messages.TRANSFER_PAGE }} </h2>
                  <input type="text" :placeholder="Messages.MONEY_TARGET" v-model="Inputs.Transfer_Target">
                  <input type="number" :placeholder="Messages.MONEY_AMOUNT" v-model="Inputs.Transfer_Amount">
                  <button class="money"> {{ Messages.TRANSFER_THE_MONEY }} </button>
               </div>
            </div>

         </transition>
         
      </div>
   </div>
</template>

<script>

   import { Messages } from '@/globals';
   import Helpers from '@/helpers';

   export default { 
      data () { 
         return { 
            Page: 'home',

            Name: 'Zachary Parker',
            Number: 342343,
            Balance: 34343,
            Paycheck: 0,
            Savings: 0,
            Transactions: [
               { Date: '11.06.2001 - 20:23', Amount: 300, Type: 1, Description: 'Depozit Novca' },
               { Date: '11.06.2001 - 20:23', Amount: 300, Type: 2, Description: 'Transfer Novca na <b>34534534534</b>' },
               { Date: '11.06.2001 - 20:23', Amount: 300, Type: 0, Description: 'Podizanje Novca' }
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

         Payment: function () {
            mp.trigger('CLIENT::BANKING:PAYMENT', this.Paycheck);
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
      background: radial-gradient(circle, rgb(52 58 70 / 75%) 0%, rgb(25 29 36 / 85%) 90%); top: 0; left: 0; 
      position: absolute; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;
   }

   .box { 
      width: 450px;
      height: 525px;
      border-radius: 15px;
      background: linear-gradient(90deg, #21252f 0%, #13161c 100%);
      box-shadow: rgb(0 0 0 / 15%) 0px 1px 20px 0px;
      overflow: hidden;
   }

   .box .header { 
      width: 100%; height: 180px; display: flex; justify-content: center; align-items: center;
      background: linear-gradient(141deg, rgba(104,69,234,1) 0%, rgba(66,54,128,1) 100%);
      box-shadow: inset rgb(255 255 255 / 20%) 0px 1px 20px -10px; position: relative; overflow: hidden;
   }

   .header::after { 
      position: absolute; content: ''; bottom: -5px; right: 60px; width: 160px; height: 160px; background: url('../../assets/images/icons/bank.svg'); background-size: cover; filter: grayscale(1); opacity: 0.45;
   }

   .header .profile { width: 300px; height: 100px; }
   .profile h3 { margin: 0; color: whitesmoke; letter-spacing: 0.7px; font-weight: 200; font-size: 16px; }
   .profile .balance { margin-top: 5px; }
   .profile .balance h2 { margin: 0; font-size: 26px; color: rgb(221, 221, 221); letter-spacing: 1.5px; }
   .profile .balance small { text-transform: uppercase; letter-spacing: 3.5px; color: whitesmoke; font-weight: 100; }

   ul.navigation { 
      list-style: none; display: flex; width: 255px; justify-content: space-between; align-items: center;
      margin: 0 auto; position: relative; padding: 10px 20px; margin-top: -15px; border-radius: 15px; z-index: 10;
      background: #21252f; box-shadow: rgb(0 0 0 / 10%) 0px 1px 20px 0px;
   }

   ul.navigation li { transition: all 0.35s ease; width: 30px; height: 30px; background: whitesmoke; opacity: 0.5; mask-size: cover; }
   ul.navigation li:hover { opacity: 1; }
   ul.navigation li.home-page { mask: url('../../assets/images/icons/home-page.svg') no-repeat center; }
   ul.navigation li.withdraw-page { mask: url('../../assets/images/icons/withdraw-money.svg') no-repeat center; }
   ul.navigation li.deposit-page { mask: url('../../assets/images/icons/deposit-money.svg') no-repeat center; }
   ul.navigation li.transfer-page { mask: url('../../assets/images/icons/transfer-money.svg') no-repeat center; }
   ul.navigation li.savings-page { mask: url('../../assets/images/icons/savings.svg') no-repeat center; }
   ul.navigation li.active { opacity: 1; }

   .logout { position: absolute; top: 10px; right: 5px; width: 30px; height: 30px; background: whitesmoke; opacity: 0.5; transition: all .35s ease; mask-size: cover; mask: url('../../assets/images/icons/logout.svg') no-repeat center;  }
   .logout:hover { background: white; opacity: 0.8; }

   .transaction-history { width: 370px; margin: 0 auto; margin-top: 20px; }
   .transaction-history ul.transactions { padding: 0; list-style: none; max-height: 165px; overflow-y: auto; margin: 5px 0; padding: 0 5px; }
   ul.transactions li { 
      width: 100%; padding: 5px 0; background: #2a303c; margin: 5px 0; border-radius: 5px;
      color: rgb(211, 211, 211); display: flex; justify-content: space-between; align-items: center;
   }
   
   ul.transactions li h4 { margin: 0; }
   ul.transactions li h4.date { font-size: 9px; color: #cdcdcd; font-weight: 300; margin: 0 10px; }
   ul.transactions li h4.amount { margin: 0 10px; }
   ul.transactions li h4.description { font-size: 12px; font-weight: 300; width: 225px; }

   .paycheck { width: 370px; margin: 0 auto; margin-top: 20px; display: flex; justify-content: space-between; align-items: center; }
   .paycheck .payment { font-weight: 300; color: rgb(201, 201, 201); }
   .get-payment { font-size: 13px; padding: 5px 10px; width: 70px; }

   .withdraw, .deposit { margin: 0 auto; width: 320px; margin-top: 40px; height: 220px; display: flex; flex-direction: column; justify-content: space-between; align-items: center; }
   .transfer { margin: 0 auto; width: 300px; height: 220px; margin-top: 40px; display: flex; flex-direction: column; justify-content: space-between; align-items: center; }
   .withdraw input[type=number], .deposit input[type=number], .transfer input { width: 200px; }

   button.money { background: linear-gradient(141deg, rgba(104,69,234,1) 0%, rgba(66,54,128,1) 100%); color: whitesmoke; font-weight: 400; transition: all .35s ease; }
   button.money:hover { filter: brightness(1.25); } 

   input { background: #252b38; -webkit-appearance: none; }
   input:focus { outline: none; border-color: transparent; }

   ::-webkit-input-placeholder { 
      color: #b8b8b8;
      font-size: 12px;
   }

   h2.title { color: rgb(211, 211, 211); font-weight: 200; font-size: 18px; margin: 0; }
   

</style>