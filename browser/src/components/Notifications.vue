


<template>
   <div class="notifications-hints"> 

      <transition name="fade">
         <div class="help" v-if="help">
            <div class="message">
               <div class="icon-mark"> </div>
               <p v-html="help"> </p>
            </div>
         </div>
      </transition>

      <transition-group name="notification" tag="ul" class="notifications">
         <li v-for="(notification, i) in notifications" v-bind:key="'n' + i" class="notification" :class="notificationTypes[notification.type].Class"> 
            <div class="type">
               <i aria-hidden="true" :class="notificationTypes[notification.type].Icon"> </i>
            </div>
            <h4> {{ notification.message }} </h4>
         </li>
      </transition-group>

      <transition-group name="fade-with-bottom-slide" tag="ul" class="hints">
         <li class="hint"  v-for="(hint, i) in hints" :key="'hint-' + i"> 
            <h4> {{ hint.message }} </h4> <KeyHint :keyName="hint.key" />
         </li>
      </transition-group>
   </div>
</template>

<script>

   import error_Sound from '../assets/sounds/error.mp3';
   import success_Sound from '../assets/sounds/success.mp3';
   import info_Sound from '../assets/sounds/info.mp3';

   import KeyHint from './misc/key.hint.vue';

   export default { 
      components: {
         KeyHint
      },

      data () { 
         return { 

            notificationTypes: [
               { Icon: 'fa fa-check', Class: 'success', Sound: new Audio(success_Sound) },
               { Icon: 'fas fa-exclamation', Class: 'error', Sound: new Audio(error_Sound) },
               { Icon: 'fa fa-info', Class: 'info', Sound: new Audio(info_Sound) }
            ],

            help: 'wdawdawdaw dawd wad awd awdaw dawdawdawdaw daw dawdaw',
            hints: [],
            notifications: [],
         }
      },

      mounted: function () { 
         if (window.mp) { 
            mp.events.add('BROWSER::NOTIFICATION', (message, type, time = 4) => { 
               this.push(message, type, time);
            });  

            mp.events.add('BROWSER::HINT', (key, message, time = 6) => { 
               this.createHint(key, message, time);
            });

            mp.events.add('BROWSER::HELP', (message, time = 4) => {
               this.createHelp(message, time);
            })
         }
      },

      methods: { 

         createHelp: function (message, time) {
            this.help = message;
            setTimeout(() => {
               this.help = null;
            }, time * 1000);
         },

         createHint: function (key, message, time) {
            const alreadyExist = this.hints.find(hint => hint.message == message);

            if (alreadyExist) {
               return;
            }

            const createdHint = this.hints.push({ key: key, message: message });

            setTimeout(() => { 
               const index = this.hints.indexOf(createdHint);
               this.hints.splice(index, 1);
            }, time * 1000);
         },

         push: function (message, type, time) { 
            this.notificationTypes[type].Sound.play();
            const notification = this.notifications.push({ message: message, type: type });

            setTimeout(() => { 
               const index = this.notifications.indexOf(notification);
               this.notifications.splice(index, 1);
            }, time * 1000);
         },
      }
   }

</script>

<style scoped>


   .help { 
      position: fixed;
      display: grid;
      top: 20px;
      left: 0;
      width: 100%;
      height: auto;
      min-height: 100px;
   }

   .help .message { 
      margin: auto;
      display: flex;
      align-items: center;
      width: 350px;
   }

   .help .message p {
      color: rgb(204, 204, 204);
      text-align: left;
      text-transform: uppercase;
      font-size: 0.9rem;
      margin: 0 15px;
      font-weight: 600;
   }

   .notifications-hints {
      position: absolute;
      right: 15px;
      top: 200px;
   }

   ul.hints { 
      position: relative;
      padding: 0;
      list-style: none;
   }

   ul.hints li {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin: 10px 0;
      border-radius: 10px;
   }

   ul.hints li h4 {
      color: #cdcdcd;
      text-shadow: 0 0.7px 1px rgb(0 0 0 / 60%);
      font-weight: 450;
      margin: 0 10px;
      font-size: 0.9rem;
   }

   ul.notifications { 
      padding: 0;
      list-style: none;
      margin: 0;
      width: 325px;
      min-height: 100px;
      max-height: 325px;
      padding: 0;
      z-index: 9999;
      height: auto;
      overflow: hidden;
   }

   ul.notifications li.notification { 
      position: relative;
      background: radial-gradient(rgb(33 37 47 / 35%), rgb(11 14 17 / 55%));
      border-top-left-radius: 5px;
      border-bottom-right-radius: 5px;
      z-index: 999;
      padding: 10px;
      margin: 7px 0;
      box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;      
      display: flex;
   }

    ul.notifications li.notification::after {
      content: '';
      position: absolute;
      left: 0;
      width: 225px;
      height: 2.5px;
      bottom: 0;
      background: transparent;
   }

   li.notification .type { 
      display: flex; justify-content: center; align-items: center; width: 35px; height: 35px; font-size: 20px;
   }

   li.notification h4 { 
      margin: 0;
      display: flex;
      align-items: center;
      font-size: 13.5px;
      margin-left: 10px;
      font-weight: 300;
      width: 100%;
      color: rgb(219, 219, 219);
   }
   
   .icon-mark {
      width: 65px; height: 65px; background: whitesmoke; mask-size: cover;
      mask: url('../assets/images/icons/question-mark.svg') no-repeat center;
   }

   li.notification.success, li.notification.success .type {color: #41d888; }
   li.notification.error, li.notification.error .type { color: #ff3a41; }
   li.notification.info, li.notification.info .type { color: #fab80a; }
   li.notification.info::after { background: #fab80a !important; }
   li.notification.error::after { background: #ff3a41 !important; }
   li.notification.success::after { background: #41d888 !important; }

   .notification-enter-active { animation: notification-in 0.65s; }
   .notification-leave-active { animation: notification-in 0.55s reverse; }

   @keyframes notification-in {
      0% { transform: translateX(200px); }
      50% { transform: translateX(5px); }
      100% { transform: translateX(0px); }
   }

</style>