

import { playerJoinHandler, playerQuitHadnler, playerChatHandler, playerDeathHandler, playerSelectCharacter, lobbySettings, creatorSettings, updatePlayer, playerModelChange } from '../modules/player';
import { serverConfig } from '@configs';


mp.events.add(
   {
      'playerJoin': playerJoinHandler,

      'playerQuit': playerQuitHadnler,

      'playerChat': playerChatHandler,

      'playerDeath': playerDeathHandler,

      'entityModelChange': playerModelChange,

      'SERVER::CHARACTER:PLAY': playerSelectCharacter
   }
);

mp.events.addProc(
   {
      'SERVER::PLAYER:LOBY': lobbySettings,

      'SERVER::CREATOR:INFO': creatorSettings,
      
   }
)

mp.events.addProc(
   {


      'SERVER::AUTHORIZATION:VERIFY': (player: PlayerMp, username: string, password: string) =>  {
         return Accounts.findOne({ where: { username: username }, include: Characters }).then(account => {
            if (!account) {
               player.sendNotification(Messages.USER_DOESNT_EXIST, notifyType.ERROR, 5);
               return;
            }

            const logged = account.login(password);

            if (!logged) { 
               player.sendNotification(Messages.INCCORRECT_PASSWORD, notifyType.ERROR, 5);
               return;
            }

            account.setLogged(player, true);

            return account;
         })
      },

      'SERVER::CHARACTER:SPAWNS': async (player: PlayerMp, id: number): Promise<spawnPoint[]> => { 
         return new Promise((resolve) => {

            let spawnPoints: spawnPoint[] = [];

            Characters.findOne({ where: { id: id } }).then((character) => { 
               const defaultSpawn: spawnPoint = getDefaultSpawn();
               spawnPoints.push(defaultSpawn);
   
               if (character?.faction) {
                  // push factionn spawn
               }
               
               // if (character?.houses) { }
      
               if (character?.last_position) { 
                  spawnPoints.push({
                     name: Messages.LAST_POSITION,
                     type: spawnTypes.lastPosition,
                     description: Messages.LAST_POSITION_DESCRIPTION,
                     position: new mp.Vector3(character.last_position.x, character.last_position.y, character.last_position.z),
                     heading: 0
                  })
               }
               resolve(spawnPoints);
            });
         });
      },

      'SERVER::CREATOR:FINISH': async (player: PlayerMp, characterInfo: string, characterAppearance: string) => { 

         const character = JSON.parse(characterInfo);
         const appearance = JSON.parse(characterAppearance);

         const alreadyExist = await Characters.findOne({ where: { name: character.name + ' ' + character.lastName } });

         if (alreadyExist) {
            player.sendNotification(Messages.CHARACTER_ALREADY_EXIST, notifyType.ERROR, 5);
            return;
         } 

         const createdCharacter = await Characters.create(
            { 
               name: character.name + ' ' + character.lastName,
               account_id: player.account.id,
               origin: character.origin, 
               birth: character.birth, 
               gender: character.gender
            }
         );

         Appearances.create(
            {
               character_id: createdCharacter.id, 
               character: createdCharacter, 
               face_features: appearance.face, 
               blend_data: appearance.blends, 
               overlays: appearance.overlays, 
               hair: appearance.hair, 
               beard: appearance.beard, 
               eyes: appearance.eyeColor
            }
         );

         createdCharacter.spawnPlayer(player, spawnTypes.default);

         Items.create({ name: itemData.Names.DOCUMENT_ID_CARD, quantity: 1, entity: itemData.Entity.PLAYER, owner: createdCharacter.id }).then(async item => {
            item!.data = {
               name: createdCharacter.name,
               birth: createdCharacter.birth,
               origin: createdCharacter.origin,
               gender: createdCharacter.gender
            };
            await item.save();
         });

         player.sendNotification(Messages.CHARACTER_CREATED, notifyType.SUCCESS, 4);
         return true;
      }
   }
);


const interval = 60 * 1000;


function minuteCheck() {
   
   const today = new Date();
   if (!serverConfig.freezeTime) {
      mp.world.time.set(today.getHours(), today.getMinutes(), today.getSeconds());
   }

   mp.players.forEach((player: PlayerMp) => {
      if (player.character) {
         updatePlayer(player);
      }
   });
   
   setTimeout(minuteCheck, interval);

};


minuteCheck();