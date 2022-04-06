import { Vehicles, Busines } from '@models';


export class RentalBusines extends Busines {

   static rentVehicle (player: PlayerMp, businesId: number, model: string) {
      Busines.findOne({ where: { id: businesId } }).then(busines => {
         if (!busines) {
            return;
         }

         const product = busines.products.find(item => item.name == model);

         if (!product || product.quantity == 0) {
            // PORUKA: Product not found or no more status
            return;
         }

         if (player.character.money < product.price) {
            // PORUKA: Not enought money
            return;
         }

         if (!busines.vehicle_point) {
            // PORUKA: Busines cannot deliver this vehicle
            return;
         }

         const vehicle = new Vehicles({

         });

      });
   }

}

mp.events.addProc('SERVER::RENT_VEHICLE', RentalBusines.rentVehicle);