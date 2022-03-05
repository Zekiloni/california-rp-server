

<template>
   <div class="walking-style">
      <h2> {{ Messages.WALKING_STYLE_TITLE }} </h2>
      <small> {{ Messages.WALKING_STYLE_DESCRIPTION }} </small>
      <ul class="styles">
         <li class="style" v-for="(style, i) in stylesList" :key="style" :class="{ selected: i == selectedStyle }" @click="selectStyle(i)">
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
         stylesList: Object,
         selectedStyle: Number,
         selectStyle: Function
      }
   })
   export default class WalkingStyles extends Vue {
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

   ul.styles {
      padding: 10px;
      list-style: none; 
   }

   ul.styles li {
      padding: 10px;
      transition: all .3s ease;
      background: rgb(255 255 255 / 3%);
      margin: 5px;
      color: #b7bbc0;
      font-weight: 600;
   }

   ul.styles li:hover { 
      backdrop-filter: brightness(1.5);
      color: whitesmoke;
   }

   ul.styles li.selected {
      color: #ffcc45;
   }
</style>