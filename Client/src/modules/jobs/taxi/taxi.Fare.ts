import { Browser } from '../../../browser';


let taxiFare: number | false = false;


const fareHandler = (entity: EntityMp, value: number | false, oldValue: number | false) => {
   if (entity.type != RageEnums.EntityType.VEHICLE) {
      return;
   }

   const vehicle = <VehicleMp>entity;

   if (!mp.players.local.vehicle) {
      return;
   }

   if (mp.players.local.vehicle.remoteId != vehicle.remoteId) {
      return;
   }

   taxiFare = value;
   
   Browser.call(taxiFare ? 'BROWSER::SHOW' : 'BROWSER::HIDE', 'taxiFare');

   if (taxiFare) {
      Browser.call('BROWSER::TAXI_FARE', taxiFare);
   }
};


mp.events.addDataHandler('FARE', fareHandler);
