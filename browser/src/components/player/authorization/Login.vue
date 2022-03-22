

<template>
   <div class="wrapper">      
      <img class="logo" src="@/assets/images/logo.png" />

      <div class="login">

         <div class="inputs">
            <input type="text" v-model="username" :placeholder="Messages.USERNAME" spellcheck="false" autofocus>
            <input type="password" v-model="password" :placeholder="Messages.PASSWORD" spellcheck="false">
         </div>

         <div class="play" :class="{ disabled: !username || !password }" @click="submit"> {{ Messages.PLAY }} </div>
      </div>
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
   .wrapper { 
      max-width: 580px;
      min-height: 100px;
      margin: auto;
      color: white;
      display: grid;
   }

    img.logo {
      margin: auto;
      width: 150px;
   }

   .login {
      background: #16151A;
      width: 100%;
      margin-top: 40px;
      height: 138px;
      border-radius: 10px;
      display: flex;
      justify-content: space-between;
      padding: 20px;
      align-items: center;
      flex-wrap: wrap;
   }

   .inputs input {
      margin: 15px 0;
      padding: 15px 15px;
      display: block;   
      background: #201f25;
      border-radius: 8px;
      font-size: 0.95rem;
      font-weight: 400;
      color: #9A9A9A;
      border: 1px solid transparent;
   }

   .inputs input:hover, .inputs input:focus {
      background: rgb(41 39 50 / 31%);
      border: 1px dashed #3e3b46;
      color: #fff;
   }

   .play {
      width: 145px;
      padding: 15px 25px;
      font-weight: 700;
      font-size: 1rem;
      background: #fdb81b;
      color: #151418;
      border-radius: 10px;
      display: block;
      position: relative;
      transition: all .3s ease;
   }

   .play.disabled {
      color: #56555B;
      background: #302F36;
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