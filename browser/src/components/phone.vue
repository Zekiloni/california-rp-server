


<template>
   <div class="phone" ref="phone" @blur="console.log('gey')">


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
      },

      mounted () { 
         this.$nextTick(() => { this.$refs.phone.focus(); });

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