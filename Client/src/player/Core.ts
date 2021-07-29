import { WaitEntity, LoadMovementClipset, Controls } from "../Utils";


const Player = mp.players.local;

mp.nametags.enabled = false;

const screenRes = mp.game.graphics.getScreenActiveResolution(100, 100);

let AntiKeySpam = false;


// BLACK SCREEN AFTER DEATH
mp.game.gameplay.setFadeOutAfterDeath(false); 


// DONT REMOVE WEAPON WHEN OUT OF AMMO
mp.game.weapon.unequipEmptyWeapons = false;
Player.setCanSwitchWeapon(false);


mp.events.addDataHandler({
   'logged': (Entity: EntityMp, NewValue: boolean, OldValue: boolean) => {
      if (Entity && Entity.remoteId === Player.remoteId) {
         (<PlayerMp>Player).Logged = NewValue;
      }
   },

   'spawned': (Entity: EntityMp, NewValue: boolean, OldValue: boolean) => {
      if (Entity && Entity.remoteId === Player.remoteId) {
         Player.Spawned = NewValue;
      }
   },

   'Money': (Entity: EntityMp, NewValue: number, OldValue: number) => {
      if (Entity && Entity.remoteId === Player.remoteId) {
         Player.Money = NewValue;
      }
   },

   'Job': (Entity: EntityMp, NewValue: number, OldValue: number) => {
      if (Entity && Entity.remoteId === Player.remoteId) {
         Player.Job = NewValue;
      }
   },

   'Wounded': (Entity: EntityMp, NewValue: boolean, OldValue: boolean) => {
      if (Entity.type == 'player') {
         (<PlayerMp>Entity).Wounded = NewValue;
      }
   },

   'Seatbelt': (Entity: EntityMp, NewValue: boolean, OldValue: boolean) => { 
      if (Entity && Entity.remoteId === Player.remoteId) { 
         Player.Seatbelt = NewValue;
      }
   },
   
   'Ragdoll': (Entity: PlayerMp, NewValue: number, OldValue: number) => { 
      if (Entity.type == 'player' && NewValue != OldValue) { 
         Interactions.Ragdoll(Entity, NewValue);
      }
   },

   'Bubble': (Entity: PlayerMp, NewValue: string, OldValue: string) => {
      if (Entity.type == 'player' && NewValue != OldValue) {
         Player.Bubble = NewValue;
      }
   },

   'Walking_Style': (Entity: PlayerMp, NewValue: string, OldValue: number) => {
      if (Entity.type == 'player') {
         Interactions.WalkingStyle(Entity, NewValue);
      }
   },

   'Mood': (Entity: PlayerMp, NewValue: string, OldValue: number) => {
      if (Entity.type == 'player') {
         Interactions.FacialMood(Entity, NewValue);
      }
   },

   'Attachment': (Entity: PlayerMp, NewValue: number, OldValue: number) => {
      if (NewValue !== OldValue) { 
         if (NewValue) { 
            Attachments.Add(Entity, NewValue);
         } else { 
            Attachments.Remove(Entity);
         }
      }
   }
});



mp.events.add({

   'entityStreamIn': (Entity) => { 
      if (Entity.Attachment) { Attachments.StreamIn(Entity, Entity.getVariable('Attachment')); }
      if (Entity.type == 'player' && Entity.hasVariable('Walking_Style')) Interactions.WalkingStyle(Entity, Entity.getVariable('Walking_Style'));
      if (Entity.type == 'player' && Entity.hasVariable('Ragdoll')) Interactions.Ragdoll(Entity, Entity.getVariable('Ragdoll'));
      if (Entity.type == 'player' && Entity.hasVariable('Wounded')) Interactions.Ragdoll(Entity, Entity.getVariable('Wounded')); 
   },

   'render': () => { 
      if (Player.Logged && Player.Spawned) { 
         mp.players.forEach((Target) => { 

            const TargetPosition = Target.position;
            const PlayerPosition = Player.position;

            const Distance = new mp.Vector3(PlayerPosition.x, PlayerPosition.y, PlayerPosition.z).subtract(new mp.Vector3(TargetPosition.x, TargetPosition.y, TargetPosition.z)).length();
            
            if (Distance < 8 && Player.id != Target.id && Player.hasClearLosTo(Target.handle, 17)) {
               if (Target.getAlpha() != 0) { 
                  
                  const Index = Target.getBoneIndex(12844)
                  const NameTag = Target.getWorldPositionOfBone(Index);

                  const Position = mp.game.graphics.world3dToScreen2d(NameTag.x, NameTag.y, NameTag.z + 0.4);

                  if (Position) { 
                     let x = Position.x;
                     let y = Position.y;

                     let scale = (Distance / 25);
                     if (scale < 0.6) scale = 0.6;
                     
                     y -= (scale * (0.005 * (screenRes.y / 1080))) - parseInt('0.010');

                     if (Target.hasVariable('Bubble') && Target.getVariable('Bubble')) { 
                        const BubblePosition = mp.game.graphics.world3dToScreen2d(NameTag.x, NameTag.y, NameTag.z + 0.6);
                        if (BubblePosition) { 
                           const Bubble = Target.getVariable('Bubble');
                           // mp.game.graphics.drawText('* ' + Target.name + ' ' + Bubble.Content + '.', [BubblePosition.x, BubblePosition.y], {
                           //    font: 4,
                           //    color: Bubble.Color,
                           //    scale: [0.325, 0.325],
                           //    outline: false
                           // });
                        }
                     }

                     if (Target.hasVariable('Wounded') && Target.getVariable('Wounded')) {
                        const WoundedPosition = mp.game.graphics.world3dToScreen2d(NameTag.x, NameTag.y, NameTag.z + 0.75);
                        if (WoundedPosition) { 
                           const Wound = Target.getVariable('Wounded');
                           // mp.game.graphics.drawText('(( ' + Wound.Text + ' ))', [WoundedPosition.x, WoundedPosition.y], {
                           //    font: 4,
                           //    color: Wound.Color,
                           //    scale: [0.315, 0.315],
                           //    outline: false
                           // });
                        }
                     }

                     const Content = Target.name + ' [' + Target.remoteId + ']';
   
                     // mp.game.graphics.drawText(Content, [x, y], {
                     //    font: 4,
                     //    color: [255, 255, 255, 255],
                     //    scale: [0.325, 0.325],
                     //    outline: false
                     // });
                  }

               }
            }

         });

      }
   },

   'entityModelChange': (Entity: EntityMp, OldModel: PedBaseMp) => { 
   },

   'entityStreamOut': (Entity: EntityMp) => { 
      if ((<PlayerMp>Entity).Attachment) { 
         Attachments.StreamOut(Entity);
      }
   },

   'client:player:freeze': (Toggle: boolean) => {
      Player.freezePosition(Toggle);
   },

   'client:player:rotate': (Value: number) => {
      Player.setHeading(Value);
   },

   'client:request:ipl': (Ipl: string) => { 
      mp.game.streaming.requestIpl(Ipl);
   }
});


