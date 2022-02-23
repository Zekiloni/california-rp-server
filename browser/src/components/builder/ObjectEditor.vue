
<template>
   <div class="object-editor">

      <div class="movement">
         <button @click="setMovement(0)" :class="{ active: movement == 0 }"> <div class="icon position"> </div> </button>
         <button @click="setMovement(1)" :class="{ active: movement == 1 }"> <div class="icon rotation"> </div> </button>
         <button @click="setAutomatiGround()" :class="{ active: automaticGround }"> <div class="icon grounding"> </div> </button>
         <button @click="save()"> {{ newObject ? 'purchase' : 'save' }} </button>
      </div>

      <div class="values" v-if="activeMovement">
         <h2> {{ movement == 0 ? 'position' : 'rotation '}} </h2>
         <div class="value">
            <label for=""> X </label>
            <input type="number" v-model="activeMovement.x" :class="{ active: direction == 0 }" @click="setDirection(0)">
         </div>
   
         <div class="value">
            <label for=""> Y </label>
            <input type="number" v-model="activeMovement.y" :class="{ active: direction == 1 }" @click="setDirection(1)" @input="changePosition">
         </div>

         <div class="value">
            <label for=""> Z </label>
            <input type="number" v-model="activeMovement.z" :class="{ active: direction == 2 }" @click="setDirection(2)">
         </div>
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

      newObject: boolean = true;

      automaticGround: boolean = false;

      position: Vector3 | null = null;

      rotation: Vector3 | null = null;

      get activeMovement () {
         if (this.movement == Movement.POSITION) {
            return this.position;
         } else if (this.movement == Movement.ROTATION) {
            return this.rotation;
         }
      }

      changePosition (i: number) {
         console.log(JSON.stringify(i))
      }

      setAutomatiGround () {
         this.automaticGround = !this.automaticGround;
         mp.events.call('CLIENT::BUILDER:SET_AUTOMATIC_GROUND', this.automaticGround);
      }

      setDirection (i: Direction) {
         this.direction = i;
         mp.events.call('CLIENT::BUILDER:SET_DIRECTION',i);
      }

      setMovement (i: Movement) {
         this.movement = i;
         mp.events.call('CLIENT::BUILDER:SET_MOVEMENT', i);
      }

      save () {
         mp.events.call('CLIENT::BUILDER:OBJECT_SAVE');
      }

      mounted () {
         if (window.mp) {
            mp.events.add('BROWSER::BUILDER:UPDATE_POSITION', (position: string) => this.position = JSON.parse(position));
            mp.events.add('BROWSER::BUILDER:UPDATE_ROTATION', (rotation: string) => this.rotation = JSON.parse(rotation));
            mp.events.add('BROWSER::BUILDER:UPDATE_OBJECT_STATUS', (status: boolean) => this.newObject = status);
            console.log(JSON.stringify(this.rotation))
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


   .movement {
      padding: 15px 0;
   }

   .values { 
      display: flex;
      border-top: 1px solid grey;
      justify-content: center;
      padding: 15px 0;
   }

   .values input { 
      margin: 10px 20px;
      padding: 10px;
      width: 60px;
   }
   
   .movement button {
      margin: 10px;
      padding: 10px 25px;
      background: rgb(100 100 100 / 45%);
      backdrop-filter: brightness(1.1);
      border-radius: 5px;
      font-weight: 350;
      font-family: 'Montserrat Light', sans-serif;
      transition: all .3s ease;
      border: 1px solid transparent;
   }

   .movement button:hover { 
      border-color: rgb(205 205 205 / 35%);
      backdrop-filter: brightness(1.15);
      box-shadow: 0 1px 3px rgb(0 0 0 / 25%);
   }

   button:hover .icon { 
      background: white;
   }

   .movement button.active .icon { 
      background: #ffb901;
   }

   .values .value { text-align: center; }

   .icon {
      width: 30px;
      transition: all .3s ease;
      height: 30px;
      background: #d1d1d1;
   }

   .icon.position { mask: url('../../assets/images/icons/moving.svg') no-repeat center; mask-size: cover; }
   .icon.rotation { mask: url('../../assets/images/icons/rotation.svg') no-repeat center; mask-size: cover; width: 80px; }
   .icon.grounding { mask: url('../../assets/images/icons/grounding.svg') no-repeat center; mask-size: cover; }

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
      color: #acacac;
      border-radius: 5px;
      box-shadow: rgb(0 0 0 / 25%) 0px 1px 20px 0px;
      background: #2b2f36;
   }

   input.active { 
      color: white;
   }

   h2 { 
      font-family: 'Montserrat Light', sans-serif;
      color: whitesmoke;
      margin-right: 30px;
      font-weight: 300;
      text-transform: uppercase;
   }

   label { 
      color: #848e9c;
      font-weight: 600;
   }

   input:focus {
      color: whitesmoke;
   }
</style>