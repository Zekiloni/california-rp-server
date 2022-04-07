import { Jobs } from "@models";


export enum TruckLoad {

}


export class Trucker extends Jobs {
   truckers: Map<number, PlayerMp> = new Map();

   getTrucker (playerId: number) {
      return this.truckers.get(playerId);
   }
   
   start () {

   }

   stop (player: PlayerMp, finished: boolean, estimatedTime: number, distance: number, bonus: number) {
      player.character.working = false;
      
      if (this.getTrucker(player.id)) {
         this.truckers.delete(player.id);
      }
      
   }
}