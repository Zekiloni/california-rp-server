

<template>

   <div class="item-info" 
      v-if="position.top && position.left && itemInfo" 
      v-bind:style="{ left: position.left + 'px', top: position.top + 'px' }"
      @mouseenter="$parent.hoverBox = true" 
   >

      <h2 class="name"> {{ itemInfo.name }} </h2>
      <p class="description" v-html="itemInfo.description"> </p>

      <ul class="actions" v-if="itemActions.length > 0"> 
         <li v-for="action in itemActions" :key="action.name" v-tooltip="action.name" v-on:click="call(action.event)"> 
            <div class="icon" :class="action.icon"> </div>
            <!-- {{ action.name }}  -->
         </li>
      </ul>
   </div>

</template>

<script>
   import { Messages } from '../../globals';

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
         }
      },

      async mounted () { 
         if (window.mp) { 
            let itemData = await mp.events.callProc('CLIENT::ITEM:INFO', this.item.name);
            console.log(itemData)

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
      height: 200px;
      border-radius: 10px;
      /* backdrop-filter: blur(5px); */
      background: linear-gradient(45deg, #171827, transparent);
      box-shadow: 0px 1px 10px 0px rgb(0 0 0 / 35%);
   }

   h2.name { 
      margin: 0;
      width: 100%;
      color: #cdcdcd;
      font-weight: 450;
      border-top-left-radius: 10px;
      padding: 10px;
      background: linear-gradient(90deg, #2e2f40, transparent);
   }


   p.description { 
      font-weight: 250;
      color: whitesmoke;
      padding: 10px;
      margin: 0;
   }


   ul.actions { 
      position: absolute;
      bottom: 0;
      padding: 0;
      width: 100%;
      background: rgb(0 0 0 / 20%);
      margin: 0;
      min-height: 10px;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      list-style: none;
   }


   ul.actions li { 
      padding: 10px 0;
   }

   ul.actions li * {
      transition: all .3s ease;
   }

   ul.actions li:hover .icon { 
      background: #fffdf6;
   }

   ul.actions li .icon { 
      width: 30px;
      height: 30px;
      background-color: #5d5e72;
   }

   ul.actions li .icon.use { mask: url('../../assets/images/icons/use-icon.svg') no-repeat center; mask-size: cover; }
   ul.actions li .icon.drop { mask: url('../../assets/images/icons/arrow-down.svg') no-repeat center; mask-size: cover; }
   ul.actions li .icon.give { mask: url('../../assets/images/icons/give-icon.svg') no-repeat center; mask-size: cover; }
   ul.actions li .icon.split { mask: url('../../assets/images/icons/split-icon.svg') no-repeat center; mask-size: cover; }

</style>