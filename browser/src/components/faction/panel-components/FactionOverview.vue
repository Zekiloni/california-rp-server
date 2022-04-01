

<template>
   <div class="info">

      <div class="box">
         <h4> {{ Messages.FACTION_DESCRIPTION }} </h4>
         <p> {{ faction.description }} </p>
      </div>

      <div class="box">
         <h4> {{ Messages.FACTION_LEADER }} </h4>
         <p> {{ leader ? leader.name : Messages.NO_ONE }} </p>
      </div>
      
      <div class="box">
         <h4> {{ Messages.FACTION_MEMBERS }} </h4>
         
         <ul>
            <li> {{ Messages.NUMBER_OF_MEMBERS }}: <b>{{ members }}</b> </li>
            <li> {{ Messages.ONLINE_MEMBERS }}: <b>{{ faction.onlineMembers }}</b> </li>
         </ul>
      </div>
   </div>
</template>

<script lang="ts">
   import Vue from 'vue'
   import Component from 'vue-class-component';
   import { Messages } from '@/globals';
   import { Character } from '@/models';

   @Component({
      props: {
         faction: Object
      }
   })
   export default class FactionOverview extends Vue {
      Messages = Messages;

      get members (): Character[] {
         return this.$props.faction.members.length;
      }

      get leader () {
         return this.$props.faction.members.find(
            (member: Character) => member.id == this.$props.faction.leader
         );
      }
   }
</script>

<style scoped>

   .box {
      margin: 15px 0;
      background: #19181e;
      padding: 10px;
   }

   .box h4 {
      font-size: 1rem;
      color: #b7b7b7;
      font-weight: 700;
      margin: 0;
      margin-bottom: 5px;
   }

   .box p {
      font-size: 0.75rem;
      text-align: justify;
      line-height: 1.15rem;
      margin: 0;
      color: #a9a5a5;
   }

   ul {
      list-style: none;
      padding-left: 15px;
      color: #b7b7b7;
   }

   ul li {
      margin: 5px 0;
   }
</style>