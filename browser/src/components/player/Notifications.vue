
<template>
   <div class="notify">
      <transition-group name="notify" tag="ul" class="notifications">
         <li v-for="notification in notifications" :key="notification.message" class="notification" :class="classes[notification.type]"> 
            <div class="icon"> </div>
            <h4> {{ notification.message }} </h4>
         </li>
      </transition-group>
   </div>
</template>
<script lang="ts">
   import Vue from 'vue'
   import Component from 'vue-class-component';

   enum NotificationType {
      SUCCESS, ERROR, INFO
   }

   interface Notification {
      message: string
      type: NotificationType
      expire?: ReturnType<typeof setTimeout>
   }
   
   @Component
   export default class Notifications extends Vue {
      
      notifications: Notification[] = [];

      classes: string[] = [
         'success', 'error', 'info'
      ];

      notify (message: string, type: NotificationType, time: number = 4) {
         const notification: Notification = {
            message: message,
            type: type
         };
         
         notification.expire = setTimeout(this.expire.bind(null, notification), time * 1000);
         
         this.notifications.push(notification);
      }

      expire (notification: Notification) {
         const index = this.notifications.indexOf(notification);
         this.notifications.splice(index, 1);
      }

      mounted () {
         if (window.mp) {
            mp.events.add('BROWSER::NOTIFICATION', this.notify);
         }

      }
   }
</script>

<style scoped>
   .notify { 
      position: absolute;
      bottom: 75px;
      height: auto;
      width: 100%;
      display: grid;
      z-index: 9999;
   }

   ul.notifications {
      list-style: none;
      padding: 0;
      margin: auto;
      max-height: 285px;
      overflow: hidden;
   }

   ul.notifications li {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
   }
   
   li h4 {
      font-size: 1.05rem;
      font-weight: 500;
      color: white;
   }

   li .icon {
      width: 25px; 
      height: 25px;
      margin: 0 15px;
   }

   li.success .icon {
      background:#159559;
      background: linear-gradient(180deg, #0cbe80, #157250);
      mask: url('../../assets/images/icons/success.svg') no-repeat center; 
      mask-size: cover;
   }

   li.error .icon { 
      background: #d4161b;
      mask: url('../../assets/images/icons/error.svg') no-repeat center; 
      mask-size: cover;
   }

   li.info .icon {
      background: linear-gradient(180deg, #fede29, #ffb901);
      mask: url('../../assets/images/icons/info.svg') no-repeat center; 
      mask-size: cover;
   }

   .notify-enter-active, .notify-leave-active {
      transition: all 1s;
   }

   .notify-enter {
      opacity: 0;
      transform: translateY(10px);
   }

   .notify-leave-to{
      opacity: 0;
      transform: translateY(-50px);
   } 
</style>