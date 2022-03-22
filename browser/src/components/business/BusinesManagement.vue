

<template>
   <div class="wrapper">
      <div class="busines" v-if="busines">
         
         <BusinesProducts 
            :type="busines.type" 
            :products="busines.products" 
            @add-product="addProduct" 
            @remove-product="removeProduct" 
            @edit-product="editProduct"
         />
         
      </div>
   </div>
</template>

<script lang="ts">
   import Vue from 'vue'
   import Component from 'vue-class-component';
   import { Messages } from '@/globals';

   import { Business, BusinessProduct } from '@/models';

   import BusinesProducts from './management/BusinesProducts.vue';

   
   @Component({
      components: {
         BusinesProducts
      }
   })
   export default class BusinesManagement extends Vue {
      
      busines: Business | null = null;

      Messages = Messages;

      addProduct (name: string, price: number) {
         mp.events.callProc('CLIENT::BUSINES_ADD_PRODUCT', this.busines!.id, name, price).then(
            addedProduct => this.busines?.products.push(JSON.parse(addedProduct))
         )
      }

      editProduct (index: number, product: BusinessProduct, price: number) {
         mp.events.callProc('CLIENT::BUSINES_PRODUCT_EDIT', this.busines!.id, product.id, price).then(
            editedProduct => this.busines!.products[index] = JSON.parse(editedProduct)
         );
      }

      removeProduct (index: number, product: BusinessProduct) {
         mp.events.callProc('BUSINESS::DELETE_PRODUCT', product.id).then((productDeleted: boolean) => { 
            if (productDeleted) {
               this.busines?.products.splice(index, 1)
            }
         })
      }

      mounted () {
         mp.events.add('BROWSER::BUSINESS_MANAGEMENT', (info: string) => {
            this.busines = JSON.parse(info);
         })
      }
   }
</script>

<style scoped>
   .wrapper {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: grid;
      background: linear-gradient(0deg, #1a191e, transparent);
   }

   .busines {
      width: 700px;
      height: 525px;      
      background: #16151A;
      border-radius: 10px;
      margin: auto;
   }
   

</style>