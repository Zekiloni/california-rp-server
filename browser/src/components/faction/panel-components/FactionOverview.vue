

<template>
   <div class="info">
      <h4> {{ faction.description }} </h4>
   </div>
</template>

<script lang="ts">
   import Vue from 'vue'
   import Component from 'vue-class-component';

   @Component({
      props: {
         faction: Object
      }
   })
   export default class FactionOverview extends Vue {

   }
</script>