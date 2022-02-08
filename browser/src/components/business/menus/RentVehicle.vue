

<template>
   <div class="wrapper">
      <div class="rent" v-if="business">
         <h1 class="business-name"> {{ business.name }} </h1>
         <div class="box">
            <transition-group name="list" appear tag="ul" class="vehicles"> 
               <li v-for="(product, i) in business.products" :key="product.name" @click="selected = i"> 
                  <h2 class="name"> {{ capitalize(product.name) }} </h2>
                  <h2 class="price"> {{ formatDollars(product.price) }} </h2>
               </li>
            </transition-group>
            
            <transition name="fade">
               <div class="selected" v-if="selected != null">
                  
               </div>
            </transition>
         </div>
      </div>
   </div>
</template>

<script lang="ts">
   import Vue from 'vue'
   import Component from 'vue-class-component';
   import { Messages } from '@/globals';

   @Component
   export default class RentMenu extends Vue {

      business = {
         name: "zeki's rent place",
         products: [
            { name: 'elegy', price: 3.8 },
            { name: 'zentorno', price: 7.6 },
            { name: 'sentinel', price: 3.8 },
            { name: 'monster', price: 7.6 },
            { name: 'infernus', price: 3.8 },
            { name: 'awdwadaw', price: 7.6 },
            { name: 'dawda', price: 3.8 },
            { name: 'zentodawdwarno', price: 7.6 },
         ]
      }; 
   

      selected: number | null = null;

      computed = {
         productInfo: () => {
            return this.business.products[this.selected!];
         }
      }  

      methods = {
         formatDate: (date: Date) => {
            return date.getFullYear() + '-' + (date.getMonth() + 1)+ '-';
         }
      }

      mounted () {
         //@ts-ignore
         if (window.mp) {

            //@ts-ignore
            mp.invoke('focus', true);
            //@ts-ignore
            mp.eventst.add('BROWSER::RENT:MENU', info => this.business = JSON.parse(info));
         }
      }

      beforeDestroy () {
         //@ts-ignore
         if (window.mp) {

            //@ts-ignore
            mp.invoke('focus', false);
         }
      }
      
      Messages = Messages;
   }
</script>

<style scoped>

   .wrapper { 
      width: 100%;
      height: 100%;
      position: absolute;
      display: grid;
      top: 0;
      left: 0;
   }

   .rent {
      min-height: 250px;
      min-width: 380px;
      width: auto;
      margin: auto;
      height: auto;
   }

   .rent h1.business-name {
      font-size: 1.7rem;
      font-weight: 450;
      margin: 10px 0;
      color: #cdcdcd;
   }

   .box { 
      margin: 2px 0;
      height: auto;
      position: relative;
      background: #181a20;
      transition: height .3s ease;
      box-shadow: rgba(0, 0, 0, 0.15) 0px 10px 15px -3px, rgba(0, 0, 0, 0.15) 0px 4px 6px -2px;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      justify-content: center;
      align-items: center;
   }

   
   button.search {
      background: #ffcc45;
      padding: 10px 45px;
      font-size: 0.9rem;
      margin-top: 15px;
   }

   ul.vehicles { 
      list-style: none;
      padding: 15px;
      height: 300px;
      width: 85%;
      overflow: auto;
   }

   ul.vehicles li {
      padding: 5px 0;
      margin: 10px 0; 
      width: 90%; 
      padding: 15px;
      transition: all .3s ease;
      background: #0b0e11;
      border-radius: 10px;
   }

   ul.vehicles li:hover {
      background: #ffcc45;
   }

   ul.vehicles li h2.name {
      margin: 5px 0;
      color: #cdcdcd;
   }

   .selected { 
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: red;
   }
</style>

