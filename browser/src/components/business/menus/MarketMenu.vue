


<template>
   <div class="market"> 
      <div class="store"> 
         <div class="circle"> <div class="icon products-shelves"> </div> </div>
         <div class="header"> 
            <h2 class="biz-name"> {{ Business.Name }} </h2>
         </div>

         <ul class="items"> 
            <li class="item" v-for="(Item, i) in Business.Products" :key=Item v-on:click="Add(Item)" v-tooltip="i"> 
               <!-- <img :src="require('../../assets/images/items/' + Item.Model + '.png')" /> -->
               <div class="info"> 
                  <small> {{ i }} </small>
                  <h3 class="price"> {{ dollars(Business.Multiplier * Item.Multiplier) }} </h3>
               </div>
            </li>
         </ul>
      </div>

      <div class="cart"> 
         <div class="circle"> <div class="icon shopping-cart"> </div> </div>
         
         <div class="items"> 
            <table class="cart-items" v-if="Cart.length > 0">
               <tr>
                  <th> {{ Messages.ARTICLE }} </th>
                  <th> {{ Messages.QUANTITY }} </th>
                  <th> {{ Messages.PRICE }} </th>
               </tr>
               <tr v-for="Item in Cart" :key=Item>
                  <td> {{ Item.Name }} </td>
                  <td class="item-quantity" width="60"> 
                     {{ Item.Quantity }} 
                     <div class="actions"> 
                        <h2 v-on:click="Item.Quantity ++"> + </h2>
                        <h2 v-on:click="Decrease(Item)"> - </h2>
                     </div>
                  </td>
                  <td width="60"> {{ dollars(Business.Multiplier * Item.Multiplier * Item.Quantity ) }} </td>
               </tr>
            </table>
            <!-- <li v-for="Item in Cart" :key=Item > {{ Item }} </li> -->
         </div>
         <div class="bill">
            <h2> Total {{ dollars(Total) }} </h2>
            <button class=""> </button>
         </div>
      </div>
   </div>
</template>

<script>
   import { Messages } from '../../../globals';
   import Helpers from '../../../helpers';

   export default {
      data () { 
         return {
            Business: { 
               id: 0,
               Name: 'Pepsijev Market',
               Multiplier: 3.75,
               Products: {
                  // 'Medkit': { Model: 'prop_ld_health_pack', Multiplier: 10.25 },
                  // 'Toolbox': { Model: 'v_ind_cs_toolbox2', Multiplier: 12.75 },
                  // 'Jerrycan': { Model: 'w_am_jerrycan', Multiplier: 17.8 },
                  // 'Rope': { Model: 'prop_stag_do_rope', Multiplier: 5.25 },
                  // 'Cigarettes': { Model: 'prop_cigar_pack_01', Multiplier: 6.8 },
                  // 'Pack of Beers': { Model: 'v_ret_ml_beerpis1', Multiplier: 14.2 },
                  // 'Fishing Rod': { Model: 'prop_fishing_rod_01', Multiplier: 15.1 },
                  // 'Hamburger': { Model: 'prop_cs_burger_01', Multiplier: 6.05 },
                  // 'Chips': { Model: 'v_ret_ml_chips4', Multiplier: 2.69 },
                  'Donut': { Name: 'Donut', Model: 'donut', Multiplier: 2.18 },
                  //'Sandwich': { Model: 'prop_sandwich_01', Multiplier: 4.23 },
                  'Coffe': { Name: 'Coffe', Model: 'coffe', Multiplier: 1.52 },
                  'Water Bottle': { Name: 'Water Bottle', Model: 'water', Multiplier: 1.32 },
                  'Cola Can': { Name: 'Cola Can', Model: 'cola_can', Multiplier: 2 },
                  'Soda Can': { Name: 'Soda Can', Model: 'soda_can', Multiplier: 1.88 },
                  'Energy Drink': { Name: 'Energy Drink', Model: 'energy_can', Multiplier: 2.7 },
                  'Beer Bottle': { Name: 'Beer Bottle', Model: 'beer', Multiplier: 3.6 },
                  // 'Juice Cup': { Model: 'ng_proc_sodacup_01c', Multiplier: 3 },
                  // 'Whiskey Bottle': { Model: 'prop_whiskey_bottle', Multiplier: 20 },
                  // 'Tequila Bottle': { Model: 'prop_tequila_bottle', Multiplier: 18.9 },
                  // 'Vodka Bottle': { Model: 'prop_vodka_bottle', Multiplier: 17.2 }
               }
            },

            Cart: [],
            
            Messages, Helpers
         }
      },

      computed: {
         Total: function () { 
            let Result = 0;
            this.Cart.forEach((Item) => { Result += (Item.Multiplier * this.Business.Multiplier) * Item.Quantity; }); 
            return Result;
         }
      },

      methods: { 
         Add: function (Item) { 
            const Exist = this.Cart.find(eItem => eItem.Name == Item.Name);
            if (Exist) 
               Exist.Quantity ++;
            else
               this.Cart.push({ Name: Item.Name, Quantity: 1, Multiplier: Item.Multiplier });
         },

         Decrease: function (Item) {
            if (Item.Quantity == 1) this.Remove(Item);
            Item.Quantity --;
         },

         Remove: function (Item) { 
            const Index = this.Cart.indexOf(Item);
            this.Cart.splice(Index, 1);
         },

   

         Buy: function () { 
            mp.trigger('CLIENT::MARKET:BUY', )
         }
      }
   }
