

<template>
   <div class="withdraw-page">
      <input type="number" name="withdraw-amount">
      <button @click="withdraw"> podigni pare </button>
   </div>
</template>

<script lang="ts">
   import Vue from 'vue'
   import Component from 'vue-class-component';

   @Component({
      props: {
         Messages: Object
      }
   })
   export default class ATMWithdraw extends Vue {
      amount: number = 0;
      
      withdraw () {


         this.$emit('withdraw', this.amount);
      }
   }
</script>

<style scoped>
   .withdraw-page {
      width: 300px;
      height: 250px;
      margin: auto;
   }


</style>