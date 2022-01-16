import { markerColors } from '../globals/constants';
import { globalDimension, jobNumber } from '../globals/enums';
import { vehiclePoint } from '../globals/interfaces';



export default class Jobs { 

   static list = new Map<number, Jobs>();
   
   id: number;
   name: string;
   description?: string;
   position: Vector3Mp;
   equipPosition?: Vector3Mp;
   vehiclePoint?: vehiclePoint | vehiclePoint[];
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
      this.colshape = mp.colshapes.newSphere(position.x, position.y, position.z, 1.0, globalDimension),
      this.blip = mp.blips.new(sprite, position, { dimension: globalDimension, name: name, color: spriteColor, shortRange: true, scale: 0.85, drawDistance: 150 }),
      this.marker = mp.markers.new(0, new mp.Vector3(position.x, position.y, position.z - 0.25), 0.65, {
         color: markerColors.JOBS, 
         rotation: new mp.Vector3(0, 0, 0),
         visible: true,
         dimension: globalDimension
      })
      this.activeWorkers = 0;

      this.colshape.onPlayerEnter = (player: PlayerMp) => { 
         if (player.Character.job == jobNumber.UNEMPLOYED) 
            player.call('CLIENT::JOB:OFFER', [this]);
         else
            player.outputChatBox('show cmds')
      };

      this.colshape.onPlayerLeave = (player: PlayerMp) => { 
         player.call('CLIENT::JOB:OFFER', [false]);
      }

      Jobs.list.set(this.id, this);
   }
}
