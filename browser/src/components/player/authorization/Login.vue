

<template>
      <div class="login">
         <img class="logo" src="@/assets/images/text-logo.png" />
         
         <h4> {{ Messages.NEED_TO_LOGIN }} </h4>

         <div class="inputs">
            <input type="text" v-model="username" :placeholder="Messages.USERNAME" spellcheck="false" autofocus>
            <input type="password" v-model="password" :placeholder="Messages.PASSWORD" spellcheck="false">
         </div>

         <div class="play" :class="{ disabled: !username || !password }" @click="submit"> {{ Messages.PLAY }} </div>
      </div>
</template>

<script lang="ts">
   import Vue from 'vue';
   import Component from 'vue-class-component';

   import { Messages } from '@/globals';

   @Component
   export default class Login extends Vue { 
      username: string | null = null;
      password: string | null = null;
      
      Messages = Messages;

      submit () {
         if (!this.username || !this.password) 
            return;
         
         this.$emit('login', this.username, this.password);
      }
   }
</script>

<style scoped>

   .login {
      background: #1e2028;
      width: 350px;
      height: 350px;
      margin: auto;
      border-radius: 5px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
   }
   
   img.logo {
      width: 180px;
   }

   .login h4 { 
      width: 100%;
      text-align: center;
      margin: 20px 0;
      font-weight: 400;
      color: #b8bbbb;
   }

   .inputs input {
      margin: 10px auto;
      padding: 15px 25px;
      display: block;
      background: #242731;
      border-radius: 8px;
      font-size: 0.85rem;
      text-align: center;
      width: 200px;
      font-weight: 400;
      color: #9A9A9A;
      border: 1px solid transparent;
   }

   .inputs input:hover, .inputs input:focus {
      background: rgb(23, 25, 30, 0.4);
      border: 1px dashed #3e3b46;
      color: #fff;
   }

   .play {
      width: 145px;
      padding: 15px 25px;
      font-weight: 700;
      font-size: 1rem;
      background: #fdb81b;
      margin-top: 10px;
      color: #151418;
      border-radius: 10px;
      display: block;
      position: relative;
      transition: all .3s ease;
   }

   .play.disabled {
      color: #56555B;
      background: #242731;
   }

   .play.play.disabled::after {
      opacity: 0.2;
   }

   .play::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      width: 25px;
      height: 25px;
      background: #151418;
      margin: auto;
      right: 22px;
      background: url('../../../assets/images/icons/play-button.svg');
      transition: all .3s ease;
   }

   .play:hover:not(.play.disabled) {
      background: #FFC940;
      color: #794B20;
   }

   .play:hover::after { opacity: 0.55; }

   p {
      text-align: center;
      color: #56555B;
      font-size: 0.7rem;
      font-weight: 600;
      width: 700px;
      margin: 0;
   }
</style>