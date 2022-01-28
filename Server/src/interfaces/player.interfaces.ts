import { spawnTypes } from '@enums/player.enums';
import Business from '@models/business.model';
import Houses from '@models/house.model';
import { vehicles } from '@models/vehicle.model';



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