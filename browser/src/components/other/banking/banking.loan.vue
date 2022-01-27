

<template>
   <div class="loan">
      <vue-slider 
         v-model=amount
         :data=amounts
         :included="true"
         :railStyle=slider.rail 
         :processStyle=slider.process
         :dotStyle=slider.dot
         :dotOptions=slider.dotOptions
      />

      <vue-slider 
         v-model=days
         :min=12
         :max=64
         :railStyle=slider.rail 
         :processStyle=slider.process
         :dotStyle=slider.dot
         :dotOptions=slider.dotOptions
      />
      
      <h2> kredit: {{ formatDollars(amount) }} </h2>
      <h2> dana {{ days }} </h2>
      <h1> return {{ formatDollars(repayment()) }} </h1>
   </div>
</template>

<script lang="ts">
   import Vue from 'vue';
   import VueSlider from 'vue-slider-component';


   export default Vue.extend({
      components: {
         VueSlider
      },

      props: { 
         showed: Object
      },

      data () {
         return { 
            amounts: [5000, 15000, 30000, 60000, 120000, 240000, 480000],

            amount: 5000,
            days: 12,

            slider: { 
               rail: { backgroundColor: '#0b0e11', borderRadius: '15px', boxShadow: '0 0 1px black' },
               process: { background: '#ffcc45', borderRadius: '25px' },
               dot: { backgroundColor: '#ffb901', borderColor: '#ffcc45' },
               dotOptions: { 
                  focusStyle: { 
                     background: '#fede29',
                     boxShadow: '0 0 0 5px rgb(255 204 69 / 20%)'
                  }
               }
            }
         }
      },

      computed: {
      },

      methods: { 
         repayment: function () {
            return this.amount + (this.amount / 100) * (this.days - 5);
         }
      }
   });
</script>

<style scoped>
   .loan { 
      width: 600px;
      height: 600px;
      margin: auto;
      color: white;
   }
   
   .loan * {
      margin: 0;
   }
</style>