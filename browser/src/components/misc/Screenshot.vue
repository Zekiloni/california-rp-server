

<template>
   <div class="sccreenshot">

   </div>
</template>

<script lang="ts">
   import Vue from 'vue'
   import Component from 'vue-class-component';

   @Component
   export default class Screenshot extends Vue {


      imageTo64 (url: string) {
         const image = new Image();
         image.crossOrigin = 'Anonymous';
         image.src = url;
         image.onload = (() => {
            const canvas = document.createElement('canvas');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            const ctx = canvas.getContext('2d');
            ctx!.drawImage(image, 0, 0);
            const dataURL = canvas.toDataURL('image/png');
            const base64 = dataURL.replace('data:image/png;base64,', '');
         })
      }

      mounted () {
         if (window.mp) {
            mp.events.addProc('BROWSER::SCREENSHOT', (url: string) => {
               
            })
         }
      }
   }
</script>

<style scoped>
   .screenshot { 
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
   }
</style>