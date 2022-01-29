

<template>
   <div class="bank-create" :class="{ default: info }">
      <transition name="fade" mode="out-in"> 
         <div class="contract" v-if="info == null" key=contract >
            <h3> {{ Messages.REGISTERING_BANK_ACCOUNT }} </h3>
            <input type="checkbox" name="agree" @input="agree()">
            <label for="agree"> {{ Messages.DO_U_AGREE }} </label>
            <button class="go-back" @click="showed.create = false, showed.main = true"> {{ Messages.GO_BACK }} </button>
         </div>

         <div v-else-if="info" key=creditCard >
            <div class="card">
               <div class="header">
                  <h4> {{ Messages.CREDIT_CARD }} </h4>
                  <h2 class="username"> {{ info.name }} </h2>
                  <h3> {{ info.number }} </h3>
               </div>
               <ul class="info">
                  <li> <small> {{ Messages.PIN }} </small> <b> {{ info.pin }} </b> </li>
                  <li> <small> {{ Messages.CRD }} </small> <b> {{ date(info.created) }} </b> </li>
                  <li> <small> {{ Messages.EXP }} </small> <b> {{ date(info.expiring) }} </b> </li>
               </ul>
               <img src="@/assets/images/icons/chip.png" alt="" class="chip">
            </div>
         </div>
      </transition>
   </div>
</template>

<script lang="ts">

   import Vue from 'vue';
   import { Messages } from '../../../globals';

   export default Vue.extend({
      props: { 
         showed: Object
      },

      data () {
         return {
            info: null,

            Messages
         }
      },

      methods: {
         agree: async function () {
            //@ts-ignore
            this.info = {
               number: '1312 8484 0111 3245',
               pin: 341,
               name: 'Brandon Murphy',
               created: Date.now(),
               expiring: Date.now() + (30 * 24 * 60 * 60 * 1000)
            }
            // const response = await mp.events.callProc('CLIENT::BANKING:CREATE');
            // if (response) {
            //    this.info = JSON.parse(response);
            // }
         },
         
         date: function (i: number) {
            const date = new Date(i);
            const month = (date.getUTCMonth()) < 10 ? '0' + (date.getUTCMonth() + 1) : (date.getUTCMonth() + 1);
            return (date.getUTCDate()) + '/' + month;
         }
      }
   });
</script>

<style scoped>
   .bank-create {
      width: 400px;
      height: auto; 
      padding: 20px;
      margin: auto;
      display: flex;
      flex-direction: column;
      text-shadow: 0 0.3px 1px rgb(0 0 0 / 28%);
      align-items: center;
      background: #181a20;
      border-radius: 15px;;
   }

   .bank-create.default { 
      padding: 0;
      background: transparent;
   }

   h3 {
      text-transform: uppercase;
      font-weight: 550;
      color: #cdcdcd;
      font-size: 2rem;
      margin: 20px 0;
   }

   label { color: #9ea8b6; width: 200px; margin: 0 15px; font-weight: 450; }

   .contract { 
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
   }

   .contract h3 { width: 100%; }

   input[type=checkbox] {
      width: 35px;
      height: 35px;
   }

   input[type=checkbox]::before{
      width: 17px;
      height: 17px;
   }

   .go-back { 
      margin: 30px 0 0 0;
      width: 100%;
      background: #21252f;
      padding: 15px 0;
      border-radius: 5px;
      font-weight: 650;
      color: #848e9c;
      transition: all .3s ease;
   }
   
   .go-back:hover { 
      filter: brightness(1.15);
   }

   .card {
      position: relative;
      width: 400px;
      padding: 20px 0;
      height: 185px;
      border-radius: 20px;
      background: linear-gradient(45deg, #6448c2, #20143f);
   }

   .card img.chip {
      width: 70px;
      position: absolute;
      bottom: 25px;
      right: 25px;
   }
   
   .header { 
      padding: 0 25px;;
   }

   .header h4, h2, h3 { margin: 5px 0; }

   .header h4 { 
      color: rgb(173, 173, 173);
      letter-spacing: 0.25rem;
      font-weight: 450;
      text-transform: uppercase;
   }

   .header h2 { 
      margin: 10px 0;
      font-size: 1.3rem;
      font-weight: 500;
      color: #cdcdcd;
   }

   .header h3 { color: #dcdcdc; }

   ul.info { 
      padding: 0;
      list-style: none;
      width: auto;
      max-width: 250px;
      margin: 15px 25px;
      padding: 10px 0;
      display: flex;
      justify-content: space-between;
   }

   ul.info li {
      width: auto;
      height: 50px;
      color: black;
      text-align: left;
   }

   ul.info li small { text-transform: uppercase; }

   ul.info li b {
      display: block;
      letter-spacing: 0.1rem;
      font-size: 1rem;
   }
</style>