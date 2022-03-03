

<template>
   <div class="bank">
      <transition name="fade-with-bottom-slide" mode="out-in" appear>
         <BankingMain v-if="showed.main" key=bankMain :showed="showed" />

         <BankingCreate v-if="showed.create" key=bankCreate :showed="showed" />

         <BankingLoan v-if="showed.loan" key=bankLoan :showed="showed" />

         <BankingAccount v-if="showed.account" key=bankAccount :showed="showed" />
      </transition>
   </div>
</template>

<script lang="ts">
   import Vue from 'vue';
   import BankingMain from './banking/banking.main.vue';
   import BankingCreate from './banking/banking.register.vue';
   import BankingLoan from './banking/banking.loan.vue';
   import BankingAccount from './banking/banking.account.vue';

   export default Vue.extend({
      components: {
         BankingMain, BankingCreate, BankingLoan, BankingAccount
      },
      
      data () {
         return {
            showed: {
               main: true,
               create: false,
               account: false,
               loan: false
            }
         }
      },

      methods: {
         
      },

      mounted () {
      }
   });
</script>

<style scoped>
   .bank {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      display: grid;
      background: radial-gradient(rgb(71 77 87 / 55%), rgb(11 14 17 / 85%));
   }



   @keyframes appear-from-top {
      from { transform: translateY(-200px); }
   }

</style>