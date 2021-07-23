
<template>


   <div class="authorization">

      <div class="login">
         <div class="logo"> <img src="@/assets/images/logo.png"> </div>

         <div class="header">
            <h2> Focus Roleplay </h2>
            <h4>www.focus-rp.com</h4>
         </div>

         <div class="authentication">
            <!-- MADE BY VALELE -->
            <label class="info" for="passsword" > Korisničko ime </label>
            <input type="text" name="username" autofocus ref="focus" v-model="Inputs.Username" />

            <label class="info" for="passsword"> Korisnička šifra </label>
            <input type="password" name="passsword" v-model="Inputs.Password" />

            <h4 class="forgotten-password frp-purple-text"> Zaboravljena lozinka ? </h4>
            <button v-on:click="Authorize(Inputs.Username, Inputs.Password)" class="login"> Prijavi Se </button>
         </div>
      </div>

      <div class="selector" v-if="Logged">
         <div class="account" v-if="account">
            <h2 class="username"> {{ account.Username }} </h2>
            <h4 class="group"> {{ Group(account.Administrator) }} </h4>

            <ul class="informations">
               <li> <h3> E-mail </h3> <h3 class="i"> {{ account.Email }} </h3>  </li>
               <li> <h3> Datum Registracije </h3> <h3  class="i"> {{ Date(account.Register_Date) }} </h3>  </li>
               <li> <h3> Poslednja Prijava </h3> <h3  class="i"> {{ Date(account.Login_Date) }} </h3>  </li>
               <li> <h3> Upozorenja </h3> <h3  class="i"> {{ account.Warns }} / 3 </h3>  </li>
               <li> <h3> Donator </h3> <h3  class="i"> {{ Donator(account.Donator) }} </h3>  </li>
            </ul>
         </div>

         <div class="characters">
            <div class="character" v-for="(i, k) in CHARS" v-bind:key="characters[k]">
               <div class="info" v-if="characters[k]" >
                  <h2 class="name"> {{ characters[k].Name }} </h2>
                  <h3 class="time"> {{ characters[k].Hours }}h{{ characters[k].Minutes }}m </h3>
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
                        <h3> {{ truncate(characters[k].Faction, 16) }} </h3>
                        <h3> {{ truncate(characters[k].Faction_Rank, 12) }} </h3>
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
            </div>
         </div>
      </div>
      
   </div>
        
</template>

<script> 

   export default { 

      data () { 
         return { 
            Inputs: { Username: null, Password: null },
            Logged: false,
            Info: null,

            modal: {
               forgoten: false
            },
         }
      },

      methods: { 
         
         Authorize: async function (Username, Password) { 
            const response = await mp.events.callProc('CLIENT:AUTHORIZATION:SEND_CREDENTIALS', Username, Password);
            console.log(JSON.stringify(response))

            if (response) {
               console.log('Logged in');
               this.Logged = true;
               this.Info = response;
               console.log(JSON.stringify(response))
            }
         },

         Play: async function (Character_ID) { 
            const Response = await mp.events.callProc('CLIENT:AUTHORIZATION:PLAY', Character_ID);
            if (Response) this.Hide('Authorization');
         }

      },
      
      mounted () { 
         mp.invoke('focus', true);
      }
   }

</script>

<style scoped src="@/assets/styles/authorization.css"> </style>

