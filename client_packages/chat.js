
mp.gui.chat.show(false);
let chatAPI = mp.browsers.new('package://chat-ui/index.html');
chatAPI.markAsChat();

mp.keys.bind(0x1B, true, function() {
   mp.gui.chat.push('aaaa')
   if (mp.players.local.isTypingInTextChat) { 
      mp.gui.chat.push('aaaa 2')
      mp.events.call('chat:activate');
   }
});

