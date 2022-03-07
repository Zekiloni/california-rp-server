

<template>
   <div class="call" >
      <h3> poziv </h3>
   </div>
</template>

<script lang="ts">
   import Vue from 'vue';
   import Component from 'vue-class-component';

   @Component({
      props: {
         inCall: Object
      }
   })
   export default class InCall extends Vue {

      mounted () {
         console.log('inCall');
      }
   }
</script>