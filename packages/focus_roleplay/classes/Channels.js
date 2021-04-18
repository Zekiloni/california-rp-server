

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
      if (this.exist(freq)) return player.sendMessage(MSG_FREQUENCY_ALREADY_EXISTS, mp.colors.tomato); 
      if (character.frequency != 0) return player.sendMessage(MSG_ALREADY_IN_SOME_CHANNEL, mp.colors.tomato); 
      if (!freq) return player.sendMessage('Komanda /freq create [frekvencija] [sifra - opcionalno] !', mp.colors.help);
      db.query('INSERT INTO `channels` (frequency, password, owner) VALUES (?, ?, ?)', [freq, pass, character.id], function (error, results, fields) {
         if (error) return core.terminal(1, 'Frequency Creating ' + error);
         let frequency = new Frequency(freq, pass, character.id);
         character.frequency = freq;
      }); 
   }

   join = (player, freq, password = 0) => { 
      let character = player.getCharacter();
      if (character.frequency != 0) return player.sendMessage(MSG_ALREADY_IN_CHANNEL, mp.colors.tomato); 
      if (!this.exist(freq)) return player.sendMessage(MSG_FREQUENCY_NOT_FOUND, mp.colors.tomato); 
      if (mp.frequencies[freq]) { 
         let frequency = mp.frequencies[freq];
         if (frequency.password != 0 && frequency.password != password) return player.sendMessage(MSG_CHANNEL_WRONG_PASSWORD, mp.colors.tomato); 

         player.sendMessage( MSG_SUCCESSFULY_JOINED_CHANNEL+ freq + ' !', mp.colors.success); 
         character.frequency = freq;
      }
   }

   leave = (player) => { 
      let character = player.getCharacter(), exist = this.exist(character.frequency);
      if (character.frequency == 0) return false;
      if (exist) { 
         if (exist.owner == character.id) return player.sendMessage('Vi ste vlasnik ove frekvencije, /freq delete', mp.colors.tomato); 
         character.frequency = 0;
      } else { 
         character.frequency = 0;
      }
      player.sendMessage('Uspešno ste napustili frekvenciju.', mp.colors.success); 
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
