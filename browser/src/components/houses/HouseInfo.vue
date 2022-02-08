

<template>
   <div class="house-info" v-if="house">
      <h2 class="adress"> 
         {{ house.location.street }} {{ house.id }}
         <small> {{ house.location.zone }} </small>
      </h2>
      <ul class="info">
         <li :class="{ sale: onSale(house) }"> {{ onSale(house) ? Messages.HOUSE_FOR_SALE : Messages.HOUSE_NOT_FOR_SALE }} </li>
         <li> <b> {{ Messages.LOCKED }}: </b> {{ house.locked ? Messages.YES : Messages.NO }} </li>
         <li> <b> {{ Messages.PRICE }}: </b> {{ formatDollars(house.price) }} </li>
         <li> <b> {{ Messages.HOUSE_RENTABLE }}: </b> {{ house.rentable ? Messages.YES : Messages.NO }} </li>
         <li v-if="house.rentable"> <b> {{ Messages.HOUSE_RENT_PRICE }}: </b> {{ formatDollars(house.rent) }} </li>
      </ul>
   </div>
</template>

<script>
   import { Messages } from '../../globals';

   export default {
      data () { 
         return {
            house: null,

            Messages
         }
      },
      
      mounted () { 
         if (window.mp) mp.events.add('BROWSER::HOUSE:INFO', (info, location) => { this.house = JSON.parse(info); this.house.location = JSON.parse(location); });
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
      background: rgb(11 14 17 / 75%);
      box-shadow: 0 7px 15px 0 rgb(0 0 0 / 61%);
   }

   h2.adress {
      width: 100%;
      margin: 0;
      color: #cdcdcd;
      font-weight: 450;
      font-size: 1.15rem;
      border-top-left-radius: 10px;
      padding: 10px;
      background: #181a20;
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


</style>