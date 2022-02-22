
<template>
   <div class="object-editor">

      <div class="movement">
         <button @click="setMovemet(0)" :class="{ active: movement == 0 }"> position </button>
         <button @click="setMovemet(1)" :class="{ active: movement == 1 }"> rotation </button>
      </div>

      <div class="values">
         <input type="number" v-if="active.x" v-model="active.x" :class="{ active: direction == 0 }">
         <input type="number" v-if="active.y" v-model="active.y" :class="{ active: direction == 1 }">
         <input type="number" v-if="active.z" v-model="active.z" :class="{ active: direction == 2 }">
      </div>
   </div>
</template>

<script lang="ts">
   import Vue from 'vue';
   import Component from 'vue-class-component';

   interface Vector3 { 
      x: number
      y: number
      z: number
   }

   enum Direction { 
      X, Y, Z
   }

   enum Movement { 
      POSITION, ROTATION
   }

   @Component
   export default class ObjectEditor extends Vue {

      movement: Movement = Movement.POSITION;

      direction: Direction = Direction.X;

      automaticGround: boolean = false;

      position: Vector3 | null = {
         x: 1, y: 2, z: 3
      }

      rotation: Vector3 | null = {
         x: 34, y: 33, z: 2
      }

      get active () {
         return this.movement == Movement.POSITION ? this.position : this.rotation;
      }

      toggleGround () {
         this.automaticGround = !this.automaticGround;
         mp.events.call('CLIENT::BUILDER:SET_MOVEMENT', this.automaticGround);
      }

      setMovemet (i: Movement) {
         this.movement = i;
         mp.events.call('CLIENT::BUILDER:SET_AUTOMATIC_GROUND', i);
      }

      mounted () {
         if (window.mp) {
            mp.events.add('BROWSER::BUILDER:UPDATE_POSITION', (position: string) => this.position = JSON.parse(position));
            mp.events.add('BROWSER::BUILDER:UPDATE_ROTATION', (rotation: string) => this.rotation = JSON.parse(rotation));
         }
      }
   }
</script>

<style scoped>

   .object-editor { 
      width: 100%;
      position: absolute;
      bottom: 10px;
      left: 0;
      height: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px 0;
      margin: auto;
      flex-direction: column;
   }

   .values { 
      width: 200px;
      display: flex;
      justify-content: center;
   }

   .values input { 
      margin: 10px 20px;
      padding: 10px;
      width: 60px;
   }
   
   .movement button {
      margin: 10px;
      padding: 8px 20px;
      background: rgb(255 255 255 / 5%);
      backdrop-filter: brightness(1.1);
      border-radius: 5px;
      font-weight: 350;
      font-family: 'Montserrat Light', sans-serif;
      color: #d1d1d1;
      transition: all .3s ease;
      border: 1px solid transparent;
   }

   .movement button:hover { 
      border-color: rgb(205 205 205 / 15%);
      backdrop-filter: brightness(1.15);
      box-shadow: 0 1px 3px rgb(0 0 0 / 25%);
   }

   .movement button.active { 
      color: white;
   }
</style>