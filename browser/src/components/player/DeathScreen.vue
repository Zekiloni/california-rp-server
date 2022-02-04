

<template>
   <div class="death-screen">
      <div class="box">
         <h3 class="title">
            {{ Messages.YOU_ARE_BRUTALLY_WOUNDEND }}
         </h3>
         
         <p class="hint"> {{ Messages.DEATH_KEEP_ROLEPLAYING_OR_ACCEPT_DEATH }} </p>
         <h1 class="timeout"> {{ minutes }}:{{ seconds }} </h1>
      </div>
   </div>
</template>

<script lang="ts">
   import Vue from 'vue'
   import Component from 'vue-class-component';
   import { Messages } from '../../globals';

   @Component
   export default class DeathScreen extends Vue {
      
      timer: number | null = null;
      minutes: string =  '0';
      seconds: string = '0';

      Messages = Messages;

      countdown () {
         let seconds = Math.floor((this.timer! - (Date.now())) / 1000);
         let minutes = Math.floor(seconds / 60);
         let hours = Math.floor(minutes / 60);
         let days = Math.floor(hours / 24);
         
         hours = hours - (days * 24);
         minutes = minutes - (days * 24 * 60) - (hours * 60);
         seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);

         console.log('Minuta ' + minutes + ', sekundi ' + seconds);
         
         this.minutes = minutes.toString();
         this.seconds = seconds < 10 ? '0' + seconds.toString() : seconds.toString();

         setTimeout(this.countdown, 1000);
      }

      mounted () {
         this.timer = Date.now() + (8 * 60 * 1000);
         this.countdown();
      }

      hello () {
         console.log('Hello World!')
      }
   }
</script>

<style scoped>
   .death-screen {
      width: 100%;
      height: auto;
      position: absolute;
      bottom: 100px;
      left: 0;
      display: grid;
      animation: fade 2s ease;
   }

   .death-screen * {
      text-shadow: 0 0.7px 1px rgb(0 0 0 / 20%);
   }

   .box {
      width: 400px;
      margin: auto;
   }
   
   h3.title { 
      color: rgb(255, 99, 71);
      font-size: 1.35em;
      font-weight: 550;
      width: 285px;
      margin: 0 auto;
      text-align: center;
      padding: 15px 0;
      border-bottom: 2px solid rgb(132 142 156 / 35%);
   }
   
   p.hint {
      padding: 15px 0;
      width: 300px;
      font-size: 0.9rem;
      text-align: center;
      margin: 0 auto;
      color: #cdcdcd;
   }

   h1.timeout { color: white; text-align: center; margin: 5px 0; font-size: 1.8rem; }

   @keyframes fade {
      from { opacity: 0; transform: translateY(45px); }
   }
</style>