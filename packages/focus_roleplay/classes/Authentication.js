const Account = require('./Account');
const Character = require('./Character');

mp.events.add({
   'playerJoin': (player) => { 
      player.call('client:login.show')
   },

   'server:select.character': (player, character) => { 
      db.query('SELECT * FROM `characters` WHERE `id` = ?', [character], function (err, result, fields) {
         if (err) core.terminal(1, 'Selecting Character ' + err)
         let info = result[0];
         player.character = character;
         player.name = info.first_name + ' ' + info.last_name;
         new Character({
            id: character, account: info.master_account, name: info.first_name, lname: last_name, 
            sex: info.sex, birth: info.birth_date, origin, cash, salary, last_position, job, 
            faction, fation_rank, radio_frequency, thirst, hunger, stress, weapon_skill, driving_skill, licenses
         })

      });
   },

   'server:login.handle': (player, username, password) => { 
      db.query('SELECT * FROM `users` WHERE `username` = ?', [username], function (err, result, fields) {
         if (err) return core.terminal(1, 'Login.handle Error ' + err)
         if (result.length > 0) { 
            if (result[0].password == password) { 
               let userID = result[0].id;
               player.account = userID;
               player.data.logged = true;

               new Account({
                  sqlid: userID, username: result[0].username, regDate: result[0].registered_at, admin: result[0].admin,
                  xp: result[0].xp, ip: player.ip, hours: result[0].hours, donator: result[0].donator
               })
               
               let values = { 
                  ip_adress: player.ip,
                  last_login_at: core.timeDate(),
                  online: 1
               }

               db.query('UPDATE `users` SET ? WHERE id = ?', [values, player.account], function (err, re, fields) {
                  if (err) return core.terminal(1, 'Updating Acccount Error ' + err);
               });

               db.query('SELECT * FROM `users` WHERE id = ?', [player.account], function (err, res, fields) {
                  if (err) return core.terminal(1, 'SocialClub Check Acccount Error ' + err);
                  if (res[0].social_club == null) {
                     db.query('UPDATE `users` SET social_club = ? WHERE id = ?', [player.socialClub, player.account], function (error, res, field) { 
                        if (error) return core.terminal(1, 'SocialClub Updating Error ' + error);
                     })
                  }

                  if (res[0].hardwer_id == null) {
                     db.query('UPDATE `users` SET hardwer_id = ? WHERE id = ?', [player.serial, player.account], function (error, res, field) { 
                        if (error) return core.terminal(1, 'Hardwer ID Updating Error ' + error);
                     })
                  }
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
});
