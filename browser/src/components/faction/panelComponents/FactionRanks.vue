
<template>
 
   <div class="ranks">
      <h2> {{ Messages.FACTION_RANKS }} </h2>
      <small class="edit-rank-help"> {{ Messages.PRESS_ON_RANK_TO_EDIT }} </small>
      <div class="list">
        <table>
            <tr>
               <th> # </th>
               <th width="150"> {{ Messages.FACTION_RANK_NAME }} </th>
               <th> {{ Messages.FACTION_RANK_DESCRIPTION }} </th>
               <th> {{ Messages.FACTION_RANK_PERMISSIONS }} </th>
               <th> {{ Messages.FACTION_RANK_SALARY }} </th>
            </tr>
            <tr v-for="rank in ranks" :key="rank.name" @click="selectedRank ? selectedRank = null : selectedRank = rank" :class="{ selected: selectedRank && selectedRank.id == rank.id }">
               <td> {{ rank.id }} </td>
               <td> {{ rank.name }} </td>
               <td class="description"> {{ rank.description }} </td>
               <td> {{ rank.permissions }} </td>
               <td> {{ rank.salary }}% </td>
            </tr>
         </table>
      </div>

      <transition name="fade"> 
         <div class="rank-settings" v-if="selectedRank">
            <h3> {{ Messages.FACTION_RANK_EDIT }} </h3>
            <h2> {{ selectedRank.id }}. {{ selectedRank.name }} </h2>
            
            <div class="edit">
               <input type="text" v-model="input.name" :placeholder="Messages.FACTION_RANK_NAME">
               <input type="text" v-model="input.description" :placeholder="Messages.FACTION_RANK_DESCRIPTION">

               <button @click="save()" class="save"> {{ Messages.SAVE }} </button>
               <button @click="remove(selectedRank)" class="delete"> {{ Messages.DELETE_RANK }} </button>
            </div>
         </div>
      </transition>

   </div>
</template>

<script lang="ts">
   import Vue from 'vue'
   import Component from 'vue-class-component';
   import { Messages } from '@/globals';

   interface Rank { 
      id: number
      name: string
      description: string
      salary: number
      permissions: number[]
      created_at: Date
      updated_at: Date
   }


   @Component({
      props: {
         ranks: Array
      }
   })
   export default class FactionRanks extends Vue {
      
      input = {
         name: '',
         description: '',
         salary: 0
      }

      selectedRank: Rank | null = null;

      save () {
         if (!this.selectedRank) {
            return;
         }

         mp.events.callProc('CLIENT::RANK:UPDATE', this.selectedRank.id, this.input.name, this.input.description, this.input.salary).then((isUpdated: boolean) => {
            if (!isUpdated) {
               return;
            }
            
            this.selectedRank!.name = this.input.name;
            this.selectedRank!.description = this.input.description;

            this.input = {
               name: '',
               description: '',
               salary: 0
            };

            this.selectedRank = null;
         })
      }

      remove (rank: Rank) {
         mp.events.callProc('CLIENT::RANK:DELETE', rank.id).then((isDeleted: boolean) => {
            if (!isDeleted) {
               return;
            }
            
            const index = this.$props.ranks.indexOf(rank);
            this.$props.ranks.splice(index, 1);
         });
      }

      create () {
         mp.events.callProc('CLIENT::FACTION:CREATE_RANK',)
      }

      Messages = Messages;
   }
</script>

<style scoped>

   h2 {
      margin: 0;
      color: #cdcdcd;
      font-weight: 350;
   }

   small.edit-rank-help { color: #848e9c; font-size: 0.7rem; font-weight: 600;}

  .list {
     margin-top: 15px;
     height: 300px;
     overflow-x: hidden;
     overflow-y: auto;
  }

   table {
      border-collapse: collapse;
      width: 100%;
      border-radius: 5px;
      overflow: hidden;
      margin: auto;
   }

   tr th {
      color: #848e9c;
      font-weight: 550;
   }

   td.description { 
      font-size: 0.60rem;
   }

   td, th {
      text-align: left;
      padding: 8px;
   }

   tr { 
      font-size: 0.75rem;
      height: 35px;
      background: rgb(11 14 17 / 45%);
      color: #848e9c;
      transition: all .3s ease;
   }

   tr:nth-child(even) {
      background: rgb(255 255 255 / 5%);
      color: #b6b6b6;
   }
   
   tr.selected {
      backdrop-filter: brightness(1.3);
      box-shadow: 0 1px 3px rgb(0 0 0 / 35%);
      color: whitesmoke;
   }

   .rank-settings h3 { 
      color: #848e9c;
      margin: 0;
      font-weight: 450;
   }

   .rank-settings h2 { 
      margin: 10px 0;
   }

   .rank-settings .edit {
      width: 100%;
      display: flex;
      justify-content: space-between;
   }

   button { 
      font-size: 0.75rem;
      padding: 10px 10px;
      font-weight: 550;
      margin-left: 15px;
      border-radius: 3px;
      transition: all .3s ease;
   }

   .rank-settings .edit button.save {
      background: #ffcc45;
      width: 80px;
      color: #0b0e11;
   }

    .rank-settings .edit button.delete { 
      background: #ff463d;
      color: whitesmoke;
   }

   input {
      border: 1px solid rgb(71 77 87 / 80%);
      color: #cdcdcd;
      border-radius: 4px;
      background: transparent;
      position: relative;
      padding: 10px;
      font-size: 13px !important;
      font-weight: 100;
      transition: all 0.45s ease;
   }
</style>