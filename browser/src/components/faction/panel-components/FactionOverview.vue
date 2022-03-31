

<template>
   <div class="info">

      <div class="box">
         <h4> {{ Messages.FACTION_DESCRIPTION }} </h4>
         <p> {{ faction.description }} </p>
      </div>

      <h2> {{ members }} </h2>
   </div>
</template>

<script lang="ts">
   import Vue from 'vue'
   import Component from 'vue-class-component';
   import { Messages } from '@/globals';

   @Component({
      props: {
         faction: Object
      }
   })
   export default class FactionOverview extends Vue {
      Messages = Messages;

      get members () {
         return this.$props.faction.members.length;
      }
   }
</script>

<style scoped>

   .box h4 {
      font-size: 1rem;
      color: #585960;
      font-weight: 700;
      margin: 5px 0;
   }

   .box p {
      font-size: 0.75rem;
      line-height: 26px;
      margin: 0;
      color: #8B8B8B;
   }
</style>