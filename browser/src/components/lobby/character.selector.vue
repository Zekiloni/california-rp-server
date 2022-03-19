
<template>
   <div class="selector">
      <div class="header">
         <img src="@/assets/images/logo.png" class="logo" />

         <div class="welcome">
            <h2> {{ Messages.WELCOME_TO_SELECTOR }} {{ account.username }} </h2>
            <p> {{ Messages.PLEASE_SELECT_CHARACTER }} </p>
         </div>
      </div>

      <div class="characters">
         <div class="character-slot" v-for="i in maxCharacters" :key="i" v-on:mouseenter="playAudio(hoverAudio)"> 
            <div class="character" v-if="account.characters[i]" v-on:click="selectCharacter(account.characters[i].id)" >
               <div class="main">
                  <h2 class="name"> {{ account.characters[i].name.split(' ')[0] }} </h2>
                  <h3 class="last-name"> {{ account.characters[i].name.split(' ')[1] }} </h3>
               </div>
               
               <ul class="info">
                  <li class="money"> {{ Messages.CASH }} <b>  {{ dollars(account.characters[i].money) }} </b> </li>
                  <li> {{ Messages.ORIGIN }}: <b> {{ account.characters[i].origin }} </b> </li>
                  <li> {{ Messages.BIRTH }}: <b> {{ account.characters[i].birth }} </b> </li>
                  <li> {{ Messages.REGISTER_DATE }}: <b> {{ formatDate(account.characters[i].created_at) }} </b> </li>
               </ul>
               
            </div>
            <div v-else class="character-create" v-on:click="createCharacter(i)" :class="{ locked: i == 2 && account.donator == 0}"> 
               <div class="create-button"> </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
   import { Messages } from '../../globals';
   import Helpers from '../../helpers';
   
   import hoverAudio from '../../assets/sounds/hover.mp3';

   export default {
      props: {
         account: Object,
      },

      data () { 
         return { 
            maxCharacters: [0, 1, 2],

            Helpers, Messages, hoverAudio
         }
      },

      computed: {
         character: function (i) { 
            this.account.characters[i]
         }
      },
      
      methods: { 
         selectCharacter: async function (id) {
            const spawnPositions = await mp.events.callProc('CLIENT::CHARACTER:SPAWNS', id);
            if (spawnPositions) {
               this.$parent.spawnPoints = JSON.parse(spawnPositions);
               this.$parent.selectedCharacter = id;
               this.$parent.spawnSelector = true;
            }
         },

         createCharacter: function (i) { 
            if (i == 2 && this.account.donator == 0) return mp.trigger('CLIENT::NOTIFICATION', this.Messages.NOT_DONATOR, 1, 5);
            mp.trigger('CLIENT::CREATOR:START');
         }
      }
   }
</script>

<style scoped>

   .selector { 
      max-width: 800px;
      height: auto;
      margin: auto;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      align-content: center;
      flex-wrap: wrap;
   }

   .header { 
      width: 100%;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
   }
   
   .header img {
      width: 85px;
      display: inline-block;
   }
   
   .header .welcome {
      margin: 0 20px;
   }

   .header .welcome h2 { 
      font-family: 'Montserrat ExtraBold';
      margin: 0;
      font-size: 1.7rem;
      color: whitesmoke; 
      text-transform: uppercase; 
   }

   .header .welcome p { 
      color: #cdcdcd; 
      margin: 0; 
   }

   .characters { 
      width: 100%; 
      position: relative; 
      display: flex; 
      justify-content: space-around; 
      align-items: center; 
      height: auto; 
   }

   .characters .character-slot { 
      width: 230px;
      position: relative;
      height: 350px;
      background: #1e1e23;
      border-radius: 10px;
      transition: all .3s ease;
      overflow: hidden;
   }

   .character { padding: 20px 20px; }

   .main h2.name { color: #cdcdcd; margin: 0; font-size: 1.5rem; text-transform: uppercase; }
   .main h3.last-name { margin: 0; font-weight: 350; font-size: 1rem; text-transform: uppercase; color: grey; }

   .character-slot * { transition: all .3s ease; }
   .character-slot .character-create { width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; flex-direction: column; }
   .character-create small { text-transform: uppercase; color: #535353; }
   .create-button { margin: 20px 0; background: rgb(48, 47, 54); width: 100px; height: 100px; opacity: 0.6; mask: url('../../assets/images/icons/plus.svg') no-repeat center; mask-size: cover; }
   .character-slot:hover .create-button { opacity: 1; }

   .character:hover h2, .character:hover h3 { 
      color: #fdb91b !important; 
   }

   ul.info { 
      list-style: none; 
      padding: 0; 
      margin-top: 35px; 
   }

   ul.info li { 
      margin: 10px 0; 
      font-size: 0.65rem; 
      text-transform: uppercase; 
      color: #9D9D9D; 
   }

   ul.info li b { 
      color: #adaaaa; 
      display: block; 
      margin: 5px 2px; 
      font-size: 1rem; 
      text-transform: none; 
   }

</style>