

<template>
   <div class="wrapper" v-if="busines">
      <div class="market">

         <div class="header">
            <div class="logo"> 
               <div class="icon"> </div>
            </div>
            <div class="text">
               <h4> {{ Messages.MARKET }} </h4>
               <h2> {{ busines.name }} </h2>
            </div>
            <h3 class="go-out" @click="close()"> {{ Messages.GO_OUT_FROM_MARKET }} </h3>
         </div>

         <div class="products">
            <div class="product" v-for="product in busines.products" :key="product.id" @click="add(product.name, product.price)">
               <img class="item-icon" :src="require('@/assets/images/items/' +  product.name.toLowerCase().replace(' ', '_') + '.png')" > 
               <h4 class="product-name"> {{ product.name }} </h4>
               <button class="add-to-cart"> {{ dollars(product.price) }} </button>
            </div>
         </div>

         <div class="cart">
            <div class="items">
               <transition-group name="list" tag="div" class="items">
                  <div class="item" v-for="item in cart" :key=item.name >
                     <h4 class="name"> {{ item.name }} </h4>
                     <h4 class="price"> <small> {{ item.quantity }} x </small> {{ dollars(item.price) }} </h4>
                     
                  </div>
               </transition-group>
            </div>

            <div class="bill">
               <h2 class="price"> <small>total </small> {{ dollars(bill) }} </h2>
               <button :disabled="cart.length == 0" @click="buy()"> {{ Messages.FINISH_SHOPPING }} </button>
            </div>
         </div>
      </div>
   </div>

</template>

<script lang="ts">
   import Vue from 'vue'
   import Component from 'vue-class-component';
   import { Messages } from '@/globals';
   import { Business, CartItem } from '@/models';

   @Component
   export default class MarketMenu extends Vue {

      busines: Business | null = null;

      cart: CartItem[] = []

      Messages = Messages;
      
      add (name: string, price: number) { 
         let alreadyInCart = this.cart.find(cItem => cItem.name == name);
         if (alreadyInCart) {
            alreadyInCart.quantity ++;
         } else {
            this.cart.push(
               { name: name, quantity: 1, price: price }
            );
         }
      }

      get bill () {
         let total: number = 0;

         this.cart.forEach(item => {
            total += item.quantity * item.price
         });
         
         return total;
      }

      decrease (item: CartItem, index: number) {
         if (item.quantity == 1) {
            this.remove(index);
         } else {
            item.quantity --;
         }
      }

      remove (index: number) { 
         this.cart.splice(index, 1);
      };


      buy () {
         mp.events.call('', this.busines!.id, JSON.stringify(this.cart));
      }

      close () {
         mp.events.call('CLIENT::MARKET:MENU')
      }

      mounted () {
         if (window.mp) {
            mp.invoke('focus', true);

            mp.events.add('BROWSER::MARKET:MENU', (busines: string) => {
               this.busines = JSON.parse(busines);
            });

            mp.events.add('BROWSER::MARKET:CLEAR_CART', () => this.cart = []);
         }
      }

      beforeDestroy () {
         if (window.mp) {
            mp.invoke('focus', false);
         }
      }
   }
</script>


