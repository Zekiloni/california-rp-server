
<template>


   <div class="authorization">

      <transition name="fade">
         <div class="login" v-if="Logged == false">
            <div class="logo"> <img src="@/assets/images/logo.png"> </div>

            <div class="header">
               <h2> Focus Roleplay </h2>
               <h4>www.focus-rp.com</h4>
            </div>

            <div class="authentication">
               <label class="info" for="passsword" > Korisničko ime </label>
               <input type="text" name="username" autofocus ref="Input_Username" v-model="Inputs.Username" />

               <label class="info" for="passsword"> Korisnička šifra </label>
               <input type="password" name="passsword" v-model="Inputs.Password" />

               <h4 class="forgotten-password frp-purple-text"> Zaboravljena lozinka ? </h4>
               <button class="frp-1" v-on:click="Authorize(Inputs.Username, Inputs.Password)" > Prijavi Se </button>
            </div>
         </div>
      </transition>

      <Loading v-if="Logged == 'loading'" />
   
      <transition name="fade">
         <div class="selector" v-if="Logged == true">
            <div class="account">
               <h2 class="username"> {{ Info.Account.Username }} </h2>
               <h4 class="group"> {{ Group(Info.Account.Administrator) }} </h4>

               <ul class="informations">
                  <li> <h3> E-mail </h3> <h3 class="i"> {{ Info.Account.Email }} </h3>  </li>
                  <li> <h3> Datum Registracije </h3> <h3  class="i"> {{ DateFormat(Info.Account.Created_At) }} </h3>  </li>
                  <li> <h3> Poslednja Prijava </h3> <h3  class="i"> {{ DateFormat(Info.Account.Login_Date) }} </h3>  </li>
                  <li> <h3> Upozorenja </h3> <h3  class="i"> {{ Info.Account.Warns }} / 3 </h3>  </li>
                  <li> <h3> Donator </h3> <h3  class="i"> {{ Donator(Info.Account.Donator) }} </h3>  </li>
               </ul>
            </div>

            <div class="characters">

               <div class="character" v-for="(Character, i) in Characters" v-bind:key="i">
                  {{ i }}
               </div>
               <!-- <div class="character" v-for="Character in Max_Characters" v-bind:key="Info.Characters[Character]">
                  <div class="info" v-if="Info.Characters[Character]" >
                     <h2 class="name"> {{ Info.Characters[Character].Name }} </h2>
                     <h3 class="time"> {{ Info.Characters[Character].Hours }}h{{ characters[k].Minutes }}m </h3>
                     <ul class="character-info">
                        <li>
                           <h4> Novac </h4>
                           <h3 class="money-money-money-always-funny"> {{ moneyFormat(characters[k].Money) }} </h3>
                        </li>
                        <li>
                           <h4> Pol </h4>
                           <h3> {{ genders[characters[k].Gender] }} </h3>
                        </li>
                        <li>
                           <h4> Datum Rodjenja </h4>
                           <h3> {{ characters[k].Birth }} </h3>
                        </li>
                        <li>
                           <h4> Mesto Rodjenja </h4>
                           <h3> {{ characters[k].Origin }} </h3>
                        </li>
                        <li v-if="characters[k].Faction != 0">
                           <h4> Fakcija </h4>
                           <h3> {{ Truncate(characters[k].Faction, 16) }} </h3>
                           <h3> {{ Truncate(characters[k].Faction_Rank, 12) }} </h3>
                        </li>
                     </ul>
                     <div class="actions">
                        <button class="play" v-on:click="Play(characters[k].id)" :disabled="selected == true"> <i class="fa fa-play-circle" aria-hidden="true"></i>  </button>
                        <button class="delete" v-on:click="TryDelete(characters[k].id)" :disabled="selected == true"> <i class="fa fa-minus" aria-hidden="true"></i>  </button>
                     </div>
                  </div>
                  <div v-else class="create" v-on:click="TryCreate()">
                     <i class="fa fa-plus" aria-hidden="true"></i>
                  </div>
               </div> -->
            </div>
         </div>
      </transition>
   </div>
        
</template>

<script> 

   import Loading from './Loading.vue';
   import Helpers from '../Helpers';

   export default { 

      components: {
         Loading, 
      }, 

      data () { 
         return { 
            Inputs: { Username: null, Password: null },
            Logged: true,
            Info: {
               "Account":{
               "id":1,
               "Username":"Zekiloni",
               "Email":null,
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
               "Characters": []
            },
            Max_Characters: 3,
            No_Character: false,

            modal: {
               forgoten: false
            },
         }
      },

      computed: { 
         Characters: function () {
            for (let i = 0; i <= this.Max_Characters; i ++) { 
               if (this.Info.Characters) return this.Info.Characters[i]
            }
         }
      },

      methods: { 
         
         Authorize: async function (Username, Password) { 
            let response = await mp.events.callProc('CLIENT:AUTHORIZATION:SEND_CREDENTIALS', Username, Password);

            response = JSON.parse(response)
            
            if (response) {
               console.log('Logged in');
               this.Logged = 'loading';
               setTimeout(() => { this.Logged = true; }, 3000);;
               this.Info = response;
               console.log(JSON.stringify(response))
            }
         },

         Group: (i) => { return i == 0 ? 'Korisnik': 'Administrator ' + i; },
         Donator: (i) => { return i > 0 ? 'Da' : 'Ne'; },

         DateFormat: (i) => { 
            i = new Date(i); 
            return i.getDate() + '.' + (i.getMonth() + 1) + '.' + i.getFullYear() + ' - ' + i.getHours() + ':' + i.getMinutes() + ':' + i.getSeconds(); 
         },

         Play: async function (Character_ID) { 
            const Response = await mp.events.callProc('CLIENT:AUTHORIZATION:PLAY', Character_ID);
            if (Response) this.Hide('Authorization');
         },

         Truncate () {
            Helpers.Truncate(this)
         }

      },
      
      mounted () { 
         mp.invoke('focus', true);
         this.$refs.Input_Username.focus();

         this.Characters()

      }
   }

</script>

<style scoped>
   button.frp-1 { padding: 10px 70px; }
</style>

<style scoped src="@/assets/styles/authorization.css"> </style>

