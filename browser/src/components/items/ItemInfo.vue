

<template>

   <div class="item-info" 
      v-if="position.x && position.y && item" 
      v-bind:style="{ left: position.x + 'px', top: position.y + 'px' }"
   >

      <h2 class="name"> {{ info.name }} </h2>
      <p class="description" v-html="info.description"> </p>
      
      <ul class="additional">
         <li> <b> {{ Messages.WEIGHT_OF_ITEM }} </b> {{ info.weight }}kg </li>
         <li v-if="info.thirst"> <b> {{ Messages.THIRST_UP }} </b> {{ info.thirst }}% </li>
         <li v-if="info.alcohol"> <b> {{ Messages.ALCOHOL_PERCENTAGE }} </b> {{ info.alcohol }}% </li>
      </ul>

      <ul class="actions" v-if="actions.length > 0"> 
         <li v-for="action in actions" :key="action.name" v-tooltip.bottom="action.name" @click="call(action.event)"> 
            <div class="icon" :class="action.icon"> </div>
         </li>
      </ul>
      	
   </div>

</template>

<script lang="ts">
   import Vue from 'vue';
   import Component from 'vue-class-component';
   import { Messages } from '@/globals';
   import { itemAction, rItem } from '@/models';

   const ItemInfoProps = Vue.extend({
      props: {
         item: Object,
         position: Object
      }
   });

   @Component
   export default class ItemInfo extends ItemInfoProps {

      info: rItem | null = null;
      actions: itemAction[] = [];

      Messages = Messages;

      call (event: string) {
         mp.events.call(event, JSON.stringify(this.item), JSON.stringify(this.info), this.item.quantity);
         this.item = null;
         this.position = null;
      }

      async mounted () {
         if (window.mp) { 
            mp.events.callProc('CLIENT::ITEM:INFO', this.item.name).then((item: string) => {
               const info: { info: rItem, actions: itemAction[] } = JSON.parse(item);
               
               if (item) {
                  this.info = info.info;
                  this.actions = info.actions;
               }
            })
         }
      }
   }

</script>

<style scoped>

   .item-info { 
      position: absolute;
      width: 300px;
      min-height: 120px;
      height: auto;
      border-radius: 10px;
      background: linear-gradient(338.93deg, rgba(255, 255, 255, 0.056) -7.23%, rgba(255, 255, 255, 0.056) -7.22%, rgba(255, 255, 255, 0.028) 5.45%, rgba(255, 255, 255, 0.004) 18.4%, rgba(255, 255, 255, 0) 46.85%), rgba(196, 196, 196, 0.04);
      backdrop-filter: blur(15px);
      padding-bottom: 60px;
   }

   h2.name { 
      margin: 10px;
      padding: 10px;
      font-weight: 700;
      border-radius: 10px;
      font-size: 1rem;
      color: #E4E4E2;
      background: #302F36;
   }

   p.description { 
      font-weight: 300;
      color: #cdcdcd;
      line-height: 1.2rem;
      letter-spacing: 0.025rem;
      font-size: 0.75rem;
      padding: 15px;
      margin: 0;
   }

   ul.actions { 
      position: absolute;
      bottom: 0;
      padding: 5px 0;
      width: 100%;
      margin: 0;
      min-height: 10px;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      list-style: none;
   }

   ul.actions li { 
      padding: 10px;
      background: #302F36;
      border-radius: 5px;
   }

   ul.actions li * {
      transition: all .3s ease;
   }

   ul.actions li:hover .icon { 
      background: #ffb901;
   }

   ul.actions li .icon { 
      width: 25px;
      height: 25px;
      background-color: #9b9b9b;
   }

   ul.additional {
      list-style: none;
      color: #cdcdcd;
      margin: 0;
      padding: 10px;
   }

   ul.additional li {
      margin: 2px 0;
   }

   ul.additional li b { 
      color: #848e9c;
      font-weight: 300;
      margin-right: 5px;
   }

   ul.actions li .icon.use { mask: url('../../assets/images/icons/use-icon.svg') no-repeat center; mask-size: cover; }
   ul.actions li .icon.drop { mask: url('../../assets/images/icons/arrow-down.svg') no-repeat center; mask-size: cover; }
   ul.actions li .icon.give { mask: url('../../assets/images/icons/give-icon.svg') no-repeat center; mask-size: cover; }
   ul.actions li .icon.split { mask: url('../../assets/images/icons/split-icon.svg') no-repeat center; mask-size: cover; }

</style>