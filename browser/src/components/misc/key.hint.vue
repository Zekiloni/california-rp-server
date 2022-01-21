

<template>
   <div class="key" v-tooltip="keys[keyName].name">
      <div class="icon" :class="keys[keyName].icon">a</div>
   </div>
</template>

<script>
   export default {
      props: {
         keyName: Object
      },
      
      data () {
         return {
            keys: {
               'aada': {
                  icon: '', name: 'adad'
               }
            }
         }
      }
   }
</script>

<style scoped>
   .key {
      position: relative;
      width: 30px;
      height: 30px;
      border-radius: 5px;
      background: #181a20;
      display: inline-block;
   }

   .icon { 
      width: 25px; height: 25px; margin: auto; background: red;
   }

</style>