// INTERACTIONS :: REMOVE ATTACHMENT
mp.keys.bind(Controls.KEY_X, false, async function () {
   if (Player.Logged && Player.Spawned) { 
      if (Player.isTypingInTextChat) return;
      if (Player.getVariable('Attachment') != null) {
         const response = await mp.events.callRemoteProc('server:character.attachment:remove');
         Player.Attachment = response;
      }
   }
});



// INTERACTIONS :: LOCK
mp.keys.bind(Controls.KEY_L, false, async function () {
   if (Player.Logged && Player.Spawned && Player.isTypingInTextChat == false) { 
     if (AntiKeySpam) return;

      mp.events.callRemote('server:interactions:lock');

      AntiKeySpam = true;
      setTimeout(() => { AntiKeySpam = false; }, 4000);
   }
});


mp.keys.bind(Controls.KEY_Y, false, () => {
   let Vehicle: any; // PITATI ZAŠTO NE MOŽE VehicleMp 
   if (!Player.Logged || !Player.Spawned || Player.isTypingInTextChat || Player.Cuffed) return;
   if (AntiKeySpam) return;

   if (Player.vehicle) { 

      mp.events.callRemote('server:vehicle:windows', Player.vehicle);


      AntiKeySpam = true;
      setTimeout(() => { AntiKeySpam = false; }, 2000);

   } else { 
      

      mp.vehicles.forEachInRange(Player.position, 4.5, (NearbyVehicle) => { 
         Vehicle = NearbyVehicle;
      });
   
      if (Vehicle.doesExist()) { 
   
         const Bones: any = { 'boot': -1.35, 'bonnet': 2.0 };
   
         const Position = Player.position;
         
         for (const Bone in Bones) { 
            const Offset = Bones[Bone];
   
            const {x, y, z} = Vehicle.getWorldPositionOfBone(Vehicle.getBoneIndexByName(Bone));
      
            const Distance = mp.game.gameplay.getDistanceBetweenCoords(Position.x, Position.y, Position.z, x, y + Offset, z, true);
            
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
      return Player.vehicle ? Player.vehicle.getClass() : null;
   }
});


const Attachments = { 

   StreamIn: function (Entity: EntityMp, Attachment: object) { 
      if (Attachment) { 
         Attachments.Add(<PlayerMp>Entity, Attachment);
      }
   },

   StreamOut: function (Entity: EntityMp) { 
      Attachments.Remove(<PlayerMp>Entity);
   },

   Add: function (Entity: PlayerMp, Value: any) { 

      Entity.Attachment = mp.objects.new(mp.game.joaat(Value.Model), (<PlayerMp>Entity).position, {
         rotation: new mp.Vector3(0, 0, Entity.heading),
         alpha: 255,
         dimension: Entity.dimension
      });

      WaitEntity(Entity.Attachment).then(() => {
         const Bone = Entity.getBoneIndex(Value.Bone);
         Entity.Attachment.attachTo(Entity.handle, Bone, Value.Offset.X, Value.Offset.Y, Value.Offset.Z, Value.Offset.rX, Value.Offset.rY, Value.Offset.rZ, true, true, false, false, 0, Value.Rotation || false);
      })

   },

   Remove: function (Entity: PlayerMp) { 
      let Object = Entity.Attachment;
      if (Object && mp.objects.exists(Object)) { 
         Object.destroy();
      }
   }
};


const Interactions = { 
   WalkingStyle: async function (Entity: PlayerMp, Style: string) {
      if (Style == null) { 
         Entity.resetMovementClipset(0.0);
      } else { 
         LoadMovementClipset(Style).then(() => {
            Entity.setMovementClipset(Style, 1.0);
         })
      }
   },

   Ragdoll: function (Entity: PlayerMp, Value: any) {
      if (Value) { 
         mp.gui.chat.push(JSON.stringify(Value))
         Entity.setToRagdoll(Value.Time || 5000, Value.Time || 5000, 0, true, true, true);
      }
   },

   FacialMood: function (Entity: PlayerMp, Mood: string) { 
      Mood == 'normal' ? Entity.clearFacialIdleAnimOverride() : mp.game.invoke('0xFFC24B988B938B38', Entity.handle, Mood, 0);
   }
}


