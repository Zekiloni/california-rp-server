

<template>
   <div class="objects-menu">
      <ul class="categories">
         <li v-for="(cat, i) in menu" :key="cat.name" :class="{ active: category == i }" @click="selectCategory(i)"> 
            {{ cat.name }}
         </li>
      </ul>
      
      <ul class="objects" v-if="menu.length > 0">
         <li v-for="(object, i) in menu[category].objects" :key="object" :class="{ active: item == i }" @click="selectItem(i)">
            {{ object }}
         </li>
      </ul>

      <ul class="owned" v-if="menu.length > 0">
         <li v-for="(object, i) in objects" :key="object.gameObject.id" @click="select(object.gameObject.id)">
            {{ i }}
         </li>
      </ul>

   </div>
</template>


<script lang="ts">
   import Vue from 'vue';
   import Component from 'vue-class-component';

   @Component
   export default class ObjectsMenu extends Vue {
      category: number = 0;

      item: number = 0;

      menu: object[] = [];

      object: number | null = null;

      selectCategory (i: number) {
         this.category = i;
         mp.events.call('CLIENT::BUILDER:MODEL_PREVIEW', this.category, this.item);
      }

      selectItem (i: number) {
         this.item = i;
         mp.events.call('CLIENT::BUILDER:MODEL_PREVIEW', this.category, this.item);
      }

      select (id: number) {
         mp.events.call('CLIENT::BUILDER:OBJECT_SELECT_BY_ID', id);
      }

      mounted () {
         if (window.mp) {
            mp.events.add('BROWSER::BUILDER:OBJECTS_MENU', (objects: string) => this.menu = JSON.parse(objects));
         }
      }
   }

</script>

<style scoped>
   .objects-menu { 
      position: absolute;
      left: 30px;
      top: 300px;
      height: auto;
      height: auto;
      display: flex;
      justify-content: center;
   }

   ul.categories { 
      width: 250px;
      height: 250px;
      overflow: auto;
      list-style: none;
      padding: 10px;
      background: linear-gradient(120deg, rgb(11 14 17 / 45%), transparent);
   }

   ul.categories li {
      margin: 5px 0;
      text-align: center;
      padding: 10px 25px;
      color: #cdcdcd;
      background: rgb(255 255 255 / 10%);
      backdrop-filter: brightness(1.1);
      border: 1px solid transparent;
      transition: all .3s ease;
      border-radius: 5px;
   }

   ul.categories li:hover {
      border-color: rgb(205 205 205 / 45%);
      backdrop-filter: brightness(1.8);
      box-shadow: 0 1px 3px rgb(0 0 0 / 35%);
   }

   .active { 
      color: #ffb901 !important;
   }

   ul.objects { 
      width: 250px;
      height: 250px;
      list-style: none;
      overflow: auto;
      margin-left: 30px;
      padding: 10px;
      background: linear-gradient(120deg, rgb(11 14 17 / 45%), transparent);
   }

   ul.objects li {
      margin: 5px 0;
      text-align: center;
      padding: 10px 25px;
      color: #cdcdcd;
      background: rgb(255 255 255 / 10%);
      backdrop-filter: brightness(1.1);
      border: 1px solid transparent;
      transition: all .3s ease;
      border-radius: 5px;
   }

   ul.objects li.active {

   }
</style>