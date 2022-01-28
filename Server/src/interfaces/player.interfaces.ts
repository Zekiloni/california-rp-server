import { spawnPointTypes } from '@enums';


export interface playerInjury { 
   weapon: string
   damage: number
   bone: number
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

export interface spawnPoint { 
   name: string,
   description: string
   type: spawnPointTypes
   position: Vector3Mp
   heading: number
};