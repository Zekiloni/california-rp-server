

mp.events.add("client:initCustomChat", () => {
   mp.gui.chat.show(false);
   const chatbox = mp.browsers.new('package://chat/chat-ui/index.html');
   chatbox.markAsChat();
})