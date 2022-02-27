import { gDimension } from '@constants';
import { jobsConfig } from '@configs';
import { VehiclePoint } from '@interfaces';



export class jobs { 

   static list = new Map<number, jobs>();

   id: number;
   name: string;
   description?: string;
   position: Vector3Mp;
   equipPosition?: Vector3Mp;
   vehiclePoint?: VehiclePoint | VehiclePoint[];
   blip: BlipMp;
   colshape: ColshapeMp;
   marker: MarkerMp;
   activeWorkers: number;

   start? (player: PlayerMp): void;
   stop? (player: PlayerMp): void;
   

   constructor (id: number, name: string, description: string, position: Vector3Mp, sprite: number, spriteColor: number) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.position = position;

      this.colshape = mp.colshapes.newSphere(position.x, position.y, position.z, 1.0, gDimension);

      this.blip = mp.blips.new(sprite, position, 
         { 
            dimension: gDimension, name: name, color: spriteColor, shortRange: true, scale: 0.85, drawDistance: 150 
         }
      );

      this.marker = mp.markers.new(jobsConfig.markerType, new mp.Vector3(position.x, position.y, position.z - 0.25), 0.65, 
         {
            color: jobsConfig.markerColor, 
            rotation: new mp.Vector3(0, 0, 0),
            visible: true,
            dimension: gDimension
         }
      )

      this.activeWorkers = 0;

      this.colshape.onPlayerEnter = (player: PlayerMp) => { 
         if (player.character?.isUnemployed) {
            player.call('CLIENT::JOB:OFFER', [this]);
         } else { 
            player.outputChatBox('show cmds');
         }
      };

      this.colshape.onPlayerLeave = (player: PlayerMp) => { 
         player.call('CLIENT::JOB:OFFER', [false]);
      }

      jobs.list.set(this.id, this);
   }
}
