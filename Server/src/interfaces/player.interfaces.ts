import { spawnTypes } from '@enums/player';
import Business from '@models/properties/business.model';
import Houses from '@models/properties/house.model';
import { vehicles } from '@models/vehicle.model';


export interface playerInjury { 
   weapon: string
   damage: number
   bone: number
};

export interface characterProperties {
   houses: Houses[],
   business: Business[]
   vehicles: vehicles[]
}

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
   type: spawnTypes
   position: Vector3Mp
   heading: number
};