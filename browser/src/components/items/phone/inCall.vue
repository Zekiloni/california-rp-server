

<template>
   <div class="call" >

      <div class="info" >
         <h2> {{ inCall.number }} </h2>
         <h4> {{ inCall.inCall ? elapsed : (inCall.incoming ? 'nadolazeći poziv' : 'pozivanje') }} </h4>
      </div>
      
      <transition name="bounce" mode="out-in">
         <ul class="actions" v-if="inCall.incoming && !inCall.inCall" key=callingOptions >
            <li class="answer" @click="answer" v-tooltip="Messages.ANSWER_CALL"> <div class="icon answer" @click="answer"> </div> </li>
            <li class="hangup" @click="hangup" v-tooltip="Messages.HANGUP_CALL"> <div class="icon hangup"> </div> </li>
         </ul>

         <ul class="actions" v-if="!inCall.incoming || inCall.inCall" key=callOptions >
            <li> <div class="icon mute"> </div> </li>
            <li> <div class="icon keypad"> </div> </li>
            <li> <div class="icon speaker"> </div> </li>
            <li class="add"> <div class="icon add"> </div> </li>
            <li> <div class="icon video-call"> </div> </li>
            <li> <div class="icon contacts"> </div> </li>
            <li class="hangup" @click="hangup" v-tooltip="Messages.HANGUP_CALL"> <div class="icon hangup"> </div> </li>
         </ul>
      </transition>
   </div>
</template>

<script lang="ts">
   import Vue from 'vue';
   import Component from 'vue-class-component';
   
   import { Messages } from '@/globals';

   @Component({
      props: {
         inCall: Object
      }
   })
   export default class InCall extends Vue {
      Messages = Messages;
      
      minutes: number = 0;
      seconds: number = 0;

      get elapsed () {
         return (this.minutes < 10 ? '0' + this.minutes : this.minutes).toString() + ':' + (this.seconds < 10 ? '0' + this.seconds.toFixed() : this.seconds.toFixed()).toString()
      }

      answer () {
         this.$emit('on-answer');
      }

      hangup () {
         this.$emit('on-hangup');
      }

      counter () {
         if (this.$props.inCall.started) {
            this.seconds ++;
            if (this.seconds >= 60) {
               this.seconds = 0;
               this.minutes ++;
            }
         }

         setTimeout(this.counter, 1000);
      }

      mounted () {
         this.counter();
      }
   }
</script>
<style scoped>
   .call {
      width: 100%;
      height: 100%;
      background: rgb(0, 0, 0, 0.5);
      margin-top: -36px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
   }

   .info {
      text-align: center;
   }

   .info h2 {
      margin: 0;
      font-size: 1.8rem;
      font-weight: 600;
      letter-spacing: 1px;
      color: whitesmoke;
   }

   .info h4 {
      margin: 5px 0;
      font-size: 1rem;
      font-weight: 400;
      color: #cdcdcd;
   }

   ul.actions {
      list-style: none;
      padding: 0;
      height: 260px;
      width: 225px;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      align-items: center;
   }

   ul.actions li, ul.actions li * {
      transition: all .3s ease;
   }

   ul.actions li {
      width: 65px;
      border-radius: 100%;
      height: 65px;
      display: grid;
      background: rgb(205 205 205 / 20%);
      backdrop-filter: blur(5px);
   }

   ul.actions li:hover {
      filter: brightness(1.5);
   }

   ul.actions li.add {
      opacity: 0.6;
   }

   ul.actions li.add .icon {
      background: #cdcdcd;
   }

   ul.actions li .icon {
      margin: auto;
      width: 30px; 
      height: 30px;
      background: whitesmoke;
   }

   ul.actions li.answer {
      background: #07b377;
   }

   ul.actions li.hangup {
      background: #eb5545;
   }

   .icon.hangup {
      mask: url('../../../assets/images/icons/phone.svg') no-repeat center; 
      mask-size: cover; 
      transform: rotate(135deg);
   }

   .icon.answer { 
      mask: url('../../../assets/images/icons/phone.svg') no-repeat center; 
      mask-size: cover; 
   }

   .icon.mute { 
      mask: url('../../../assets/images/icons/mute.svg') no-repeat center;  mask-size: cover; 
   }

   .icon.keypad { mask: url('../../../assets/images/icons/keyboard-pad.svg') no-repeat center;  mask-size: cover; }
   .icon.speaker { mask: url('../../../assets/images/icons/speaker.svg') no-repeat center;  mask-size: cover; }
   .icon.add { mask: url('../../../assets/images/icons/plus.svg') no-repeat center;  mask-size: cover; }
   .icon.video-call { mask: url('../../../assets/images/icons/video-call.svg') no-repeat center;  mask-size: cover; }
   .icon.contacts { mask: url('../../../assets/images/icons/contacts.svg') no-repeat center;  mask-size: cover; }
</style>
