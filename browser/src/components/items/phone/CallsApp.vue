

<template>
   <div class="calls-app">
      <div class="calling" v-if="isKeypad">
         <input type="text" v-model="keypadInput">

         <ul class="pads">
            <li v-for="i in keypad" :key="i" @click="keypadInput += i"> 
               {{ i }}
            </li>

            <li class="star" @click="keypadInput += '*'"> * </li>
            <li @click="keypadInput += '0'"> 0 </li>
            <li @click="keypadInput += '#'"> # </li>

            <li class="call" @click="call">
               <div class="icon"> </div>
            </li>

            <transition name="fade"> 
               <li class="delete" v-if="keypadInput.length > 0" @click="remove">
                  <div class="icon"> X </div>
               </li>
            </transition>

         </ul>
      </div>

      <div class="contacts" v-else>

      </div>
   </div>
</template>

<script lang="ts">
   import Vue from 'vue'
   import Component from 'vue-class-component';

   @Component({
      props: {
         number: Number,
         name: String,
         contacts: { 
            type: Array,
            default () { return []; }
         }
      }
   })
   export default class CallsApp extends Vue {
      keypadInput: string = '';
      keypad: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      isKeypad: boolean = true;
      
      remove () {
         this.keypadInput = this.keypadInput.slice(0, -1)
      }

      call () {
         if (this.keypadInput.length < 1) {
            return;
         }

         this.$emit('on-call', false, this.keypadInput, false);
      }

   }
</script>

<style scoped>
   .calls-app {
      background: #18171d;
      width: 100%;
      height: 100%;
   }

   .calling {
      padding-top: 10px;
      display: grid;
   }

   .calling input {
      padding: 10px 0;
      background: transparent;
      width: 170px;
      margin: auto;
      font-size: 1.85rem;
      text-align: center;
      color: #cdcdcd;
   }

   .calling h3 {
      margin: 0;
   }

   ul.pads {
      max-width: 220px;
      padding: 0;
      margin: auto;
      display: flex;
      list-style: none;
      justify-content: center;
      flex-wrap: wrap;
   }

   ul.pads li {
      width: 55px;
      height: 55px;
      background: #23212a;
      font-size: 1.4rem;
      color: #cdcdcd;
      font-weight: 500;
      border-radius: 100%;
      margin: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
   }

   li.star {
      font-size: 1.8rem;
   }

   ul.pads li.call { 
      background: #00ee55;
   }

   ul.pads li.call .icon {
      width: 25px;
      height: 25px;
      background: whitesmoke;
      mask: url('../../../assets/images/icons/phone.svg') no-repeat center; 
      mask-size: cover; 
   }
   
</style>