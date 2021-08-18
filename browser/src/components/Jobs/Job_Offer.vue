

<template>
   
   <div class="job-offer">

   </div>

</template>

<script>
   export default { 
      data () { 
         return { 
            Job: { 
               Name: 'AWDAWDAW',
               Description: 'adadawdaw'
            }            
         }
      },

      methods: { 
         Close: function () {
            mp.trigger('CLIENT::JOB_OFFER:TOGGLE');
         },

         Accept: function () { 
            mp.trigger('CLIENT::JOB_OFFER:ACCEPT');
         }
      }
   }
</script>


<style scoped>
   .job-offer { 

   }
   
</style>