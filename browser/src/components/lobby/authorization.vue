

<template>
   <div class="authorization"> 
      <img class="logo" src="@/assets/images/logo.png" />

         <h1 class="title"> {{ Messages.AUTHORIZATION }} </h1>
         <p class="info" v-html="Messages.NEED_TO_LOGIN">  </p>

         <div class="form">
            <div class="input-container username"> <input type="text" :placeholder="Messages.USERNAME" v-model="inputs.username" spellcheck="false" ref="usernameInput"> </div>
            <div class="input-container password">  <input type="password" :placeholder="Messages.USERPASSWORD" v-model="inputs.password" spellcheck="false"> </div>
         </div>

         <button class="play" v-on:click="login()"> {{ Messages.PLAY }} </button>
   </div>
</template>


<script>
   import { Messages } from '../../globals';
   
   export default {

      data () { 
         return { 
            inputs: { username: null, password: null },

            Messages
         }
      },
      
      methods: { 
         login: async function () { 
            const username = this.inputs.username, password = this.inputs.password;
            
            if (username && password) {
               const logged = await mp.events.callProc('CLIENT::AUTHORIZATION:SEND', username, password);
               if (logged) {
                  this.$parent.logged = true;
                  this.$parent.account = JSON.parse(logged);
               }
            }
         }
      },

      mounted ()  {
         this.$refs.usernameInput.focus();
      }
      
   };
</script>

<style scoped>

   .authorization { 
      height: auto;
      border-radius: 10px;
      margin: auto;
      display: flex;
      justify-content: center;
      color: whitesmoke;
      align-items: center;
      transition: all .3s ease;
      background: linear-gradient(0deg, #181a20, transparent);
      flex-direction: column;
      animation: slide-from-top 1.3s ease-in-out;
   }

   img.logo { width: 220px; }

   h1.title { font-size: 1.45rem; color: #f8f8ff; font-weight: 550; }
   
   p.info { 
      font-sizE: 0.7rem; 
      width: 270px; 
      text-align: center; 
      color: #cdcdcd; 
      border-radius: 10px;
      padding: 10px 25px;
   }

   .form input { 
      position: relative;
      width: 270px;
      padding: 15px 10px;
      transition: all .3s ease;
      border-bottom: 2px solid #0b0e11;
      color: #cdcdcd;
      box-shadow: rgb(0 0 0 / 25%) 0px 1px 20px 0px;
      background: #2b2f36;
   }

   .form input:focus { color: white; transform: scale(1.05); border-color: #7c5bf1; }
   .form .input-container { position: relative; margin: 10px 0; }

   button.play { 
      font-weight: 200;
      width: 320px;
      margin-top: 15px;
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

   @keyframes slide-from-top {
      from { transform: translateY(-700px); }
      to { transform: translateY(0); }
   }



</style>