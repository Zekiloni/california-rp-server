


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

      <transition-group name="fade-with-bottom-slide" tag="ul" class="hints">
         <li class="hint"  v-for="(hint, i) in hints" :key="'hint-' + i"> 
            <h4> {{ hint.message }} </h4> <KeyHint :keyName="hint.key" />
         </li>
      </transition-group>
   </div>
</template>

<script>

   import KeyHint from './misc/key.hint.vue';

   export default { 
      components: {
         KeyHint
      },

      data () { 
         return { 

            help: null,
            hints: [],
         }
      },

      mounted: function () { 
         if (window.mp) { 
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
         }
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
   
   .icon-mark {
      width: 65px; height: 65px; background: whitesmoke; mask-size: cover;
      mask: url('../assets/images/icons/question-mark.svg') no-repeat center;
   }


</style>