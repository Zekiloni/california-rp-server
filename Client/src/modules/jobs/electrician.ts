import { Browser } from "../../browser";
import { getCalculatedDistance, startCalculatingDistance, stopCalculatingDistance } from "../utils/calculateDistance";


const ElectricianConfig = {
   sprite: 767,
   spriteColor: 79
}


interface ElectricBox {
   position: Vector3Mp
   fixed: boolean
}


interface ElectricianWork {
   fixingActive: boolean
   vehicle: VehicleMp | null
   boxes: ElectricBox[],
   current: number
}


let electrician: ElectricianWork | null = null;

const startElectrician = (points: Vector3Mp[], vehicleId: number) => {
   const [first] = points;

   mp.gui.chat.push('electrician started')

   electrician = {
      fixingActive: false,
      vehicle: mp.vehicles.atRemoteId(vehicleId),
      boxes: [],
      current: points.indexOf(first)
   };

   startCalculatingDistance();

   for (const point of points) {
      electrician.boxes.push({ position: point, fixed: false });
   }

   electricianPoint(first);
}


const electricianPoint = (position: Vector3Mp) => {
   mp.gui.chat.push('Point created')
   const { x, y, z } = position;

   if (!electrician) {
      return;
   }
   
   const blip = mp.blips.new(ElectricianConfig.sprite, position, {
      color: ElectricianConfig.spriteColor, alpha: 250, shortRange: false
   });
   
   const checkpoint = mp.checkpoints.new(48, new mp.Vector3(x, y, z - 2), 2, {
      direction: new mp.Vector3(0, 0, 0),
      color: [ 230, 50, 50, 185 ],
      visible: true,
      dimension: mp.players.local.dimension
   });

   const onStartFixing = (eCheckpoint: CheckpointMp) => {
      if (eCheckpoint == checkpoint) {
         mp.gui.chat.push('entered point')

         if (mp.players.local.vehicle) {
            return;
         }

         checkpoint.destroy();
         blip.destroy();

         Browser.call('BROWSER::SHOW', 'electricBox');

         const onFixBox = () => {
            mp.gui.chat.push(JSON.stringify(electrician?.boxes))

            Browser.call('BROWSER::HIDE', 'electricBox');

            mp.events.remove(RageEnums.EventKey.PLAYER_ENTER_CHECKPOINT);
            mp.events.remove('CLIENT::ELECTRICITY_FIX', onFixBox);

            electrician!.boxes[electrician!.current].fixed = true;
            
            if (electrician!.boxes.length == electrician!.boxes.length - 1) {
               return stopElectrician();
            }

            electrician!.current ++;
            const nextBox = electrician?.boxes[electrician.current];

            electricianPoint(nextBox!.position);
         }

         mp.events.add('CLIENT::ELECTRICITY_FIX', onFixBox);
      }
   }

   mp.events.add(RageEnums.EventKey.PLAYER_ENTER_CHECKPOINT, onStartFixing);
}

const stopElectrician = () => {
   if (electrician) {
      const fixed = electrician?.boxes.map(point => point.fixed == true);

      const distance = getCalculatedDistance();
      stopCalculatingDistance();

      mp.events.callRemote('SERVER::POSTAL:FINISH', fixed.length, distance);

      electrician = null;
   }
}

mp.events.add('CLIENT::ELECTRICIAN_STOP', stopElectrician);
mp.events.add('CLIENT::ELECTRICIAN_START', startElectrician);