
<template>


   <div class="authorization">

      <transition name="fade" v-if="!Logged">
         <div class="login">
            <div class="header">
               <h2 class="frp-orange"> Focus Roleplay </h2>
               <h4> {{ Messages.WEBSITE }} </h4>
            </div>
            <div class="form">               
               <div class="input-control">
                  <label> {{ Messages.USERNAME }} </label>
                  <input type="text" v-model="Inputs.Username" ref="iUsername">
               </div>
               <div class="input-control">
                  <label> {{ Messages.PASSWORD }} </label>
                  <input type="password" v-model="Inputs.Password" >
               </div>

               <button class="login frp-1" v-on:click="Authorization(Inputs.Username, Inputs.Password)"> Prijavi se </button>
            </div>
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
   import { Notification, Messages, Genders } from '../Globals';


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
      position: absolute; top: 0; left: 0;
      width: 100%; height: 100%; display: flex;
      justify-content: center; align-items: center;
      background: linear-gradient(45deg, rgb(10 10 10 / 95%) 0%, rgba(8, 8, 8 , 0.80) 100%);
   }

   div.login { 
      width: 275px; height: 400px; display: flex; flex-direction: column;
      justify-content: center; align-items: center;
   }

   .header { display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; margin: 25px 0; }

   .header h2 { font-size: 40px; text-transform: uppercase; margin: 0; letter-spacing: 1.2px; }
   .header h4 { font-size: 18px; margin: 0; color: rgb(209, 209, 209); text-transform: uppercase; letter-spacing: 5px; font-weight: 100; }

   img.logo { width: 170px; height: 170px; padding: 25px; }

   button.login { margin-top: 25px; }

   .input-control { display: flex; flex-direction: column; align-items: center; justify-content: center; margin: 15px 0; }
   .input-control label { color: rgb(156, 156, 156); font-weight: 100; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 5px;}
   

   button.frp-1 { padding: 10px 70px; }

   .lobby { 
      width: 800px;
      height: 550px;
      display: flex;
      justify-content: space-between;
      align-items: center;   
   }

   .lobby .account { 
      width: 275px;
      height: 100%;
   }

   .account .info { 
      width: 100%;
      height: 350px;
      border-radius: 10px;
      background: url('/images/backgrounds/account-info.png');
      box-shadow: 0 3px 17px rgb(124 91 241 / 35%);
      display: flex;
      flex-direction: column;
      align-items: center;
      transition: all 0.35s ease;
   }

   .account .info h3.username { 
      color: white;
      font-size: 30px;
      text-shadow: 0 1px 2px rgb(250 184 10 / 5%);
      margin: 0;
      margin-top: 20px;
      text-transform: uppercase;
   }

   .account .info h4.rank { 
      margin: 0;
      color: #c5c5c5;
      letter-spacing: 3px;
      font-size: 16px;
      text-transform: uppercase;
      font-weight: 200;
   }

   .account .info ul.other { 
      padding: 20px;
      width: 255px;
      list-style: none;
   }

   ul.other li { 
      font-size: 14px;
      color: #e4e4e4;
      margin: 5px 0;
      font-weight: 100;
      padding: 5px 10px;
      backdrop-filter: brightness(1.1);
      border-radius: 5px;
   }

   ul.other li b { 
      float: right;
      letter-spacing: 0.65px;
      color: rgb(235, 235, 235);
   }

   .character-name { font-size: 22px; margin: 0; padding: 10px 20px; color: #fab80a; }

   ul.char-info { 
      list-style: none;
      padding: 0 20px;
   }

   ul.char-info li { margin: 10px 0; text-transform: uppercase; font-weight: 400; color: #cdcdcd; }

   .lobby ul.characters { 
      padding: 0; list-style: none; width: 500px; height: 100%; display: flex;
      flex-direction: column; align-items: center; justify-content: space-between; margin: 0; margin-top: 20px; 
   }

   .characters .character { width: 100%; height: 165px;  margin-top: -10px; }

   .characters .character .info {
    height: 100%;
    margin: 0;
    border-radius: 5px;
    background: linear-gradient(45deg, rgb(255 255 255 / 20%), transparent);
    border: none;
    position: relative;
   }

   h2.playing-hours { 
      position: absolute;
      bottom: -12px;
      margin: 0;
      font-size: 50px;
      right: 10px;
      color: white;
      opacity: 0.1;
      transition: all 0.35s ease;
   }

   .character .info:hover { 
      filter: brightness(1.05);
      
   }

   .character .info:hover legend { color: white; /* background: #fab80a; box-shadow: 0 1px 4px rgb(250 184 10 / 22%); */ }

   .character .info legend { 
      padding: 0 15px;
      color: #eaeaea;
      font-size: 25px;
      font-weight: 600;
      transition: all 0.35s ease;
      border-radius: 5px;
      text-transform: uppercase;
   }

   .character .create { 
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%;
      opacity: 0.45;
      background: linear-gradient(45deg, rgb(255 255 255 / 15%), transparent);
      transition: all 0.35s ease;
      border-radius: 5px;
   }
   .create h2 { text-transform: uppercase; color: whitesmoke; font-weight: 300; letter-spacing: 5px; }
   .create:hover { opacity: 0.9; }
   .create .fa-plus { font-size: 45px; color: whitesmoke; }


</style>


