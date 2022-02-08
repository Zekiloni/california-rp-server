

<template>
   <div class="business-info" v-if="business && location">

   </div>
</template>

<script lang="ts">
  import Vue from 'vue'
   import Component from 'vue-class-component';

   @Component
   export default class BusinesSInfo extends Vue {

      business: object | null = null;
      location: null | { zone: string, street: string } = null;

      mounted () {
         //@ts-ignore
         if (window.mp) {
            //@ts-ignore
            mp.eventst.add('BROWSER::BUSINESS:INFO', (info, location) => { this.business = JSON.parse(info); this.location = JSON.parse(location); } );
         }
      }
   }

</script>
