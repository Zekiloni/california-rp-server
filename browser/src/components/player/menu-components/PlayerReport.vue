
<template>
   <div class="report-menu">
      <h2> {{ Messages.REPORT_TITLE }} </h2>
      <small> {{ Messages.REPORT_DESCRIPTION }} </small>
      
      <div class="report">
         <h3> {{ Messages.ACTIVE_REPORT }} </h3>
         <transition name="fade-with-bottom-slide"> 
            <div class="info" v-if="report">
               <span> 
                  <b> {{ Messages.REPORT_CONTENT }} </b> 
                   {{ report.message }} 
               </span>
              
            </div>

               <!-- sender: PlayerMp
               message: string
               time: number
               answer?: ReportAnswer | null -->
            <p v-else>{{ Messages.NO_ACTIVE_REPORT_RN }} </p>
         </transition>

      </div>

      <div class="send-report">
         <h3> {{ Messages.REPORT_SENDING }} </h3>
  
         <textarea v-model="reportContent" :placeholder="Messages.REPORT_CONTENT" spellcheck="false"> </textarea>
        
         <button @click="send"> {{ Messages.SEND_REPORT }} </button>
      </div>
   </div>
</template>

<script lang="ts">
   import Vue from 'vue'
   import Component from 'vue-class-component';
   import { Messages } from '@/globals';

   @Component({
      props: {
         report: Object
      }
   })
   export default class PlayerReport extends Vue {

      reportContent: string | null = null;
      
      async send () {
         const sent: string | null = await mp.events.callProc('CLIENT::PLAYER_MENU:REPORT', 'send', this.reportContent);
         if (sent) {
            console.log(JSON.stringify(sent))
            this.$props.report = JSON.parse(sent);
         }
      }

      Messages = Messages;


      mounted () {
         if (window.mp) {
            mp.events.add('BROWSER::PLAYER_PANEL:REPORT_RESPONSE', (answer: string) => {
               this.$props.report = JSON.parse(answer);
            });
         }
      }
   }
</script>

<style scoped>
   h2 {
      margin: 0;
      color: #cdcdcd;
      font-weight: 500;
   }

   small {
      color: #848e9c;
      font-size: 0.75rem;
      font-weight: 500;
   }

   .report-menu {
      width: 100%;
      height: 100%;
   }

   .report p {
      color: #adb1b8;
      font-weight: 500;
   }

   .send-report {
      margin-top: 25px;
      border-radius: 4px;
      padding: 10px;
   }

   .report h3 { 
      color: #0cbe80;
      font-size: 1rem;
      font-weight: 450;
   }

   .send-report h3 {
      color: #ffcc45;
      font-size: 1rem;
      font-weight: 450;
   }

   .send-report textarea {
      border: 1px solid rgb(71 77 87 / 40%);
      color: #cdcdcd;
      resize: none;
      width: 325px;
      height: 80px;
      border-radius: 4px;
      background: rgb(255 255 255 / 5%);
      position: relative;
      padding: 10px;
      font-size: 13px !important;
      font-weight: 100;
      transition: all 0.45s ease;
      outline: none;
   }

   button { 
      font-size: 0.75rem;
      padding: 10px 10px;
      font-weight: 550;
      display: block;
      width: 120px;
      margin-top: 10px;
      border-radius: 3px;
      transition: all .3s ease;
      background: #ffcc45;
      color: #0b0e11;
   }

   button:hover { 
      filteR: brightness(1.05);
   }
   

   span { 
      margin-bottom: 15px;
      color: #cdcdcd;
      font-weight: 500;
   }

   span b {
      color: #848e9c;
      font-weight: 400;
      display: block;
      text-transform: uppercase;
   }
</style>