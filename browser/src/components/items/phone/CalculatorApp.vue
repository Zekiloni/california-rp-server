

<template>
   <div class="calculator">
      <div class="top">
         <div class="nav-bar">
            <p class="deg-or-rad">Calculator</p>
            <i class="fas fa-ellipsis-v"></i>
         </div>

         <div class="calculate-area">
            <div class="input"> {{ total }} </div>
            <div class="result"> {{ result }} </div>
         </div>
         <div class="bar"> </div>
      </div>
      <div class="bottom">
         <div class="numpad">
            <button class="numpad-button" @click="key(7)" >7</button>
            <button class="numpad-button" @click="key(8)">8</button>
            <button class="numpad-button" @click="key(9)">9</button>
            <button class="numpad-button" @click="key(5)">4</button>
            <button class="numpad-button" @click="key(4)">5</button>
            <button class="numpad-button" @click="key(6)">6</button>
            <button class="numpad-button" @click="key(1)">1</button>
            <button class="numpad-button" @click="key(2)">2</button>
            <button class="numpad-button" @click="key(3)">3</button>
            <button class="numpad-button" @click="key(0)">0</button>
            <button class="numpad-button" @click="key('.')">.</button>
            <button class="numpad-button" @click="equal">=</button>
         </div>
         <div class="operators">
            <button class="backspace" @click="clear"> <i class="fas fa-backspace"> </i> </button>
            <button class="divide" @click="key('/')"> <i class="fas fa-divide"></i> </button>
            <button class="multiply" @click="key('*')"> <i class="fas fa-times"></i> </button>
            <button class="subtract" @click="key('-')"> <i class="fas fa-minus"></i> </button>
            <button class="add" @click="key('+')"> <i class="fas fa-plus"></i> </button>
         </div>

      </div>
   </div>
</template>

<script lang="ts">
   import Vue from 'vue'
   import Component from 'vue-class-component';

   @Component
   export default class CalculatorApp extends Vue {
      total: any = 0;
      result: string | number = '';

      key (num: any) {
         return this.total += num;
      }

      clear () {
         return this.total = '0';
      }

      equal () {
         let equal = this.total;
         this.result = eval(equal);
         return this.total = eval(equal);
      }
      
      mounted () {
         this.equal();
      }
   }
</script>

<style scoped>
   .calculator {
      margin: auto;
      background: #ffffff;
   }

   .top {
      height: 220px;
      width: 290px;
   }

   .bottom {
      height: 225px;
      width: 290px;
   }

   .top {
      background: #18171d;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
   }

   .nav-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 20px;
      height: 50px;
      color: #b7b7b7;
   }

   .nav-bar p {
      letter-spacing: 0.05em;
      font-weight: 700;
   }

   .calculate-area {
      margin: 0 25px;
      text-align: right;
   }

   .input,
   .result {
      letter-spacing: 0.05em;
   }

   .input {
      font-size: 64px;
   }

   .input::after {
      content: "";
      border-right: 0.05em solid #f5b988;
   }

   .result {
      font-size: 48px;
      color: #b7b7b7;
   }

   .bar {
      margin: 5px auto 10px auto;
      height: 5px;
      width: 20px;
      border-radius: 20px;
      background: #e8eaed;
      box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,rgba(0, 0, 0, 0.22) 0px 10px 10px;
   }

   .bottom {
      background: #202124;
      display: flex;
   }

   .numpad {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(4, 1fr);
      border-right: 1px solid #302f36;
   }

   .operators {
      display: grid;
   }

   .operators i {
      color: #f5b988;
   }

   button {
      font-size: 18px;
      color: #e8eaed;
      background: #1f1e25;
      border: 1px solid #1f1e25;
      cursor: pointer;
      transition: all 0.2s ease;
   }

   button:hover {
      background: #2d3033;
   }

   .numpad-button {
      width: 69px;
   }

   .operators button {
      font-size: 18px;
      width: 69px;
   }

   .blue-strip {
      font-size: 16px;
      background: #f48327;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      transition: all 0.2s ease;
   }

   .input {
      color: #fff;
   }
</style>