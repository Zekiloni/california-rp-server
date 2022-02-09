


<template>
   <div class="wrapper" v-on:click="deselect()">

      <div class="equiped">
         <div class="item" v-for="(item, i) in equiped" :key="item.id" > 
            {{ i + 1 }}
            {{ item.name }} 
         </div>
      </div>

      <div class="inventory" v-on:click="deselect()">

         <div class="item-holder" v-for="item in available" :key="item.id" @contextmenu="select($event, item)" > 
            <div class="item">
               <h3 class="quantity"> {{ item.quantity }} </h3>
               <h3 class="item-name"> {{ item.name }} </h3>
               <!-- <img class="item-icon" :src="require('@/assets/images/items/' +  item.name.replace(/ /g, '_').toLowerCase() + '.png')" >  -->
            </div>
         </div>
      </div>

      <transition name="fade">
         <ItemInfo v-if="selected && position" :item="selected" :position="position" key=itemInfo />
         <!-- <GiveItem v-if="selectedItem" :item="selectedItem" key=giveItem /> -->
      </transition>
   </div>
</template>

<script lang="ts">

   import Vue from 'vue';
   import Component from 'vue-class-component';
   import { Messages } from '@/globals';
   import { InventoryItem } from '@/interfaces';
   
   import ItemInfo from '@/components/items/ItemInfo.vue';
   import GiveItem from '@/components/items/GiveItem.vue';

   
   @Component({
      components: {
         ItemInfo,
         GiveItem
      }
   })
   export default class Inventory extends Vue {

      position: { x: MouseEvent['clientX'], y: MouseEvent['clientY'] } | null = null;

      Messages = Messages;

      selected: InventoryItem | null = null;

      items: InventoryItem[] = [
         { id: 0, name: 'Zeki', entity: 1, owner: 1, equiped: false, status: 0, fingerprint: 0 }
      ];

      get available () {
         return this.items.filter(item => item.equiped != true);
      }

      get equiped () {
         return this.items.filter(item => item.equiped == true);
      }

      select (event: MouseEvent, item: InventoryItem) {
         event.preventDefault();
         this.selected = item;
   
         this.position = {
            x: event.clientX,
            y: event.clientY
         }
      }

      deselect () {
         this.selected = null;
         this.position = null;
      }

      mounted () {   
         //@ts-ignore     
         if (window.mp) { 
            //@ts-ignore     
            mp.invoke('focus', true);
            //@ts-ignore     

            mp.events.add('BROWSER::INVENTORY:ITEMS', (items: string) => this.items = JSON.parse(items) );
            //@ts-ignore     
            mp.events.add('BROWSER::INVENTORY:GIVE_ITEM', (item) => { 
               console.log(JSON.stringify(item));
            })
         }   
      }

      beforeDestroy () {
         //@ts-ignore
         mp.invoke('focus', false)
      };
   }



   // export default { 
      
   //    components: {
   //       ItemInfo, GiveItem
   //    },

   //    data () { 
   //       return {
   //          hoverBox: false,
   //          hoveredItem: null,
   //          hoveredPosition: null,
   //          selectedItem: null,

   //          items: [],
   //          equiped: [],

   //          Messages, Item_Entity
   //       }
   //    },

   //    methods: { 

   //       // Weight: function (Items) {
   //       //    let Total = 0;
   //       //    Items.forEach(Item => { if (Item.id) Total += Item.Weight; });
   //       //    return Total.toFixed(2);
   //       // },
 

   //       // Item_Info: (Item) => { 
   //       //    return Item.Name + ', ' + Messages.ITEM_WEIGHT + Item.Weight.toFixed(2) + Messages.WEIGHT_KG;
   //       // },
         
   //       // Which_Environment: (i) => { 
   //       //    return ENVIRONMENT_TYPES[i];
   //       // }, 

   //       // Use: function (Item) {
   //       //    mp.trigger('CLIENT::ITEM:USE', Item);
   //       // },

   //       // Take: function (Item) {
   //       //    console.log(Item);
   //       //    switch (Item.Entity) { 
   //       //       case Item_Entity.Ground: mp.trigger('CLIENT::ITEM:PICKUP', Item.id); break;
   //       //       case Item_Entity.Vehicle: mp.trigger('CLIENT::ITEM:TRUNK:TAKE', Item.id); break;
   //       //       default:  {
   //       //          console.log('def')
   //       //       }
   //       //    }
   //       // }
   //    },



   // }
   
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