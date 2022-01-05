
<template>

   <div class="authorization">

      <transition name="fade" v-if="!Logged">
         <div class="login">
            <img class="logo" src="@/assets/images/logo.png" />
            <h1 class="title"> {{ Messages.AUTHORIZATION }} </h1>
            <p v-html="Messages.NEED_TO_LOGIN">  </p>

            <div class="form">
               <input type="text" v-model="Inputs.Username" spellcheck="false" >
               <input type="password" v-model="Inputs.Password" spellcheck="false" >
            </div>

            <button class="play" v-on:click="Authorization(Inputs.Username, Inputs.Password)"> {{ Messages.PLAY }} </button>
         </div>
      </transition>

      <Loading v-if="Logged == 'loading'" />
   
      <transition name="fade">
         <div class="lobby" v-if="Logged != 'loading' && Logged">
            <div class="account">
               <div class="info">
                  <h3 class="username"> {{ Info.Account.Username }} </h3>
                  <h4 class="rank"> {{ Helpers.Group(Info.Account.Administrator) }} </h4>

                  <ul class="other">
                     <li> {{ Messages.E_MAIL }}: <b> {{ Info.Account.Email }} </b> </li>
                     <li> {{ Messages.REGISTER_DATE }}: <b> {{ Helpers.Date(Info.Account.Created_At) }} </b> </li>
                     <li> {{ Messages.LAST_LOGIN }}: <b> {{ Helpers.Date(Info.Account.Login_Date) }} </b> </li>
                     <li> {{ Messages.WARNS }}: <b> {{ Info.Account.Warns }} / 3 </b> </li>
                     <li> {{ Messages.DONATOR }}: <b> {{ Helpers.isDonator(Info.Account.Donator) }} </b> </li>
                  </ul>
               </div>
            </div>

            <ul class="characters">
               <li class="character" v-for="i in Max_Characters" v-bind:key="i">

                  <div v-if="Info.Characters[i]" class="info" v-on:click="Play(Info.Characters[i].id)">
                     <h1 class="character-name"> {{ Info.Characters[i].Name }} </h1>

                     <h2 class="playing-hours">
                        {{ Info.Characters[i].Hours + 's' + Info.Characters[i].Minutes + 'm' }} 
                     </h2>

                     <ul class="char-info">
                        <li> {{ Messages.ORIGIN }}: {{ Info.Characters[i].Origin }} </li>
                        <li> {{ Messages.GENDER }}: {{ Genders[Info.Characters[i].Gender] }} </li>
                        <li> {{ Messages.CASH }}: {{ Helpers.Dollars(Info.Characters[i].Money) }} </li>
                     </ul>
                  </div>

                  <div v-else class="create" v-on:click="Create(i)"> 
                     <i class="fas fa-plus"> </i>
                     <h2> {{ Messages.CREATE_CHARACTER }} </h2>
                  </div>
               </li>
            </ul>
         </div>
      </transition>
   </div>
        
</template>

