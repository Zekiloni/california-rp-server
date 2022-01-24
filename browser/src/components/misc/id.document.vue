
<template>
   <div class="id-card" >
      <img src="@/assets/images/other/goverment-logo.png" alt="los santos goverment logo" class="gov-logo">
      <h2>
         {{ Messages.ID_CARD }}
      </h2>

      <ul class="info">
         <li> <b> {{ Messages.FIRST_NAME }} </b> <span> {{ first_Name }} </span> </li>
         <li> <b> {{ Messages.LAST_NAME }} </b> <span> {{ last_Name }} </span> </li>
         <li> <b> {{ Messages.BIRTH }} </b> <span> {{ data.birth }} </span> </li>
         <li> <b> {{ Messages.ORIGIN }} </b> <span> {{ data.origin }} </span> </li>
         <li> <b> {{ Messages.GENDER }} </b> <span> {{ genders[data.gender] }} </span> </li>
      </ul>
   </div>
</template>

<script>
   import { Messages } from '../../globals';

   export default {
      data () { 
         return {
            data: {
               name: 'Zachary Parker',
               birth: '2001-10-06',
               origin: 'Novi Pazar',
               gender: 1,

            },

            genders: ['M', 'F'],

            Messages
         }
      },

      computed: {
         first_Name: function () {
            if (this.data.name) {
               return this.data.name.split(' ')[0];
            }
         },

         last_Name: function () { 
            if (this.data.name) {
               return this.data.name.split(' ')[1];
            }
         }
      },

      mounted () {
         if (!window.mp) {
            return;
         }

         mp.events.add('BROWSER::IDENTITY:INFO', data => this.data = data);
      }
   }
</script>

<style scoped>
   .id-card { 
      position: relative;
      width: 450px;
      height: 280px;
      background: #2a303c;
      box-shadow: 0 7px 15px 0 rgb(0 0 0 / 45%);
      border-radius: 25px;
      margin: auto;
      overflow: hidden;
   }

   img.gov-logo {
      position: absolute;
      z-index: 1;
      bottom: -28px;
      right: -28px;
      width: 235px;
      -webkit-user-drag: none;
      filter: grayscale(1.0);
      opacity: 0.2;
   }

   .id-card h2 {
      background: #181a20;
      margin: 0;
      font-weight: 450;
      text-transform: uppercase;
      font-size: 1.15rem;
      color: #5c6370;
      padding: 10px 25px;
   }

   ul.info {
      list-style: none;
      margin: 5px 0;
      width: 100%;
      padding: 0;
      height: 70%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: column;
   }

   ul.info li { 
      width: 375px;
      margin: 4px 0;
   }

   ul.info li b {
      color: #848e9c;
      text-transform: uppercase;
      font-weight: 600;
      font-size: 0.7rem;
   }

   ul.info li span { 
      display: block;
      color: #cdcdcd;
      font-size: 0.95rem;
      font-weight: 350;
      margin: 1px 0;
   }

</style>
