
<template>
   <div class="wrapper" v-on:click="deselect()">

      <div class="holder">
         <div class="inventory" v-on:click="deselect()">
            <div class="item-holder" v-for="(item, i) in available" :key="item.id" @contextmenu="select($event, item)" > 
               <div class="item">
                  <h3 class="quantity"> {{ i + 1 }} </h3>
                  <h3 class="item-name"> {{ item.name }} </h3>
                  <img class="item-icon" :src="require('@/assets/images/items/' +  item.name.toLowerCase().replace(' ', '_') + '.png')" > 
               </div>
            </div>
         </div>

         <div class="attachments">
            <div class="clothing" v-for="name in attachments" :key="name">
               <div class="info" v-if="clothing(name)"  @click="call('CLIENT::ITEM:UNEQUIP', JSON.stringify(clothing(name)))">
                  <img class="item-icon" :src="require('@/assets/images/items/' +  name.toLowerCase().replace(' ', '_') + '.png')" > 
               </div>
               <div v-else class="no-attachment"> 
                  <h2> {{ name }} </h2>
               </div>
            </div>
         </div>

         <div class="equiped">
            <div class="item" v-for="(item, i) in equiped" :key="item.id" > 
               <h2 class="slot"> {{ i + 1 }} </h2>
               <img class="item-icon" :src="require('@/assets/images/items/' +  item.name.toLowerCase().replace(' ', '_') + '.png')" > 
            </div>
         </div>

         <transition name="fade">
            <ItemInfo v-if="selected && position" :item="selected" :position="position" key=itemInfo />
            <!-- <GiveItem v-if="selectedItem" :item="selectedItem" key=giveItem /> -->
         </transition>
      </div>
   </div>
</template>

<script lang="ts">

   import Vue from 'vue';
   import Component from 'vue-class-component';
   import { Messages } from '@/globals';
   import { InventoryItem } from '@/models';
   
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
      attachments: string[] = [
         'Mask',
         'Pants',
         'Bag',
         'Shoes',
         'Accessories',
         'Undershirt',
         'Body Armour',
         'Decal',
         'Top',
      ];

      selected: InventoryItem | null = null;

      items: InventoryItem[] = [
      ];
      
      clothing (name: string) {
         return this.items.find(item => item.name == name && item.equiped == true);
      }

      get available () {
         return this.items.filter(item => item.equiped == false);
      }

      get equiped () {
         return this.items.filter(item => item.equiped == true && !this.attachments.includes(item.name));
      }

      call (event: string, item: InventoryItem) {
         mp.events.call(event, item);
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
         if (window.mp) { 
            mp.events.add('BROWSER::INVENTORY:ITEMS', (items: string) => this.items = JSON.parse(items) );
            mp.events.add('BROWSER::INVENTORY:GIVE_ITEM', (item: string) => { 
               console.log(JSON.stringify(item));
            })
         }   
      }
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

   .holder { 
      width: 750px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
   }

   .attachments { 
      width: auto;
      height: 470px;
      display: flex;
      justify-content: flex-start;   
      align-items: flex-start;  
      flex-direction: column;
      flex-wrap: wrap;
      padding: 10px;
   }

   .attachments .clothing { margin: 10px; }

   .attachments .clothing .info { 
      width: 90px;
      height: 90px; 
      background: rgb(0 0 0 / 25%);
      border-radius: 10px;
      transition: all .3s ease;
      display: grid;
   }

   .attachments .clothing .info img { 
      margin: auto;
      width: 50px;
   }

   .attachments .clothing .info:hover {
      opacity: 0.7;
      box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
   }

   .attachments .clothing .no-attachment {
      width: 90px;
      height: 90px;
      display: flex;
      border-radius: 10px;
      display: grid;
      background: rgb(24 26 32 / 35%);
   }
   .no-attachment h2 { margin: auto; width: 80px; font-size: 0.55rem; text-transform: uppercase; color: #848e9c; text-align: center;}

   .equiped { 
      height: 80px;
      width: 520px;
      display: flex;
      padding: 10px 0;
      margin: 15px 0;
      justify-content: flex-start;
      border-radius: 5px;
      background: radial-gradient(rgb(33 37 47 / 25%), rgb(11 14 17 / 45%));
      border: 1.25px solid rgb(120 120 120 / 10%);      
      box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 8px 0px;
      align-items: center;
   }

   .equiped .item { 
      width: 80px;
      position: relative;
      margin: 0 10px;
      height: 80px;
      overflow:unset;
      background: #181a20;
      border-radius: 10px;
   }
   
   .inventory { 
      padding: 15px;
      width: 470px;
      height: 470px;
      border-radius: 5px;
      background: radial-gradient(rgb(33 37 47 / 45%), rgb(11 14 17 / 25%));
      border: 1.25px solid rgb(120 120 120 / 10%);
      display: grid;
      grid-gap: 0.45rem;
      overflow: auto;
      margin: 0 15px;
      grid-template-columns: repeat(4, 110px);
      grid-template-rows: repeat(4, 110px);
   }

   .item h2.slot {
      position: absolute;
      right: 10px;
      width: 20px;
      padding: 1px 0;
      background: whitesmoke;
      bottom: -5px;
      color: #0b0e11;
      border-radius: 5px;
      text-align: center;
      font-size: 1.0rem;
      margin: 0;
   }

   .item-holder { 
      display: flex;
      justify-content: center;
      align-items: center;
   }

   .item { 
      width: 105px;
      position: relative;
      overflow: hidden;
      border-radius: 10px;
      height: 105px;
      background: #181a20;
      transition: all .3s ease;
      display: grid;
   }

   img.item-icon { 
      width: 60px;
      margin: auto;
   }

   .item:hover { 
      background: #2a303c;
      box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
   }

   .item:hover h3.quantity { background: #181a20; }
   
   .item h3.quantity { 
      position: absolute;
      width: 20px;
      height: 20px;
      transition: all .3s ease;
      background: #2a303c;
      color: #848e9c;
      display: flex;
      justify-content: center;
      align-items: center;
      top: 7px;
      right: 8px;
      margin: 0;
      border-radius: 100%;
   }

   .item h3.item-name { 
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 5px 0 5px 10px;
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