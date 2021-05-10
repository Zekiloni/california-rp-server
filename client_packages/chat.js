
mp.gui.chat.show(false);
let chatAPI = mp.browsers.new('package://chat-ui/index.html');
chatAPI.markAsChat();

mp.keys.bind(0x1B, true, function() {
   mp.events.callRemote('keypress:F2'); // Calling server event "keypress:F2"
   mp.gui.chat.push('F2 key is pressed.');
});

