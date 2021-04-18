

mp.frequencies = {};

class Frequency  { 
   constructor (freq, password, owner) { 
      this.frequency = freq;
      this.password = password || 0;
      this.owner = owner;

      mp.frequencies[this.frequency] = this;
   }
}


class Channels { 
   load = () => { 
      let counter = 0;
      db.query("SELECT * FROM `channels`", function (err, result, fields) { 
         if (err) return core.terminal(1, 'Channels Loading Error ' + err);
         if (result.length > 0) { 
            result.forEach(ch => {
               let freq = new Frequency(ch.frequency, ch.password, ch.owner);
               counter ++;
            });
         }
         core.terminal(3, counter + ' Channels loaded')
      })
   }

   create = (player, freq, pass = 0) => { 
      let character = player.getCharacter();
      if (this.exist(freq)) { player.sendMessage('Frekvencija već postoji !', mp.colors.tomato); return false; };
      if (character.frequency != 0) { player.sendMessage('Već ste u nekoj frekvenciji !', mp.colors.tomato); return false; };
      let frequency = new Frequency(freq, pass, character.id);
      character.frequency = freq;
   }

   join = (player, freq, password = 0) => { 
      let character = player.getCharacter();
      if (character.frequency != 0) return player.sendMessage('Već ste u nekoj frekvenciji !', mp.colors.tomato);
      if (!this.exist(freq)) return player.sendMessage('Frekvencija ne postoji !', mp.colors.tomato);
      if (mp.frequencies[freq]) { 
         let frequency = mp.frequencies[freq];
         if (frequency.password && frequency.password != password) { 
            player.sendMessage('Šifra frekvencije nije tačna !', mp.colors.tomato);
            return false;
         }

         player.sendMessage('Uspešno ste se pridružilii frekvenciji ' + freq + ' !', mp.colors.success);
         character.frequency = freq;
      }
   }

   send = (freq, message) => { 
      if (mp.frequencies[freq]) { 
         mp.players.forEach((target) => {
            if (target.data.logged && target.data.spawned) { 
               let char = target.getCharacter();
               if (char.frequency == freq) { 
                  target.sendMessage(message, mp.colors.radio);
               }
            }
         })
      }
   }

   exist = (freq) => { 
      if (mp.frequencies[freq]) {
         return mp.frequencies[freq];
      } else { 
         return false;
      }
   }
}

mp.channels = new Channels();

mp.channels.load()
