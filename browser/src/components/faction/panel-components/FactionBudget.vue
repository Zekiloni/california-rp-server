
<template>
   <div class="budget">
      <div class="info">
         <h2> aa </h2>
         <p> </p>
      </div>

      <h1 class="balance">
         {{ budget ? dollars(budget) : dollars(0) }}
      </h1>

      <div class="options">
         <div class="withdraw">
            <label for="withdraw"> Podizanje novca </label>
            <input type="number" name="withdraw" v-model="amounts.withdraw">
            <button @click="submitOption('withdraw')"> podigni </button>
         </div>
         
         <div class="deposit">
            <label for="deposit"> Depozit novca </label>
            <input type="number" name="deposit" v-model="amounts.deposit">
            <button @click="submitOption('deposit')"> ostavi novac </button>
         </div>
      </div>
   </div>
</template>

<script lang="ts">
   import Vue from 'vue';
   import Component from 'vue-class-component';

   interface FactionBudgetInputs {
      [key: string]: number | null
   }

   @Component({
      props: {
         budget: Number
      }
   })
   export default class FactionBudget extends Vue {
      amounts: FactionBudgetInputs = {
         withdraw: null,
         deposit: null
      }

      submitOption (option: string) {
         if (!this.amounts[option]) {
            return;
         }

         this.$emit(option, this.amounts[option]);
      }
   }
</script>