


<template>
   
   <div class="chat">
      <ul class="messages" ref="Entries" id="messages">
         <li v-for="message in Messages" class="message" v-bind:style="{ fontSize: Settings.Fontsize + 'px', fontWeight: Settings.Fonweight, opacity: Inactive ? '0.5' : '1' }" v-bind:key="message">
            <b class="timestamp" v-if="Settings.Timestamp" v-html="DateTime(message.timestamp)"> </b>
            <span v-html="message.content"> </span>
         </li>
      </ul>





      <transition name="slide-fade">
         <div class="input-form" v-if="Typing">
            <input
               placeholder="Sadržaj."
               v-model="Input"
               type="text"
               class="chat-input form-control rounded-0"
               ref="ChatInput"
               maxlength="200"
               @keyup.esc="Close"
               @blur="Close"
               @keyup.up="GoHistory(1)"
               @keyup.down="GoHistory(0)"
            >
            <div class="currentLength"> {{ Input.length + ' / 200'}} </div>
         </div>
      </transition>
   </div>
</template>

<script>

   export default { 
      data () { 
         return { 
            Typing: false,
            Input: '',

            Controllable: true,

            Inactive: false,
            
            Settings: { 
               Fontsize: 17.5,
               Fonweight: 700,
               Width: 300,
               Height: 200,
               Timestamp: false,
            },

            Current: -1,

            History: [

            ],
           
            Messages: [

            ]
         }
      },

      watch: {
         Messages: function (value) {
            this.Update();
         }
      },

        mounted () {

         this.Push('Focus Roleplay - www.focus-rp.com');
         this.Check();
         
         document.addEventListener('keyup', (e) => { 
            switch (e.keyCode) {
               case 84: { 
                  if (this.Typing) return;
                  if (this.Toggle && this.Controllable) {
                     this.ToggleInput(chat.Typing = !chat.Typing);
                  }
                  break;
               }

               case 13: {
                  if (chat.Toggle && chat.Typing) {
                     chat.Send();
                  }
                  break;
               }
            }
         });
      },

      methods: { 
         Activate: function (toggle) { 
            if (this.Typing) this.Typing = false, this.Input = '';
            this.Controllable = toggle;
         },

         Toggle: function (toggle) { 
            this.Typing = toggle;
            mp.invoke('focus', toggle);
            if (toggle) { 
               mp.invoke('setTypingInChatState', true);
               this.Inactive = false;
               Vue.nextTick(function() { this.$refs.ChatInput.focus(); }.bind(this));
            } else { 
               mp.invoke('setTypingInChatState', false);
               this.$refs.ChatInput.blur();
               this.Input = '';
            }
         },

         Close: function () { 
            if (this.Controllable && this.Typing) { 
               this.Toggle(false);     
            }
         },

         Push: function (content, type = null) {

            if (content.includes('color')) { 
               let span = content.split('"');
               let color = span[1].split(' ');
               content = content.replace(color[1], '#' + color[1]);
            }

            const message = { timestamp: Date.now(), content: content, type: type }
            this.Messages.push(message);
         },

      }
   }

</script>

<style scoped>

   .chat {
      max-width: 800px;
      height: 300px;
      position: absolute;
      top: 20px;
      left: 20px;
      padding: 0;
      transition: all 0.35s ease;
   }

   .input-form {
      position: absolute;
      bottom: -55px;
      left: 0;
      width: 30vw;
   }

   input {
      width: 100%;
      border: 1px solid rgb(121 121 121 / 13%);
      color: #cdcdcd;
      background: rgb(21 21 21 / 75%);
      position: relative;
      padding: 6px 10px;
      font-size: 13.5px;
      outline: none;
      font-size: 13px !important;
      font-weight: 300;
      box-shadow: 0 5px 10px rgb(12 12 12 / 15%);
      transition: all 0.45s ease;
   }

   input:focus { 
      border-color: #fbc60c; 
   }

   ul.messages {
      list-style: none;
      margin: 0;
      transition: all 0.35s ease;
      height: 100%;
      overflow-y: auto;
      direction: rtl;
      overflow-wrap: break-word;
      overflow-x: hidden;
   }

   ul.messages li.message {
      font-weight: 300;
      font-size: 14px;
      color: white;
      width: 100%;
      text-align: left;
      transition: all 0.35s ease;
      direction: ltr;
      text-shadow: -1px -1px 0 rgb(0 0 0 / 20%), 1px -1px 0 rgb(0 0 0 / 20%), -1px 1px 0 rgb(0 0 0 / 20%), 1px 1px 0 rgb(0 0 0 / 20%);
   }

   li.message b.timestamp {
      color: white;
      font-weight: 1000 !important;
      margin: 0 5px;
      font-size: 12px !important;
      background: #fbc60c;
      padding: 2px 5px 3px 5px;
      letter-spacing: 0.85px;
      border-radius: 2.5px;
      text-shadow: none;
   }
</style>