

<template>
   <div class="products">
      <h2> {{ Messages.BUSINESS_WORKERS }} </h2>
      <table>
         <tr class="head">
            <th> {{ Messages.WORKER_NAME }} </th>
            <th class="quantity"> {{ Messages.SALARY }} </th>
            <th class="price"> {{ Messages.HIRED_BY }} </th>
            <th class="actions">  {{ Messages.ACTIONS }} </th>
         </tr>
         <tr v-for="(worker, i) in workers" :key="worker.id">
            <td> {{ worker.name }} </td>
            <td> {{ dollars(worker.salary) }} <small> / h</small></td>
            <td> {{ worker.hired_By }} </td>
            <td>
               <button @click="remove(i, worker.id)"> a </button>
            </td>
         </tr>
         <tr class="add-product">
            <td> 
               <input type="text" v-model="input.name" :placeholder="Messages.PERSON_NAME" ref="worker_name">
            </td>
            <td> 
               <input type="number" v-model="input.price" ref="worker_salary" :placeholder="Messages.SALARY + ' / h'"  min="0">
            </td>
            <td> </td>
            <td> 
               <button class="save" @click="add()"> {{ Messages.ADD_WORKER }} </button>
            </td>
         </tr>
      </table>
   </div>
</template>

<script lang="ts">
   import Vue from 'vue'
   import Component from 'vue-class-component';
   import { Messages } from '@/globals';

   @Component({
      props: {
         workers: Array
      }
   })
   export default class BusinessWorkers extends Vue {
      
      Messages = Messages;
      
      input: { name: string | null, salary: number } = {
         name: null,
         salary: 0
      }


      remove (index: number, id: number) {
         console.log('remove')
         this.$props.workers.splice(index, 1);
      }

      add () {

         if (!this.input.name) {
            // @ts-ignore
            this.borderWarning(this.$refs.product_name);
            return;
         }

         this.$props.products.push({ id: Math.random() + 59, name: this.input.name, price: this.input.salary, quantity: 0 })
         
         this.input.name = null;
         this.input.salary = 0;
      }
   }
</script>

<style scoped>

   table {
      width: 705px;
      background: #181a20;
      height: 100%;
      table-layout: fixed;
      border-collapse: collapse;
   }

   td, th {
      text-align: left;
      padding: 10px;
   }

   tr {
      background: #181a20;
      color: #848e9c;
   }

   tr:nth-child(even) {
      background-color: #21252f; 
      color: #cdcdcd;
   }

   tr {
      height: 30px;
   }

   th {
      color: #848e9c;
   }

   th.price {
      width: 150px;
   }

   tr.add-product {
      position: relative;
      background: #0b0e10;
   }

   ul.prediction { 
      list-style: none;
      width: 130px;
      padding: 5px 15px;
      border-radius: 5px;
      margin: 0;
      top: 50px;
      overflow-y: scroll;
      overflow-x: hidden;
      min-height: 15px;
      height: auto;
      max-height: 100px;
      position: absolute;
      background: #2a303c;
   }

   ul.prediction li { 
      margin: 2px 0;
      color: #848e9c;
      transition: all .2s ease;
   }

   ul.prediction li:hover {
      opacity: 0.5;
   }

   h2 { 
      color: whitesmoke;
      margin: 20px 0;
      font-weight: 500;
   }

   button.save { 
      padding: 10px 15px;
      font-size: 0.75rem;
      font-weight: 550;
      border-radius: 5px;
      background: linear-gradient(45deg, #ffcc45, #ffb901);
      color: #0b0e11;
      transition: all .3s ease;
   }

   button:hover { 
      filter: brightness(1.2);
   }

   input::-webkit-outer-spin-button,
   input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
   }

   input {
      position: relative;
      padding: 10px 5px;
      transition: all .3s ease;
      border: 1px solid #181a20;
      color: #cdcdcd;
      border-radius: 5px;
      box-shadow: rgb(0 0 0 / 25%) 0px 1px 20px 0px;
      background: #2b2f36;
   }
   
   td small {
      font-weight: 900;
      font-size: 0.5rem;
   }

   input[type=number] {
      width: 60px;
   }

</style>