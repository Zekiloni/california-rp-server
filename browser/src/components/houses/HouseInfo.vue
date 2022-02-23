

<template>
   <div class="house-info" v-if="house">
      <h2 class="adress"> 
         {{ house.location.street }} {{ house.id }}
         <small> {{ house.location.zone }} </small>
      </h2>
      <ul class="info">
         <li :class="{ sale: onSale(house) }"> {{ onSale(house) ? Messages.HOUSE_FOR_SALE : Messages.HOUSE_NOT_FOR_SALE }} </li>
         <li> <b> {{ Messages.LOCKED }}: </b> {{ house.locked ? Messages.YES : Messages.NO }} </li>
         <li> <b> {{ Messages.PRICE }}: </b> {{ dollars(house.price) }} </li>
         <li> <b> {{ Messages.HOUSE_RENTABLE }}: </b> {{ house.rentable ? Messages.YES : Messages.NO }} </li>
         <li v-if="house.rentable"> <b> {{ Messages.HOUSE_RENT_PRICE }}: </b> {{ dollars(house.rent) }} </li>
      </ul>
      <div class="commands" v-if="commands">
         <h4> {{ Messages.AVAILABLE_COMMANDS }} </h4>
         <p> 
            {{ commands.map(cmd => '/' + cmd).join(' ') }}
         </p>
      </div>
   </div>
</template>

<script>
   import { Messages } from '../../globals';

   export default {
      data () { 
         return {
            house: null,
            commands: null,

            Messages
         }
      },
      
      mounted () { 
         if (window.mp) mp.events.add('BROWSER::HOUSE:INFO', (info, location, commands) => { this.house = JSON.parse(info); this.house.location = JSON.parse(location); this.commands = JSON.parse(commands) });
      }
   }
</script>

<style scoped>

   .house-info { 
      position: absolute;
      bottom: 20px;
      right: 20px;
      width: 320px;
      margin: auto;
      min-height: 200px;
      overflow: hidden;
      border-radius: 10px;
      background: radial-gradient(rgb(33 37 47 / 25%), rgb(11 14 17 / 55%));
      box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 8px 0px;
   }

   h2.adress {
      width: 100%;
      margin: 0;
      color: #cdcdcd;
      font-weight: 450;
      font-size: 1.15rem;
      border-top-left-radius: 10px;
      padding: 10px;
      background: rgb(11 14 17 / 46%);
   }

   h2.adress small { 
      display: block;
      color: #848e9c;
      font-size: 0.8rem;
      font-weight: 350;
   }

   ul.info { list-style: none; padding: 10px; margin: 0; }
   
   ul.info li { font-size: 0.8rem; color: #848e9c; margin: 5px 0; }
   ul.info b { color: #cdcdcd; font-weight: 350; }

   ul.info li.sale { color: #78cd78; font-weight: 500; font-size: 1.05rem; }


   .commands {
      margin: 0;
      padding:  10px;
      color: #848e9c;
   }

   .commands h4 {
      color: #ffcc45;
      margin: 0;
   }
</style>