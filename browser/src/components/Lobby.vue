
<template>
   <div class="authorization">
      <transition name="fade">

         <div class="login" v-if="!Logged">
            <img class="logo" src="@/assets/images/logo.png" />
            <h1 class="title"> {{ Messages.AUTHORIZATION }} </h1>
            <p v-html="Messages.NEED_TO_LOGIN">  </p>

            <div class="form">
               <div class="input-container username"> <input type="text" :placeholder="Messages.USERNAME" v-model="Inputs.Username" spellcheck="false" ref="usernameInput"> </div>
               <div class="input-container password">  <input type="password" :placeholder="Messages.USERPASSWORD" v-model="Inputs.Password" spellcheck="false"> </div>
            </div>

            <button class="play" v-on:click="Authorization(Inputs.Username, Inputs.Password)"> {{ Messages.PLAY }} </button>
         </div>

         <div class="info" v-else-if="Logged && Account">
            <div class="account">

               <div class="header">
                  <h2> {{ Account.Username }} </h2>
                  <h3> {{ Helpers.Group(Account.Administrator) }} </h3>
               </div>

               <ul class="data">
                  <li> <span class="name date"> {{ Messages.REGISTER_DATE }} </span>  <span class="value"> {{ Helpers.Date(Account.Created_At) }} </span> </li>
                  <li> <span class="name last_login"> {{ Messages.LAST_LOGIN }} </span>  <span class="value"> {{ Helpers.Date(Account.Login_Date) }} </span> </li>
                  <li> <span class="name hours"> {{ Messages.HOURS_PLAYED }} </span>  <span class="value"> {{ getHoursPlayed }} </span> </li>
                  <li> <span class="name email"> {{ Messages.E_MAIL }} </span>  <span class="value"> {{ Account.Email ? Account.Email : Messages.NO_NO }} </span> </li>
                  <li class="warns"> <span class="name warns"> {{ Messages.WARNS }} </span>  <span class="value" v-tooltip="Messages.MAX_WARNS"> {{ getWarns }} </span> </li>
               </ul>
            </div>

            <div class="characters">
               <div class="character-slot" v-for="i in Max_Characters" :key="i" @mouseenter="hover"> 
                  <div class="character" v-if="Account.Characters[i]" >
                     <h2 v-on:click="Play(Account.Characters[i].id)"> IGRAJ </h2>
                  </div>
                  <div v-else class="character-create" v-on:click="Create(i)"> 
                     <small> {{ Messages.EMPTY_CHARACTER_SLOT }} </small>
                     <div class="create-button"> </div>
                  </div>
               </div>
            </div>
         </div>
      </transition>
   </div>
        
</template>

<script> 

   import Loading from './Loading.vue';
   import Helpers from '../Helpers';
   import { Notification, Messages, Genders } from '../Globals';
   import hoverSound from '../assets/sounds/hover.mp3';

   export default { 

      components: {
         Loading    
      }, 

      data () { 
         return { 
            Inputs: { Username: null, Password: null },
            Logged: false,
            Account: null,
            Max_Characters: [0, 1, 2],
            Selected_Character: null,

            Helpers, Messages, Genders,

         }
      },
      
      computed: {
         getHoursPlayed: function () { 
            let Result = [0, 0];
            for (let i in this.Account.Characters) { 
               if (this.Account.Characters[i]) {
                  const Character = this.Account.Characters[i];
                  Result[0] += Character.Hours;
                  Result[1] += Character.Minutes;
               }
            }
            return Result[0] + 'h ' + Result[1] + 'm';
         },

         getWarns: function () { 
            return this.Account.Warns >= 1 ? this.Account.Warns : Messages.NO_NO;
         }
      },
      
      methods: { 
         
         Authorization: async function (Username, Password) { 
            if (Username && Password) {
               const Response = await mp.events.callProc('CLIENT:AUTHORIZATION:SEND_CREDENTIALS', Username, Password);
               if (Response) {
                  this.Account = JSON.parse(Response);
                  this.Logged = true;
               }
            }
         },

         hover: () => { 
            const audio = new Audio(hoverSound);
            audio.play();
         },

         Play: function (i) { 
            mp.trigger('CLIENT::AUTHORIZATION:PLAY', i);
         },

         Create: function (i) { 
            if (i == 2 && this.Account.Donator == 0) return mp.trigger('CLIENT::NOTIFICATION', this.Messages.NOT_DONATOR, Notification.Error, 5);
            mp.trigger('CLIENT::CREATOR:START');
         }

      },
      
      mounted () { 
         mp.invoke('focus', true);

         this.$refs.usernameInput.focus();
      },

      beforeDestroy () { 
         mp.invoke('focus', false);
      }
   }

</script>

