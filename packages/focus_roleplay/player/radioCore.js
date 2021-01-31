
module.exports = { 
   create: function (player, freq, password = 0) { 
      db.query("INSERT INTO `radio_frequencies` (frequency, password, owner) VALUES (?, ?, ?)", [freq, password, player.databaseID], function (error, results, fields) {
         if (error) return core.terminal(1, error);
         let pw;
         if (password == 0 ) { pw = 'nema'}
         player.outputChatBox(`Radio frekvencija kreirana ${freq} sa sifrom ${pw}.`);
         player.radioFreq = freq;
      });
   },

   exist: function (freq) { 
   },

   delete: function (player, freq) { 

   },

   join: function (player, freq, password = 0) { 
      db.query("SELECT * FROM `radio_frequencies` WHERE `ID` = ?", [freq], function (error, result, fields) {
         if (error) return core.terminal(1, error);
         
         if (result.length > 0) {
            if(result[0].password != 0) { 
               if(result[0].password == password) { 
                  player.radioFreq = freq;
                  player.outputChatBox(`Uspesno ste se pridruzili frekvenciji ${freq}.`);
               }
               else { 
                  player.outputChatBox(`Sifra frekvencije nije tacna.`);
               }
            }
         }
         else { 
            player.outputChatBox(`Frekvencija ne postoji.`);
         }
      });
   },

   send: function (player, freq, message) { 

   }
}