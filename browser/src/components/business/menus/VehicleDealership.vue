

<template>
   
</template>

<script lang="ts">
   import Vue from 'vue';
   import Component from 'vue-class-component';

   @Component
   export default class VehicleDealership extends Vue { 

      mounted () {
         if (window.mp) {
            mp.invoke('focus', true);
         }
      }
   }
</script>
