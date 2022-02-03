

<template>

   <div class="item-info" 
      v-if="position.top && position.left && itemInfo" 
      v-bind:style="{ left: position.left + 'px', top: position.top + 'px' }"
      @mouseenter="$parent.hoverBox = true" 
   >

      <h2 class="name"> {{ itemInfo.name }} </h2>
      <p class="description" v-html="itemInfo.description"> </p>


      <ul class="actions" v-if="itemActions.length > 0"> 
         <li v-for="action in itemActions" :key="action.name" v-tooltip="action.name" @click="call(action.event)"> 
            <div class="icon" :class="action.icon"> </div>
            <!-- {{ action.name }}  -->
         </li>
      </ul>
      	
   </div>

</template>

<script>
   import { Messages } from '@/globals';

   export default { 

      props: {
         item: Object,
         position: Object
      },
      
      data () {
         return { 
            itemInfo: null,

            itemActions: null,

            desiredAmount: null,

            Messages
         }
      },

      methods: { 
         call: function (event) {
            mp.events.call(event, JSON.stringify(this.item), JSON.stringify(this.itemInfo), this.desiredAmount ? this.desiredAmount : this.item.quantity);
            this.$parent.hoverBox = false;
         }
      },

      async mounted () {

         if (window.mp) { 
            let itemData = await mp.events.callProc('CLIENT::ITEM:INFO', this.item.name);

            itemData = JSON.parse(itemData);

            if (itemData) {
               this.itemInfo = itemData.info;
               this.itemActions = itemData.actions;
            }
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
      background: #181a20;
      padding-bottom: 50px;
      overflow: hidden;
      box-shadow: 0px 1px 10px 0px rgb(0 0 0 / 35%);
   }

   h2.name { 
      margin: 0;
      width: 100%;
      color: #cdcdcd;
      font-weight: 450;
      border-top-left-radius: 10px;
      padding: 10px;
      background: #21252f;
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

   .model-preview { width: 500px; height: 400px; }

   ul.actions { 
      position: absolute;
      bottom: 0;
      padding: 0;
      width: 100%;
      background: #2a303c;
      margin: 0;
      min-height: 10px;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      list-style: none;
   }

   ul.actions li { 
      padding: 10px 5px;
   }

   ul.actions li * {
      transition: all .3s ease;
   }

   ul.actions li:hover .icon { 
      background: #ffb901;
   }

   ul.actions li .icon { 
      width: 30px;
      height: 30px;
      background-color: #848e9c;
   }

   ul.actions li .icon.use { mask: url('../../assets/images/icons/use-icon.svg') no-repeat center; mask-size: cover; }
   ul.actions li .icon.drop { mask: url('../../assets/images/icons/arrow-down.svg') no-repeat center; mask-size: cover; }
   ul.actions li .icon.give { mask: url('../../assets/images/icons/give-icon.svg') no-repeat center; mask-size: cover; }
   ul.actions li .icon.split { mask: url('../../assets/images/icons/split-icon.svg') no-repeat center; mask-size: cover; }

</style>