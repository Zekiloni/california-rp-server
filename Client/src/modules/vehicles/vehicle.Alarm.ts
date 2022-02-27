import { entityType } from '../../enums/entity';


let alarms: { [key: number]: ReturnType<typeof setTimeout> } = {};


const streamAlarm = (entity: EntityMp) => {

   if (!entity.hasVariable('ALARM')) {
      return;
   }

   const alarm = entity.getVariable('ALARM');

   alarmHandler(entity, alarm);
};

const alarmHandler = (entity: EntityMp, active: boolean, oldValue?: boolean) => {
   if (entity.type != entityType.VEHICLE) {
      return;
   }

   const vehicle = <VehicleMp>entity;

   if (!mp.vehicles.atRemoteId(vehicle.remoteId).doesExist()) {
      return;
   }

   if (active) {
      alarms[vehicle.remoteId] = setInterval(alarm.bind(null, vehicle), 400);
   } else {
      if (alarms[vehicle.remoteId]) {
         clearTimeout(alarms[vehicle.remoteId]);
      }
   }
};

const alarm = (vehicle: VehicleMp) => {
   vehicle.startHorn(400, mp.game.gameplay.getHashKey('HELDDOWN'), false);
}


mp.events.add(RageEnums.EventKey.ENTITY_STREAM_IN, streamAlarm);
mp.events.addDataHandler('ALARM', alarmHandler);