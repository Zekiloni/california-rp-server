

<template>
   <div class="moods">
      <h2> {{ Messages.FACIAL_MOOD_TITLE }} </h2>
      <small> {{ Messages.FACIAL_MOOD_DESCRIPTION }} </small>
      <ul class="moods">
         <li v-for="(mood, i) in moods" :key="mood" :class="{ selected: i == selectedMood }" @click="selectMood(i)">
            {{ i }} 
         </li>
      </ul>
   </div>
</template>

<script lang="ts">
   import Vue from 'vue';
   import Component from 'vue-class-component';
   import { Messages } from '@/globals';

   @Component({
      props: {
         moods: Object,
         selectedMood: Number,
         selectMood: Function
      }
   })
   export default class FacialMods extends Vue {

      Messages = Messages;
   }
</script>

<style scoped>
    h2 {
      margin: 0;
      color: #cdcdcd;
      font-weight: 500;
   }

   small {
      color: #848e9c;
      font-size: 0.7rem;
      font-weight: 600;
   }

   ul.moods {
      padding: 10px;
      list-style: none; 
   }

   ul.moods li {
      padding: 10px;
      transition: all .3s ease;
      background: rgb(255 255 255 / 3%);
      margin: 5px;
      color: #b7bbc0;
      font-weight: 600;
   }

   ul.moods li:hover { 
      backdrop-filter: brightness(1.5);
      color: whitesmoke;
   }

   ul.moods li.selected {
      color: #ffcc45;
   }
</style>