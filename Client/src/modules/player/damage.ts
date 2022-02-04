import { entityType } from '../../enums/entity';




let SendToServer = true;


mp.events.add(RageEnums.EventKey.OUTGOING_DAMAGE, outgoingDamageHandler);


function outgoingDamageHandler (sourceEntity: EntityMp, targetEntity: EntityMp, sourcePlayer: PlayerMp, weapon: number, boneIndex: number, damage: number) {
   // mp.gui.chat.push(JSON.stringify(sourcePlayer.name))
   if (sourceEntity.type == entityType.PLAYER && sourcePlayer == mp.players.local) { 
      
      // if (Player.getVariable('Wounded')) {
      //    mp.gui.chat.push('wounded');

      // } else { 
      //    let Injury = { Weapon: weapon, Bone: boneIndex };

      //    PlayerDamage.Effect(boneIndex);

      //    mp.gui.chat.push('Nije wounded');

      //    if (SendToServer) {
      //       mp.events.callRemote('server:character.injuries:add', JSON.stringify(Injury));
      //       SendToServer = false;
      //       setTimeout(() => { SendToServer = true; }, 1000);
      //    }

      // //    if (Player.getHealth() - damage < damage) {
      // //       mp.gui.chat.push('Zadnji hitac')
      // //       return true;
      // //    }
      // }
   }
};


class PlayerDamage {
   static Check() { 
      if (Player.Logged && Player.Spawned) { 
         const Injuries: any[] = Player.getVariable('Injuries');
         if (Injuries.length > 0 && Player.getSpeed() > 5) { 
            if (Injuries.find(Element => Element.Bone == 4 || Element.Bone == 2)) {
               if (SendToServer) mp.events.callRemote('server:character.wounded:fall');
            }
         }
      }
   
      setTimeout(() => { PlayerDamage.Check(); }, 1000);
   }

   static Effect (Bone: number) { 

      switch (Bone) { 
         case 20: { 
            mp.game.graphics.startScreenEffect('DefaultFlash', 1500, false);
            break;
         }

         default: {

         }
      }

   }
}
   


//Damage.Check();



export {}