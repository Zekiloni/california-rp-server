
const Player = mp.players.local;

Player.Attachment = null;

let AntiKeySpam = false;

const Controls = { 
   keyX: 0x58,
   keyL: 0x4C,
   keyY: 0x59
};


// BLACK SCREEN AFTER DEATH
mp.game.gameplay.setFadeOutAfterDeath(false); 


// DONT REMOVE WEAPON WHEN OUT OF AMMO
mp.game.weapon.unequipEmptyWeapons = false;
Player.setCanSwitchWeapon(false);


mp.events.addDataHandler({
   'logged': (entity, newValue, oldValue) => {
      if (entity && entity.remoteId === Player.remoteId) {
         Player.logged = newValue;
      }
   },

   'spawned': (entity, newValue, oldValue) => {
      if (entity && entity.remoteId === Player.remoteId) {
         Player.spawned = newValue;
      }
   },

   'Money': (entity, newCash, oldCash) => {
      if (entity && entity.remoteId === Player.remoteId) {
         Player.Money = newCash;
      }
   },

   'Job': (entity, newValue, oldValue) => {
      if (entity && entity.remoteId === Player.remoteId) {
         Player.Job = newValue;
      }
   },

   'Seatbelt': (entity, newValue, oldValue) => { 
      if (entity && entity.remoteId === Player.remoteId) { 
         Player.Seatbelt = newValue;
      }
   },

   'Duty': (entity, newValue, oldValue) => {
      if (entity && entity.remoteId === Player.remoteId) {
         Player.Duty = newValue;
      }
   },

   'Bubble': (entity, newValue, oldValue) => {
      if (entity && entity.remoteId === Player.remoteId && newValue != oldValue) {
         Player.Bubble = newValue;
         mp.gui.chat.push(JSON.stringify(Player.Bubble));
      }
   },

   'Interaction': (entity, newValue, oldValue) => {
      if (entity && entity.type == 'player') {
         if (newValue !== oldValue) { 
            Interaction(entity, newValue);
         }
      }
   }
});



mp.events.add({

   'entityStreamIn': (entity) => { 
      if (entity.type === 'player') Interaction(entity, entity.getVariable('Interaction'));

   },

   'client:player:freeze': (toggle) => {
      Player.freezePosition(toggle);
   },

   'client:player:rotate': (value) => {
      Player.setHeading(value);
   },
});


// INTERACTIONS :: REMOVE ATTACHMENT
mp.keys.bind(Controls.keyX, false, async function () {
   if (Player.logged && Player.spawned) { 
      if (mp.players.local.isTypingInTextChat) return;
      if (Player.getVariable('Interaction') != null) {
         const response = await mp.events.callRemoteProc('server:player.interaction:stop');
         Player.Attachment = response;
      }
   }
});


// INTERACTIONS :: LOCK
mp.keys.bind(Controls.keyL, false, async function () {
   if (Player.logged && Player.spawned && Player.isTypingInTextChat == false) { 
     if (AntiKeySpam) return;

      mp.events.callRemote('server:interactions:lock');

      AntiKeySpam = true;
      setTimeout(() => { AntiKeySpam = false; }, 4000);
   }
});



mp.keys.bind(Controls.keyY, false, () => {
   if (!Player.logged || !Player.spawned || Player.isTypingInTextChat || Player.Cuffed) return;
   if (AntiKeySpam) return;

   if (Player.vehicle) { 

      mp.events.callRemote('server:vehicle:windows', Player.vehicle);

      AntiKeySpam = true;
      setTimeout(() => { AntiKeySpam = false; }, 2000);

   } else { 
      let Vehicle = null;

      mp.vehicles.forEachInRange(Player.position, 4.5, (NearbyVehicle) => { 
         Vehicle = NearbyVehicle;
      });
   
      if (Vehicle) { 
   
         const Bones = { 'boot': -1.35, 'bonnet': 2.0 };
   
         const Position = Player.position;
         
         for (const Bone in Bones) { 
            const Offset = Bones[Bone];
   
            const {x, y, z} = Vehicle.getWorldPositionOfBone(Vehicle.getBoneIndexByName(Bone));
      
            const Distance = mp.game.gameplay.getDistanceBetweenCoords(Position.x, Position.y, Position.z, x, y + Offset, z, true);
   
            // TEST MARKER
            // mp.markers.new(0, new mp.Vector3(x, y + Offset, z - 0.35), 0.4, { rotation: new mp.Vector3(0, 0, 0), color: [196, 12, 28, 195], visible: true, dimension: Player.dimension });
            
            if (Distance < 1.35) { 
               mp.events.callRemote('server:vehicle:interaction', Vehicle, Bone);
         
               AntiKeySpam = true;
               setTimeout(() => { AntiKeySpam = false; }, 2000);
            } 
         }
      }
   }
});



function Interaction (entity, value) { 
   if (value) { 
      try { 
   
         entity.Attachment = mp.objects.new(mp.game.joaat(value.Model), entity.position, {
            rotation: entity.rotation,
            alpha: 255,
            dimension: entity.dimension
         });
   
         entity.Attachment.notifyStreaming = true;
         utils.WaitEntity(entity.Attachment).then(() => {
            const Bone = entity.getBoneIndex(value.Bone);
            entity.Attachment.attachTo(entity.handle, Bone, value.Offset.X, value.Offset.Y, value.Offset.Z, value.Offset.rX, value.Offset.rY, value.Offset.rZ, true, true, false, false, 0, value.Rotation || false);
         })
      } catch (e) { 
         JSON.stringify(e);
      }
   }
   else {
      if (entity.Attachment) { 
         if (mp.objects.at(entity.Attachment.id)) { 
            entity.Attachment.destroy();
         }
      }
   }
}



