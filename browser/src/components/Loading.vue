


<template>
   
   <div class="loader">
      <div class="dots-spinner" >
         <div class="dot"></div>
         <div class="dot"></div>
         <div class="dot"></div>
      </div>
   </div>


</template>

<script>

   export default { 
      data () { 
         return { 
         }
      }
   }

</script>

<style scoped>

   .loader { 
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
   }

   .dots-spinner, .dots-spinner * {
      box-sizing: border-box;
   }

   .dots-spinner {
      height: 15px;
      width: calc(30px * 3);
   }

   .dots-spinner .dot {
      width: 15px;
      height: 15px;
      margin: 0 calc(15px / 2);
      border: calc(15px / 5) solid #6f4def;
      box-shadow: 0 4px 10px rgb(111 81 240 / 25%);
      border-radius: 50%;
      float: left;
      transform: scale(0);
      animation: dots-spinner-animation 1000ms ease infinite 0ms;
   }

   .dots-spinner .dot:nth-child(1) {
      animation-delay: calc(300ms * 1);
   }

   .dots-spinner .dot:nth-child(2) {
      animation-delay: calc(300ms * 2);
   }

   .dots-spinner .dot:nth-child(3) {
      animation-delay: calc(300ms * 3);
   }

   @keyframes dots-spinner-animation {
      50% { transform: scale(1); opacity: 1; }
      100% { opacity: 0; }
   }

</style>