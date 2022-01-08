import { WaitEntity } from '../utils';

const Player = mp.players.local,
   CuffsModel: string = 'p_cs_cuffs_02_s';


mp.events.addDataHandler({
   'Cuffed': (Entity: EntityMp, NewValue: boolean, OldValue: boolean) => {
      if (Entity.type === 'player') {
         if (NewValue !== OldValue) {
            Cuff(<PlayerMp>Entity, NewValue);
         }
      }
   }
});


mp.events.add({
   'entityStreamIn': (Entity: EntityMp) => {
      if (Entity.type === 'player') Cuff(<PlayerMp>Entity, Entity.getVariable('Cuffed'));
   },

   'render': () => {
      if (Player.Cuffed) {
         // DISABLE SPRINT, ATTACK, AIM, JUMP
         mp.game.controls.disableControlAction(0, 24, true);
         mp.game.controls.disableControlAction(0, 25, true);
         mp.game.controls.disableControlAction(0, 21, true);
         mp.game.controls.disableControlAction(0, 55, true);
      }
   },

   'CLIENT::STREAMER:CUFF': (Entity: PlayerMp, Toggle: boolean) => {
      Cuff(Entity, Toggle);
   },

   'CLIENT::STREAMER:LOAD:IPL': (Ipl: string) => {
      mp.game.streaming.requestIpl(Ipl);
      mp.game.waitAsync(5);
   },

   'CLIENT::STREAMER:UNLOAD:IPL': (Ipl: string) => {
      if (mp.game.streaming.isIplActive(Ipl))
         mp.game.streaming.removeIpl(Ipl);
   }

});


function Cuff(Entity: PlayerMp, Toggle: boolean) {
   if (Toggle && Entity) {
      Entity.setEnableHandcuffs(true);
      Entity.Cuffed = true;

      Entity.Cuffs = mp.objects.new(mp.game.joaat(CuffsModel), Entity.position, {
         rotation: new mp.Vector3(0, 0, 0),
         alpha: 255,
         dimension: Entity.dimension
      });

      Entity.Cuffs.notifyStreaming = true;
      WaitEntity(Entity.Cuffs).then(() => {
         let bone = mp.players.local.getBoneIndex(6286);
         Entity.Cuffs.attachTo(Entity.handle, bone, -0.02, 0.06, 0.0, 75.0, 0.0, 76.0, true, true, false, false, 0, true);
      })
   }
   else {
      Entity.setEnableHandcuffs(false);
      Entity.Cuffed = false;
      if (Entity.Cuffs) {
         if (Entity.Cuffs.doesExist()) {
            Entity.Cuffs.destroy();
         }
      }
   }
}


