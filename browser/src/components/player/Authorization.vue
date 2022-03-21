

<template>
   <div class="authorization">         


      <transition name="fade" mode="out-in"> 
         <Login v-if="!logged" @login="login" key=login />

         <Selector v-if="logged && !selectedCharacter" :account="account" @select-character="selectCharacter" key=selector />

         <Spawn v-if="logged && selectedCharacter != null" @select-spawn="play" :points="spawns" key=spawn />
      </transition>
   </div>
</template>

<script lang="ts">
   import Vue from 'vue';
   import Component from 'vue-class-component';
   
   import { Account } from '@/models';

   import Login from './authorization/Login.vue';
   import Selector from './authorization/Selector.vue';
   import Spawn from './authorization/Spawn.vue';

   @Component({
      components: {
         Login, Selector, Spawn
      }
   })
   export default class Authorization extends Vue { 
      logged: boolean = false;
      
      selectedCharacter: number | null = null;

      spawns = [];

      account: Account | null = null;

      login (username: string, password: string) {
         mp.events.callProc('clientAuthorizationSend', username, password).then(
            account => { this.account = JSON.parse(account); this.logged = true; }
         );
      }

      selectCharacter (id: number) {
         mp.events.callProc('clientGetCharacterSpawns', id).then(
            characterSpawns => { this.spawns = JSON.parse(characterSpawns), this.selectedCharacter = id }
         );
      }

      play (spawnType: number, id?: number) {
         mp.events.call('clientCharacterPlay', this.selectedCharacter, spawnType, id);
      }
   }
</script>

<style scoped>
   .authorization {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: grid;
      background: linear-gradient(0deg, #1a191e, transparent);
   }
</style>