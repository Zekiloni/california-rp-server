
<template>
   <div class="panel">
      <transition name="fade-with-bottom-slide" appear> 
         <div class="menu">
            <div class="header">
               <div class="logo">
                  <div class="icon"> </div>
               </div>
               <div class="text">
                  <h4> {{ Messages.PLAYER_MENU }} </h4>
                  <h2> {{ player.account.username }} </h2>
               </div>
               <div class="date-time">
                  <h5> {{ formatDate(Date.now()).split('-')[0] }} </h5>
                  <h6> {{ time }} </h6>
               </div>
            </div>

            <div class="box">
               <ul class="navigation">
                  <li v-for="(page, i) in pages" :key="page" :class="{ active: activePage == i }" @click="activePage = i" @mouseenter="playAudio(hoverAudio)"> {{ page }} </li>
               </ul>

               <div class="page">
                  
               </div>
            </div>
         </div>
      </transition>
   </div>
</template>

<script lang="ts"> 
   import Vue from 'vue';
   import Component from 'vue-class-component';
   import { Messages } from '@/globals';
   import { Player, Faction, FactionRank, StringIndexString } from '@/models';

   // @ts-ignore
   import hoverAudio from '@/assets/sounds/hover.mp3';

   import CharacterOverview from './menu-components/CharacterOverview.vue';
   import AccountOverview from './menu-components/AccountOverview.vue'


   @Component({
      components: {
         AccountOverview, CharacterOverview
      }
   })
   export default class PlayerMenu extends Vue {
      time: string = '';

      pages = ['Account Overview', 'Character Overview', 'Walking Style', 'Facial']
      activePage: number = 0;
      hoverAudio = hoverAudio;

      player: Player | null = null;
      faction: Faction | null = null;
      factionRank: FactionRank | null = null;

      walkingStyles: StringIndexString | null = null;
      facialMoods: StringIndexString | null = null;
      
      Messages = Messages;

      setWalkingStyle (style: string) {
         this.player!.character.walking_style = this.walkingStyles![style];
         //mp.events.callProc('');
      }

      clock () {
         const now = new Date();
         this.time = now.getHours() + ':' + (now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()) + ':' + (now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds());

         setTimeout(this.clock, 1000);
      }

      mounted () {
         mp.events.add('BROWSER::PLAYER_MENU:INFO', (info: string) => {
            const [player, faction, factionRank, WalkingStyles, FacialMods] = JSON.parse(info);

            this.player = player;
            this.faction = faction;
            this.factionRank = factionRank;
            this.walkingStyles = WalkingStyles;
            this.facialMoods = FacialMods;
         });

         this.clock();
      }
   }
</script>

<style scoped>
   .panel {
      top: 0;
      left: 0;
      position: absolute;
      height: 100%;
      width: 100%;
      background: radial-gradient(rgb(71 77 87 / 65%), rgb(11 14 17 / 85%));
      display: grid;
   }

   .menu { 
      max-width: 725px;
      height: auto;
      margin: auto;
   }

   .header {
      width: auto;
      margin: 15px 0;
      display: flex;
      align-items: center;
   }

   .header .logo {
      width: 90px;
      height: 90px;
      border-radius: 10px;
      box-shadow: 0 0 3px #623fdc;
      background: linear-gradient(-45deg, #623fdc, #4c318e);
      display: grid;
   }

   .header .logo .icon {
      width: 60px;
      height: 60px;
      margin: auto;
      mask-size: cover; 
      background: whitesmoke;
      mask: url('../../assets/images/icons/user-settings.svg') no-repeat center;
   }

   .header .date-time {
      margin-left: auto;
      text-align: right;
   }
   
   .date-time h5 { 
      margin: 0;
      color: #cdcdcd;
      font-size: 1rem;
   }

   .date-time h6 { 
      color: #aaaaaa;
      margin: 0;
      font-size: 0.8rem;
      font-weight: 450;
   }
   
   .header .text {
      margin: 0 20px;
   }

   .header h2 { 
      position: relative;
      font-size: 2.8rem;
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

   .box {
      height: 100%;
      background: linear-gradient(120deg, rgb(11 14 17 / 55%), transparent);
      border-radius: 5px;
      padding: 20px;
      display: flex;
   }

   .page { 
      width: 600px;
   }

</style>