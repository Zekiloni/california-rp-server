


<template>
   
   <div class="screen">
 
      <transition name="fade">
         <div class="inventory" v-if="Toggle">
            <div class="wrapper">
               <div class="basic">

                  <div class="pockets">
                     <div class="title"> 
                        <h2> 
                           <div class="icon pocket"> </div>
                           {{ Messages.PLAYER_ITEMS }} 
                        </h2>
                        <h4 class="weight"> {{ Weight(Items) }} <small> / {{ Player.Max_Inventory_Weight }} </small> </h4>
                     </div>
                     <div class="items">
                        <draggable :list="Items" class="items" group="items" @change="event => event.added ? Take(event.added.element) : false">
                           <div v-for="Item in Items" :key="Item.id" class="item" v-tooltip="Item_Info(Item)" v-on:dblclick="Use(Item)">
                              <img v-if="Item.Model" :src="require('../../assets/images/items/' + Item.Model + '.png')" class="icon" />
                              <h4 class="quantity"> {{ Item.Quantity }} </h4>
                           </div>
                        </draggable>
                     </div>
                  </div>

                  <div class="storage" >
                     <div class="title"> 
                        <h2> 
                           <div class="icon backpack"> </div>
                           {{ Messages.STORAGE_ITEMS }} 
                        </h2>
                        <h4 v-if="Storage" class="weight" > {{ Weight(Storage) }} <small> / 25 </small> </h4>
                        <h4 v-else class="weight"> <small> {{ Messages.NOT_AVAILABLE }} </small> </h4>
                     </div>
                     <draggable v-model="Storage" :list="Storage" class="items" group="items" >
                        <div v-for="Item in Storage" :key="Item.id" class="item" v-tooltip="Item_Info(Item)">
                           <img v-if="Item.Model" :src="require('../../assets/images/items/' + Item.Model + '.png')" class="icon" />
                           <h4 class="quantity"> {{ Item.Quantity }} </h4>
                        </div>
                     </draggable>
                  </div>

               </div>

               <div class="equipment">
                  <div class="clothing">
                     <div class="title"> 
                        <h2> 
                           <div class="icon backpack"> </div>
                           {{ Messages.STORAGE_ITEMS }} 
                        </h2>
                        <h4 v-if="Storage" class="weight" > {{ Weight(Storage) }} <small> / 25 </small> </h4>
                        <h4 v-else class="weight"> <small> {{ Messages.NOT_AVAILABLE }} </small> </h4>
                     </div>
                  </div>
               </div>

               <div class="environment" v-if="Environment && Environment_Type"> 
                  <h2 class="env-title"> {{ Which_Environment(Environment_Type) }} </h2>
                  <draggable class="items" :list="Environment" group="items" >
                     <div v-for="Item in Environment" :key="Item.id" class="item" >
                        <img v-if="Item.Model" :src="require('../../assets/images/items/' + Item.Model + '.png')" class="icon" />
                        <h4 class="quantity"> {{ Item.Quantity }} </h4>
                     </div>
                  </draggable>
               </div>

            </div>
           

         </div>
      </transition>
      

      <ul class="hands" v-if="Toggle == false">
         <li class="hand" :key=Left_Hand> 
            <img src="@/assets/images/items/donut.png" width="60px" />
         </li>
         <li class="hand" :key=Right_Hand> </li>
      </ul>

   </div>

</template>

<script>

   import draggable from 'vuedraggable';
   import { Messages, Item_Entity, Item_Type, ENVIRONMENT_TYPES } from '../../Globals';
   import ItemInfo from './Item.Info.vue';

   export default { 
      
      components: {
         draggable, ItemInfo
      },

      data () { 
         return {
            Toggle: true,

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
         Toggle: { 
            handler: async function (value, oldValue) {
               mp.invoke('focus', value);
               if (value) { 
      
                  // UNKOMENTIRATI POSLE
                  // const Info = await mp.events.callProc('CLIENT::INVENTORY:GET', Item_Entity.Player);
                  // this.Items = Info;
               }
            }
         }
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

      mounted () { 

      },


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
      
   }
   
</script>

<style scoped src="./Inventory.css"> </style>