<style scoped>

   .authorization {
      position: absolute;
      top: 0;
      left: 0;
      background: radial-gradient(ellipse at center top, rgb(76 49 142 / 45%) 0%, rgb(32 20 63 / 30%) 62%, rgb(0 0 0 / 55%) 100%);
      width: 100%;
      height: 100%;      
      display: grid;
   }

   .login { 
      margin: auto;
      width: 370px;
      padding: 20px 0;
      height: auto;
      background: linear-gradient(45deg, #171827 0%, #252635 100%);
      box-shadow: rgb(0 0 0 / 15%) 0px 1px 20px 0px;
      display: flex;
      justify-content: center;
      border-radius: 20px;
      align-items: center;
      flex-direction: column;
   }

   .login img.logo { width: 215px; margin: 20px 0; }

   .login h1.title { 
      color: whitesmoke;
      font-size: 1.86rem;
      margin: 10px 0;
      font-weight: 400;
      letter-spacing: 0.1rem;
   }
   
   .login p { font-size: 0.75rem; font-weight: 350; width: 300px; color: #5b5d73; text-align: center; }

   .login .form { text-align: center; margin: 15px 0;}

   .login .form input { 
      position: relative;
      width: 270px;
      padding: 15px 10px;
      transition: all .3s ease;
      border-bottom: 2px solid transparent;
      color: #cdcdcd;
      box-shadow: rgb(0 0 0 / 15%) 0px 1px 20px 0px;
      background: linear-gradient( 90deg, #252635 0%, #202130 100%);
   }

   .login .form input:focus { color: white; transform: scale(1.05); border-color: #7c5bf1; }
   .login .form .input-container { position: relative; margin: 10px 0; }

   button.play { 
      margin: 5px 0;
      font-weight: 200;
      width: 320px;
      padding: 20px 10px;
      background: linear-gradient(45deg, #7c5bf1, #20143f);
      box-shadow: 25px 15px 25px -5px rgb(37 24 71 / 10%), 0 15px 25px -5px rgb(117 85 226 / 15%);
      border-radius: 5px;
      transition: all .3s ease;
      font-weight: 500;
      color: whitesmoke;
   }

   button.play:hover { 
      color: white;
      box-shadow: 15px 15px 35px -5px rgb(37 24 71 / 35%), 0 15px 25px -5px rgb(117 85 226 / 25%);
      filter: brightness(1.2);
   }

   .info { 
      width: 75%;
      height: 425px;
      margin: auto;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      align-content: center;
   }

   .info .account { width: 375px; height: auto; padding: 10px 0; border-radius: 10px; margin: 0 20px; }

   .info .account .header { padding: 0 15px 15px 15px; border-bottom: 2px solid #252635; }

   .account .header h2, .account .header h3 { margin: 0; }
   .header h2 { font-size: 2rem; font-weight: 450; color: #f8f8ff; }
   .header h3 { font-size: 0.9rem; font-weight: 350; color: #a0a4c2; font-style: italic; }
   
   .account ul.data { padding: 0; list-style: none; }

   ul.data li { 
      margin: 15px auto; width: 325px; position: relative;
      display: flex; justify-content: space-between;
      background: linear-gradient(90deg, #252635, transparent);
      padding: 10px 10px; border-radius: 10px;
   }

   ul.data li::before { content: ""; font-weight: 700; position: absolute; display: flex; justify-content: center; align-items: center;
      height: 39.5px; top: 0; left: 0; border-radius: 10px; box-shadow: rgb(0 0 0 / 15%) 0px 1px 20px 0px; background: #2e2f40;  width: 39px; }

   li span.name { position: relative; padding-left: 45px; color: #9fa5c3; font-weight: 400; }
   li span.name::before { position: absolute; width: 25px; height: 25px; content: ''; background: #7c5bf1; left: -2.8px; top: -3px; }
   li span.name.hours::before { mask: url('../assets/images/icons/clock.svg') no-repeat center; mask-size: cover; }
   li span.name.date::before { mask: url('../assets/images/icons/date.svg') no-repeat center; mask-size: cover; }
   li span.name.last_login::before { mask: url('../assets/images/icons/login.svg') no-repeat center; mask-size: cover; }
   li span.name.email::before { mask: url('../assets/images/icons/e-mail.svg') no-repeat center; mask-size: cover; }
   li span.value { font-weight: 800; color: #9fa5c3; }

   ul.data li.warns::before { background: #ff3635; }
   ul.data li.warns { background: linear-gradient(90deg, rgb(255 54 53 / 45%), transparent); }
   ul.data li.warns span { color: whitesmoke; }
   li span.name.warns::before { mask: url('../assets/images/icons/danger.svg') no-repeat center; mask-size: cover; background: #fff; }


   .characters { 
      width: 55%; min-height: 200px;  display: flex; justify-content: space-around; align-items: center; height: auto;
   }

   .characters .character-slot { 
      width: 250px;
      position: relative;
      height: 100%;
      background: #252635;
      border-radius: 10px;
      transition: all .3s ease;
   }

   .character-slot * { transition: all .3s ease; }
   .character-slot .character-create { width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; flex-direction: column; }
   .character-create small { text-transform: uppercase; color: #5b5d73; }
   .create-button { margin: 20px 0; background: #2e2f40; width: 100px; height: 100px; mask: url('../assets/images/icons/plus.svg') no-repeat center; mask-size: cover; }
   .character-slot:hover { background: #7c5bf1; }
   .character-slot:hover .character-create small { color: white; }
   .character-slot:hover .create-button { background: whitesmoke; }

   

</style>


