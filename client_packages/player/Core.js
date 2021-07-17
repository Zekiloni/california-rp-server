
const Player = mp.players.local;

Player.Attachment = null;

mp.nametags.enabled = false;


const screenRes = mp.game.graphics.getScreenActiveResolution(100, 100);


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

   'Attachment': (entity, valueNew, valueOld) => {
      if (valueNew !== valueOld) { 
         if (valueNew) { 
            Attachments.Add(entity, valueNew);
         } else { 
            Attachments.Remove(entity);
         }
      }
   }
});



mp.events.add({

   'entityStreamIn': (entity) => { 
      if (entity.Attachment) { 
         Attachments.StreamIn(entity, entity.getVariable('Attachment'));
      }
   },

   'render': () => { 
      if (Player.logged && Player.spawned) { 
         mp.players.forEach((Target) => { 

            const TargetPosition = Target.position;
            const PlayerPosition = Player.position;

            const Distance = new mp.Vector3(PlayerPosition.x, PlayerPosition.y, PlayerPosition.z).subtract(new mp.Vector3(TargetPosition.x, TargetPosition.y, TargetPosition.z)).length();
            
            if (Distance < 8 && Player.id != Target.id && Player.hasClearLosTo(Target.handle, 17)) {
               if (Target.getAlpha() != 0) { 
                  
                  const Index = Target.getBoneIndex(12844)
                  const NameTag = Target.getWorldPositionOfBone(Index);

                  const Position = mp.game.graphics.world3dToScreen2d(new mp.Vector3(NameTag.x, NameTag.y, NameTag.z + 0.4));

                  if (Position) { 
                     let x = Position.x;
                     let y = Position.y;

                     let scale = (Distance / 25);
                     if (scale < 0.6) scale = 0.6;
                     
                     y -= (scale * (0.005 * (screenRes.y / 1080))) - parseInt('0.010');

                     if (Target.hasVariable('Bubble') && Target.getVariable('Bubble')) { 
                        const BubblePosition = mp.game.graphics.world3dToScreen2d(new mp.Vector3(NameTag.x, NameTag.y, NameTag.z + 0.65));
                        if (BubblePosition) { 
                           const Bubble = Target.getVariable('Bubble');
                           mp.game.graphics.drawText('* ' + Target.name + ' ' + Bubble.Content + '.', [BubblePosition.x, BubblePosition.y], {
                              font: 4,
                              color: Bubble.Color,
                              scale: [0.325, 0.325],
                              outline: false
                           });
                        }
                     }

                     const Content = Target.name + ' [' + Target.remoteId + ']';
   
                     mp.game.graphics.drawText(Content, [x, y], {
                        font: 4,
                        color: [255, 255, 255, 255],
                        scale: [0.325, 0.325],
                        outline: false
                     });
                  }

               }
            }

         });

      }
   },

   'entityStreamOut': (entity) => { 
      if (entity.Attachment) { 
         Attachments.StreamOut(entity);
      }
   },

   'client:player:freeze': (toggle) => {
      Player.freezePosition(toggle);
   },

   'client:player:rotate': (value) => {
      Player.setHeading(value);
   },

   'client:request:ipl': (ipl) => { 
      mp.game.streaming.requestIpl(ipl);
   }
});


// INTERACTIONS :: REMOVE ATTACHMENT
mp.keys.bind(Controls.keyX, false, async function () {
   if (Player.logged && Player.spawned) { 
      if (Player.isTypingInTextChat) return;
      if (Player.getVariable('Attachment') != null) {
         const response = await mp.events.callRemoteProc('server:character.attachment:remove');
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


mp.events.addProc({
   'client:player.vehicle:class': () => { 
      if (Player.vehicle) { 
         return Player.vehicle.getClass()
      } else { 
         return null;
      }
   }
});


const Attachments = { 

   StreamIn: function (entity, attachment) { 
      if (attachment) { 
         Attachments.Add(entity, attachment);
      }
   },

   StreamOut: function (entity) { 
      Attachments.Remove(entity);
   },

   Add: function (entity, value) { 

      entity.Attachment = mp.objects.new(mp.game.joaat(value.Model), entity.position, {
         rotation: entity.rotation,
         alpha: 255,
         dimension: entity.dimension
      });

      utils.WaitEntity(entity.Attachment).then(() => {
         const Bone = entity.getBoneIndex(value.Bone);
         entity.Attachment.attachTo(entity.handle, Bone, value.Offset.X, value.Offset.Y, value.Offset.Z, value.Offset.rX, value.Offset.rY, value.Offset.rZ, true, true, false, false, 0, value.Rotation || false);
      })

   },

   Remove: function (entity) { 
      let Object = entity.Attachment;
      if (Object && mp.objects.exists(Object)) { 
         Object.destroy();
      }
   }
   
};


