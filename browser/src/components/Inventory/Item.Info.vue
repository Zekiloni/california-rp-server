

<template>

   <div class="item" v-if="isVisible" v-bind:style="{ }">

      <h2> {{ Item.Name }} </h2>
      
      <p> {{ Item.Description }} </p>
      <h4> 
         {{ Messages.WEIGHT_OF_ITEM }} <b> {{ Item.Weight }} {{ Messages.WEIGHT_KG }} </b>,
         {{ Messages.TOTAL_WEIGHT }} {{ Item.Quantity * Item.Weight }} {{ Messages.WEIGHT_KG }}  
      </h4>

   </div>

</template>

<script>
   import { Messages } from '@/Globals'

   export default { 
      props: {
         Item: Object,
         callback: Function,
      },
      
      data () {
         return { 
            isVisible: false,
            Left: 0,
            Top: 0,

            Messages
         }
      },

      methods: { 
         Show: function (event) {
            this.isVisible = !this.isVisible;
            this.Top = event.screen.clientX, this.Left.event.screen.clientY;
         }
      }
   }

</script>
