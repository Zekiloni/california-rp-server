

<template>
   <div class="selector">
      <div class="header">
         <h1> {{ Messages.WELCOME_TO_SELECTOR }} {{ account.username }}</h1>
      </div>

      <div class="characters">
         <div class="holder" v-for="i in characters" :key="'character' + i">
            <div class="character" v-if="character(i)" @click="select(character(i).id)"> 
               <div class="main">
                  <h1> #{{ character(i).id }} </h1>
                  <h2> {{ character(i).name.split(' ')[0] }} </h2>
                  <h3> {{ character(i).name.split(' ')[1] }} </h3>
                  <h4> Igrač </h4>
               </div>
            </div>
            
            <div v-else class="create" @click="creator(i)">
               <h4> + </h4>
            </div>
         </div>
      </div>
   </div>
</template>

<script lang="ts">
   import Vue from 'vue';
   import Component from 'vue-class-component';

   import { Messages } from '@/globals';
      
   @Component({
      props: {
         account: Object
      }
   })
   export default class Selector extends Vue { 
      characters: number[] = [0, 1, 2];

      Messages = Messages;

      character (i: number) {
         return this.$props.account.characters[i];
      }
      
      select (id: number) {
         this.$emit('select-character', id);
      }

      creator (i: number) {
         if (i == 2 && this.$props.accoyunt.donator == 0) {
            mp.trigger('CLIENT::NOTIFICATION', this.Messages.NOT_DONATOR, 1, 5);
            return;
         } 
         
         mp.trigger('CLIENT::CREATOR:START');
      }
   }
</script>

<style scoped>
   .selector { 
      margin: auto;
      background: #16151A;
      border-radius: 10px;
   }

   .header {
      width: 675px;
   }

   .header h1 {
      color: #cdcdcd;
   }

   .characters { 
      width: 755px;
      height: 400px;
      padding: 20px;
      display: flex;
      justify-content: space-between;
      align-content: center;
   }

   h2, h3, h4 { margin: 0; }


   .characters .holder .character {
      background: #18171d;
      position: relative;
      height: 100%;
      width: 225px;
      transition: all .3s ease;
      border-radius: 10px;
   }

   .character .main {
      position: absolute;
      bottom: 0;
      padding: 10px 15px;
   }

   .holder .character:hover {
      background: #302f36;
   }

   .character:hover .main h2, .character:hover .main h4 {
      color: #cdcdcd;
   }

   .character .main h1 {
      margin: 0;
      font-weight: 400;
      font-size: 1rem;
      color: #cdcdcd;
   }

   .character .main h2 {
      margin: 0;
      color: #e9e7e7;
      font-size: 2rem;
      text-transform: capitalize;
      transition: all .25s ease;
      font-weight: 500;
   }

   .character .main h3 { 
      font-size: 1.8rem;
      color: #cdcdcd;
      font-weight: 500;
      text-transform: capitalize;
      transition: all .25s ease;
   }

   .characters .create { 
      width: 225px;
      height: 100%;
      border-radius: 10px;
      background: rgb(18, 17, 22);
      display: grid;
      font-size: 10rem;
      transition: all .25s ease;
      color: #18171d;
   }

   .create:hover { 
      background: #1a191e;
      color: #302f36;
   }

   .create h4 { 
      margin: auto;

   }
</style>