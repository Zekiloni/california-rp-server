

<template>
   <div class="icon" :style="{ mask: 'url(' + src + ') no-repeat center;', width: width + 'px', height: height + 'px' }"> 

   </div>
</template>

<script lang="ts">
   import Vue from 'vue'
   import Component from 'vue-class-component';

   @Component({
      props: {
         src: String,
         width: Number,
         height: Number
      }
   })
   export default class Icon extends Vue {

   }
</script>

<style scoped>
   .icon { 
      background: white;
      mask-size: cover;
      width: 40px;
      height: 40px;
   }
</style>