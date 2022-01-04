import { Browser } from "../Browser";

const Player = mp.players.local;
let Offer: boolean = false;

mp.events.add(
   {
      'CLIENT::JOB:OFFER': (Info: string) => {
         Offer = !Offer;
         Browser.call(Offer ? 'BROWSER::SHOW' : 'BROWSER::HIDE', 'Job_Offer');
         if (Offer) {
            Browser.call('BROWSER::JOB_OFFER', Info);
         }
      },

      'CLIENT::JOB:ACCEPT': (Job: number) => {
         mp.events.call('CLIENT::JOB:OFFER');
         mp.events.callRemote('SERVER::JOB:ACCEPT', Job);
      },

      'CLIENT::JOB:WAYPOINT': (Position: Vector3Mp) => {
         mp.game.ui.setNewWaypoint(Position.x, Position.y);
      }
   }
);