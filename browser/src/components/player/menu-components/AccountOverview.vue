

<template>
   <div class="account" v-if="account">
      <h2> {{ Messages.YOUR_ACCOUNT }} </h2>
      <small> {{ Messages.YOUR_ACCOUNT_INFO }} </small>

      <div class="info">
         <div class="box">
            <div class="text"> <b> {{ Messages.E_MAIL }}</b>  {{ account.email }} </div>
            <div class="text"> <b> {{ Messages.REGISTER_DATE }} </b> {{ formatDate(account.created_at) }} </div>
            <div class="text" :class="{ admin: account.administrator > 0 }"> <b> {{ Messages.ACCOUNT_RANK }} </b> {{ Ranks[account.administrator] }} </div>
            <div class="text"> <b> {{ Messages.CHARACTERS_NUMBER }} </b> {{ account.characters.length }} / 3 </div>
         </div>

         <div class="box">
            <div class="text"> <b> {{ Messages.AGE_ONLINE }} </b> {{ ageOnline }}h </div>
            <!-- warns, donator, online count -->
         </div>
      </div>
   </div>
</template>

<script lang="ts">
   import Vue from 'vue';
   import Component from 'vue-class-component';
   import { Messages, Ranks } from '@/globals';
   import { Character } from '@/models';

   @Component({
      props: {
         account: Object
      }
   })
   export default class AccountOverview extends Vue { 
      initial: number = 0;

      get ageOnline () {
         return this.$props.account.characters.reduce((previousValue: Character, currentValue: Character) => previousValue.hours ? previousValue.hours : 0 + currentValue.hours, 0);
      }

      Ranks = Ranks;
      Messages = Messages;
   }
</script>

<style scoped>
   h2 {
      margin: 0;
      color: #cdcdcd;
      font-weight: 500;
   }

   small {
      color: #848e9c;
      font-size: 0.75rem;
      font-weight: 500;
   }

   .info {
      margin-top: 20px;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
   }

   .info .box {
      min-width: 190px;
      max-width: 210px;
      height: 200px;
      margin: 5px;
      border-radius: 4px;
      background: #212126;
      padding: 10px;
   }

   .box .text { 
      margin-bottom: 15px;
      color: #cdcdcd;
      font-weight: 500;
   }

   .text.admin {
      color: #ff2121;
   }

   .box .text b {
      color: #848e9c;
      font-weight: 400;
      display: block;
      text-transform: uppercase;
   }
</style>