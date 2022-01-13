'use strict';

import { Config } from './config';
import { defaultSpawn } from './globals/constants';
import { globalDimension, logType, NotifyType, spawnTypes } from './globals/enums';


export function Logger (Status: logType, Message: any) {
   const Colors = ['\x1b[31m', '\x1b[32m', '\x1b[33m', '\x1b[0m'];

   console.log(Colors[Status] + dateTime() + Colors[3] + ' | ' + Message);
}


export function distanceBetweenVectors (First: Vector3Mp, Second: Vector3Mp) {
   return new mp.Vector3(First.x, First.y, First.z).subtract(new mp.Vector3(Second.x, Second.y, Second.z)).length();
}


export function randomInteger (Min: number, Max: number) {
   return Math.random() * (Max - Min) + Min;
}


export function getDefaultSpawn () { 
   return {
      name: defaultSpawn.name,
      type: spawnTypes.default,
      description: defaultSpawn.description,
      position: Config.Default.Spawn,
      heading: Config.Default.Heading
   }
};

export function isPlayerNearPlayer (Player: PlayerMp, Target: PlayerMp, Distance: number = 0.5) {
   return distanceBetweenVectors(Player.position, Target.position) <= Distance ? true : false;
}


export function isAnyVehicleAtPosition (position: Vector3Mp, radius: number = 2, dimension = globalDimension) {
   let Vehicles: VehicleMp[] = [];
   mp.vehicles.forEachInRange(position, radius, (Vehicle: VehicleMp) => {
      if (Vehicle && Vehicle.dimension == dimension) Vehicles.push(Vehicle);
   });
   return Vehicles;
}


export function isPlayerNearPoint (Player: PlayerMp, Position: Vector3Mp, Distance: number = 1.5) {
   return distanceBetweenVectors(Player.position, Position) <= Distance ? true : false;
}


export function createInfoColshape (Position: Vector3Mp, Name: string, Info: string, Radius: number, Color: RGBA, Dimension: number = globalDimension, Blip: any = false, Sprite: number = 4) {

   const Colshape = mp.colshapes.newRectangle(Position.x, Position.y, Radius, 2.0, 0);

   if (Info) Colshape.onPlayerEnter = (Player: PlayerMp) => { Player.Notification(Info, NotifyType.ERROR, 5); };

   mp.markers.new(27, new mp.Vector3(Position.x, Position.y, Position.z - 0.985), Radius, {
      color: Color, rotation: new mp.Vector3(0, 0, 90), visible: true, dimension: Dimension
   });

   mp.labels.new(Name, Position, { los: true, font: 0, drawDistance: Radius, dimension: Dimension });

   if (Blip)
      mp.blips.new(Blip, new mp.Vector3(Position.x, Position.y, 0), { shortRange: true, scale: 0.85, name: Name, dimension: Dimension });
}

export function Sleep (Seconds: number) {
   return new Promise(resolve => setTimeout(resolve, Seconds * 1000));
}



export function dateTime () {
   let now = new Date(), time = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds(), date = [now.getUTCFullYear(), now.getUTCMonth() + 1, now.getUTCDate()].join('-');
   return date + ' ' + time;
}

export function randMinMax (min: number, max: number) {
   return Math.floor(Math.random() * (max - min)) + min;
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

export function countDigits (n: number) {
   let count = 0;
   if (n >= 1) ++ count;
   while (n / 10 >= 1) {
      n /= 10;
      ++ count;
   }
   return count;
}

export function objectSize (object: Object) {
   let size = 0;
   for (let key in object) { if (object.hasOwnProperty(key)) size++; }
   return size;
};

mp.events.add(
   {
      'playerEnterColshape': (player: PlayerMp, colshape: ColshapeMp) => { 
         if (colshape.onPlayerEnter) colshape.onPlayerEnter(player);  
      },

      'playerExitColshape': (player: PlayerMp, colshape: ColshapeMp) => { 
         if (colshape.onPlayerLeave) colshape.onPlayerLeave(player); 
      }
   }
);