<script> 

   import Loading from './Loading.vue';
   import Helpers from '../Helpers';
   import { Notification, Messages, Genders, Consts } from '../Globals';


   export default { 

      components: {
         Loading,        
      }, 

      data () { 
         return { 
            Inputs: { Username: null, Password: null },
            Logged: false,
            Info: {
               "Account":{
               "id":1,
               "Username":"Zekiloni",
               "Email": 'zekirija17@gmail.com',
               "Password":"$2a$10$UCxNAK.1VTyEVuhXIl42x.A2TAyZH/03WzTUT18C9wuoNcN2k7Rsu",
               "Administrator":0,
               "Login_Date":null,
               "IP_Adress":null,
               "Social_Club":null,
               "Hardwer":null,
               "Warns":0,
               "Donator":0,
               "Coins":0,
               "Online":false,
               "Last_Character":-1,
               "Created_At":"2021-07-24T06:25:57.000Z",
               "Updated_At":"2021-07-24T06:25:57.000Z"
               },
               "Characters": [
                  {  id: 1,
                     Account: 1,
                     Name: 'Zachary Parker',
                     Gender: 0,
                     Birth: '11.06.2001',
                     Origin: 'Novi Pazar',
                     Money: 5000,
                     Salary: 0,
                     Bank: 0,
                     Paycheck: 0,
                     Stranger_ID: 0,
                     Faction: 0,
                     Faction_Rank: 'none',
                     Faction_Permissions: 0,
                     Job: 0,
                     Working_Hours: 0,
                     Health: 100,
                     Hunger: 100,
                     Thirst: 100,
                     Wounded: false,
                     Injuries: '"[]"',
                     Last_Position: null,
                     Spawn_Point: 0,
                     Inside: null,
                     Muted: 0,
                     Hours: 0,
                     Minutes: 0,
                     Walking_Style: 'normal',
                     Facial_Mood: 'normal',
                     Max_Houses: 3,
                     Max_Business: 2,
                     Max_Vehicles: 5,
                     Licenses: '[]',
                     Cuffed: false,
                     Created_At: 202107,
                     Updated_At: 202107 
                  }
               ]
            },
            Max_Characters: [0, 1, 2],

            Helpers, Messages, Genders,

         }
      },
      
      methods: { 
         
         Authorization: async function (Username, Password) { 
            let response = await mp.events.callProc('CLIENT:AUTHORIZATION:SEND_CREDENTIALS', Username, Password);

            response = JSON.parse(response)
            
            if (response) {
               this.Logged = 'loading';
               setTimeout(() => { this.Logged = true; }, 3000);;
               this.Info = response;
               console.log(JSON.stringify(response))
            }
         },

         Play: async function (i) { 
            this.Logged = 'loading';
            Helpers.Sleep(3).then(() => { 
               mp.trigger('CLIENT::AUTHORIZATION:PLAY', i);
            });
         },

         Create: function (i) { 
            if (i == 2 && this.Info.Account.Donator == 0) return mp.trigger('CLIENT::NOTIFICATION', this.Messages.NOT_DONATOR, Notification.Error, 5);
            mp.trigger('CLIENT::CREATOR:START')
         }

      },
      
      mounted () { 
         mp.invoke('focus', true);
         this.$refs.iUsername.focus();
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
      background: linear-gradient(45deg,rgb(60 39 112 / 30%), rgb(0 0 0 / 58%)), url('../assets/images/backgrounds/mn-bg-1.png');
      background-size: cover;
      width: 100%;
      height: 100%;      
      display: grid;
   }

   .login { 
      margin: auto;
      width: 370px;
      height: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
   }

   .login img.logo { 
      width: 215px;
   }

   .login h1.title { 
      color: whitesmoke;
      font-size: 1.86rem;
      margin: 10px 0;
      font-weight: 400;
      letter-spacing: 0.1rem;
   }
   
   .login p { 
      font-size: 0.8rem; letter-spacing: 0.05rem;
      color: #999999; text-align: center;
   }

   .login .form { text-align: center; margin: 15px 0;}

   .login .form input { 
      width: 270px;
      padding: 15px 10px;
      border: 2px solid transparent;
      transition: all .3s ease;
      color: whitesmoke;
      margin: 10px 0;
      box-shadow: rgb(20 21 26 / 16%) 0px 8px 16px, rgb(71 77 87 / 16%) 0px 16px 32px, rgb(20 21 26 / 10%) 0px 0px 1px;
      background: rgb(255 255 255 / 15%);
   }

   .login .form input:focus { 
      color: white;
      transform: scale(1.05);
      border-color: rgb(255 255 255 / 25%);

   }

   button.play { 
      margin: 5px 0;
      font-weight: 200;
      width: 320px;
      padding: 20px 10px;
      background: linear-gradient(45deg, #7c5bf1, #20143f);
      box-shadow: 25px 15px 25px -5px rgb(37 24 71 / 48%), 0 15px 25px -5px rgb(117 85 226 / 25%);
      border-radius: 5px;
      transition: all .3s ease;
      font-weight: 500;
      color: whitesmoke;
   }

   button.play:hover { 
      color: white;
      box-shadow: 25px 15px 35px -5px rgb(37 24 71 / 75%), 0 15px 25px -5px rgb(117 85 226 / 25%);
      filter: brightness(1.2);
   }

</style>


