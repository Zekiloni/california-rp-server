

<template>
    <div class="holder">
      <div class="box">
         <img src="@/assets/images/other/maze-bank-small.png" alt="maze bank logo" class="logo">
      </div>

      <div class="box md-2 hoverable" v-on:click="showed.main = false, showed.create = true">
         <h3 class="title"> {{ Messages.WANT_TO_BE_USER }} </h3>
         <p> {{ Messages.BANK_ACCOUNT_NOW }}. </p>
         <div class="icon create-account"> </div>
      </div>

      <div class="box sm-2 hoverable" v-on:click="showed.main = false, showed.account = true">
         <h3 class="title"> {{ Messages.ALREADY_USER }} </h3>
         <div class="icon log-in"> </div>
      </div>

      <div class="box md-2-2 hoverable" v-on:click="showed.main = false, showed.loan = true">
         <h3 class="title"> {{ Messages.CASH_CREDIT }} </h3>
         <div class="icon cash-credit"> </div>
         <p> {{ Messages.NEED_LOAN }} </p>
         <ul>
            <li v-for="loan in Messages.BANK_LOAN_CHECK" v-html="loan" :key="loan"> </li>
         </ul>
      </div>

      <div class="box md-3-2">
         <h3 class="title"> {{ Messages.MAZE_BANK }} </h3>
         <div class="icon bank"> </div>
      </div>
   </div>
</template>

<script lang="ts">
   import Vue from 'vue';
   import { Messages } from '../../../globals';
   
   export default Vue.extend({
      props: { 
         showed: Object
      },

      data () { 
         return {
            Messages
         }
      }
   })
</script>

<style scoped>

   .holder {
      margin: auto;
      width: 800px;
      height: 450px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-content: center;
   }

   .box {
      width: 150px;
      height: 150px;
      transition: all .3s ease;
      position: relative;
      background: #181a20;
      display: grid;
      overflow: hidden;
      border-radius: 20px;
      margin: 5px;
   }

   .box h3.title {
      margin: 15px 0 0 15px;
      font-size: 1.3rem;
      font-weight: 450;
      color: #cdcdcd;
      z-index: 1;
   }

   .box .icon {
      bottom: 10px;
      right: 10px;
      z-index: 0;
      width: 95px;
      height: 95px;
      background: #2a303c;
      position: absolute;
   }

   .icon.create-account { mask: url('../../../assets/images/icons/register.svg') no-repeat center; mask-size: cover; }
   .icon.log-in { mask: url('../../../assets/images/icons/log-in.svg') no-repeat center; mask-size: cover; }
   .icon.cash-credit { mask: url('../../../assets/images/icons/cash-credit.svg') no-repeat center; mask-size: cover; }
   .icon.bank { opacity: 0.3; width: 220px; height: 200px; mask: url('../../../assets/images/icons/bank.svg') no-repeat center; mask-size: cover; }

   img.logo { 
      width: 95px;
      animation: fade-in 3.2s ease;
      margin: auto;
   }

   .box.hoverable:hover { 
      filter: brightness(1.1);
      box-shadow: rgba(0, 0, 0, 0.15) 0px 10px 15px -3px, rgba(0, 0, 0, 0.15) 0px 4px 6px -2px;
      background: #7552df;
   }

   .box.hoverable:hover .icon {
      background: #cdcdcd;
      opacity: 0.2;
   }

   .box.hoverable:hover p {
      color: #cdcdcd;
   }

   .box p {
      color: #848e9c;
      padding: 0;
      width: 85%;
      z-index: 1;
      position: relative;
      margin: 5px 15px;
   }

   .box h4 { margin: 15px; text-transform: uppercase; letter-spacing: 2px; }

   .box.sm-2 {width: 185px; }
   .box.md { width: 280px; }
   .box.md-2 { width: 350px; }
   .box.md-2-2 { width: 325px; height: 200px; }
   .box.md-3-2 { width: 380px; height: 200px; }

   .box ul {
      margin: 10px;
      position: relative;
      z-index: 2;
      color: #cdcdcd;
   }
</style>