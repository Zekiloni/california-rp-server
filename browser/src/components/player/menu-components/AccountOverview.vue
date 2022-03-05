

<template>
   <div class="account">
      <h2> {{ Messages.YOUR_ACCOUNT }} </h2>
      <small> {{ Messages.YOUR_ACCOUNT_INFO }} </small>

      <div class="info">
         <div class="box">
            <span> <b> {{ Messages.E_MAIL }}</b>  {{ account.email }} </span>
         </div>

         <div class="box">
            
         </div>

         <div class="box">

         </div>
      </div>
   </div>
</template>

<script lang="ts">
   import Vue from 'vue';
   import Component from 'vue-class-component';
   import { Messages } from '@/globals';
   
   @Component({
      props: {
         account: Object
      }
   })
   export default class AccountOverview extends Vue { 

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
      font-size: 0.7rem;
      font-weight: 600;
   }

   .info {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
   }

   .info .box {
      width: 205px;
      height: 200px;
      margin: 5px;
      border-radius: 4px;
      border: 1px solid rgb(71 77 87 / 80%);
      display: grid;
      padding: 10px;
   }

   .box span { 
      margin: 0
   }
</style>