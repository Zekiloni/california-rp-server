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
         player.defaultVariables();

         player.dimension = 0;
         let position = JSON.parse(info.last_position);

         let char = new Character({
            character: character, account: player.account, first_name: info.first_name, last_name: info.last_name,
            birth: info.birth_date, sex: parseInt(info.sex), origin: info.origin, faction: info.faction, rank: info.faction_rank, leader: info.faction_leader,
            frequency: info.radio_frequency, job: info.job, salary: info.salary, bank_account: info.bank_account,
            hunger: info.hunger, thirst: info.thirst, licenses: JSON.parse(info.licenses), weapon_skill: info.weapon_skill,
            driving_skill: info.driving_skill, job_skill: info.job_skill, screenshot: info.screenshot, experience: info.experience,
            hours: info.hours_played, health: info.health, armour: info.armour, last_postion: new mp.Vector3(position.x, position.y, position.z),
            spawn_point: info.spawn_point
         })  

         char.spawn(player);
         char.setName(player);
         char.setMoney(player, info.money);

         db.query('SELECT * FROM `appearances` WHERE `character` = ?', [player.character], function (err, res, field) {
            if (err) return core.terminal(1, 'Appearances Loading Error ' + err);
         
            let char = res[0];
            let charSkin = new Appearance({
               gender: info.sex, blendData: JSON.parse(char.blend_data), hair: JSON.parse(char.hair),
               beard: JSON.parse(char.beard), eyeColor: char.eye_color, faceFeatures: JSON.parse(char.face_features)
            });
            charSkin.load(player);

            let charClothes = new Clothing({
               mask: JSON.parse(char.mask), torso: char.torso, undershirt: JSON.parse(char.undershirt), shirt: JSON.parse(char.shirt),
               legs: JSON.parse(char.legs), shoes: JSON.parse(char.shoes), bags: JSON.parse(char.bags), armour: JSON.parse(char.body_armours),
               accessories: JSON.parse(char.accessories), hat: JSON.parse(char.hats), glasses: JSON.parse(char.glasses), 
               ears: JSON.parse(char.ears), watch: JSON.parse(char.watches), bracelet: JSON.parse(char.bracelet)
            })

            charClothes.load(player);
         })

      });
   },

   'server:create.character': (player, character) => {      
      let characterData = JSON.parse(character);
      
      db.query('INSERT INTO `characters` (master_account, first_name, last_name, sex, birth_date, origin) VALUES (?, ?, ?, ?, ?, ?)', [player.account, characterData.firstname, characterData.lastname, characterData.gender, characterData.birth, characterData.origin, characterData.cash], function (err, result, fields) {
         if (err) core.terminal(1, 'Creating Character ' + err);
         
         let created = new Character({
            account: player.account, character: result.insertId, name: characterData.firstname, lname: characterData.lastname, sex: characterData.gender, birth: characterData.birth, origin: characterData.origin, 
         })

         player.character = result.insertId;
         player.name = characterData.firstname + ' ' + characterData.lastname;
         player.dimension = 0;
         player.position = mp.settings.defaultSpawn;
         player.defaultVariables();
         mp.bank.create(player);

         let string = `["0", "0"]`;
         db.query('INSERT INTO `appearances` (`character`, `blend_data`, `face_features`, `head_overlays`, `head_overlays_colors`, `hair`, `beard`, `torso`, `shirt`, `undershirt`, `legs`, `shoes`, `bags`, `accessories`, `bracelet`, `watches`, `ears`, `glasses`, `mask`, `hats`, `body_armours`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
         [ player.character, JSON.stringify(characterData.blendData), JSON.stringify(characterData.faceFeatures), JSON.stringify(characterData.headOverlays), JSON.stringify(characterData.headOverlaysColors), JSON.stringify(characterData.hair), JSON.stringify(characterData.beard), JSON.stringify(characterData.torso), JSON.stringify(characterData.clothing[0]), JSON.stringify(characterData.clothing[1]), JSON.stringify(characterData.clothing[2]), JSON.stringify(characterData.clothing[3]), string, string, '["255", "255"]', '["255", "255"]', '["255", "255"]', '["255", "255"]', '["255", "255"]', '["255", "255"]', string], function (err, res, fields) { // VIDETI SA ZEKIJEM
            if (err) core.terminal(1, 'Creating Character Appearance ' + err);

            let newCharSkin = new Appearance({
               gender: characterData.gender, blendData: characterData.blendData, hair: characterData.hair,
               beard: characterData.beard, eyeColor: 0, faceFeatures: characterData.faceFeatures // FALI characterData.eyeColor
            });

            newCharSkin.load(player);
            
            let newCharClothes = new Clothing({
               mask: characterData.mask, torso: characterData.torso, undershirt: characterData.clothing[1], shirt: characterData.clothing[0],
               legs: characterData.clothing[2], shoes: characterData.clothing[3]
            });
            newCharClothes.load(player);
         });

      });
   
      player.sendMessage(MSG_WELCOME_ON_REGISTER, mp.colors.info);
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

               // settnig money because of data handler requrie change
               player.data.money = 0;
               player.dimension = player.id;

               let acc = new Account({
                  id: userID, username: result[0].username, register_date: result[0].registered_at, admin: result[0].admin,
                  ip: player.ip, donator: result[0].donator, last_login: result[0].last_login_at, warns: result[0].warns,
                  coins: result[0].coins, email: result[0].email_adress, social: result[0].social_club
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
