

<template>
   <div class="identity">

      <div class="input-holder">
         <label> {{ Messages.FIRST_NAME }} </label>
         <input type="text" v-model="identity.name">
      </div>

      <div class="input-holder">
         <label> {{ Messages.LAST_NAME }} </label>
         <input type="text" v-model="identity.lastName">
      </div>

      <div class="input-holder">
         <label> {{ Messages.ORIGIN }} </label>
         <input type="text" v-model="identity.origin">
      </div>

      <div class="input-holder">
         <label> {{ Messages.BIRTH }} </label>
         <input type="date" v-model="identity.birth">
      </div>

      <ul class="genders"> 
         <label> {{ Messages.GENDER }} </label>
         <li class="gender icon male-gender" :class="{ selected: identity.gender == 0 }" v-on:click="setGender(0)" v-tooltip.bottom="Messages.MALE"> </li>
         <li class="gender icon female-gender" :class="{ selected: identity.gender == 1 }" v-on:click="setGender(1)" v-tooltip.bottom="Messages.FEMALE"> </li>
      </ul>
   </div>
</template>

<script>
   import { Messages } from '../../globals'

   export default {
      props: {
         identity: Object,
         setGender: Function
      },
      
      data () { 
         return {             
            Messages
         }
      }
   }
</script>

<style scoped>

   .identity { margin: auto; }

   .input-holder { padding: 10px 20px; margin: 20px auto; }

   input { 
      position: relative; width: 270px; padding: 15px 10px; transition: all .3s ease; border: 1px solid #0b0e11; 
      color: #cdcdcd; border-radius: 5px; box-shadow: rgb(0 0 0 / 25%) 0px 1px 20px 0px; background: #2b2f36; margin: 10px 0; 
   }

   input:focus { color: white; border-color: #474d57; }

   ul.genders { padding: 0; list-style: none; display: flex; width: 150px; justify-content: space-around; align-items: center; flex-wrap: wrap; margin: 0 auto; }
   ul.genders li.icon { background: white; opacity: 0.7; }
   ul.genders li.icon:hover { opacity: 1; }
   ul.genders label { width: 100%; text-align: center; }
   ul.genders li.icon.selected { background: #7c5bf1; opacity: 1; }

   .icon { width: 45px; height: 45px; background-color: #848e9c; margin: 10px auto; }

   .icon.male-gender { mask: url('../../assets/images/icons/male-gender.svg') no-repeat center; mask-size: cover; }
   .icon.female-gender { mask: url('../../assets/images/icons/female-gender.svg') no-repeat center; mask-size: cover; }

   label { display: block; color: #cdcdcd; font-weight: 450; text-transform: uppercase;}

</style>