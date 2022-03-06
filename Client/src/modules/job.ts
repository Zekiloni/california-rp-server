import { Browser } from '../browser';
import controls from '../enums/controls';

const player = mp.players.local;
let job: number | null = null;

mp.events.add(
   {
      'CLIENT::JOB:OFFER': (info: any) => {
         Browser.call(info ? 'BROWSER::SHOW' : 'BROWSER::HIDE', 'job_Offer');
         if (info) Browser.call('BROWSER::JOB:OFFER', info);
         job = info.id;
      },

      'CLIENT::JOB:ACCEPT': (job: number) => {
         mp.events.call('CLIENT::JOB:OFFER');
         mp.events.callRemote('SERVER::JOB:ACCEPT', job);
      },

      'CLIENT::JOB:WAYPOINT': (Position: Vector3Mp) => {
         mp.game.ui.setNewWaypoint(Position.x, Position.y);
      }
   }
);


mp.keys.bind(controls.KEY_Y, true, function () { 

   if (!mp.players.local.getVariable('LOGGED_IN')) {
      return;
   }

   if (!mp.players.local.getVariable('SPAWNED')) {
      return;
   }

   if (!job) {
      return;
   }

   mp.events.callRemote('SERVER::JOB:ACCEPT', job);

});


