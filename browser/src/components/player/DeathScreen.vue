

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
      minutes: string = '';
      seconds: string = '';

      Messages = Messages;

      countdown () {
         const seconds = Math.floor((this.timer! - Date.now()) / 1000);
         const minutes = Math.floor(seconds / 60);
         
         this.minutes = minutes.toString();
         this.seconds = seconds < 10 ? '0' + seconds.toString() : seconds.toString();

         setTimeout(this.countdown, 1000);
      }

      mounted () {
         //@ts-ignore
         mp.events.add('BROWSER::DEATHSCREEN', (time: number) => this.timer = time);

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
      animation: fade 1.45s ease;
   }

   .death-screen * {
      text-shadow: 0 0.7px 1px rgb(0 0 0 / 20%);
   }

   .box {
      width: 400px;
      margin: auto;
   }
   
   h3.title { 
      color: tomato;
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
      width: 280px;
      font-size: 0.75rem;
      text-align: center;
      margin: 0 auto;
      color: #cdcdcd;
   }

   h1.timeout { color: white; text-align: center; }

   @keyframes fade {
      from { opacity: 0; transform: translateY(-35px); }
   }
</style>