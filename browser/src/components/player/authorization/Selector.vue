

<template>
   <div class="selector">
      <div class="header">
         <h1> {{ Messages.WELCOME_TO_SELECTOR }} {{ account.username }}</h1>
      </div>

      <div class="characters">
         <div class="holder" v-for="i in characters" :key="'character' + i">
            <div class="character" v-if="character(i)" @click="select(character(i).id)"> 
               <div class="main">
                  <h2> {{ character(i).name.split(' ')[0] }} </h2>
                  <h4> {{ character(i).name.split(' ')[1] }} </h4>
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
      margin: auto
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
      display: flex;
      justify-content: space-between;
      align-content: center;
   }

   h2, h3, h4 { margin: 0; }


   .characters .holder .character {
      background: #232228;
      height: 100%;
      width: 225px;
      transition: all .3s ease;
      border-radius: 10px;
   }

   .character .main {
     
      padding: 10px 15px;
   }

   .holder .character:hover {
      background: #302f36;
   }

   .character:hover .main h2, .character:hover .main h4 {
      color: #cdcdcd;
   }

   .character .main h2 {
      margin: 0;
      color: #e9e7e7;
      font-size: 2rem;
      text-transform: capitalize;
      transition: all .25s ease;
   }

   .character .main h4 { 
      font-size: 1rem;
      color: grey;
      text-transform: capitalize;
      transition: all .25s ease;
   }

   .characters .create { 
      width: 225px;
      height: 100%;
      border-radius: 10px;
      background: #17171b;
      display: grid;
      font-size: 10rem;
      transition: all .25s ease;
      color: #1d1d22;
   }

   .create:hover { 
      background: #1a191e;
   }

   .create h4 { 
      margin: auto;

   }
</style>