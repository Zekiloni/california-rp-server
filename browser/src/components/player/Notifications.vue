
<template>
   <div class="notify">
      <transition-group name="list" tag="ul" class="notifications">
         <li v-for="(notification, i) in notifications" :key="i" class="notification" :class="classes[notification.type]"> 
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
      bottom: 40px;
      height: auto;
      width: 100%;
      display: grid;
   }

   ul.notifications {
      list-style: none;
      padding: 0;
      margin: auto;
   }
</style>