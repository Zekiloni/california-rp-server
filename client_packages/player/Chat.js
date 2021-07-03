

const Player = mp.players.local;

mp.gui.chat.show(false);
let Chat = mp.browsers.new('package://player/game-interface/chat.html');
Chat.markAsChat();

mp.keys.bind(0x76, true, function() {
   if (player.logged && player.spawned) { 
      Chat.execute('chat.Toggle = !chat.Toggle');
   }
});

