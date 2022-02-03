

<template>
   <transition name="fade" appear> 
      <div class="playerlist">
         <div class="header">
            <h4> {{ Messages.ONLINE_PLAYERS }} </h4>
            <input class="search" type="text" v-model="search" :placeholder="Messages.SEARCH">
         </div>

         <table class="players">
            <thead>
               <tr>
                  <th class="player-id"> # {{ Messages.ID }} </th>
                  <th> {{ Messages.PLAYER_NAME }} </th>
               </tr>
            </thead>
            <transition-group name="list" tag="tbody">
               <tr v-for="player in sortPlayers" :key="player.name" :class="{ joining: !player.spawned }">
                  <td class="player-id"> {{ player.id }} </td>
                  <td> {{ player.spawned ? player.name : Messages.JOINING_THE_GAME }} </td>
               </tr>
            </transition-group>
         </table>
      </div>
   </transition>
</template>

<script lang="ts">
   import Vue from 'vue';
   import { Messages } from '../../globals';
   
   export default Vue.extend({

      data () {
         return {
            players: [ ],

            search: '',

            Messages
         }
      },

      computed: {
         sortPlayers () { 
            switch (true) {
               //@ts-ignore
               case this.search.length > 0: return this.players.filter((player: any) => player.name.toLowerCase().includes(this.search));
               //@ts-ignore
               default: return this.players.sort((first_Player: any, second_Player: any) => first_Player.id > second_Player.id);
            }
         }
      },
      
      mounted () {
         //@ts-ignore
         if (window.mp) {
            
            //@ts-ignore
            mp.invoke('focus', true);
            
            //@ts-ignore
            mp.events.add('BROWSER::PLAYERLIST', players => this.players = JSON.parse(players) );
         }
      },

      beforeDestroy () {
         //@ts-ignore
         if (window.mp) {
            
            //@ts-ignore
            mp.invoke('focus', false);
         }
      }
   });
</script>

<style scoped>
   .playerlist {
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      position: absolute;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: radial-gradient(rgb(33 37 47 / 65%), rgb(11 14 17 / 85%));
   }

   .header {
      margin: 20px 0;
      width: 800px;
      display: flex;
      justify-content: space-between;
   }

   .header h4 { 
      font-size: 1.3rem;
      font-weight: 450;
      margin: 0;
      color: #cdcdcd;
   }

   input.search {
      width: 250px;
      border: 1px solid #474d57;
      color: #cdcdcd;
      border-radius: 5px;
      box-shadow: rgb(0 0 0 / 25%) 0px 1px 20px 0px;
      background: #2b2f36;
      position: relative;
      padding: 10px 10px;
      outline: none;
      font-size: 13px;
      font-weight: 300;
      transition: all 0.45s ease;
   }

   .players {
      width: 800px;
      display: block;
      height: 415px;
      overflow-y: scroll;
      border-radius: 5px;
      background: rgb(11 14 17 / 20%);
   }

   .players td, .players th {
      padding: 8px;
   }

   .players tr { 
      background: #181a20;
      color: #acacad;
      margin: 5px 0;
      transition: all .3s ease;
   }

   .players tr:nth-child(even) {
      background-color: rgb(24 26 32 / 65%);
      color: #cdcdcd;
   }

   .players tr:hover {
      background-color: #7454e5;
      color: whitesmoke;
   }
   
   .players tbody tr { height: 50px; }

   .players tr.joining:hover {
      background: none;
   }

   .players tr.joining {
      opacity: 0.35;
   }

   .players th {
      padding-top: 12px;
      padding-bottom: 12px;
      width: 760px;
      text-align: left;
      background-color: #0b0e11;
      color: #cdcdcd;
   }

   td.player-id, th.player-id { width: 50px; text-align: center; color: #848e9c; }
</style>