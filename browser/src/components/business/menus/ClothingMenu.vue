

<template>
   <div class="wrapper" v-if="busines">
      <div class="clothing-menu">
         <div class="header">
            <h4> {{ Messages.CLOTHING_SHOP }} </h4>
            <h2> {{ busines.name }} </h2>
         </div>

         <ul class="menu">
            <li v-for="(product, i) in busines.products" :key="product.id" @click="active = i" :class="{ active: i == active }"> 
               <div class="icon" :class="product.name.toLowerCase().replace(' ', '_')"> </div>
            </li>
         </ul>

      <transition name="fade" mode="out-in"> 
         <div class="editing" v-if="active != -1" key=editing >
            <h3> {{ busines.products[active].name }} </h3>
            <vue-slider 
               v-model=changes[busines.products[active].name] 
               :interval=1
               :railStyraille=slider.rail 
               :processStyle=slider.process
               :dotStyle=slider.dot
               :dotOptions=slider.dotOptions
               v-on:change="value => change(busines.products[active].name, value)"
            />
         </div>
         <div v-else class="select" key=select>
            <h3> {{ Messages.SELECT_CATEGORY }} </h3>
         </div>
      </transition>

      <div class="shop">
         <h2> {{ dollars(bill) }} </h2>
         <button @click="buy()"> buy </button>
         <button @click="close()" class="go-out"> {{ Messages.GO_OUT_FROM_MARKET }} </button>
      </div>

      </div>
   </div>
</template>

<script lang="ts">
   import Vue from 'vue'
   import Component from 'vue-class-component';
   import { Messages } from '@/globals';
   import { Business } from '@/models';
   import VueSlider from 'vue-slider-component';

   @Component({
      components: { VueSlider }
   })
   export default class ClothingMenu extends Vue {

      active: number = -1;
      busines: Business | null = null;
      
      changes: { [key: string]: number } = {};

      Messages = Messages;

      get bill () {
         let bill = 0;

         this.busines?.products.forEach(product => {
           if (this.changes[product.name] > 0) {
              bill += product.price;
           }
         })

         return bill;
      }

      change (name: string, drawable: number) {
         mp.events.call('CLIENT::CLOTHNG:PREVIEW', name, drawable, 0);
      }

      close () {
         if (window.mp) {
            mp.events.call('CLIENT::CLOTHING:MENU');
            console.log('aa')
         }
      }

      mounted () {
         mp.events.add('BROWSER::MARKET:MENU', (busines: string) => this.busines = JSON.parse(busines) );

         this.busines?.products.forEach(product => {
            this.changes[product.name] = 0;
         })

         window.addEventListener('wheel', (e) => { 
            mp.trigger('CLIENT::PLAYER_CAMERA:ZOOM', e.deltaY);
         });
      }

      slider = { 
         rail: { backgroundColor: '#0b0e11', borderRadius: '15px', boxShadow: '0 0 1px black' },
         process: { background: '#ffcc45', borderRadius: '25px' },
         dot: { backgroundColor: '#ffb901', borderColor: '#ffcc45' },
         dotOptions: { 
            focusStyle: { 
               background: '#fede29',
               boxShadow: '0 0 0 5px rgb(255 204 69 / 20%)'
            }
         }
      }
      
   }
</script>

<style scoped>
   .wrapper {
      width: 100%;
      height: 100%;
      top: 0;
      z-index: 150;
      left: 0;
      position: absolute;
   }

   .clothing-menu {
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      background: linear-gradient(90deg, rgb(71 77 87 / 0%) 0%, rgb(71 77 87 / 15%) 50%, rgb(11 14 17 / 85%) 100%);
      width: 500px;
      padding: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
   }

   .header { 
      width: auto;
      text-align: center;
   }

  .header h2 { 
      position: relative;
      font-size: 2.25rem;
      font-weight: 350;
      font-family: 'Montserrat Regular', sans-serif;
      margin: 0;
      color: whitesmoke;
   }

   .header h4 {
      font-size: 1rem;
      font-weight: 550;
      font-family: 'Montserrat Light', sans-serif;
      letter-spacing: 0.6rem;
      margin: 0;
      text-transform: uppercase;
      color: #848e9c;
   }

   .select h3 { 
      color: #848e9c;
      font-weight: 300;
   }

   .editing {
      width: 300px;
   }

   ul.menu {
      list-style: none;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: auto;
      width: 70%;
   }

   ul.menu li {
      margin: 5px;
      width: 60px;
      height: 60px;
      border-radius: 2px;
      background: rgb(255 255 255 / 10%);
      padding: 5px;
      backdrop-filter: brightness(1.1);
      transition: all .3s ease;
      display: grid;
      border: 1px solid transparent;
   }


   ul.menu li:hover {
      border-color: rgb(205 205 205 / 45%);
      backdrop-filter: brightness(1.8);
      box-shadow: 0 1px 3px rgb(0 0 0 / 35%);
   }

   ul.menu li.active {
      border-color: rgb(205 205 205 / 45%);
   }

   ul.menu li.active .icon {
      background: white;
   }

   ul.menu li .icon {
      width: 50px;
      height: 50px;
      margin: auto;
      background: #b8b8b8;
   }

   .shop {
      margin: 15px 0;
      width: 250px; 
   }

   .shop button { 
      padding: 10px 10px;
      display: block;
      width: 100%;
      margin: 15px auto;
      text-align: center;
      background: linear-gradient(120deg, #6d4edb, #4c318e);
      transition: all .3s ease;
      text-transform: uppercase;
      border-radius: 2px;
      letter-spacing: 0.2rem;
      transition: all .3s ease;
      color: white;
      font-size: 1.2rem;
   }

   .shop button.go-out {
      color: #a3a3a3;
      background: rgb(15 15 15 / 45%);
      font-size: 0.7rem;
   }

   button.go-out:hover { 
      filter: brightness(1.2);
   }

   .icon.mask { mask-size: cover; mask: url('../../../assets/images/icons/watch.svg') no-repeat center; }
   .icon.pants { mask-size: cover; mask: url('../../../assets/images/icons/watch.svg') no-repeat center; }
   .icon.shoes { mask-size: cover; mask: url('../../../assets/images/icons/shoes.svg') no-repeat center; }
   .icon.accessories { mask-size: cover; mask: url('../../../assets/images/icons/watch.svg') no-repeat center; }
   .icon.undershirt { mask-size: cover; mask: url('../../../assets/images/icons/undershirt.svg') no-repeat center; }
   .icon.body_armour { mask-size: cover; mask: url('../../../assets/images/icons/body_armour.svg') no-repeat center; }
   .icon.decal { mask-size: cover; mask: url('../../../assets/images/icons/watch.svg') no-repeat center; }
   .icon.top { mask-size: cover; mask: url('../../../assets/images/icons/top.svg') no-repeat center; }
   .icon.hat { mask-size: cover; mask: url('../../../assets/images/icons/watch.svg') no-repeat center; }
   .icon.glasses { mask-size: cover; mask: url('../../../assets/images/icons/glasses.svg') no-repeat center; }
   .icon.ears { mask-size: cover; mask: url('../../../assets/images/icons/earrings.svg') no-repeat center; }
   .icon.watch { mask-size: cover; mask: url('../../../assets/images/icons/watch.svg') no-repeat center; }
   .icon.bracelet { mask-size: cover; mask: url('../../../assets/images/icons/bracelet.svg') no-repeat center; }
   .icon.bag { mask-size: cover; mask: url('../../../assets/images/icons/backpack.svg') no-repeat center; }

</style>