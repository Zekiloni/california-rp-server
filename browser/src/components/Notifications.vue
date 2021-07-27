


<template>
   
   <transition-group name="notification" tag="ul" class="notifications">
      <li v-for="(Notification, i) in Notifications" v-bind:key="'notfy'-i" class="notification" :class="Types[Notification.Type].Class"> 
         <div class="type">
            <i aria-hidden="true" :class="Types[Notification.Type].Icon"> </i>
         </div>
         <h4> {{ Notification.Message }} </h4>
      </li>
   </transition-group>

</template>

<script>

   import Error_Sound from '../assets/sounds/error.mp3';
   import Success_Sound from '../assets/sounds/success.mp3';
   import Info_Sound from '../assets/sounds/info.mp3';


   export default { 
      data () { 
         return { 

            Types: [
               { Icon: 'fa fa-check', Class: 'success', Sound: new Audio(Success_Sound) },
               { Icon: 'fas fa-exclamation', Class: 'error', Sound: new Audio(Error_Sound) },
               { Icon: 'fa fa-info', Class: 'info', Sound: new Audio(Info_Sound) }
            ],

            Notifications: [],
         }
      },

      mounted: function () { 
         mp.events.add('BROWSER::NOTIFICATION', (Message, Type, Time = 4) => { 
            this.Push(Message, Type, Time);
         });     
      },

      methods: { 
         Push: function (Message, Type, Time) { 
            this.Types[Type].Sound.play();
            this.Notifications.push({ Message: Message, Type: Type });
            setTimeout(() => {
               this.Notifications.splice(0, 1);
            }, Time * 1000);
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
      left: 25px;
      bottom: 170px;
      width: 325px;
      min-height: 100px;
      padding: 0;
      z-index: 99;
      height: 275px;
      overflow: hidden;
   }

   ul.notifications li.notification { 
      background: linear-gradient(45deg, rgb(21 21 21 / 40%), transparent);
      padding: 5px 10px;
      margin: 7px 0;
      box-shadow: rgb(0 0 0 / 25%) 0px 4px 6px -1px, rgb(0 0 0 / 6%) 0px 2px 4px -1px;
      display: flex;
      border-left: 3px solid transparent;
   }

   li.notification .type { 
      display: flex; justify-content: center; align-items: center; width: 35px; height: 35px; font-size: 20px;
   }

   li.notification h4 { 
      margin: 0;
      display: flex;
      align-items: center;
      font-size: 14.5px;
      margin-left: 10px;
      font-weight: 300;
      width: 100%;
      color: rgb(230, 230, 230);
   }
   

   li.notification.success, li.notification.success .type { border-color: #41d888 !important; color: #41d888; }
   li.notification.error, li.notification.error .type { border-color: #ff3a41 !important; color: #ff3a41; }
   li.notification.info, li.notification.info .type { border-color: #fab80a !important; color: #fab80a; }

   .notification-enter-active { animation: notification-in 0.35s; }
   .notification-leave-active { animation: notification-in 0.55s reverse; }

   @keyframes notification-in {
      0% { transform: translateX(-200px); }
      50% { transform: translateX(10px); }
      100% { transform: translateX(0px); }
   }

</style>