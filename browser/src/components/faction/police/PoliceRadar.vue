

<template>
   <div class="radar">
      <h4> {{ speed.toFixed(0) }} </h4>
      <h2> {{ model ? model : 'none' }} </h2>
      <h2> {{ numberplate ? numberplate : 'n/ a' }} </h2>
   </div>
</template>

<script lang="ts">
   import Vue from 'vue';
   import Component from 'vue-class-component';

   @Component
   export default class PoliceRadar extends Vue {
      speed: number = 0;
      model: string | null = null;
      numberplate: string | null = null;

      update (speed: number, model: string | null, numberplate: string | null) {
         this.speed = speed;
         this.model = model;
         this.numberplate = numberplate;
      }

      mounted () {
         mp.events.add('BROWSER::POLICE_RADAR', this.update);
      }
   }
</script>

<style scoped>
   .radar { 
      position: absolute;
      bottom: 400px;
      left: 30px;
      color: red;
   }
</style>