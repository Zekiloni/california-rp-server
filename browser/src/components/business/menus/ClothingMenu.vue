

<template>
   <div class="wrapper" v-if="busines">
      <div class="clothing-shop">

      </div>
   </div>
</template>

<script lang="ts">
   import Vue from 'vue'
   import Component from 'vue-class-component';
   import { Messages } from '@/globals';
   import { Business } from '@/models';

   @Component
   export default class ClothingMenu extends Vue {

      busines: Business | null = null;
      
   }
</script>