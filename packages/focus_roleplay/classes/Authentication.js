
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
                     db.query('SELECT * FROM `characters` WHERE `master_account` = ?', [userID], function (error, res, fs) {
                        if (error) return console.log(1, 'Gettings Characters Error ' + error)
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
      console.log('auth loaded')

   }
}

new Authentication;
