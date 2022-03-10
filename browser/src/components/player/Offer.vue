

<template>
   <transition name="fade-with-bottom-slide" v-if="offer"> 
      <div class="offer-holder">
         <h2 class="title"> {{ offer.title }} </h2>
         <div class="offer">
            
            <p> {{ offer.description }} </p>

            <ul class="actions">
               <li class="accept"> Y </li>
               <li class="decline"> N </li>
            </ul>
         </div>
      </div>
   </transition>
</template>

<script lang="ts">
   import Vue from 'vue';
   import Component from 'vue-class-component';
   import { Messages } from '@/globals';

   interface IOffer {
      title: string
      description: string
   }

   @Component
   export default class Offer extends Vue {
      offer: IOffer | null = null;
      
      Messages = Messages;

      pushOffer (offer: string) {
         this.offer = JSON.parse(offer);
      }

      mounted () {
         if (window.mp) {
            mp.events.add('BROWSER::OFFER', this.pushOffer);
         }
      }
   }
</script>

<style scoped>
   .offer-holder {
      position: absolute;
      left: 30px;
      bottom: 250px;
      width: 270px;
      border-radius: 10px;
      height: auto;
      background: linear-gradient(120deg, rgb(11 14 17 / 55%), rgb(11 14 17 / 5%));
   }

   h2.title {
      margin: 0;
      font-size: 0.9rem;
      text-align: center;
      font-weight: 450;
      color: whitesmoke;
      border-radius: 4px;
      width: auto;
      max-width: 180px;
      padding: 5px 10px;
      background: linear-gradient(120deg, #6d4edb, #4c318e);
      transform: translateY(-10px) translateX(15px);
   }
   
   .offer { padding: 5px 15px; }

   .offer p {
      font-size: 0.8rem;
      color: #c5c5c5;
      font-weight: 500;
      margin: 6px 0;
   }

   .offer ul.actions {
      padding: 0;
      display: flex;
      margin-top: 15px;
      justify-content: flex-start;
   }
   
   ul.actions li {
      width: 35px;
      height: 35px;
      font-weight: 700;
      font-size: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      list-style: none;
      background: white;
      border-radius: 4px;
      color: white;
   }

   ul.actions li:nth-child(2) {
      margin-left: 25px;
   }

   ul.actions li.accept { 
      background: linear-gradient(45deg, #0cbe80, #159559);
   }

   ul.actions li.decline {
      background: linear-gradient(45deg, #ff463d, #d4161b);
   }
</style>