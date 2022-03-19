

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
               try {
                  const logged = await mp.events.callProc('CLIENT::AUTHORIZATION:SEND', username, password);
                  if (logged) {
                     this.$parent.logged = true;
                     this.$parent.account = JSON.parse(logged);
                  }
               } catch (e) { 
                  console.log(e)
               }
            }
         }
      },

      mounted ()  {
         mp.invoke('focus', true);

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
      flex-direction: column;
      animation: slide-from-bottom 1.3s ease-in-out;
   }

   img.logo { width: 180px; }

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
      color: #cdcdcd;
      border-radius: 4px;
      box-shadow: rgb(0 0 0 / 5%) 0px 1px 5px 0px;
      border: 1px solid rgb(150 150 150 / 20%);
      background: rgb(150 150 150 / 5%);
   }

   .form input:focus { color: white; border-color: #474d57; }
   .form .input-container { position: relative; margin: 10px 0; }

   button.play { 
      width: 200px;
      margin-top: 15px;
      padding: 15px 10px;
      background: #FFBB1C;
      border-radius: 10px;
      transition: all .3s ease;
      font-weight: 700;
      font-size: 15px;
      color: #151418;
   }

   button.play:hover { 
      color: #794B20;
      background: #FFC940;
   }

   @keyframes slide-from-bottom {
      from { transform: translateY(80px); opacity: 0; }
      tp { transform:  translateY(0); opacity: 1; }
   }



</style>