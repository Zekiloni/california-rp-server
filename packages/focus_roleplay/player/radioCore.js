
module.exports = { 
   create: function (player, freq, password = 0) { 
      db.query("INSERT INTO `radio_frequencies` (frequency, password, owner) VALUES (?, ?, ?)", [freq, password, player.databaseID], function (error, results, fields) {
         if (error) return core.terminal(1, error);
         let pw;
         if(freq < 222 || freq > 4000) { 
            player.outputChatBox(`Frekvencije se krecu od 222 do 999 !`);
            return false;
         } 
         if(isNaN(freq)) { 
            player.outputChatBox(`Frekvencije su samo brojevi !`);
            return false;
         }
         if (password == 0 ) { pw = 'nema'; }
         else { 
            pw = password;
         }
         player.outputChatBox(`Radio frekvencija kreirana ${freq} sa sifrom ${pw}.`);
         player.radioFreq = freq;
      });
   },

   exist: function (freq) { 
   },

   delete: function (player, freq) { 

   },

   join: function (player, freq, password = 0) { 
      db.query("SELECT * FROM `radio_frequencies` WHERE `frequency` = ?", [freq], function (error, result, fields) {
         if (error) return core.terminal(1, error);

         if (result.length > 0) {
            if(result[0].password != 0) { 
               if(result[0].password == password) { 
                  player.radioFreq = freq;
                  player.outputChatBox(`Uspesno ste se pridruzili frekvenciji ${freq}.`);
               } else { 
                  player.outputChatBox(`Sifra frekvencije nije tacna.`);
               }
            }
         } else { 
            player.outputChatBox(`Frekvencija ne postoji.`);
         }
      });
   },

   send: function (player, freq, message) { 
      if(freq == 0) return  player.outputChatBox(`Niste ni u jednoj frekvenciji.`);
      mp.players.forEach((target, id) => {
         if (target.radioFreq == freq) { 
            target.outputChatBox(`!{${CHAT_COLORS.RADIO}}** [CH: ${freq}] ${player.name}: ${message}`);
         } 
      })
   }
}