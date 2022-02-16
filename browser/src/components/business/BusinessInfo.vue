

<template>
   <div class="business-info" v-if="business">
      <h2 class="business-name"> {{ business.name }} </h2>
      <h2 class="adress"> 
         {{ business.location.street }} {{ business.id }}
         <small> {{ business.location.zone }} </small>
      </h2>
      <ul class="info">
         <li :class="{ sale: onSale(business) }"> {{ onSale(business) ? Messages.BUSINESS_FOR_SALE : Messages.BUSINESS_NOT_FOR_SALE }} </li>
         <li> <b> {{ Messages.LOCKED }}: </b> {{ business.locked ? Messages.YES : Messages.NO }} </li>
         <li> <b> {{ Messages.PRICE }}: </b> {{ dollars(business.price) }} </li>
      </ul>

      <div class="commands">
         <h4> {{ Messages.AVAILABLE_COMMANDS }} </h4>
         <p> 
            {{ commands.map(cmd => '/' + cmd).join(' ') }}
         </p>
      </div>
   </div>
</template>

<script lang="ts">
   import Vue from 'vue'
   import Component from 'vue-class-component';
   import { Messages } from '@/globals';

   @Component
   export default class BusinessInfo extends Vue {

      business: object | null = null;
      commands: string[] = [];


      mounted () {
         if (window.mp) {
            // @ts-ignore
            mp.events.add('BROWSER::BUSINESS:INFO', (info, location, commands) => { this.business = JSON.parse(info); this.business.location = JSON.parse(location); this.commands = JSON.parse(commands); } );
         }
      }

      Messages = Messages;
   }

</script>

<style scoped>

   .business-info { 
      position: absolute;
      bottom: 20px;
      right: 20px;
      width: 320px;
      margin: auto;
      min-height: 200px;
      overflow: hidden;
      border-radius: 10px;
      background: radial-gradient(rgb(33 37 47 / 25%), rgb(11 14 17 / 55%));
      box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 8px 0px;
   }

    h2.adress {
      width: 100%;
      margin: 0;
      color: #cdcdcd;
      font-weight: 450;
      font-size: 1.15rem;
      border-top-left-radius: 10px;
      padding: 10px;
      background: rgb(11 14 17 / 46%);
   }

   h2.adress small { 
      display: block;
      color: #848e9c;
      font-size: 0.8rem;
      font-weight: 350;
   }

   .commands {
      margin: 0;
      padding:  10px;
      color: #848e9c;
   }

   .commands h4 {
      color: #ffcc45;
      margin: 0;
   }

   .business-name { color: whitesmoke; margin: 10px 10px; font-weight: 500; }

   ul.info { list-style: none; padding: 10px; margin: 0; }
   
   ul.info li { font-size: 0.8rem; color: #848e9c; margin: 5px 0; }
   ul.info b { color: #cdcdcd; font-weight: 350; }

   ul.info li.sale { color: #78cd78; font-weight: 500; font-size: 1.05rem; }

</style>