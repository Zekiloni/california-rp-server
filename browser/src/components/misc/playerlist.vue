
<template>
   <transition name="fade" appear> 
      <div class="playerlist">
         <div class="header">
            <h4> {{ Messages.ONLINE_PLAYERS }} <b> {{ players.length }} </b></h4> 
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
            players: [],

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
         if (window.mp) {
            mp.invoke('focus', true);

            mp.events.add('BROWSER::PLAYERLIST', (players: string) => this.players = JSON.parse(players));
         }
      },

      beforeDestroy () {
         if (window.mp) {
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
      font-size: 1.45rem;
      font-weight: 550;
      font-family: 'Montserrat Light', sans-serif;
      letter-spacing: 0.6rem;
      margin: 0;
      text-transform: uppercase;
      color: #848e9c;
   }

   .header h4 b { 
      position: relative;
      font-weight: 650;
      margin: 0;
      color: whitesmoke;
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
      overflow-y: auto;
      border-radius: 5px;
   }

   .players td, .players th {
      padding: 8px;
   }

   .players tr td { 
      background: rgb(255 255 255 / 5%);
      backdrop-filter: brightness(1.1);
      border: 1px solid transparent;
      color: #acacad;
      margin: 5px 0;
      border-radius: 2px;
      transition: all .3s ease;
   }

   .players tr:nth-child(even) td {
      background: rgb(255 255 255 / 10%);
      color: #cdcdcd;
   }

   .players tr:hover td {
      border-color: rgb(205 205 205 / 45%);
      backdrop-filter: brightness(1.8);
      box-shadow: 0 1px 3px rgb(0 0 0 / 35%);
      border-color: rgb(205 205 205 / 25%);
      color: whitesmoke;
   }
   
   .players tbody tr { height: 50px; }

   .players tr.joining:hover td {
      backdrop-filter: none;
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
      background: linear-gradient(120deg, rgb(11 14 17 / 55%), rgb(11 14 17 / 55%));
      color: #cdcdcd;
   }

   td.player-id, th.player-id { width: 50px; text-align: center; color: #848e9c; }
</style>