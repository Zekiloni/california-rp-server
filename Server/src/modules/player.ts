import { logs, bans, characters, accounts, items, inventories, apppearances, banks } from '@models';
import { playerConfig, serverConfig } from '@configs';


export const lobbySettings = () => {
   return playerConfig.main.lobby;
}


export const creatorSettings = () => { 
   return playerConfig.main.creator;
}


export function playerChatHandler (player: PlayerMp, content: string) {
   player.character!.onChat(player, content)
}


export async function playerJoinHandler (player: PlayerMp) {
   const isBanned = await bans.isBanned(player);

   if (isBanned) {
      // PORUKA: Banovan
      // kick...
   }
}


export function playerSelectCharacter (player: PlayerMp, characterId: number, point: spawnTypes) {
   characters.findOne( { where: { id: characterId }, include: [apppearances, banks] } ).then(character => {
      character!.spawnPlayer(player, point);
   })
}


export function playerDeathHandler (player: PlayerMp, reason: number, killer: PlayerMp | null | undefined) {
   player.character!.onDeath(player, reason, killer);
}


export async function playerQuitHadnler (player: PlayerMp, exitType: string, reason: string | null) {
   const leavingPlayer = player;

   try { 
      if (leavingPlayer.character) {
         leavingPlayer.character.last_position = leavingPlayer.position;
         leavingPlayer.character.last_dimension = leavingPlayer.dimension;

         await leavingPlayer.character.save();
         
         inventories.unequipWeapons(leavingPlayer.character);

         console.log('saved char ' + leavingPlayer.character.name);
      }
   } catch (e) { 
      logs.error('playerQuitHadnler: ' + e);
   }

}


export function playerModelChange (entity: EntityMp, oldModel: number) {
   if (entity.type == 'player') { 
      (<PlayerMp>entity).call('CLIENT::WEAPON:CONFIG');
   }
}

mp.Player.prototype.sendNotification = function (message: string, type: number, time: number = 4) {
   this.call('CLIENT::NOTIFICATION', [message, type, time]);
};


mp.Player.prototype.sendHint = function (key: string, message: string, time: number) {
   this.call('CLIENT::HINT', [key, message, time]);
};


mp.Player.prototype.sendMessage = function (message: string, color: string) {
   this.outputChatBox('!{' + color + '}' + message);
};


mp.players.find = (searchQuery: any): PlayerMp => {
   if (!isNaN(searchQuery)) {
      return mp.players.at(searchQuery)
   } else { 
      const found = mp.players.toArray().find(player => player.name.toLowerCase() == searchQuery.toLowerCase());
      if (found) {
         return found;
      } else { 
         return mp.players.toArray().find(player => player.name.toLowerCase().includes(searchQuery.toLowerCase()))!;
      }
   }
};


export function updatePlayer (player: PlayerMp) {
   player.character!.increment('minutes', { by: serverConfig.happyHours == true ? 2 : 1 }).then(async character => { 
      if (character.minutes >= 60) { 
         character.increment('hours', { by: 1 });
         character.minutes = 0;
         await character.save();
      }
   });
   
   player.character!.increment('hunger', { by: -0.35 });
   player.character!.increment('thirst', { by: -0.70 });

   if (player.character!.muted > 0) {
      player.character.increment('muted', { by: -1 });
   }
}