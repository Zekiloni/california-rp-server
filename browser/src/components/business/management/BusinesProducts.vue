

<template>
   <div class="products">
      {{ availableProducts }}

      {{ products }}

      <div class="add-product">
         <input type="text" v-model="newProduct.name">
         <input type="number" v-model="newProduct.price">
      </div>
   </div>
</template>

<script lang="ts">
   import Vue from 'vue';
   import Component from 'vue-class-component';
   
   import { BusinessProduct } from '@/models';

   @Component({
      props: {
         type: Number,
         products: Array
      }
   })
   export default class BusinesProducts extends Vue { 
      availableProducts: string[] = [];

      selected: BusinessProduct | null = null;

      newProduct = {
         name: '',
         price: 0
      }

      add () {
         if (!this.newProduct.name || !this.newProduct.price)
            return;

         this.$emit('add-product', this.newProduct.name, Number(this.newProduct.price));
      }

      remove (product: BusinessProduct) {
         this.$emit('remove-product', product);
      }      

   
      mounted () {
         mp.events.callProc('CLIENT::BUSINES_AVAILABLE_PRODUCTS', this.$props.type).then(
            products => this.availableProducts = JSON.parse(products)
         );
      }
   }
</script>