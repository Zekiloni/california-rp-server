

<template>
   <div class="members">
      <div class="list">
        <table>
            <tr>
               <th width="100"> {{ Messages.MEMBER_NAME }} </th>
               <th> {{ Messages.MEMBER_RANK }} </th>
            </tr>
            <tr v-for="member in members" :key="member.name" @click="selectedMember ? selectedMember = null : selectedMember = member">
               <td> {{ member.name }} </td>
               <td> {{ rank(member.rank) ? rank(member.rank).name : 'x' }} </td>
            </tr>
         </table>
      </div>
      
      <transition name="fade"> 
         <div class="member-modal" v-if="selectedMember">
            <div class="member-settings" >
               <h3> {{ Messages.FACTION_MEMBER_SETTINGS }} </h3>
               <h2> {{ selectedMember.id }}. {{ selectedMember.name }} </h2>
               
               <div class="edit">
                  <v-select :options="rankup" class="select-rank"></v-select>

                  <button @click="kick(selectedMember)" class="delete"> {{ Messages.DELETE_RANK }} </button>
                  <button @click="save()" class="save"> {{ Messages.SAVE }} </button>
                  <button @click="selectedMember = null"> {{ Messages.CLOSE }} </button>
               </div>
            </div>
         </div>
      </transition>
   </div>
</template>

<script lang="ts">
   import Vue from 'vue';
   import Component from 'vue-class-component';
   import { Messages } from '@/globals';

   //@ts-ignore
   import vSelect from 'vue-select';
   import 'vue-select/dist/vue-select.css';

   Vue.component('v-select', vSelect);

   interface Rank { 
      id: number
      name: string
      description: string
      salary: number
      permissions: number[]
      created_at: Date
      updated_at: Date
   }

   interface Member { 
      id: number
      name: string
      rank: number
      gender: number
      birth: number
      origin: string
   }


   @Component({
      props: {
         members: Array as () => Member[],
         ranks: Array as () => Rank[]
      }
   })
   export default class FactionMembers extends Vue {

      Messages = Messages;
      
      selectedMember: Member | null = null;

      rank (id: number) {
         return this.$props.ranks.find((rank: Rank) => rank.id == id);
      }
 
      get rankup () {
         return this.$props.ranks.map((rank: Rank) => rank.name);
      }

      kick (member: Member | null) {
         mp.events.callProc('CLIENT::FACTION:KICK_MEMBER', member!.id).then((isKicked: boolean) => {
            if (!isKicked) {
               return;
            }
            
            const index = this.$props.members.indexOf(member);
            this.$props.members.splice(index, 1);
         });
      }

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
      height: 370px;
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

   .member-modal {
      position: fixed;
      height: 100%;
      top: 0;
      left: 0;
      display: grid;
      background: rgba(7, 7, 9, .65);
      width: 100%;
   }

   .member-settings {
      margin: auto;
      padding: 20px;
      border-radius: 10px;
      background: #16151a;
   }

   .member-settings h3 { 
      color: #848e9c;
      margin: 0;
      font-weight: 450;
   }

   .member-settings h2 { 
      margin: 10px 0;
   }

   .member-settings .edit {
      max-width: 505px;
      display: flex;
      justify-content: space-between;
   }

   .edit .select-rank {
      width: 250px;
   }

   button { 
      font-size: 0.75rem;
      padding: 10px 10px;
      font-weight: 550;
      margin-left: 0;
      border-radius: 3px;
      transition: all .3s ease;
   }

   .member-settings .edit button.save {
      background: #fdb91b;
      width: 80px;
      color: #0b0e11;
   }

   button.delete { 
      background: #ff463d;
      color: whitesmoke;
   }

   ::-webkit-scrollbar { width: 6px; }
   ::-webkit-scrollbar-track {background: rgb(0 0 0 / 60%);}
   ::-webkit-scrollbar-thumb { background: #fdb91b; }

</style>