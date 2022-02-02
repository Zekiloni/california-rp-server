

<template>

   <transition name="appear-from-bottom" appear> 
      <div class="handheld-radio" >
         <div class="screen" :class="{ off: power == false }">
            <div class="slots">
                <h2> slot </h2>
                <h4 v-for="dSlot in slots" :key=dSlot :class="{ selected: dSlot == slot }" @click="setSlot(dSlot)"> {{ dSlot }} </h4>
             </div>
            <h2 class="frequency"> {{ frequency }} </h2>
            <h2 class="hz"> 888 </h2>
         </div>
         <ul class="digits">
            <li v-for="digit in digits" :key="digit" @click="input(digit)" > {{ digit }} </li>
            <li class="set" @click="set"> set </li>
            <li class="power" @click="toggle()"> <div class="icon"> </div> </li>
         </ul>
      </div>
   </transition>

</template>

<script lang="ts">
   import Vue from 'vue';
   
   export default Vue.extend(
      {
         data () {
            return {
               digits: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
               slots: [1, 2, 3],
               selected: 0,
               
               power: true,
               frequency: '231',
               slot: 1
            }
         },

         methods: {
            input: function (i) {

               if (!this.power) {
                  return;
               }

               let old = this.frequency.split('');
               old[this.selected] = i;
               this.selected ++;

               if (this.selected > this.frequency.length - 1) {
                  this.selected = 0;
               }

               this.frequency = old.join('');
            },

            set: function () {

               if (!this.power) {
                  return;
               }
               
               //@ts-ignore
               mp.events.add('CLIENT::FREQUENCY:SET', this.frequency)
            },

            setSlot: function (i: number) {
               if (!this.power) {
                  return;
               }

               this.slot = i;
            },

            toggle: function () {
               this.power = !this.power;
            }
         },

         async mounted () {
            
         }
      }
   );
</script>

<style scoped>
   .handheld-radio { 
      position: absolute;
      right: 350px;
      width: 230px;
      height: 365px;
      border-top-left-radius: 25px;
      border-top-right-radius: 25px;
      background: radial-gradient(rgb(71 77 87 / 25%), rgb(11 14 17 / 25%));
      bottom: 0;
   }

   .handheld-radio::after {
      content: '';
      top: -200px;
      left: 50px;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
      width: 30px;
      height: 200px;
      background: radial-gradient(rgb(71 77 87 / 25%), rgb(11 14 17 / 25%));
      position: absolute;
   }

   .slots {
      width: 85%; margin: 0 auto; display: flex; justify-content: flex-end; font-size: 0.8rem;
      align-items: center; padding: 10px 0; color: #848e9c; text-transform: uppercase;

   }
   .slots h4 { margin: 0 15px; }
   .slots h4:hover { color: #ffb901; }
   .slots h4.selected { color: white; }
   .slots h2 { margin: 0 0; font-weight: 550; font-size: 0.6rem; }

   .screen { 
      width: 195px;
      position: relative;
      height: 130px;
      background: #181a20;
      margin: 20px auto;
      transition: all .15s ease;
      box-shadow: rgb(0 0 0 / 15%) 0px 10px 15px -3px, rgb(0 0 0 / 15%) 0px 4px 6px -2px;
      border-radius: 10px;
   }

   .screen.off * {
      filter: grayscale(100);
   }

   h2.frequency { 
      font-family: 'digital-7', sans-serif;
      position: absolute;
      bottom: -5px;
      right: 10px;
      letter-spacing: 0.1rem;
      margin: 0;
      text-align: right;
      color: #ffcc45;
      width: 200px;
      font-size: 6.85rem;
      z-index: 1;
   }

   h2.hz {
      font-family: 'digital-7', sans-serif;
      content: '888';
      position: absolute;
      right: 10px;
      bottom: -5px;
      width: 200px;
      margin: 0;
      z-index: 0;
      letter-spacing: 0.1rem;
      font-size: 6.95rem;
      color: #2a303c;
      text-align: right;
   }

   .digits {
      width: 90%;
      padding: 0;
      margin: 0 auto;
      list-style: none;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
   }

   .digits li {
      width: 45px; 
      margin: 5px; 
      height: 35px; 
      background: #181a20; 
      color: #9ba4b1;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.05rem;
      transition: all .3s ease;
      border-radius: 5px;
   }

   .digits li.set {
      text-transform: uppercase;
      font-weight: 600;
      color: #85bb65;
      font-size: 0.75rem;
   }

   .digits li.power { width: 50px; }
   .digits li.power .icon { 
      width: 20px; height: 20px; background: tomato;
      mask: url('../../assets/images/icons/power.svg') no-repeat center; 
      mask-size: cover;
   }

   .digits li:hover {
      box-shadow: rgb(0 0 0 / 15%) 0px 10px 15px -3px, rgb(0 0 0 / 15%) 0px 4px 6px -2px;
      background: #7552df;
      color: whitesmoke;
   }

   .digits li:hover .icon { background: white; }

   .appear-from-bottom-enter-active, .appear-from-bottom-leave-active {
      transition: all 1.35s;
   }

   .appear-from-bottom-enter, .appear-from-bottom-leave-to {
      opacity: 0.4;
      transform: translateY(250px);
   }
   
</style>