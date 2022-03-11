

<template>
   <div class="garage-holder">
      <div class="garage">
         {{ factionName }}
      </div>
   </div>
</template>

<script lang="ts">
   import Vue from 'vue';
   import Component from 'vue-class-component';

   @Component
   export default class FactionGarage extends Vue {
      
      factionName: string = '';
      models: string[] | null = null;
      
      initGarage (factionName: string, sVehicles: string) {
         this.models = JSON.parse(sVehicles);
      }
      
      takeVehicle () {

      }

      mounted () {
         mp.events.add('BROWSER::FACTION:GARAGE', this.initGarage);
      }
   }
</script>

<style scoped>
   .garage-holder { 
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(rgb(71 77 87 / 65%), rgb(11 14 17 / 85%));
      display: grid;
   }
</style>