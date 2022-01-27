

<template>
   <div class="box">
      <div class="header">
         <img src="../../../assets/images/other/maze-bank-small.png" alt="" class="logo">

         <div class="account">
            <h3> {{ account.name }} </h3>
            <small> {{ dateTime }}</small>
         </div>
      </div>

      <div class="main">
         
      </div>

      <div class="page">

      </div>
   </div>
</template>

<script lang="ts">
   import Vue from 'vue';

   export default Vue.extend({
      props: { 
         showed: Object
      },

      data () {
         return {

            dateTime: null,

            account: {
               name: 'Zachary Parker',
               number: 4147818101013431,
               savings: 0,
               paycheck: 0,
               credit: null,
               created_At: '2022-01-27 19:55:11'
            },


         }
      },

      methods: {
         updateDateTime: function () {
            const now = new Date();

            const minutes = (now.getMinutes() < 10 ? '0' : '') + now.getMinutes(),
                  seconds = (now.getSeconds() < 10 ? '0' : '') + now.getSeconds();

            this.dateTime = now.getDate() + '.' + (now.getMonth() + 1) + ' - ' + (now.getUTCHours() + 1) + ':' + minutes + ':' + seconds;

            setTimeout(this.updateDateTime, 1000);
         }
      },

      async mounted () {
         //@ts-ignore
         if (window.mp) {
            //@ts-ignore
            const response = await mp.events.callProc('CLIENT::BANK:ACCOUNT');

         }

         this.updateDateTime();
      }
   });

</script>

<style scoped>
   .box {
      width: 785px;
      height: 475px;
      border-radius: 20px;
      background: #181a20;
      margin: auto;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      align-items: center;
   }
   
   .header {
      width: 100%;
      padding: 0 20px;
   }

   .header .account {
      float: right;
      height: 90px;
      padding: 0 10px;
      display: grid;
      text-align: center;
   }
   
   .account h3 {
      font-size: 0.8rem;
      font-weight: 350;
      margin: auto;
      color: #cdcdcd;
   }

   .account small {
      color: #5e656e;
      font-weight: 650;
   }

   .header img.logo {
      width: 90px;
      float: left;
      animation: fade-in 2s ease;
   }

   .main { 
      width: 350px;
      height: 300px;
      background: red;
   }

   .page {
      width: 350px;
      height: 300px;
      background: blue;
   }


</style>