
module.exports = { 
   create: async function (player, freq, password = 0) { 
      let already = await this.exist(freq);
      if (!already) { 
         db.query("INSERT INTO `radio_frequencies` (frequency, password, owner) VALUES (?, ?, ?)", [freq, password, player.databaseID], function (error, results, fields) {
            if (error) return core.terminal(1, error);
            let pw;
            if(freq < 222 || freq > 999) { 
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
      } 
      else { player.outputChatBox(`Radio frekvencija ${freq} vec postoji.`); }

   },

   exist: async function (freq) { 
      try { 
         let result = await db.aQuery("SELECT * FROM `radio_frequencies` WHERE `frequency` = ?", freq)
         if(result[0].frequency == freq) { 
            return true;
         }
         else { 
            return false;
         }
      } 
      catch (e) {
         return false;
      }
   },

   isOwner: async function (playerSQL, freq) { 
      try { 
         let result = await db.aQuery("SELECT * FROM `radio_frequencies` WHERE `frequency` = ?", freq)
         if(result[0].owner == playerSQL) { 
            return true;
         }
         else { 
            return false;
         }
      } catch (e) {
         return false;
      }
   },

   delete: async function (player, freq) { 
      let isOwner = await this.isOwner(player.databaseID, freq);
      if(isOwner) { 
         db.query("DELETE FROM `radio_frequencies` WHERE `frequency` = ?", [freq], function (error, result, fields) {
            if (error) return core.terminal(1, error)
            player.outputChatBox(`Uspesno ste izbrisali frekvenciju ${freq}.`);
         });
      }
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
         } 
         else { 
            player.outputChatBox(`Frekvencija ne postoji.`);
         }
      });
   },

   send: function (player, freq, message) { 
      if(freq == 0) return account.notification(player, MSG_NOT_IN_FREQ, NOTIFY_ERROR, 4);
      mp.players.forEach((target) => {
         if (target.radioFreq == freq) { 
            target.outputChatBox(`!{${CHAT_COLORS.RADIO}}** [CH: ${freq}] ${player.name}: ${message}`);
         } 
      })
   }
}