</script>

<style scoped>
   .market { 
      background: radial-gradient(circle, rgb(52 58 70 / 75%) 0%, rgb(25 29 36 / 85%) 90%);
      position: absolute; top: 0; left: 0; width: 100%; height: 100%;
      display: flex; justify-content: center; align-items: center;
   }

   .store { 
      width: 450px; height: 500px; border-radius: 15px;
      background: linear-gradient(-90deg, #21252f 0%, #13161c 100%);
      box-shadow: rgb(0 0 0 / 15%) 0px 1px 20px 0px; margin: 0 10px;
      display: flex; flex-direction: column; align-items: center;
   }

   .store ul.items { 
      list-style: none; padding: 10px; margin: 0;
      display: grid; background: #14171e; 
      border-radius: 5px; grid-gap: 0.7rem;
      grid-template-columns: repeat(5, 65px);
      grid-template-rows: repeat(5, 65px);
   }

   .store ul.items li.item { 
      border-radius: 5px; transition: all .3s ease; display: flex; justify-content: center; align-items: center;
      background: #1b1f27; position: relative; overflow: hidden;
   }
   
   .store ul.items li.item:active .info { background: whitesmoke; }
   .store ul.items li.item:active .info h3.price { color: black; }

   .store ul.items li.item .info { 
      position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: #2b3139; flex-direction: column;
      transform: translateY(70px); transition: all .25s ease; display: flex; justify-content: center; align-items: center;
   }

   li.item .info h3.price { color: whitesmoke; margin: 0; }
   li.item .info small { color: grey; }

   .store ul.items li.item img { width: 45px; height: 45px; }

   .store ul.items li.item:hover { background: #2b3139; }

   .store ul.items li.item:hover .info { transform: translateY(0); }

   .cart { 
      width: 300px; height: 500px; border-radius: 15px;
      background: linear-gradient(90deg, #21252f 0%, #13161c 100%);
      box-shadow: rgb(0 0 0 / 15%) 0px 1px 20px 0px; margin: 0 10px; 
      display: flex; flex-direction: column; align-items: center;
   }
   
   .circle { display: flex; justify-content: center; align-items: center; width: 70px; height: 70px; background: linear-gradient(141deg, rgba(104,69,234,1) 0%, rgba(66,54,128,1) 100%); border-radius: 100%; }
   .icon { width: 35px; height: 35px; mask-size: cover; background: whitesmoke; }
   .icon.shopping-cart { mask: url('../../../assets/images/icons/shopping-cart.svg') no-repeat center; }
   .icon.products-shelves { mask: url('../../../assets/images/icons/products.svg') no-repeat center; }

   .cart .circle, .store .circle { margin-top: -30px; }

   .cart .items { width: 270px; margin-top: 25px; } 
   .cart-items {
      border-collapse: collapse;
      width: 100%;
   }

   .cart-items td, .cart-items th {
      padding: 8px;
   }

   .cart-items tr { color: grey; }
   .cart-items tr:nth-child(even) { background-color: #2b3139; color: whitesmoke; }

   .cart-items tr:hover { background-color: #ddd; color: black; }

   td.item-quantity { position: relative; overflow: hidden; }
   td.item-quantity .actions { position: absolute; top: 0; left: 0; width: 100%; height: 100%; transform: translateY(50px); transition: all .3s ease; }
   td.item-quantity:hover .actions { transform: translateY(0); display: flex; }
   td.item-quantity .actions button { background: transparent; }

   .cart-items th {
      padding-top: 12px; padding-bottom: 12px; text-align: left;
      background-color: #171a21; color: white;
   }

   .header { width: 390px; height: 60px; display: flex; justify-content: space-around; align-items: center; }
   .header h2.biz-name { color: whitesmoke; margin: 5px 0; width: 100%; }

   
</style>