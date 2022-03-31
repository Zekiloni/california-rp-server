
<template>
   <div class="faction-panel">
      <div class="panel" >
         <div class="page">
            <h3> {{ title }} </h3>

            <div class="holder">
               <transition name="swipe"> 
                  <faction-overview :faction="faction" key=faction-overview v-if="activePage == 0" />
                  
                  <faction-members :members="faction.members" key=faction-members v-if="activePage == 1" />
               </transition>
            </div>
         </div>

         <div class="menu">
            <div class="faction">
               <h2> {{ faction.name }} </h2>
               <p> {{ faction.description ? truncate(faction.description, 20) : Messages.NO_DESCRIPTION }} </p>
            </div>
            <nav>
               <button v-for="(page, i) in pages" :key="page" @click="activePage = i" :class="{ active: activePage == i }">
                  {{ page }}
               </button>
            </nav>
         </div>

      </div>
   </div>
</template>

<script lang="ts">
   import Vue from 'vue'
   import Component from 'vue-class-component';
   import { Messages } from '@/globals';

   import FactionOverview from './panel-components/FactionOverview.vue';
   import FactionMembers from './panel-components/FactionMembers.vue';
   import FactionRanks from './panel-components/FactionRanks.vue';
   
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
      members: Member[]
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
      
      pages = [Messages.OVERWIEV, Messages.MEMBERS, Messages.FACTION_RANKS, Messages.EQUIPMENT]

      activePage: number = 0;

      faction: Faction | null = {
         id: 1,
         leader: 0,
         type: 0,
         created_at: new Date(),
         budget: 30000,
         ranks: [],
         members: [],
         name: 'Los Santos Police Department',
         description: 'Policija muharemova sve kerovi av ava v',
         
      };

      Messages = Messages;

      get title () {
         return this.pages[this.activePage];
      }

      exit () {
         mp.events.call('CLIENT::FACTION:PANEL')
      }

      mounted () {
         if (window.mp) {
            mp.events.add('BROWSER::FACTION:INFO', (info: string) => this.faction = JSON.parse(info));
         }
      }
   }
</script>

<style scoped>

   .faction-panel { 
      background: linear-gradient(0deg, #1a191e, transparent);
      position: absolute;
      top: 0;
      z-index: 100;
      left: 0;
      width: 100%;
      height: 100%;
      display: grid;
   }

   .panel {
      position: relative;
      width: auto;
      height: 600px;
      margin: auto;
   }
   
   .page {
      width: 100%;
      min-height: 480px;
      background: #100f14;
      border-radius: 10px;
      overflow: hidden;
   }

   .menu {
      margin-top: 10px;
      background: #16151A;
      border-radius: 5px;
      display: flex;
      overflow: hidden;
      justify-content: space-between;
      align-items: center;
   }

   .menu .faction {
      padding: 15px;
      background: #1e1d24;
   }

   .menu .faction h2 {
      margin: 0;
      font-size: 1rem;
      color: whitesmoke;
   }

   .menu .faction p {
      padding: 0;
      color: grey;
      margin: 5px 0;
   }

   .menu nav {
      width: 100%; 
      min-height: 20px;
      display: flex;
      justify-content: space-around;
   }

   nav button {
      padding: 10px 15px;
      background: transparent;
      font-size: 0.8rem;
      border: 1px dashed #232127;
      border-radius: 5px;
      color: grey;
      text-transform: capitalize;
      transition: all .3s ease;
   }

   nav button:hover {
      color: whitesmoke;
      background: rgb(41 39 50 / 31%);
      border-color: #3e3b46;
   }

   nav button.active {
      color: #FFC940;
      border-color: #3e3b46;
   }

   .page h3 {
      padding: 20px;
      text-transform: capitalize;
      font-size: 1.35rem;
      margin: 0;
      color: whitesmoke;
   }

   .page .holder {
      padding: 20px;
      margin-top: 15px;
      max-height: 300px;
   }

   
</style>
