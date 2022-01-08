


<template>
   <div class="wrapper">

      <div class="inventory">
         <div class="item-holder" v-for="Item in Items" :key="Item.id"> 
            <div class="item">
            {{ Item.id }}
               <h3 class="item-name"> {{ Item.Name }} </h3>
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
   </div>
</template>

<script>

   import { Messages, Item_Entity, Item_Type, ENVIRONMENT_TYPES } from '@/globals';
   import ItemInfo from './Item.Info.vue';

   export default { 
      
      components: {
         ItemInfo
      },

      data () { 
         return {
            Page: 0,

            Player: { 
               Max_Inventory_Weight: 5 
            },

            Hands: { Left: null, Right: null },

            Items: [
               { id: 0, Model: 'backpack', Quantity: 1, Name: 'Black Bag', Entity: Item_Entity.Player, Type: [Item_Type.Storage], Weight: 0.5, Extra: { Max_Weight: 25 } },
               { id: 1, Model: 'cheeseburger', Quantity: 1, Name: 'Cheeseburger', Entity: Item_Entity.Player, Type: [Item_Type.Food], Weight: 0.4 },
               { id: 2, Model: 'soda_can', Quantity: 1, Name: 'Soda Can', Entity: Item_Entity.Player, Type: [Item_Type.Food], Weight: 0.35454 },
               { id: 3, Model: 'energy_can', Quantity: 1, Name: 'Energy Can', Entity: Item_Entity.Player, Type: [Item_Type.Food], Weight: 0.35454 },
               { id: 5, Model: 'cheeseburger', Quantity: 1, Name: 'Cheeseburger', Entity: Item_Entity.Player, Type: [Item_Type.Food], Weight: 0.4 },
               { id: 6, Model: 'soda_can', Quantity: 1, Name: 'Soda Can', Entity: Item_Entity.Player, Type: [Item_Type.Food], Weight: 0.35454 },
               { id: 7, Model: 'beer', Quantity: 1, Name: 'Beer Bottle', Entity: Item_Entity.Player, Type: [Item_Type.Food], Weight: 0.45454 },

            ],

            Storage: [
               { id: 29, Model: 'coffe', Quantity: 1, Name: 'Coffe', Entity: Item_Entity.Storage, Owner: 0, Type: [Item_Type.Food], Weight: 0.4 },
               { id: 30, Model: 'donut', Quantity: 1, Name: 'Donut', Entity: Item_Entity.Storage, Owner: 0, Type: [Item_Type.Food], Weight: 0.35454 },
               { id: 31, Model: 'cola_can', Quantity: 1, Name: 'Cola Can', Entity: Item_Entity.Storage, Owner: 0, Type: [Item_Type.Food], Weight: 0.35454 },
               { id: 32, Model: 'donut', Quantity: 1, Name: 'Donut', Entity: Item_Entity.Storage, Owner: 0, Type: [Item_Type.Food], Weight: 0.35454 },
               { id: 33, Model: 'cola_can', Quantity: 1, Name: 'Cola Can', Entity: Item_Entity.Storage, Owner: 0, Type: [Item_Type.Food], Weight: 0.35454 }
            ],


            Environment_Type: null,
            Environment: null,


            Messages, Item_Entity
         }
      },

      watch: {
      },

      // computed: { 
      //    Player_Items: function () { 
      //       return this.Items.filter(Item => Item.Entity === Item_Entity.Player) ;
      //    },

      //    Storage_Items: function () {
      //       if (this.Storage && this.Storage.length > 0) { 
      //          if (this.Search == null) 
      //             return this.Storage;
      //          else 
      //             return this.Storage.sort().filter(Item => {
      //                return Item.Name.toLowerCase().includes(this.Search.toLowerCase())
      //             });
      //       }
      //    }
      // },

      methods: { 

         Weight: function (Items) {
            let Total = 0;
            Items.forEach(Item => { if (Item.id) Total += Item.Weight; });
            return Total.toFixed(2);
         },
 

         Item_Info: (Item) => { 
            return Item.Name + ', ' + Messages.ITEM_WEIGHT + Item.Weight.toFixed(2) + Messages.WEIGHT_KG;
         },
         
         Which_Environment: (i) => { 
            return ENVIRONMENT_TYPES[i];
         }, 

         Use: function (Item) {
            mp.trigger('CLIENT::ITEM:USE', Item);
         },

         Take: function (Item) {
            console.log(Item);
            switch (Item.Entity) { 
               case Item_Entity.Ground: mp.trigger('CLIENT::ITEM:PICKUP', Item.id); break;
               case Item_Entity.Vehicle: mp.trigger('CLIENT::ITEM:TRUNK:TAKE', Item.id); break;
               default:  {
                  console.log('def')
               }
            }
         }
      },

      mounted () {           
         mp.invoke('focus', true);

         mp.events.add('BROWSER::INVENTORY:ITEMS', items => { 
            console.log('uzo items')
            console.log(JSON.stringify(items));
         });
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
      background: radial-gradient(ellipse at center top, rgb(76 49 142 / 20%) 0%, rgb(32 20 63 / 25%) 50%, rgb(0 0 0 / 45%) 90%);
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
      background: rgb(23 24 39 / 20%);
      display: grid;
      grid-gap: 0.7rem;
      grid-template-columns: repeat(3, 150px);
      grid-template-rows: repeat(3, 150px);
   }

   .item-holder { 
      display: flex;
      justify-content: center;
      align-items: center;
   }

   .item { 
      width: 145px;
      position: relative;
      border-radius: 10px;
      height: 145px;
      box-shadow: 0px 1px 10px 0px rgb(0 0 0 / 35%);
      background: linear-gradient( 90deg, #2e2f40 0%, #252635 100%);
   }

   .item h3.item-name { 
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 7px 0 7px 10px;
      background: linear-gradient(90deg, #171827, transparent);
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