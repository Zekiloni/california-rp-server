

const Player = mp.players.local;
let browser = null, opened = false;

mp.events.add({
   'client:player.clothing:show': () => {
      opened = !opened;
      if (opened) { 
         browser = mp.browsers.new('package://business/clothing-interface/clothing.html');
         Player.BrowserControls(true, true);
         mp.events.call('client:player.camera:inFront', true);
      } else { 
         browser.destroy();
         Player.BrowserControls(false, false);
         mp.events.call('client:player.camera:inFront', false);
      }
   },

   'render': () => { 
      if (browser && opened) { 
         let heading;
         if (mp.keys.isDown(65) === true) {
            heading = Player.getHeading();
            Player.setHeading(heading - 2)
         } else if (mp.keys.isDown(68) === true) {
            heading = Player.getHeading();
            Player.setHeading(heading + 1.5)
         }
      }
   },

   'client:player.clothing:drawable': (x, y, i) => { 
      let max = Player.getNumberOfDrawableVariations(y);
      Player.setComponentVariation(y, i, 0, 2);
      browser.execute('clothing.clothings[\"' + x + '\"].max.value = ' + max);
   },

   'client:player.clothing:texture': (x, y, z, i) => { 
      Player.setComponentVariation(y, i, z, 2);
      let max = mp.game.invoke('0x8F7156A3142A6BAD', Player.handle, y, i);
      mp.gui.chat.push('max is ' + max)
      browser.execute('clothing.clothings[\"' + x + '\"].max.texture = ' + max);
      // let max = mp.game.invoke('0xA6E7F1CEB523E171', Player, x, z); // FOR PROPS
   }
})





