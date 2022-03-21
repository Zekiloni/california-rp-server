import { spawnPointTypes } from '@enums';


export interface Injury { 
   weapon: number
   damage: number
   bone: number
   times: number
};


export interface hairStyle { 
   style: number
   color: number
   highlight: number
};

export interface beardStyle { 
   style: number,
   color: number
};

export interface PlayerSpawnPoint { 
   name: string,
   description: string
   type: spawnPointTypes
   position: Vector3Mp
   heading: number
   id?: number
};