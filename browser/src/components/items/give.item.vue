
<template>
   <div class="give-item"> 

   </div>
</template>

<script>
   export default {
      props: {
         item: Object,
      },

      data () { 
         return { 

         }
      },

      mounted () { 
         console.log('give item moutned')
      }
   }
</script>

<style scoped>

   .give-item { 
      width: 400px;
      height: 200px;
      background: red;
   }

</style>