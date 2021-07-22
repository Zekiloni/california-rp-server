


<template>
   
   <ul class="notification">
      <li v-for="(Notification, i) in Notifications" v-bind:key="Notification"> 
         {{ i }}
      </li>
   </ul>

</template>

<script>

   export default { 
      data () { 
         return { 
            Notifications: [],
            Audio: new Audio('src/sounds/notification.mp3')
         }
      },

      mounted: function () { 
         mp.events.add('BROWSER::NOTIFICATION:SEND', (Message, Type, Time = 4) => { 
            this.Push(Message, Type, Time);
         });
      },

      methods: { 
         Push: function (Message, Type, Time) { 
            this.Audio.play();
            this.Notifications.push({ Message: Message, Type: Type, Time: Time });
         },

         Icon: (i) => { 
            const Types = ['fa fa-check', 'fas fa-exclamation', 'fa fa-info'];
            return Types[i];
         }
      }
   }

</script>

<style scoped>


</style>