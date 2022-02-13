

<template>
   <div class="products">

   </div>
</template>

<script lang="ts">
   import Vue from 'vue'
   import Component from 'vue-class-component';
   import { Business } from '@/models';

   @Component({
      props: {
         products: BusinessProducts
      }
   })
   export default class BusinessProducts extends Vue {
      
      available = [];

      remove (id: number) {

      }

      add (name: string) {

      }

      mounted () {
         if (window.mp) {
            mp.events.call('CLIENT::BUSINESS:GET_AVAILABLE_PRODUCTS')
         }
      }
   }
</script>
