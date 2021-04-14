

const player = mp.players.local;

mp.events.add({
   'entityStreamIn': (entity) => {
   },

   'client:player.animation': (animation, dictionary) => {
      mp.gui.chat.push('pozvao');
      mp.game.streaming.requestAnimDict(dictionary);
      while (!mp.game.streaming.hasAnimDictLoaded(dictionary)) mp.game.wait(0);
      player.taskPlayAnim(dictionary, animation, 8.0, 0.0, -1, 0, 0.0, false, false, false);
      
   }
})


// while (!mp.game.streaming.hasAnimDictLoaded(animDict)) mp.game.wait(0);
// player.taskPlayAnim(animDict, animName, 8.0, 0.0, -1, 0, 0.0, false, false, false);


// mp.gui.chat.push('pozvao');
// let dictLoaded = requestAnimDict(dictionary);
// if (dictLoaded) { 
//    mp.gui.chat.push('ucitao i animacija ide');
//    //player.playAnim(animation, dictionary, 1000.0, false, true, false, 0, 131072);
//    player.taskPlayAnim(dictionary, animation, 8, 8, duration, flag, startOffset, lockX, lockY, lockZ);
//    mp.gui.chat.push('prosao');
// }

const requestAnimDict = string => {
   mp.game.streaming.requestAnimDict(string);
   return new Promise(r => {
     const timer = setInterval(() => {
       if (mp.game.streaming.hasAnimDictLoaded(string)) {
         clearInterval(timer);
         r(true);
       }
     }, 50);
   });
}

// table.getAnimCurrentTime(tableLib, "intro_wheel") > 0.9425)