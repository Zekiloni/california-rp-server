

const Player = mp.players.local;


let SendToServer = true;


mp.events.add({

   'incomingDamage': (sourceEntity, sourcePlayer, targetEntity, weapon, boneIndex, damage) => {
      if (targetEntity.id == Player.id) { 
         
         if (Player.getVariable('Wounded')) {

         } else { 
            let Injury = { Weapon: weapon, Bone: boneIndex };
   
            Damage.Effect(boneIndex);

            if (SendToServer) {
               mp.events.callRemote('server:character.injuries:add', JSON.stringify(Injury));
               SendToServer = false;
               setTimeout(() => { SendToServer = true; }, 1000);
            }
   
            if (Player.getHealth() - damage < damage) {
               mp.events.callRemote('server:character.wounded');
               return true;
            }
         }
      }
   }

});


const Damage = { 
   Check: function () { 
      if (Player.logged && Player.spawned) { 
         const Injuries = Player.getVariable('Injuries');
         if (Injuries.length > 0 && Player.getSpeed() > 5) { 
            if (Injuries.find(Element => Element.Bone == 4 || Element.Bone == 2)) {
               if (SendToServer) mp.events.callRemote('server:character.wounded:fall');
            }
         }
      }
   
      setTimeout(() => { Damage.Check(); }, 1000);
   },

   Effect: function (Bone) { 

      switch (Bone) { 
         case 20: { 
            mp.game.graphics.startScreenEffect('DefaultFlash', 1500, false);
            break;
         }

         default: {

         }
      }

   }
};

Damage.Check();



