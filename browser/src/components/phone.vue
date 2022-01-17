


<template>
   <div class="phone">

   </div>
</template>

<script>
   export default {
      data () { 
         return { 

         }
      },

      methods: {

      },

      mounted () { 
         if (window.mp) { 
            mp.invoke('focus', true); 
         }
      },

      beforeDestroy () { 
         if (window.mp){
            mp.invoke('focus', false);
         }
      }
   }
</script>

<style scoped>
   .phone { 
      position: absolute;
      bottom: 30px;
      right: 350px;
      width: 305px;
      height: 555px;
      background: black;
      border-radius: 20px;
      box-shadow: 0 0 15px black;
   }

</style>