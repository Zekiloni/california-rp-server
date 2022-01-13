import Business from '../models/business.model';
import Houses from '../models/house.model';
import { Vehicles } from '../models/vehicle.model';
import { spawnTypes } from './enums';


export interface spawnPoint { 
   name: string,
   description: string,
   type: spawnTypes,
   position: Vector3Mp,
   heading: number
};

export interface vehicleComponent { 
   component: number,
   value: number
};

export interface vehiclePlate { 
   content: string,
   issued: number,
   expiring: number
}

export interface characterProperties {
   houses: Houses[],
   business: Business[]
   vehicles: Vehicles[]
}

export interface propertyPoint {
   colshape: ColshapeMp,
   blip: BlipMp,
   marker: MarkerMp
};

export interface itemAction { 
   name: string,
   icon: string,
   event: string
}

export interface itemExtraData  {
   ammo?: number,
   serial?: number,
}