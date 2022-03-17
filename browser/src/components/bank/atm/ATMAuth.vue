
<template>
   <div class="authorization">
      <div class="digits">
         <button v-for="digit in digits" :key="digit" @click="add(digit)"> {{ digit }} </button>
         <button @click="remove"> - </button>
      </div>
      
      <div class="pin">
         <h2 class="number"> {{ formatBank(bankNumber) }} </h2>

         <input type="number" disabled v-model="pin">
         <small> {{ Messages.ATM_REMAINING_ATTEMPTS }} <b> {{ 3 - attempts }} </b> </small>
         <button class="enter" @click="enter"> {{ Messages.ENTER_ATM }} </button>
      </div>

   </div>
</template>

<script lang="ts">
   import Vue from 'vue';
   import Component from 'vue-class-component';
   import { Messages } from '@/globals';

   @Component({
      props: {
         bankNumber: Number,
         attempts: Number
      }
   })
   export default class ATMAuth extends Vue {
      digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

      pin: string = '';

      Messages = Messages;

      add (digit: number) {
         if (this.pin.length == 4) {
            return;
         } 
         this.pin += digit.toString();
      }


      remove () {
         if (this.pin.length == 0) {
            return;
         }

         this.pin = this.pin.slice(0, -1);
      }

      enter () {
         this.$emit('authorization', this.pin);
      }
   }
</script>

<style scoped>
   .authorization {
      margin: auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;
      width: 85%;
   }

   input {
      text-align: right;
      font-size: 3rem;
      width: 200px;
      padding: 5px 0;
      margin-top: 15px;
      background: #181a20;
      color: #5e606a;
      border-radius: 5px;
   }
   
   .digits {
      display: flex;
      flex-wrap: wrap;
      background: #181a20;
      max-width: 225px;
      padding: 10px;
   }

   .digits button {
      width: 65px;
      height: 65px;
      margin: 5px;
      font-size: 1.45rem;
      font-weight: 400;
      background: #2a303c;
      color: #cdcdcd;
      border-radius: 4px;
      transition: all .3s ease;
      box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
   }

   .digits button:hover {
      filter: brightness(1.25);
      color: white;
   }

   button.enter { 
      color: whitesmoke;
      font-size: 1rem;
      font-weight: 150;
      margin-top: 15px;
      border-radius: 5px;
      padding: 10px 25px;
      background: #6d4edb;
      transition: all .3s ease;
      width: 100%;
   }

   button.enter:hover { 
      filter: brightness(1.15);
      color: whitesmoke;
   }

   .pin {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: flex-end;
      height: 90%;
      width: 45%;
   }

   .pin small {
      color: #848e9c;
      margin: 10px 0;
   }

   .pin h2.number { 
      letter-spacing: 0.3rem;
      color: #ffcc45;
   }
</style>