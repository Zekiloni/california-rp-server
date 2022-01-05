'use strict';

export function distanceBetweenVectors (First: Vector3Mp, Second: Vector3Mp) {
   return new mp.Vector3(First.x, First.y, First.z).subtract(new mp.Vector3(Second.x, Second.y, Second.z)).length();
}

export function randomInteger (Min: number, Max: number) {
   return Math.random() * (Max - Min) + Min;
}


export function isPlayerNearPlayer (Player: PlayerMp, Target: PlayerMp, Distance: number = 0.5) {
   return distanceBetweenVectors(Player.position, Target.position) <= Distance ? true : false;
}


export function isPlayerNearPoint (Player: PlayerMp, Position: Vector3Mp, Distance: number = 1.5) {
   return distanceBetweenVectors(Player.position, Position) <= Distance ? true : false;
}