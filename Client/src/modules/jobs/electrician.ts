

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
   distance: number
   vehicle: VehicleMp | null
   boxes: ElectricBox[],
   current: number
}


let electrician: ElectricianWork | null = null;

const startElectrician = (points: Vector3Mp[], vehicleId: number) => {
   const [first] = points;

   electrician = {
      fixingActive: false,
      distance: 0.0,
      vehicle: mp.vehicles.atRemoteId(vehicleId),
      boxes: [],
      current: points.indexOf(first)
   };

   for (const point of points) {
      electrician.boxes.push({ position: point, fixed: false });
   }

   electricianPoint(first);
}


const electricianPoint = (position: Vector3Mp) => {
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

   const fixBox = () => {

   }

   mp.events.add('CLIENT::ELECTRICIAN_FIX', fixBox);
}

const stopElectrician = () => {
   if (electrician) {
      const fixed = electrician?.boxes.map(point => point.fixed == true);
      mp.events.callRemote('SERVER::POSTAL:FINISH', fixed.length, electrician.distance);

      electrician = null;
   }
}

mp.events.add('CLIENT::ELECTRICIAN_STOP', stopElectrician);
mp.events.add('CLIENT::ELECTRICIAN_START', startElectrician);