<style scoped>

   .wrapper { 
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(rgb(71 77 87 / 65%), rgb(11 14 17 / 85%));
      display: grid;
   }

   .market { 
      width: auto;
      min-width: 850px;
      margin: auto;
   }

   .header {
      width: auto;
      margin: 15px 0;
      display: flex;
      align-items: center;
   }

   .header .logo {
      width: 90px;
      height: 90px;
      border-radius: 10px;
      box-shadow: 0 0 3px #67c684;
      background: linear-gradient(-45deg, #67c684, #2d6f45);
      display: grid;
   }

   .header h3.go-out {
      font-size: 0.8rem;
      font-family: 'Montserrat Light', sans-serif;
      padding: 7px 25px;
      color: #a3a3a3;
      border-radius: 2px;
      background: rgb(11 14 17 / 35%);
      font-weight: 400;
      transition: all .3s ease;
      margin-left: auto;
   }

   h3.go-out:hover {
      opacity: 0.6;
   }

   .header .logo .icon {
      width: 60px;
      height: 60px;
      margin: auto;
      mask-size: cover; 
      background: whitesmoke;
      mask: url('../../../assets/images/icons/market.svg') no-repeat center;
   }

   .header .text {
      margin: 0 20px;
   }

   .header h2 { 
      position: relative;
      font-size: 2.8rem;
      font-weight: 350;
      font-family: 'Montserrat Regular', sans-serif;
      margin: 0;
      color: whitesmoke;
   }

   .header h4 {
      font-size: 1.45rem;
      font-weight: 550;
      font-family: 'Montserrat Light', sans-serif;
      letter-spacing: 0.6rem;
      margin: 0;
      text-transform: uppercase;
      color: #848e9c;
   }

   .products { 
      width: 600px;
      height: 410px;
      float: left;
      z-index: 1;
      background: linear-gradient(120deg, rgb(11 14 17 / 55%), transparent);
      display: grid; 
      padding: 10px;
      border-radius: 10px;
      grid-gap: 1.35rem; 
      grid-template-columns: repeat(4, 130px); 
      grid-template-rows: repeat(2, 130px);
      overflow: auto;
      position: relative;
   }

   .products .product {
      width: 130px; 
      height: 130px;
      background: rgb(255 255 255 / 5%);
      padding: 5px;
      backdrop-filter: brightness(1.1);
      border-radius: 5px;
      transition: all .3s ease;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
   }

   .product:hover {
      backdrop-filter: brightness(1.8);
      box-shadow: 0 1px 3px rgb(0 0 0 / 35%);
   }

   .product .item-icon { 
      width: 60px;
      margin: auto;
   }

   .product h4.product-name {
      color: #cdcdcd;
      margin: 2px 0;
      font-weight: 350;
   }

   button.add-to-cart {
      margin: 10px 0;
      background: linear-gradient(45deg, #f7cc59, #ffcc45);
      padding: 5px 0;
      border-radius: 2px;
      font-weight: 500;
      width: 80px;
   }

   .cart { 
      width: 250px;
      height: auto;
      margin: 0 20px;
      float: right;
      position: relative;
   }

   .cart .items {
      height: 320px;
      width: auto;
      overflow-y: auto;
      overflow-x: hidden;
   }
   
   .cart .items .item { 
      margin: 6px 0;
      padding: 15px;
      backdrop-filter: brightness(1.2);
      display: flex;
      border-radius: 3px;
      justify-content: space-between;
      transition: all .3s ease;
      align-items: center;
   }

   .cart .items .item:hover {
      box-shadow: 0 1px 3px rgb(0 0 0 / 35%);
      backdrop-filter: brightness(1.8);
   }

   .cart .item h4.name {
      font-family: 'Montserrat Light', sans-serif;
      color: whitesmoke;
      font-weight: 400;
      margin: 0;
   }

   h4.name small { 
      color: #848e9c;
      font-weight: 800;
   }

   h4.price {
      margin: 0;
      color: #848e9c;
      font-size: 0.9rem;
   }

   h4.price small {
      font-weight: 300;
      font-size: 0.9rem;
   }

   .bill {
      height: 80px;
      display: grid;
      padding: 15px;
      background: linear-gradient(-45deg, rgb(11 14 17 / 35%), transparent);
   }

   .bill button {
      text-align: center;
      background: linear-gradient(120deg, #6d4edb, #4c318e);
      transition: all .3s ease;
      text-transform: uppercase;
      letter-spacing: 0.2rem;
      transition: all .3s ease;
      color: white;
      font-size: 1.2rem;
   }

   .bill .price {
      text-align: center;
      color: white;
      margin: 5px 0;
      font-weight: 500;
      letter-spacing: 0.2rem;
      font-size: 1rem;
   }

   .bill .price small { 
      color: #848e9c;
      text-transform: uppercase;
   }

   .bill button:hover {
      filter: brightness(1.125);
   }

   .bill button:disabled {
      filter: grayscale(1.0);
   }

   button:disabled:hover {
      /* */
   }
</style>