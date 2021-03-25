const Account = require("./Account");

class Authentication { 
   constructor() { 
      mp.events.add({
         'playerJoin': (player) => { 
            player.call('client:login.show')
         },

         'server:login.handle': (player, username, password) => { 
            db.query('SELECT * FROM `users` WHERE `username` = ?', [username], function (err, result, fields) {
               if (err) return core.terminal(1, 'Login.handle Error ' + err)
               if (result.length > 0) { 
                  if (result[0].password == password) { 
                     let userID = result[0].id;
                     player.sqlid = userID;
                     player.account = new Account({
                        sqlid: userID,
                        username: result[0].username,
                        regDate: result[0].registered_at,
                        admin: result[0].admin,
                        xp: result[0].xp,
                        ip: player.ip,
                        hours: result[0].hours,
                        donator: result[0].donator
                     })
                     
                     let values = { 
                        ip_adress: player.ip,
                        last_login_at: core.timeDate(),
                        online: 1
                     }

                     db.query('UPDATE `users` SET ? WHERE id = ?', [values, player.sqlid], function (er, re) {
                        if (er) return core.terminal(1, 'Updating Acccount Error ' + er);
                      });

                     db.query('SELECT * FROM `characters` WHERE `master_account` = ?', [userID], function (error, res, fs) {
                        if (error) return core.terminal(1, 'Gettings Characters Error ' + error);
                        player.call('client:login.status', [3, res])
                     });
                     
                  } else { 
                     player.call('client:login.status', [1])
                  }
               } else { 
                  player.call('client:login.status', [2])
               }
            });
         },
      })
   }
}

new Authentication;

