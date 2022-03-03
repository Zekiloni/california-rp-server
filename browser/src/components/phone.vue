


<template>
   <div class="phone" ref="phone" v-on:click="console.log('jaa')">

   </div>
</template>

<script>
   export default {
      data () { 
         return { 
            applications: [
               { name: 'contacts', toggle: false },
               { name: 'calls', toggle: false }
            ]
         }
      },

      computed: { 
         opened: function () { 
            return this.applications.filter(application => application.toggle === true);
         }
      },

      methods: {
         open: function (application) {
            application.toggle = true;

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