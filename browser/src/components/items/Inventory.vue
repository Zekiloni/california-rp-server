


<template>
   <div class="wrapper">

      <div class="equiped">
         <div class="item" v-for="item in equiped" :key="item.id" v-on:click="unequip(item.id)">  {{ item.id }} </div>
      </div>

      <div class="inventory" @mouseenter="hoverBox = false, hoveredItem = null" @click="hoverBox = false">
         <div class="item-holder" v-for="item in items" :key="item.id" @mouseenter=" e => hoverItem(item, e)" > 
            <div class="item">
               <h3 class="quantity"> {{ item.quantity }} </h3>
               <h3 class="item-name"> {{ item.name }} </h3>
               <!-- <img class="item-icon" :src="require('@/assets/images/items/' +  item.name.replace(/ /g, '_').toLowerCase() + '.png')" > -->
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
         <ItemInfo v-if="hoverBox && hoveredItem" :item="hoveredItem" :position="hoveredPosition" />
         <GiveItem v-if="selectedItem" :item="selectedItem" />
      </transition>
   </div>
</template>

<script>

   import { Messages, Item_Entity} from '@/globals';
   import ItemInfo from './item.info.vue';
   import GiveItem from './give.item.vue';

   export default { 
      
      components: {
         ItemInfo, GiveItem
      },

      data () { 
         return {
            hoverBox: false,
            hoveredItem: null,
            hoveredPosition: null,
            selectedItem: null,

            items: [],
            equiped: [],

            Messages, Item_Entity
         }
      },

      methods: { 

         hoverItem: function (item, e) {
            this.hoverBox = true;
            this.hoveredItem = item;

            if (e) this.hoveredPosition = { left: e.clientX, top: e.clientY };
         },

         unequip: function (id) {
            mp.events.call('CLIENT::ITEM:UNEQUIP');
         }

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

            mp.events.add('BROWSER::INVENTORY:ITEMS', (items, equiped) => { this.items = JSON.parse(items); this.equiped = JSON.parse(equiped) } );
            mp.events.add('BROWSER::INVENTORY:GIVE_ITEM', (item) => { 
               console.log(JSON.stringify(item));
            })
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
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background: radial-gradient(rgb(71 77 87 / 55%), rgb(11 14 17 / 85%));
   }

   .equiped { 
      height: 480px;
      width: 110px;
      padding: 15px;
      display: flex;
      margin: 0 15px;
      justify-content: flex-start;
      border-radius: 10px;
      background: rgb(11 14 17 / 20%);
      align-items: center;
      flex-direction: column;
   }

   .equiped .item { 
      width: 100px;
      margin: 20px 0;
      height: 100px;
      background: #181a20;
      border-radius: 10px;
   }

   .inventory { 
      padding: 15px;
      width: auto;
      border-radius: 10px;
      height: 480px;
      background: rgb(11 14 17 / 20%);
      display: grid;
      grid-gap: 0.7rem;
      margin: 0 15px;
      grid-template-columns: repeat(3, 150px);
      grid-template-rows: repeat(3, 150px);
      /* border: 1.5px solid rgb(128 128 128 / 45%); */
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
      background: #181a20;
      transition: all .3s ease;
      display: grid;
   }

   img.item-icon { 
      width: 80px;
      margin: auto;
   }

   .item:hover { 
      background: #2a303c;
      box-shadow: rgba(0, 0, 0, 0.15) 0px 10px 15px -3px, rgba(0, 0, 0, 0.15) 0px 4px 6px -2px;
   }

   .item:hover h3.quantity { background: #181a20; }
   
   .item h3.quantity { 
      position: absolute;
      width: 25px;
      height: 25px;
      transition: all .3s ease;
      background: #2a303c;
      color: #848e9c;
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
      background: #21252f;
      color: #a9b1bb;
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