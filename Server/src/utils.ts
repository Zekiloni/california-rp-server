'use strict';

import { Global_Dimension, LogType, NotifyType } from "@Shared/enums";
import { dateTime } from "@Shared/utils";



export function Logger (Status: LogType, Message: any) {
   const Colors = ['\x1b[31m', '\x1b[32m', '\x1b[33m', '\x1b[0m'];

   console.log(Colors[Status] + dateTime() + Colors[3] + ' | ' + Message);
}


export function distanceBetweenVectors (First: Vector3Mp, Second: Vector3Mp) {
   return new mp.Vector3(First.x, First.y, First.z).subtract(new mp.Vector3(Second.x, Second.y, Second.z)).length();
}


export function randomInteger (Min: number, Max: number) {
   return Math.random() * (Max - Min) + Min;
}


export function isPlayerNearPlayer (Player: PlayerMp, Target: PlayerMp, Distance: number = 0.5) {
   return distanceBetweenVectors(Player.position, Target.position) <= Distance ? true : false;
}


export function isAnyVehicleAtPosition (position: Vector3Mp, radius: number = 2, dimension = Global_Dimension) {
   let Vehicles: VehicleMp[] = [];
   mp.vehicles.forEachInRange(position, radius, (Vehicle: VehicleMp) => {
      if (Vehicle && Vehicle.dimension == dimension) Vehicles.push(Vehicle);
   });
   return Vehicles;
}


export function isPlayerNearPoint (Player: PlayerMp, Position: Vector3Mp, Distance: number = 1.5) {
   return distanceBetweenVectors(Player.position, Position) <= Distance ? true : false;
}


export function createInfoColshape (Position: Vector3Mp, Name: string, Info: string, Radius: number, Color: RGBA, Dimension: number = Global_Dimension, Blip: any = false, Sprite: number = 4) {

   const Colshape = mp.colshapes.newRectangle(Position.x, Position.y, Radius, 2.0, 0);

   if (Info) Colshape.OnPlayerEnter = (Player: PlayerMp) => { Player.Notification(Info, NotifyType.ERROR, 5); };

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

// NE ZABORAVITI
// mp.events.add(
//    {
//       'playerEnterColshape': (Player: PlayerMp, Colshape: ColshapeMp) => { 
//          if (Player.vehicle) return;
//          if (Colshape.OnPlayerEnter) Colshape.OnPlayerEnter(Player); 
         
//       },

//       'playerExitColshape': (Player: PlayerMp, Colshape: ColshapeMp) => { 
//          if (Player.vehicle) return;
//          if (Colshape.OnPlayerLeave) Colshape.OnPlayerLeave(Player); 
//       }
//    }
// );

