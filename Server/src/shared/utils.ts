import { gDimension } from "@constants";
import { notifications } from "@enums";


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

export function isAnyVehicleAtPosition (position: Vector3Mp, radius: number = 2, dimension = gDimension): VehicleMp | undefined {
   for (const vehicle of mp.vehicles.toArray()) { 
      if (vehicle.dist(position) < radius && vehicle.dimension == dimension) {
         return vehicle;
      }
   }
};

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


export function createInfoColshape (Position: Vector3Mp, Name: string, Info: string, Radius: number, Color: RGBA, Dimension: number = gDimension, Blip: any = false, Sprite: number = 4) {

   const Colshape = mp.colshapes.newRectangle(Position.x, Position.y, Radius, 2.0, 0);

   if (Info) Colshape.onPlayerEnter = (Player: PlayerMp) => { Player.sendNotification(Info, notifications.type.ERROR, 5); };

   mp.markers.new(27, new mp.Vector3(Position.x, Position.y, Position.z - 0.985), Radius, {
      color: Color, rotation: new mp.Vector3(0, 0, 90), visible: true, dimension: Dimension
   });

   mp.labels.new(Name, Position, { los: true, font: 0, drawDistance: Radius, dimension: Dimension });

   if (Blip)
      mp.blips.new(Blip, new mp.Vector3(Position.x, Position.y, 0), { shortRange: true, scale: 0.85, name: Name, dimension: Dimension });
}
