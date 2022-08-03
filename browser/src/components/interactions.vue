

<template>
   <ul class="interactions"> 
      <li v-for="(interaction, i) in interactions" :key="i"> 


      </li>
   </ul>
</template>

<script>
   export default {
      data () { 
         return { 
            interactions: [
               { }
            ],
         }
      },

      mounted () { 
         if (window.mp) { 
            mp.events.add('BROWSER::INTERACTION', interaction => this.interactions.push(interaction) );
         }
      
      }
   }
</script>

<style scoped>

</style>