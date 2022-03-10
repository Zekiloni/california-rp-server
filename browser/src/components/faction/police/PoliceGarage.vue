

<template>
   
</template>

<script lang="ts">
   import Vue from 'vue';
   import Component from 'vue-class-component';

   @Component
   export default class PoliceGarage extends Vue {
      
      models: string[] | null = null;
      
      initGarage (sVehicles: string) {
         this.models = JSON.parse(sVehicles);
      }
      
      takeVehicle () {

      }

      mounted () {
         mp.events.add('BROWSER::POLICE:GARAGE', this.initGarage);
      }
   }
</script>