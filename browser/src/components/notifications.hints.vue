


<template>
   
   <div class="notifications-hints"> 
      <transition-group name="slide-top" tag="ul" class="hints">
         <li class="hint"  v-for="hint in hints" :key="hint"> 
            
         </li>
      </transition-group>

      <transition-group name="notification" tag="ul" class="notifications">
         <li v-for="(notification, i) in notifications" v-bind:key="'n' + i" class="notification" :class="notificationTypes[notification.type].Class"> 
            <div class="type">
               <i aria-hidden="true" :class="notificationTypes[notification.type].Icon"> </i>
            </div>
            <h4> {{ notification.message }} </h4>
         </li>
      </transition-group>
   </div>

</template>

<script>

   import Error_Sound from '../assets/sounds/error.mp3';
   import Success_Sound from '../assets/sounds/success.mp3';
   import Info_Sound from '../assets/sounds/info.mp3';


   export default { 
      data () { 
         return { 

            notificationTypes: [
               { Icon: 'fa fa-check', Class: 'success', Sound: new Audio(Success_Sound) },
               { Icon: 'fas fa-exclamation', Class: 'error', Sound: new Audio(Error_Sound) },
               { Icon: 'fa fa-info', Class: 'info', Sound: new Audio(Info_Sound) }
            ],

            help: null,
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
               this.addHint(key, message, time);
            });
         }
      },

      methods: { 

         addHint: function (key, message, time) {
            const hint = this.hints.push({ key: key, content: message });
            setTimeout(() => { 
               const inex = this.hints.indexOf(hint);
               this.hints.splice(inex, 1);
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

   ul.notifications { 
      padding: 0;
      list-style: none;
      margin: 0;
      position: absolute;
      right: 15px;
      top: 200px;
      width: 325px;
      min-height: 100px;
      padding: 0;
      z-index: 101;
      height: 275px;
      overflow: hidden;
   }

   ul.notifications li.notification { 
      background: rgb(11 14 17 / 60%);
      border-top-left-radius: 20px;
      border-bottom-right-radius: 20px;
      padding: 10px;
      margin: 7px 0;
      box-shadow: 0 17px 28px 0 rgb(0 0 0 / 30%);
      display: flex;
      border-bottom: 3px solid transparent;
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
      color: rgb(230, 230, 230);
   }
   

   li.notification.success, li.notification.success .type { border-color: rgb(65 216 136 / 70%) !important; color: #41d888; }
   li.notification.error, li.notification.error .type { border-color: rgb(255 58 65 / 70%) !important; color: #ff3a41; }
   li.notification.info, li.notification.info .type { border-color: rgb(250 184 10 / 70%) !important; color: #fab80a; }

   .notification-enter-active { animation: notification-in 0.65s; }
   .notification-leave-active { animation: notification-in 0.55s reverse; }

   @keyframes notification-in {
      0% { transform: translateX(200px); }
      50% { transform: translateX(5px); }
      100% { transform: translateX(0px); }
   }

</style>