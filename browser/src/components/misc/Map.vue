
<template>
   <div class="map">
      <img src="@/assets/images/atlas_squared.png" alt="">
   </div>
</template>

<script lang="ts">
   import Vue from 'vue';
   import Component from 'vue-class-component';
   
   @Component
   export default class Map extends Vue {

   }
</script>

<style scoped>
   .map { 
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #0fa8d2;
      z-index: 9999;
      display: flex;
      justify-content: center;
   }

   .map img {
      height: 100%;
      image-rendering: optimizeSpeed;
      image-rendering: pixelated;
   }
</style>