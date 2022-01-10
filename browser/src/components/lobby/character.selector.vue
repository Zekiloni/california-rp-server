
<template>
   <div class="selector">
      <div class="info-header">
         <h2> {{ Messages.CHARACTER_SELECTOR }} </h2>
         <p> {{ Messages.PLEASE_SELECT_CHARACTER }} </p>
      </div>

      <div class="account">
            <div class="header">
               <h2> {{ account.username }} </h2>
               <h3> {{ Helpers.Group(account.administrator) }} </h3>
            </div>

            <ul class="data">
               <li> <span class="name date"> {{ Messages.REGISTER_DATE }} </span>  <span class="value"> {{ Helpers.Date(account.created_at) }} </span> </li>
               <li> <span class="name last_login"> {{ Messages.LAST_LOGIN }} </span>  <span class="value"> {{ Helpers.Date(account.login_date) }} </span> </li>
               <li> <span class="name hours"> {{ Messages.HOURS_PLAYED }} </span>  <span class="value"> {{ getHoursPlayed }} </span> </li>
               <li> <span class="name email"> {{ Messages.E_MAIL }} </span>  <span class="value"> {{ account.email ? account.email : Messages.NO_NO }} </span> </li>
               <li class="warns"> <span class="name warns"> {{ Messages.WARNS }} </span>  <span class="value" v-tooltip="Messages.MAX_WARNS"> {{ getWarns }} </span> </li>
            </ul>
         </div>

         <div class="characters">
            <div class="character-slot" v-for="i in maxCharacters" :key="i" v-on:mouseenter="playAudio(hoverAudio)"> 
               <div class="character" v-if="account.characters[i]" >
                  <div class="main">
                     <h2 class="name"> {{ account.characters[i].name.split(' ')[0] }} </h2>
                     <h3 class="last-name"> {{ account.characters[i].name.split(' ')[1] }} </h3>
                  </div>
                  <h2 v-on:click="selectCharacter(account.characters[i].id)"> IGRAJ </h2>
               </div>
               <div v-else class="character-create" v-on:click="createCharacter(i)" :class="{ locked: i == 2 && account.Donator == 0}"> 
                  <small> {{ Messages.EMPTY_CHARACTER_SLOT }} </small>
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
         getHoursPlayed: function () { 
            let Result = [0, 0];
            for (let i in this.account.characters) { 
               if (this.account.characters[i]) {
                  const Character = this.account.characters[i];
                  Result[0] += Character.hours;
                  Result[1] += Character.minutes;
               }
            }
            return Result[0] + 'h ' + Result[1] + 'm';
         },

         getWarns: function () { 
            return this.account.warns >= 1 ? this.account.warns : Messages.NO_NO;
         },

         character: function (i) { 
            this.account.characters[i]
         }
      },
      
      methods: { 
         selectCharacter: async function (id) {
            const spawnPositions = await mp.events.callProc('CLIENT::CHARACTER:SPAWNS', id);
            if (spawnPositions) {
               console.log(1)
               this.$parent.spawnPoints = JSON.parse(spawnPositions);
               this.$parent.selectedCharacter = id;
               this.$parent.spawnSelector = true;

            }
         },

         createCharacter: function (i) { 
            if (i == 2 && this.Account.donator == 0) return mp.trigger('CLIENT::NOTIFICATION', this.Messages.NOT_DONATOR, Notification.Error, 5);
            mp.trigger('CLIENT::CREATOR:START');
         }
      }
      
   }
</script>

<style scoped>


   .selector { 
      width: 75%;
      height: 425px;
      margin: auto;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      align-content: center;
      flex-wrap: wrap;
   }

   .info-header { 
      width: 80%;
      text-align: left;
      margin: 20px 0;
   }

   .info-header h2 { font-family: 'Montserrat ExtraBold'; letter-spacing: 1px; margin: 5px 0; font-size: 1.7rem; color: #7c5bf1; text-transform: uppercase; }
   .info-header p { color: #cdcdcd; }

   .selector .account { width: 375px; height: auto; padding: 10px 0; border-radius: 10px; margin: 0 20px; background: rgb(11 14 17 / 45%); }

   .selector .account .header { padding: 0 15px 15px 15px; border-bottom: 1px solid #181a20; }

   .account .header h2, .account .header h3 { margin: 0; }
   .header h2 { font-size: 2rem; font-weight: 450; color: #f8f8ff; }
   .header h3 { font-size: 0.9rem; font-weight: 350; color: #a0a4c2; font-style: italic; }
   
   .account ul.data { padding: 0; list-style: none; }

   ul.data li { 
      margin: 15px auto; width: 325px; position: relative;
      display: flex; justify-content: space-between;
      background: linear-gradient(90deg, #0b0e11, transparent);
      padding: 10px 10px; border-radius: 10px;
   }

   ul.data li::before { content: ""; font-weight: 700; position: absolute; display: flex; justify-content: center; align-items: center;
      height: 39.5px; top: -1px; left: 0; border-radius: 10px; box-shadow: rgb(0 0 0 / 15%) 0px 1px 20px 0px; background: #181a20; width: 39px; }

   li span.name { position: relative; padding-left: 45px; color: #9fa5c3; font-weight: 400; }
   li span.name::before { position: absolute; width: 25px; height: 25px; content: ''; background: #7c5bf1; left: -2.8px; top: -2.5px; }
   li span.name.hours::before { mask: url('../../assets/images/icons/clock.svg') no-repeat center; mask-size: cover; }
   li span.name.date::before { mask: url('../../assets/images/icons/date.svg') no-repeat center; mask-size: cover; }
   li span.name.last_login::before { mask: url('../../assets/images/icons/login.svg') no-repeat center; mask-size: cover; }
   li span.name.email::before { mask: url('../../assets/images/icons/e-mail.svg') no-repeat center; mask-size: cover; }
   li span.value { font-weight: 800; color: #9fa5c3; }

   ul.data li.warns::before { background: #ff3635; }
   ul.data li.warns { background: linear-gradient(90deg, rgb(255 54 53 / 45%), transparent); }
   ul.data li.warns span { color: whitesmoke; }
   li span.name.warns::before { mask: url('../../assets/images/icons/danger.svg') no-repeat center; mask-size: cover; background: #fff; }


   .characters { 
      width: 55%; min-height: 200px;  display: flex; justify-content: space-around; align-items: center; height: auto;
   }

   .characters .character-slot { 
      width: 250px;
      position: relative;
      height: 100%;
      background: rgb(11 14 17 / 45%);
      border-radius: 10px;
      transition: all .3s ease;
   }


   .main { 
      padding: 15px 10px;
   }

   .main h2.name { 
      color: #cdcdcd;
      margin: 0;
      font-size: 1.5rem;
      text-transform: uppercase;
   }

   .main h3.last-name { 
      margin: 0;
      font-weight: 350;
      font-size: 1rem;
      text-transform: uppercase;
      color: grey;
   }

   .character-slot * { transition: all .3s ease; }
   .character-slot .character-create { width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; flex-direction: column; }
   .character-create small { text-transform: uppercase; color: #474d57; }
   .create-button { margin: 20px 0; background: #474d57; width: 100px; height: 100px; mask: url('../../assets/images/icons/plus.svg') no-repeat center; mask-size: cover; }
   .character-slot:hover { filter: brightness(1.3); }
   .character-slot:hover .character-create small { color: white; }
   .character-slot:hover .create-button { background: whitesmoke; }

</style>