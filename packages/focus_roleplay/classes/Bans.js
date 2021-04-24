

class Bans { 
   constructor () { 
      mp.events.add({
         'playerJoin': (player) => { 
            this.check(player)
         }
      })
   }


   check = (player) => { 
      // uzima poslednji ban iz tabele banovi i proverava ga
      db.query('SELECT * FROM `bans` WHERE `ip` = ? OR `social_club` = ? ORDER BY `id` DESC LIMIT 1', [player.ip, player.socialClub], function (err, res, fields) { 
         if (err) return core.terminal(1, 'Check BAN ', + err);
         core.terminal(3, '[BAN CHECK] ' + player.socialClub);
         if (res && res.length > 0) { 
            let ban = res[0], now = Date.now(), expire = parseInt(ban.expire_date), days = now - expire;
            if (expire >= now) { 
               // neka ga nek igra majku mu jebem
            } else { 
               player.call('client:login.banned', [ban]);
               setTimeout(() => { player.kick('Banovan'); }, 10000);
            }
         } else { 
         }
      })
   }

   add = (player, target, reason, days) => { 
      let currentDate = Date.now(), expireDate = currentDate + (86400 * banDays);
      db.query('')
   }
}

mp.bans = new Bans();

