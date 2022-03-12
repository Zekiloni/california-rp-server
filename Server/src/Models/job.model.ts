import { gDimension, cmds, lang } from '@constants';
import { JobConfig } from '@configs';
import { offer, VehiclePoint } from '@interfaces';
import { formatCommand } from '@shared';
import { notifications } from '@enums';


export class jobs { 

   static list: jobs[] = []

   id: number;
   name: string;
   description?: string;
   position: Vector3Mp;
   equipment?: string[]
   equip_position: Vector3Mp
   vehicle_position: Vector3Mp | VehiclePoint | VehiclePoint[];
   blip: BlipMp;
   colshape: ColshapeMp;
   marker: MarkerMp;

   start? (player: PlayerMp, ...params: any): void;
   stop? (player: PlayerMp, ...params: any): void;
   
   constructor (id: number, name: string, description: string, position: Vector3Mp, sprite?: number, spriteColor?: number) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.position = position;

      this.colshape = mp.colshapes.newSphere(position.x, position.y, position.z, 1.0, gDimension);

      if (sprite) {
         this.blip = mp.blips.new(sprite, position, { 
            dimension: gDimension,
            name: name,
            color: spriteColor ? spriteColor : 0,
            shortRange: true,
            scale: 0.85,
            drawDistance: 150
         });   
      }

      this.marker = mp.markers.new(JobConfig.markerType, new mp.Vector3(position.x, position.y, position.z - 0.9), 1, {
         color: JobConfig.markerColor, 
         rotation: new mp.Vector3(0, 0, 0),
         visible: true,
         dimension: gDimension
      });

      this.colshape.onPlayerEnter = (player: PlayerMp) => { 
         if (player.character?.isUnemployed) {
            player.help(formatCommand(cmds.names.TAKE_JOB), 5);
         } else { 
         }
      };

      jobs.list.push(this);
   }

   static nearest (player: PlayerMp, distance: number = 3) {
      return jobs.list.find(job => player.dist(job.position) < distance);
   }

   employ (player: PlayerMp) {
      if (player.character.working) {
         return;
      }

      const job = this;

      const offer: offer = {
         title: lang.JOB_OFFER + ' ' + job.name,
         description: job.description!,
         job: job,
         respond (player: PlayerMp, respond: boolean) {
            if (respond) { 
               player.character.setJob(player, this.job!.id);
               player.notification(lang.U_EMPLOYED_AS + job.name, notifications.type.SUCCESS, notifications.time.MED);
            } else { 
               player.notification(lang.U_DECLINED_JOB_OFFER, notifications.type.INFO, notifications.time.MED);
            }

            player.character.setOffer(player, null);
         }
      }

      player.character.setOffer(player, offer);
   }

   get activeWorkers () {
      return mp.players.toArray().filter(
         player => player.character.job == this.id && player.character.working
      );
   }
}
