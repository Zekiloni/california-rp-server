
<template>
   <div class="vehicle-trunk">
      <div class="holder">
         <div class="header">
            <div class="icon trunk"> </div>
            <h2> Gepek vozila <small> klikom na predmet uzimate isti u vas inventar </small> </h2>
         </div>

         <div class="box trunk">
            <div class="item" v-for="(item, i) in trunk" :key="item.id" @click="take(item, i)">
               {{ item.name }}
            </div>
         </div>
      </div>

      <div class="holder">
         <div class="header">
            <h2> Vasi predmeti </h2>
         </div>
         <div class="box">
            <div class="item" v-for="(item, i) in items" :key="item.id" @click="put(item, i)">
               {{ item.name }}
            </div>
         </div>
      </div>
   </div>
</template>

<script lang="ts">
   import Vue from 'vue';
   import Component from 'vue-class-component';

   import { InventoryItem } from '@/models';

   @Component
   export default class VehicleTrunk extends Vue {
      trunk: InventoryItem[] = [
         { id: 0, name: 'Stungun', owner: 0, status: 0, fingerprint: 1, equiped: false }
      ];
      items: InventoryItem[] = [];

      put (item: InventoryItem, index: number) {
         this.items.splice(index, 1);
         this.trunk.push(item);
         // mp.events.callProc('CLIENT::PUT_ITEM_IN_VEHICLE_TRUNK', item.id).then(puted => {
         //    if (puted) {
         //       const index = this.items.indexOf(item);
  
         //    }
         // })
      }

      take (item: InventoryItem, index: number) {
         this.trunk.splice(index, 1);
         this.items.push(item);
         // mp.events.callProc('CLIENT::TAKE_ITEM_FROM_VEHICLE_TRUNK', item.id).then(taken => {
         //    if (taken) {

         //    }
         // })
      }

      mounted () {
         mp.events.add('BROWSER::VEHICLE_TRUNK', (iTrunk: string) => {
            const [items, trunk] = JSON.parse(iTrunk);
            this.items = items;
            this.trunk = trunk;
         });
      }
   }

</script>

<style scoped>
   .vehicle-trunk {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(0deg, #1a191e, transparent);
   }

   .holder {
      margin: 0 20px;
      height: 500px;
      display: flex;
      flex-direction: column;
   }

   .holder .header { 
      padding: 20px;
      display: flex;
      align-items: center;
   }

   .holder .header h2 {
      margin: 0;
   }

   .holder {
      width: 550px;
   }

   .items {
      width: 350px;
   }

   .box {
      width: 100%;
      height: 450px;
      background: rgba(26, 25, 30, 0.6);
      border-radius: 15px;
   }

   .icon {
      width: 35px;
      height: 35px;
      background: #ffbb1c;
      margin-right: 25px;
   }
   
   .header h2 { 
      margin: 0;
      font-size: 1.5rem;
      color: #f1f1f1;
   }

   .header h2 small {
      margin-top: 5px;
      color: #8c8b91;
      display: block;
      font-weight: 450;
      font-size: 0.8rem;
   }

   .icon.trunk { mask: url('../../assets/images/icons/car-trunk.svg') no-repeat center; mask-size: cover; }
</style>