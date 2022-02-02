

<template>
   <transition name="fade" appear> 
      <div class="playerlist">
         <div class="header">
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
            players: [
               { id: 0, name: 'Zeki', spawned: true },
               { id: 1, name: 'Test', spawned: true },
               { id: 2, name: 'zechery', spawned: false },
               { id: 3, name: 'awfrhtht', spawned: true },
               { id: 4, name: 'Teawgrgrdst', spawned: true },
               { id: 5, name: 'zechjgujjmgery', spawned: false },
               { id: 6, name: 'wdawdwadaw', spawned: true },
               { id: 7, name: 'awdawdawf', spawned: true },
               { id: 10, name: 'hyfyhfh', spawned: false },
               { id: 11, name: 'fthfthfthfth', spawned: false },
               { id: 12, name: 'hftfthfhf', spawned: true },
               { id: 13, name: 'Teathfthfwgrgrdst', spawned: true },
               { id: 14, name: 'y5fyfgig7', spawned: false },
               { id: 16, name: 'tdtd5y5y', spawned: true },
               { id: 17, name: 'w3rw3ty6', spawned: true },
               { id: 18, name: 'd4td4t4w', spawned: false },
               { id: 19, name: 'ftyfty4te', spawned: false },
               { id: 20, name: 'jyfgftyfty', spawned: true },
               { id: 21, name: 'kjhkjhkhk', spawned: true },
            ],

            search: '',
            reverse : false,
            sort_By: 'id',

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

      methods: {
         setSort: function (key: string) {
            if (this.sort_By == key) {
               this.reverse = !this.reverse;
               return;
            }
            this.sort_By = key;

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
      background: red;
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
   }

   .players td, .players th {
      padding: 8px;
   }

   .players tr { 
      background: #21252f;
      color: #acacad;
      margin: 5px 0;
      transition: all .3s ease;
   }

   .players tr:nth-child(even) {
      background-color: #2a303c;
      color: #cdcdcd;
   }

   .players tr:hover {
      background-color: #7454e5;
      color: whitesmoke;
   }

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
      background-color: #181a20;
      color: #cdcdcd;
   }

   td.player-id, th.player-id { width: 50px; text-align: center; color: #848e9c; }
</style>