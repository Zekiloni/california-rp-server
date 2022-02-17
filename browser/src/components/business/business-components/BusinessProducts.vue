

<template>
   <div class="products">
      <h2> {{ Messages.BUSINESS_PRODUCTS }} </h2>
      <table>
         <tr class="head">
            <th> {{ Messages.PRODUCT_NAME }} </th>
            <th class="quantity"> {{ Messages.PRODUCT_QUANTITY }} </th>
            <th class="price"> {{ Messages.PRODUCT_PRICE }} </th>
         </tr>
         <tr v-for="product in products" :key="product.id" >
            <td> {{ product.name }} </td>
            <td> {{ product.quantity }} </td>
            <td> {{ dollars(product.price) }} </td>
         </tr>
         <tr class="add-product">
            <td> 
               <input type="text" v-model="input.name" :placeholder="Messages.PRODUCT_NAME" ref="product_name">
               <ul v-if="input.name.length > 0 && !available.includes(input.name)" class="prediction" >
                  <li v-for="item in availableItems" :key="item" @click="input.name = item">{{ item }}</li>
               </ul>
            </td>
            <td> 
               <input type="number" v-model="input.price" ref="product_price" :placeholder="Messages.PRODUCT_PRICE" >
            </td>
            <td> 
               <button class="save" @click="add()"> Dodaj produkt </button>
            </td>
         </tr>
      </table>
   </div>
</template>

<script lang="ts">
   import Vue from 'vue'
   import Component from 'vue-class-component';
   import { Messages } from '@/globals';

   @Component({
      props: {
         available: Array,
         busines_id: Number,
         products: Array
      }
   })
   export default class BusinessProducts extends Vue {
      
      Messages = Messages;

      get availableItems () {
         if (this.input.name.length > 1) {
            return this.$props.available.filter((e: string) => e.toLowerCase().indexOf(this.input.name!.toLowerCase()) !== -1)
         } else {
            return this.$props.available;
         }
      }
      
      input: { name: string, price: number | null } = {
         name: '',
         price: null
      }

      remove (id: number) {

      }

      add () {

         if (!this.input.name || !this.$props.available.includes(this.input.name)) {
            // @ts-ignore
            this.borderWarning(this.$refs.product_name);
            return;
         }

         if (this.input.price! < 0.2) {
            // @ts-ignore
            this.borderWarning(this.$refs.product_price);
            return;
         }
         
         mp.events.call('CLIENT::BUSINESS:PRODUCT_ADD', this.$props.busines_id, this.input.name, this.input.price);
         
         this.input.name = '';
         this.input.price = null;
      }

      async mounted () {
      }
   }
</script>

<style scoped>

   table {
      width: 705px;
      background: #181a20;
      height: 100%;
      table-layout: fixed;
      border-collapse: collapse;
   }

   td, th {
      text-align: left;
      padding: 10px;
   }

   tr {
      background: #181a20;
      color: #848e9c;
   }

   tr:nth-child(even) {
      background-color: #21252f; 
      color: #cdcdcd;
   }

   tr {
      height: 30px;
   }

   th {
      color: #848e9c;
   }

   th.price {
      width: 150px;
   }

   tr.add-product {
      position: relative;
      background: #0b0e10;
   }

   ul.prediction { 
      list-style: none;
      width: 130px;
      padding: 5px 15px;
      border-radius: 5px;
      margin: 0;
      top: 50px;
      overflow-y: scroll;
      overflow-x: hidden;
      min-height: 15px;
      height: auto;
      max-height: 100px;
      position: absolute;
      background: #2a303c;
   }

   ul.prediction li { 
      margin: 2px 0;
      color: #848e9c;
      transition: all .2s ease;
   }

   ul.prediction li:hover {
      opacity: 0.5;
   }

   h2 { 
      color: whitesmoke;
      margin: 20px 0;
      font-weight: 500;
   }

   button.save { 
      padding: 10px 15px;
      font-size: 0.75rem;
      font-weight: 550;
      border-radius: 5px;
      background: linear-gradient(45deg, #ffcc45, #ffb901);
      color: #0b0e11;
      transition: all .3s ease;
   }

   button:hover { 
      filter: brightness(1.2);
   }

   input::-webkit-outer-spin-button,
   input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
   }

   input {
      position: relative;
      padding: 10px 5px;
      transition: all .3s ease;
      border: 1px solid #181a20;
      color: #cdcdcd;
      border-radius: 5px;
      box-shadow: rgb(0 0 0 / 25%) 0px 1px 20px 0px;
      background: #2b2f36;
   }

   input[type=number] {
      width: 120px;
   }

</style>