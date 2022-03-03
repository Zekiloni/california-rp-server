
<template>
   
   <div class="faction-panel">
      <div class="panel" v-if="faction">
         <div class="header">
            <div class="title">
               <h4> {{ Messages.FACTION_PANEL }} </h4>
               <h2> {{ faction.name }} </h2>
            </div>
         </div>

         <div class="box">
            <ul class="navigation">
               <li v-for="(page, i) in pages" :key="page" :class="{ active: activePage == i }" @click="activePage = i"> {{ page }} </li>
               <li @click="exit"> exit </li> 
            </ul>
            <div class="page">
               <transition name="fade" mode="out-in">
                  <FactionOverview v-if="activePage == 0" :faction="faction" key=FactionOverview />
                  <FactionMembers v-if="activePage == 1" :members="members" :ranks="faction.ranks"  key=FactionMembers />
                  <FactionRanks v-if="activePage == 2" :ranks="faction.ranks" key=FactionRanks />
               </transition>
            </div>
         </div>
      </div>
   </div>

</template>

<script lang="ts">
   import Vue from 'vue'
   import Component from 'vue-class-component';
   import { Messages } from '@/globals';

   import FactionOverview from './panelComponents/FactionOverview.vue';
   import FactionMembers from './panelComponents/FactionMembers.vue';
   import FactionRanks from './panelComponents/FactionRanks.vue';
   
   interface Rank { 
      id: number
      name: string
      description: string
      salary: number
      permissions: number[]
      created_at: Date
      updated_at: Date
   }

   interface Faction { 
      id: number
      type: number
      name: string
      description: string
      leader: number
      created_at: Date
      budget: number
      ranks: Rank[] | null
   }

   interface Member { 
      id: number
      name: string
      gender: number
      origin: string
      birth: string
      rank: number
   }

   @Component({
      components: { FactionOverview, FactionMembers, FactionRanks }
   })
   export default class FactionPanel extends Vue {
      
      pages = ['overview', 'members', 'ranks', 'equipment']

      activePage: number = 0;

      faction: Faction | null = null;
      members: Member[] | null = null;

      Messages = Messages;

      exit () {
         mp.events.call('CLIENT::FACTION:PANEL')
      }

      mounted () {
         if (window.mp) {
            mp.events.add('BROWSER::FACTION:INFO', (info: string) => {
               const [faction, members] = JSON.parse(info);
               this.faction = faction;
               this.members = members;
            });
         }
      }
   }
</script>

<style scoped>

   .faction-panel { 
      position: absolute;
      top: 0;
      z-index: 100;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(rgb(71 77 87 / 65%), rgb(11 14 17 / 85%));
      display: grid;
   }

   .panel {
      width: auto;
      min-width: 900px;
      margin: auto;
   }

   .header {
      width: auto;
      margin: 15px 0;
      display: flex;
      align-items: center;
   }

   .box {
      background: linear-gradient(120deg, rgb(11 14 17 / 55%), transparent);
      border-radius: 5px;
      transition: all .3s ease;
      min-height: 500px;
      padding: 20px;
      display: flex;
      justify-content: center;
   }

   .header h2 { 
      position: relative;
      font-size: 2.6rem;
      font-weight: 350;
      font-family: 'Montserrat Regular', sans-serif;
      margin: 0;
      color: whitesmoke;
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

   ul.navigation { 
      list-style: none;
      width: 205px;
      padding: 0;
   }

   ul.navigation li { 
      text-align: center;
      margin: 10px 0;
      background: rgb(255 255 255 / 5%);
      backdrop-filter: brightness(1.1);
      padding: 15px 0;
      color: #cdcdcd;
      transition: all .3s ease;
      text-transform: capitalize;
      border: 1px solid transparent;
      border-radius: 5px;
   }

   ul.navigation li:hover, ul.navigation li.active {
      border-color: rgb(205 205 205 / 45%);
      backdrop-filter: brightness(1.8);
      box-shadow: 0 1px 3px rgb(0 0 0 / 35%);
   }

   .page { display: grid; padding: 20px; width: 650px; }
   
</style>
