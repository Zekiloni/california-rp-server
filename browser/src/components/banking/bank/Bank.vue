

<template>
   <div class="bank-wrapper">
      <div class="box">
         {{ character.bank }}
      </div>
   </div>
</template>

<script lang="ts">
   import Vue from 'vue';
   import Component from 'vue-class-component';
   import { Messages } from '@/globals';
   import { Character } from '@/models';

   @Component
   export default class Banking extends Vue {
      character: Character | null = null;

      Messages = Messages;

      withdraw (amount: number) {

      }

      deposit (amount: number) {

      }

      mounted () {
         mp.events.add('BROWSER::BANK', (info: string) => {
            this.character = JSON.parse(info);
         });
      }

   }
</script>

<style scoped>
   .bank-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: grid;
   }

   .box { 
      width: 650px;
      height: 500px;
      color: white;
      margin: auto;
   }
</style>