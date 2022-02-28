

<template>
   <div class="members">
      <div class="list">
        <table>
            <tr>
               <th width="100"> {{ Messages.MEMBER_NAME }} </th>
               <th> {{ Messages.MEMBER_RANK }} </th>
            </tr>
            <tr v-for="member in members" :key="member.name">
               <td> {{ member.name }} </td>
               <td> {{ rank(member.rank) ? rank(member.rank) : 'x' }} </td>
            </tr>
         </table>
      </div>
   </div>
</template>

<script lang="ts">
   import Vue from 'vue';
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
         members: Array,
         ranks: Array
      }
   })
   export default class FactionMembers extends Vue {

      Messages = Messages;

      rank (id: number) {
         return this.$props.ranks.find((rank: Rank) => rank.id == id);
      }
 
   }
</script>

<style scoped>

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

</style>