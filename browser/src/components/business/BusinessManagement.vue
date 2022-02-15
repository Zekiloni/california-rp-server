

<template>
   <div class="wrapper">
      <div class="business">
         <ul class="navigation">
            <li v-for="(page, i) in pages" :key="page" :class=" { active: currentPage == i }" @click="currentPage = i"> 
               <div class="icon" :class="page" v-tooltip.left="page"> </div>   
            </li>
         </ul>
         <div class="page-holder">
            <transition name="fade" mode="out-in"> 
               <div class="main" v-if="currentPage == 0" key=bMain >
                  <div class="business-name" :class="{ error: errors.name }">
                     <input 
                        type="text" 
                        v-model="settings.name" 
                        spellcheck="false" 
                        ref="bName"
                        @input="e => check('name', e.target.value)"
                     >
                  </div>

               <transition name="fade-with-bottom-slide"> 
                  <div class="changes" v-if="isSave()">
                     <h2> {{ Messages.THERE_ARE_CHANGES }} </h2>
                     <button class="save" @click="update()"> {{ Messages.SAVE }} </button>
                     <button class="restore" @click="restore()"> {{ Messages.CANCEL }} </button>
                  </div>
               </transition>

               </div>

               <BusinessProducts v-if="currentPage == 1" key=bProducts :products="business.products" />
               <BusinessWorkers v-if="currentPage == 2" key=bWorkers :workers="business.workers" />
               
            </transition>
         </div>
      </div>
   </div>
</template>

<script lang="ts">
   import Vue from 'vue'
   import Component from 'vue-class-component';
   import { Messages } from '@/globals';
   import { Business } from '@/models';
   import BusinessProducts from './business-components/BusinessProducts.vue';
   import BusinessWorkers from './business-components/BusinessWorkers.vue';

   @Component({
      components: {
         BusinessProducts, BusinessWorkers
      }
   })
   export default class BusinessManagement extends Vue {
      pages = ['main', 'products', 'workers', 'history', 'budget', 'orders'];
      currentPage = 0;

      settings: { [key: string]: any } = { 
         name: ''
      }

      errors = {
         name: false,
      }

      business: Business | null = {
         id: 0,
         name: 'Zeki',
         type: 0,
         locked: false,
         walk_in: true,
         price: 3000,
         budget: 300,
         sprite: 0,
         sprite_color: 2,
         owner: 0,
         ipl: '',
         products: [
            { id: 0, name: 'Coffe', quantity: 35, price: 3 },
            { id: 1, name: 'Lighter', quantity: 125, price: 0.75 },
            { id: 2, name: 'Cigarettes', quantity: 125, price: 2.75 }
         ],
         workers: [
            { id: 1, name: 'Deker gey', salary: 33, hired_By: 'Zachary Parker' },
            { id: 2, name: 'Adada gey', salary: 65, hired_By: 'Zachary Parker' }
         ],
         created_at: new Date(),
         updated_at: new Date()
      }

      Messages = Messages;

      check (property: string, value: string | number) {
         switch (property) {
            case 'name': { 
               if ((<string>value).length > 20 || (<string>value).length < 1) {
                  this.errors.name = true;
               } else { 
                  this.errors.name = false;
               }
               break;
            }
         }
      }


      isSave () {
         for (const i in this.settings!) {
            const field = this.settings[i];

            if (field != this.business![i]) {
               return true;
            } else { 
               return false;
            }
         }
      }

      async update () {
         if (this.errors.name) {
            return;
         }
         
         //@ts-ignore
         const updated: string = await mp.events.callProc('CLIENT::BUSINESS:UPDATE', this.settings.name);
         if (updated) {
            this.business = JSON.parse(updated);

            this.settings = {
               name: this.business?.name
            }
         }
      }

      restore () {
         for (const i in this.settings!) {
            if (this.settings[i] != this.business![i]) {
               this.settings[i] = this.business![i];
            }
         }
      }

      mounted () {
         if (window.mp) {
            mp.invoke('focus', true);

            mp.events.add('BROWSER::BUSINESS:MANAGEMENT', (business: string) => this.business = JSON.parse(business) );
         }

         this.settings = {
            name: this.business?.name!
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
      display: grid;
   }

   .business {
      width: 45%;
      height: 575px;
      border-radius: 10px;
      margin: auto;
      background: rgb(11 14 17 / 70%);
      display: flex;
      overflow: hidden;
   }

   ul.navigation {
      list-style: none;
      width: 130px;
      margin: 0;
      padding: 0;
      height: 100%;
      display: flex;
      justify-content: space-between;
      background: rgb(11 14 17 / 45%);
      flex-direction: column;
      align-items: center;
   }

   ul.navigation li { background: #181a20; width: 70px; height: 70px; margin: 10px 0; display: grid; transition: all .3s ease; border-radius: 10px; }
   ul.navigation li:hover { box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px; background: #2a303c; }
   ul.navigation li:hover .icon { background: whitesmoke; }
   ul.navigation li.active { filter: brightness(1.1); box-shadow: rgba(124, 91, 241, 0.15) 0px 10px 15px -3px, rgba(124, 91, 241, 0.15) 0px 4px 6px -2px; background: #7552df; }
   ul.navigation li.active .icon { background: whitesmoke; }
   ul.navigation li .icon { width: 35px; height: 35px; margin: auto; background: #cdcdcd; transition: all .3s ease; }

   .icon.main { mask: url('../../assets/images/icons/home-page.svg') no-repeat center; mask-size: cover; }
   .icon.products { mask: url('../../assets/images/icons/products.svg') no-repeat center; mask-size: cover; }
   .icon.workers { mask: url('../../assets/images/icons/workers.svg') no-repeat center; mask-size: cover; }
   .icon.history { mask: url('../../assets/images/icons/history.svg') no-repeat center; mask-size: cover; }
   .icon.budget { mask: url('../../assets/images/icons/cashier.svg') no-repeat center; mask-size: cover; }
   .icon.orders { mask: url('../../assets/images/icons/orders.svg') no-repeat center; mask-size: cover; }


   .page-holder {
      position: relative;
      height: 100%;
      width: 100%;
      margin-left: 20px;
      overflow: auto;
   }

   .business-name {
      position: relative;
      margin: 20px 0;
      transition: all .3s ease;
      width: 250px;
      border-bottom: 1.25px solid transparent;
   }

   .business-name.error { 
      border-color: tomato;
   }

   .business-name input {
      background: transparent;
      color: #cdcdcd;
      font-size: 1.65rem;
      width: 100%;
   }

   .business-name input:focus {
      color: white;
   }

   .business-name::after {
      position: absolute;
      content: '';
      right: -35px;
      top: 10px;
      width: 20px;
      height: 20px;
      mask: url('../../assets/images/icons/edit.svg') no-repeat center; 
      mask-size: cover;
      background: grey;
   }

   .changes {
      position: absolute;
      bottom: 15px;
      right: 25px;
      height: 50px;
      align-items: center;
      display: flex;
      justify-content: space-between;
   }
   
   .changes h2 { 
      color: #a6adb8;
      font-weight: 300;
      font-size: 0.9rem;
   }

   button { 
      padding: 15px 20px;
      font-size: 0.75rem;
      font-weight: 550;
      margin-left: 15px;
      border-radius: 5px;
      transition: all .3s ease;
   }

   button.save { 
      background: #ffcc45;
      color: #0b0e11;
   }

   button.restore { 
      background: #2a303c;
      color: #848e9c;
   }

   button:hover { 
      filter: brightness(1.2);
   }

</style>