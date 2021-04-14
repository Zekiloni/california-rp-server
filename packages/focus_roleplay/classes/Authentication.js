const Account = require('./Account');
const { Character, Clothing, Appearance } = require('./Character');

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
         player.defaultVariables();

         new Character({
            id: character, account: info.master_account, name: info.first_name, lname: last_name, 
            sex: info.sex, birth: info.birth_date, origin, cash, salary, last_position, job, 
            faction, fation_rank, radio_frequency, thirst, hunger, stress, weapon_skill, driving_skill, licenses, clothing: clothing
         })       
         db.query('SELECT * FROM `appearances` WHERE characters_id = ?', [player.character], function (error, result, field) {
            if (error) return core.terminal(1, 'Appearances Loading Error ' + error);
            let clothing = new Clothing();
            clothing.blend_data =  result.blend_data;
            clothing.face_features = result.face_features;
            clothing.head_overlays = result.head_overlays;
            clothing.head_overlays_colors = result.head_overlays_colors;
            clothing.hair = result.hair;
            clothing.beard = result.beard;
            clothing.torso = result.torso;
            clothing.shirt = result.shirt;
            clothing.legs =  result.legs;
            clothing.bags = result.bags;
            clothing.shoes = result.shoes;
            clothing.accessories =  result.accessories;
            clothing.undershirt = result.undershirt;
            clothing.body_armours = result.body_armours;
            clothing.hats = result.hats;
            clothing.glasses =  result.glasses;
            clothing.ears = result.ears;
            clothing.watches =  result.watches;
            clothing.braclet = result.braclet;
            clothing.set();
         })
      });
   },

   'server:create.character': (player, character) => {      
      let characterData = JSON.parse(character), characterID;
      
      db.query('INSERT INTO `characters` (master_account, first_name, last_name, sex, birth_date, origin) VALUES (?, ?, ?, ?, ?, ?)', [player.account, characterData.firstname, characterData.lastname, characterData.gender, characterData.birth, characterData.origin, characterData.cash], function (err, result, fields) {
         if (err) core.terminal(1, 'Creating Character ' + err);
         
         let newChar = new Character({
            account: player.account, character: result.insertId, name: characterData.firstname, lname: characterData.lastname, sex: characterData.gender, birth: characterData.birth, origin: characterData.origin
         })
         
         player.character = result.insertId;
         player.name = characterData.firstname + ' ' + characterData.lastname;
         player.dimension = 0;
         player.position = mp.settings.defaultSpawn;
         player.defaultVariables();
      });
   
      // 14 
      db.query('INSERT INTO `appearances` ( characters_id, blend_data, face_features, head_overlays, head_overlays_colors, hair, beard, torso, legs, shirt, shoes, undershirt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [player.character, characterData.blendData, characterData.faceFeatures, characterData.headOverlays, characterData.headOverlaysColors, characterData.hair, characterData.beard, characterData.torso, JSON.stringify(characterData.clothing[2]), JSON.stringify(characterData.clothing[0]), JSON.stringify(characterData.clothing[3]), JSON.stringify(characterData.clothing[1]) ], function (err, result, fields) { // VIDETI SA ZEKIJEM
         if (err) core.terminal(1, 'Creating Character Appearance ' + err);
         // top, undershirt, bottoms, shoes
         let clothing = new Clothing();
         clothing.shirt = [character.clothing[0][0], character.clothing[0][1]];
         clothing.undershirt = [character.clothing[1][0], character.clothing[1][1]];
         clothing.bottoms = [character.clothing[2][0], character.clothing[2][1]];
         clothing.shoes = [character.clothing[3][0], character.clothing[3][1]];
         clothing.set();      
      });
      
      player.sendMessage('Dobrodošli na Focus Roleplay, uživajte u igri.', mp.colors.info)
   },

   'server:login.handle': (player, username, password) => { 
      db.query('SELECT * FROM `users` WHERE `username` = ?', [username], function (err, result, fields) {
         if (err) return core.terminal(1, 'Login.handle Error ' + err)
         if (result.length > 0) { 
            if (result[0].password == password) { 
               let userID = result[0].id;
               player.account = userID;
               player.data.logged = true;
               player.data.spawned = false;

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
