


<template>
   
</template>

<script>
export default {
   data () { 
      return {
         Business: { 

         },

         Cart: []
      }
   },

   methods: { 
      Add: function (Item) { 
         this.Cart.push(Item);
      },

      Remove: function (Item) { 
         const Index = this.Cart.indexOf(Item);
         this.Cart.splice(Index, 1);
      }
   }
}
</script>