
<template>
  <div class="bills">
     <div class="info">
        <h2> Placanje racuna  </h2>
        <p> Na ovoj stranici vam je omogućeno plaćanje računa. </p>
     </div>

     <div class="bill">
        <input type="number">
     </div>
  </div>
</template>

<script lang="ts">
   import Vue from 'vue';
   import Component from 'vue-class-component';

   interface Bill {

   }

   @Component
   export default class ATMBills extends Vue {
      whereTo: string = '';


      checkBill () {

      }
   }
</script>

<style scoped>
   .bills {
      margin: auto;
      width: 90%;
      height: auto;
      min-height: 300px;
   }

   .info img {
      width: 40px;
   }
   
   .info h2 { 
      margin: 0;
      color: #ececec;
   }

   .info p {
      color: #cdcdcd
   }

   
   input::-webkit-outer-spin-button,
   input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
   }

</style>