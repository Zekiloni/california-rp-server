


<template>
   
   <transition-group name="notification" tag="ul" class="notifications">
      <li v-for="(Notification, i) in Notifications" v-bind:key="i" class="notification" :class="Types[Notification.Type].Class"> 
         <i aria-hidden="true" :class="Types[Notification.Type].Icon"> </i>
         <p> {{ Notification.Message }} </p>
      </li>
   </transition-group>

</template>

<script>

   export default { 
      data () { 
         return { 

            Types: [
               { Icon: 'fa fa-check', Class: 'success' },
               { Icon: 'fas fa-exclamation', Class: 'error' },
               { Icon: 'fa fa-info', Class: 'info' }
            ],

            Notifications: [],
            Audio: new Audio('@/assets/sounds/notification.mp3')
         }
      },

      mounted: function () { 
         mp.events.add('BROWSER::NOTIFICATION', (Message, Type, Time = 4) => { 
            this.Push(Message, Type, Time);
         });
      },

      methods: { 
         Push: function (Message, Type, Time) { 
            console.log('a')
            this.Audio.play();
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
      height: 275px;
      overflow: hidden;
   }

   ul.notifications li.notification { 
      background: linear-gradient(45deg, rgb(21 21 21 / 40%), transparent);
      padding: 5px 10px;
      margin: 7px 0;
      box-shadow: rgb(0 0 0 / 25%) 0px 4px 6px -1px, rgb(0 0 0 / 6%) 0px 2px 4px -1px;
      display: flex;
      border-radius: 5px;
      border-left: 2px solid transparent;
   }

   li.notification.success { 
      border-color: rgb(68, 191, 103) !important;
      text-shadow: 0 2px 5px rgb(68 191 103 / 55%);
   }

   .notification-enter-active { animation: notification-in 0.35s; }
   .notification-leave-active { animation: notification-in 0.55s reverse; }

   @keyframes notification-in {
      0% { transform: translateX(-200px); }
      50% { transform: translateX(10px); }
      100% { transform: translateX(0px); }
   }

</style>