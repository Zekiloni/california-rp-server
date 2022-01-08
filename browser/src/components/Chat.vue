
<template>
   
   <div class="chat" v-if="Settings.Active">
      <ul class="messages" ref="Entries" id="messages">
         <li v-for="(message, i) in Messages" class="message" v-bind:style="{ fontSize: Settings.Fontsize + 'px', fontWeight: Settings.Fonweight, opacity: Inactive ? '0.5' : '1' }" v-bind:key="i">
            <b class="timestamp" v-if="Settings.Timestamp" v-html="timeStamp(message.timestamp)"> </b>
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
               ref="chatInput"
               maxlength="200"
               @keyup.esc="Close"
               @keydown.enter="Send"
               @blur="Close"
               @keyup.up="shiftHistory(1)"
               @keyup.down="shiftHistory(0)"
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

            Settings: { 
               Active: true,
               Fontsize: 15.5,
               Fonweight: 350,
               Width: 300,
               Height: 200,
               Timestamp: false,
            },

            Typing: false,
            Input: '',

            Inactive: false,

            Current: -1,
            History: [],
            Messages: []
         }
      },

      watch: {
         Messages: function (value) {
            // this.Update();
         }
      },

      methods: { 
         Activate: function (toggle) { 
            if (toggle == false && this.Typing) this.Typing = false, this.Input = '';
            this.Settings.Active = toggle;
         },

         Show: function (toggle) {
            this.Settings.Active = toggle;
         },

         Toggle: function (toggle) { 
            this.Typing = toggle;
            mp.invoke('focus', toggle);
            mp.invoke('setTypingInChatState', toggle);

            if (toggle) { 
               this.Inactive = false;
               this.$nextTick(() => { this.$refs.chatInput.focus(); });
            } else { 
               this.$refs.chatInput.blur();
               this.Input = '';
            }
         },

         Check: function () { 
            const Now = new Date();
            if (this.Messages.length > 0) {
               const LastMessage = this.Messages[this.Messages.length -1];
               const Last = new Date(LastMessage.timestamp);

               const diff = (Now.getTime() - Last.getTime()) / 1000;;
               if (diff > 60) { 
                  this.Inactive = true;
               } else { 
                  this.Inactive = false;
               }
            }

            setTimeout(() => { this.Check(); }, 1500);
         },


         Send: function () {
            let content = this.Input;
            this.Toggle(false);

            if (content && content.length > 0) {
               this.History.unshift(content);

               if (content[0] == '/') {
                  content = content.substr(1);
                  mp.invoke('command', content);
               } else if (content.includes('timestamp')) { 
                  this.Settings.Timestamp = !this.Settings.Timestamp;
               } else {
                  mp.invoke('chatMessage', content);
               }

               this.Current = -1
            }
         },

         shiftHistory: function (d) {
            if (this.History.length == 0) return;

            let Message = null;

            switch (d) {
               case 0: {
                  if (this.Current == -1) return;
                  this.Current --;
                  if (this.History[this.Current]) { 
                     Message = this.History[this.Current];
                  } else { 
                     Message = '';
                  }
                  break;
               }

               case 1: { 
                  if (this.Current == this.History.length -1) return;
                  this.Current ++;
                  Message = this.History[this.Current];
                  break;
               }
            }

            this.Input = Message;
         },

         Close: function () { 
            if (this.Active && this.Typing) { 
               this.Toggle(false);     
            }
         },

         timeStamp: function (i) { 
            const date = new Date(i);
            return date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() + ':' + (date.getSeconds() < 10 ? '0' : '') + date.getSeconds();
         },

         Clear: function () { 
            this.Messages = [];
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
      },
   
      mounted () {

         this.Push('Midnight Roleplay - www.mn-rp.com');

	      let events = {
            'chat:push': this.Push, 'chat:clear': this.Clear,
            'chat:activate': this.Activate, 'chat:show': this.Show
         }; 
   
         for (let i in events) {
            mp.events.add(i, events[i]);
         }

         this.Check();

         document.addEventListener('keydown', event => {
            if (event.keyCode === 84 && this.Settings.Active && !this.Typing) {
               this.Toggle(true);
               event.preventDefault();
            }
         });

      }
   }


</script>

<style scoped>

   .chat {
      max-width: 800px;
      height: 300px;
      position: absolute;
      top: 20px;
      z-index: 99;
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
      margin: 4px 0;
      width: 100%;
      text-align: left;
      transition: all 0.35s ease;
      direction: ltr;
      text-shadow: -1px -1px 0 rgb(0 0 0 / 20%), 1px -1px 0 rgb(0 0 0 / 20%), -1px 1px 0 rgb(0 0 0 / 20%), 1px 1px 0 rgb(0 0 0 / 20%);
   }

   li.message b.timestamp {
      color: white;
      font-weight: 250 !important;
      margin: 0 5px;
      font-size: 12px !important;
      background: rgb(22 22 22 / 70%);
      padding: 2px 7px 3px 7px;
      letter-spacing: 0.85px;
      border-radius: 2.5px;
      text-shadow: none;
   }
</style>