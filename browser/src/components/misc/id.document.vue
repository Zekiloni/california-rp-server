
<template>
   <div class="id-card" >
      <img src="@/assets/images/other/goverment-logo.png" alt="los santos goverment logo" class="gov-logo">
      <h3>
         {{ Messages.ID_CARD }}
      </h3>

      <ul class="info">
         <li> </li>
      </ul>
   </div>
</template>

<script>
   import { Messages } from '../../globals';

   export default {
      data () { 
         return {
            data: null,

            Messages
         }
      },

      mounted () {
         if (!window.mp) {
            return;
         }

         mp.events.add('BROWSER::IDENTITY:INFO', data => this.data = data);
      }
   }
</script>

<style scoped>
   .id-card { 
      position: relative;
      width: 450px;
      height: 280px;
      background: #2a303c;
      box-shadow: 0 7px 15px 0 rgb(0 0 0 / 45%);
      border-radius: 10px;
      margin: auto;
      overflow: hidden;
   }

   img.gov-logo {
      position: absolute;
      z-index: 1;
      bottom: -30px;
      right: -30px;
      width: 220px;
      -webkit-user-drag: none;
      filter: grayscale(1.0);
      opacitY: 0.2;
   }

   .id-card h3 {
      background: #181a20;
      margin: 0;
      font-weight: 450;
      text-transform: uppercase;
      font-size: 1.3rem;
      color: #5c6370;
      padding: 10px 25px;
   }

   ul.info {
      list-style: none;
   }

</style>
