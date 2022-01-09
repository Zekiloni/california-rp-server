

<template>

   <div class="item-info" 
      v-if="position.top && position.left" 
      v-bind:style="{ left: position.left + 'px', top: position.top + 'px' }"
      @mouseenter="$parent.hoverBox = true" 
      @mouseleave="$parent.hoverBox = false && $parent.hoveredItem" 
   >

      <h2> {{ item.Name }} </h2>
      <p v-html="itemInfo"> </p>

      <ul class="actions"> 
         
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
            Messages
         }
      },

      async mounted () { 
         if (window.mp) { 
            const itemInfo = await mp.events.callProc('CLIENT::ITEM:INFO', this.item.name);
            if (itemInfo) {
               this.itemInfo = JSON.parse(itemInfo);
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
      backdrop-filter: blur(10px);
      background: linear-gradient(45deg, #171827, transparent);
   }

</style>