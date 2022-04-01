import { cmds, gDimension } from "@constants";
import { notifications } from "@enums";
import { Busines } from "src/vehicles";
import { houses } from "src/vehicles";


export function randomInteger (min: number, max: number) {
   return Math.random() * (max - min) + min;
}


export function checkForDot (text: string) {
   const last = text.slice(-1);
   return last == '.' ? text : text + '.';
}

export function isInRangeOfPoint (first: Vector3Mp, range: number, second: Vector3Mp) {
   return distanceBetweenVectors(first, second) < range ? true : false;
}


// export function getForwardVector (player: PlayerMp, offset: number): Vector3Mp {
//    const { position, heading } = player;
//    const z = -rotation.z;
//    const x = rotation.x;
//    const num = Math.abs(Math.cos(x));
//    const forward = new mp.Vector3(-Math.sin(z) * num, Math.cos(z) * num, Math.sin(x));
//    return new mp.Vector3()
// }

export function isAnyVehicleAtPosition (position: Vector3Mp, radius: number = 2, dimension = gDimension): VehicleMp | undefined {
   for (const vehicle of mp.vehicles.toArray()) { 
      if (vehicle.dist(position) < radius && vehicle.dimension == dimension) {
         return vehicle;
      }
   }
};


export const initials = (text: string) => {
   let splited = text.split(' ');
   return splited.shift()!.charAt(0) + splited.pop()!.charAt(0);
}

export function formatCommand (cmd: string) {
   return '/' + cmd;
}

export function distanceBetweenVectors (first: Vector3Mp, second: Vector3Mp) {
   return new mp.Vector3(first.x, first.y, first.z).subtract(new mp.Vector3(second.x, second.y, second.z)).length();
}


export function sleep (Seconds: number) {
   return new Promise(resolve => setTimeout(resolve, Seconds * 1000));
}


export function validateIP (ip: string) { 
   return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip) ? true : false;
}


export function convertHexToDecimal (Hex: string) {
   return parseInt(Hex.replace('#', ''), 16);
}


export function createRandomRGB () {
   return { r: Math.floor(Math.random() * 255), g: Math.floor(Math.random() * 255), b: Math.floor(Math.random() * 255) };
}


export function generateString (length: number) {
   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
   let result = ' ';
   for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
   }
   return result;
}


export function generateNumber (Min: number, Max: number) {
   Min = Math.ceil(Min);
   Max = Math.floor(Max);
   return Math.floor(Math.random() * (Max - Min + 1)) + Min;
}


export function dollars (i: number) {
   return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(i);
}


export function timeDate () {
   const now = new Date(), time = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds(), date = [now.getUTCFullYear(), now.getUTCMonth() + 1, now.getUTCDate()].join('-');
   return date + ' ' + time;
}


export async function getNearest (player: PlayerMp, distance: number) {
   for (const house of await houses.findAll()) {
      if (player.dist(house.position) < distance) {
         return house;
      }
   }

   for (const busines of await Busines.findAll()) {
      if (player.dist(busines.position) < distance) {
         return busines;
      }
   }

   if (mp.vehicles.getClosest(player.position)) {
      if (player.dist(mp.vehicles.getClosest(player.position).position) < distance) {
         return mp.vehicles.getClosest(player.position);
      }
   } 

   return;
}


export function createInfoColshape (
   position: Vector3Mp,
   name: string,
   info: string, 
   radius: number, 
   dimension: number, 
   markerType: number, 
   markerScale: number,
   markerColor: RGBA,
   sprite?: number,
   spriteColor?: number
): [ColshapeMp, MarkerMp, BlipMp | undefined] {
   const { x, y, z } = position;
   let blip: BlipMp | undefined, marker: MarkerMp, colshape: ColshapeMp;
   
   colshape = mp.colshapes.newRectangle(position.x, position.y, radius, 2.0, dimension);
   
   if (info.length > 0) {
      colshape.onPlayerEnter = function (player: PlayerMp) {
         player.help(info, 4);
      }
   }

   marker = mp.markers.new(markerType, new mp.Vector3(x, y, z - 0.75), markerScale, {
      color: markerColor ? markerColor : [0, 0, 0, 255],
      dimension: gDimension
   })

   if (sprite) {
      blip = mp.blips.new(sprite, new mp.Vector3(x, y, 0), { 
         shortRange: true, 
         scale: 0.85, 
         name: name,
         dimension: dimension ,
         color: spriteColor ? spriteColor : 0
      });
   }

   return [colshape, marker, blip];
}