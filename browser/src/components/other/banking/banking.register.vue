

<template>
   <div class="bank-create">
      <transition name="slide" mode="out-in"> 
         <div class="contract" v-if="info == null" >
            <h3> {{ Messages.REGISTERING_BANK_ACCOUNT }} </h3>
            <input type="checkbox" name="agree" @input="agree()">
            <label for="agree"> {{ Messages.DO_U_AGREE }} </label>
         </div>

         <div v-else-if="info">
            aa
         </div>
      </transition>
   </div>
</template>

<script lang="ts">

   import Vue from 'vue';
   import { Messages } from '../../../globals';

   export default Vue.extend({
      props: { 
         showed: Object
      },

      data () {
         return {
            info: null,

            Messages
         }
      },

      methods: {
         agree: async function () {
            //@ts-ignore
            const response = await mp.events.callProc('CLIENT::BANKING:CREATE');
            if (response) {
               this.info = JSON.parse(response);
            }
         }
      },
      
      mounted () {
      }
   });
</script>

<style scoped>
   .bank-create {
      width: 400px;height: 300px; 
      margin: auto;
      display: flex;
      flex-direction: column;
      text-shadow: 0 0.3px 1px rgb(0 0 0 / 28%);
      align-items: center;
   }

   h3 {
      text-transform: uppercase;
      font-weight: 550;
      color: #cdcdcd;
      font-size: 2rem;
   }

   label { color: #9ea8b6; width: 200px; margin: 0 15px; }

   .contract { 
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
   }

   .contract h3 { width: 100%; }

   input[type=checkbox] {
      width: 35px;
      height: 35px;
   }

   input[type=checkbox]::before{
      width: 17px;
      height: 17px;
   }
</style>