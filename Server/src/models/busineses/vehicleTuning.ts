import { Busines } from '@models';



export class TuningShop extends Busines {
   static buyTuningMod (player: PlayerMp, businesId: number, name: string, modType: number, modIndex: number) {
      const vehicle = player.vehicle;

      if (!vehicle) {
         return;
      }

      return Busines.findOne({ where: { id: businesId } }).then(busines => {
         if (!busines) {
            return;
         }
         
         if (!vehicle) {
            return;
         }

         
      })
   }

}