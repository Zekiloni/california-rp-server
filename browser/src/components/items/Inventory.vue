


<template>
   <div class="wrapper">

      <div class="inventory" @mouseenter="hoverBox = false, hoveredItem = null" @click="hoverBox = false">
         <div class="item-holder" v-for="item in availableItems" :key="item.id" @mouseenter=" e => hoverItem(item, e)" > 
            <div class="item">
               <h3 class="quantity"> {{ item.quantity }} </h3>
               <h3 class="item-name"> {{ item.name }} </h3>
            </div>
         </div>
         <!-- <div class="items">
            <div class="item-holder" v-for="i in Max" :key="i"> 
               <div class="item"> 
                  <h2> {{ Items[i] ? Items[i].Name : '' }} </h2>
                  <img v-if="Items[i]" :src="require('../../assets/images/items/' + Items[i].Model + '.png') ">
               </div>
            </div>
         </div>

         <div class="equipment">

         </div>

         <div class="ground">

         </div>

         <div class="hands">

         </div> -->
      </div>

      
      <transition name="fade">
         <ItemInfo 
            v-if="hoverBox && hoveredItem" 
            :item="hoveredItem" 
            :position="hoveredPosition" 
         />
      </transition>
   </div>
</template>

<script>

   import { Messages, Item_Entity, Item_Type, ENVIRONMENT_TYPES } from '@/globals';
   import ItemInfo from './item.info.vue';

   export default { 
      
      components: {
         ItemInfo
      },

      data () { 
         return {
            hoverBox: false,
            hoveredItem: null,
            hoveredPosition: null,

            Page: 0,

            Player: { 
               Max_Inventory_Weight: 5 
            },

            items: [
               // { id: 0, model: 'backpack', quantity: 1, name: 'Coffe', entity: Item_Entity.Player, Type: [Item_Type.Storage], Weight: 0.5, Extra: { Max_Weight: 25 } },
               // { id: 1, model: 'cheeseburger', quantity: 1, name: 'Taco', entity: Item_Entity.Player, Type: [Item_Type.Food], Weight: 0.4 },
               // { id: 2, model: 'soda_can', quantity: 1, name: 'Soda Can', entity: Item_Entity.Player, Type: [Item_Type.Food], Weight: 0.35454 },
               // { id: 3, model: 'energy_can', quantity: 1, name: 'Energy Can', entity: Item_Entity.Player, Type: [Item_Type.Food], Weight: 0.35454 },
               // { id: 5, model: 'cheeseburger', quantity: 1, name: 'Cheeseburger', entity: Item_Entity.Player, Type: [Item_Type.Food], Weight: 0.4 },
               // { id: 6, model: 'soda_can', quantity: 1, name: 'Soda Can', entity: Item_Entity.Player, Type: [Item_Type.Food], Weight: 0.35454 },
               // { id: 7, model: 'beer', quantity: 1, name: 'Beer Bottle', entity: Item_Entity.Player, Type: [Item_Type.Food], Weight: 0.45454 },

            ],


            Environment_Type: null,
            Environment: null,


            Messages, Item_Entity
         }
      },

      computed: { 
         availableItems: function () { 
            return this.items.filter(item => item.status != 1);
         }
      },

      methods: { 

         hoverItem: function (item, e) {
            this.hoverBox = true;
            this.hoveredItem = item;
                        
            if (e) this.hoveredPosition = { left: e.clientX, top: e.clientY };
         },

         // Weight: function (Items) {
         //    let Total = 0;
         //    Items.forEach(Item => { if (Item.id) Total += Item.Weight; });
         //    return Total.toFixed(2);
         // },
 

         // Item_Info: (Item) => { 
         //    return Item.Name + ', ' + Messages.ITEM_WEIGHT + Item.Weight.toFixed(2) + Messages.WEIGHT_KG;
         // },
         
         // Which_Environment: (i) => { 
         //    return ENVIRONMENT_TYPES[i];
         // }, 

         // Use: function (Item) {
         //    mp.trigger('CLIENT::ITEM:USE', Item);
         // },

         // Take: function (Item) {
         //    console.log(Item);
         //    switch (Item.Entity) { 
         //       case Item_Entity.Ground: mp.trigger('CLIENT::ITEM:PICKUP', Item.id); break;
         //       case Item_Entity.Vehicle: mp.trigger('CLIENT::ITEM:TRUNK:TAKE', Item.id); break;
         //       default:  {
         //          console.log('def')
         //       }
         //    }
         // }
      },

      mounted () {        
         if (window.mp) { 
            mp.invoke('focus', true);

            mp.events.add('BROWSER::INVENTORY:ITEMS', items => { 
               console.log(items)
               this.items = JSON.parse(items);
            });
         }   
      },

      beforeDestroy () {
         mp.invoke('focus', false)
      },
   }
   
</script>

<style scoped>

   .wrapper { 
      width: 100%;
      height: 100%;
      background: radial-gradient(ellipse at center top, rgb(76 49 142 / 15%) 0%, rgb(32 20 63 / 20%) 50%, rgb(0 0 0 / 45%) 90%);
      position: absolute;
      top: 0;
      left: 0;
      backdrop-filter: blur(10px);
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
   }

   .inventory { 
      padding: 15px;
      width: auto;
      border-radius: 10px;
      height: auto;
      background: linear-gradient(0deg, #171827, transparent);
      display: grid;
      grid-gap: 0.7rem;
      grid-template-columns: repeat(3, 150px);
      grid-template-rows: repeat(3, 150px);
      box-shadow: 0px 1px 10px 0px rgb(0 0 0 / 35%);
   }

   .item-holder { 
      display: flex;
      justify-content: center;
      align-items: center;
   }

   .item { 
      width: 145px;
      position: relative;
      overflow: hidden;
      border-radius: 10px;
      height: 145px;
      box-shadow: 0px 1px 10px 0px rgb(0 0 0 / 35%);
      background: linear-gradient( 90deg, #2e2f40 0%, #252635 100%);
   }
   
   .item h3.quantity { 
      position: absolute;
      width: 25px;
      height: 25px;
      background: #171827;
      color: #a4a0c1;
      display: flex;
      justify-content: center;
      align-items: center;
      top: 10px;
      right: 10px;
      margin: 0;
      border-radius: 100%;
   }

   .item h3.item-name { 
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 7px 0 7px 10px;
      background: rgb(23, 24, 39);
      color: #cdcdcd;
      margin: 0;
      font-size: 0.65rem;
      font-weight: 550;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
   }




   @media (max-width: 1230px) {
      .index_row {
         width: 85%;
         padding: 0 30px;
      }
   }

</style>