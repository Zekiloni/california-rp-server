
<template>
   <div class="spawn-selector"> 
      
      {{ spawnPoints }}
   </div>
</template>

<script >

   export default {
      
      props: { 
         spawnPoints: Object
      },

      data () { 
         return { 
         }
      },
      
      methods: { 

      },

      mounted () { 

      }
      
   }
</script>

<style scoped>

   .selector { 
      width: 100%;
      height: 100%;
   }

</style>