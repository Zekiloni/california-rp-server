import { distanceBetweenVectors } from "../../utils";


const nameTagsConfig = {
   MAX_PLAYERNAME: 7,
   ADMIN_WALLHACK_LEVEL: 2,
}


let nameTagsSettings = {
   adminWallhack: false
}


const getAdminLevel = (player: PlayerMp) => {
   return player.getVariable('ADMINSTRATOR');
};


const isPlaying = (player: PlayerMp) => {
   return player.getVariable('PLAYING');
}


const getPlayerChat = (player: PlayerMp) => {
   return player.isTypingInTextChat;
}


const drawNametag = (player: PlayerMp) => {
   if (mp.players.local.dimension == player.dimension) {
      const distance = distanceBetweenVectors(mp.players.local.position, player.position);
      const isVisible = player.getAlpha() != 0;
      const isChatting = getPlayerChat(player);
      
      if ((distance < nameTagsConfig.MAX_PLAYERNAME) && isPlaying(player) && isVisible) {


         if (isChatting) {
            // 3 BIG_TEXT
            mp.game.invoke(RageEnums.Natives.Ui._CREATE_MP_GAMER_TAG)
         }
      }

   }
}


/**
*  Drawing GamerTags;
*  @param {NametagsMp} gTags
*/
const gamertags = (gTags: NametagsMp) => {
   mp.players.forEachInStreamRange(drawNametag);
};


/**
*  Handling tryAdminWallhack, returnig is change succeed;
*  @return {*}  {boolean}
*/
export function tryAdminWallhack (): boolean {
   const adminLevel = getAdminLevel(mp.players.local);
   
   if (adminLevel > nameTagsConfig.ADMIN_WALLHACK_LEVEL) {
      nameTagsSettings.adminWallhack = !nameTagsSettings.adminWallhack;
      return true;
   } else {
      return false;
   }
};



/**
*  Bindings for Keys
*/
mp.keys.bind(0x31, true, tryAdminWallhack);


/**
*  Registration of Events
*/
mp.events.add(RageEnums.EventKey.RENDER, gamertags);