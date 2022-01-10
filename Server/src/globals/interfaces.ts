import { spawnTypes } from './enums';


export interface spawnPoint { 
   name: string,
   description: string,
   type: spawnTypes,
   position: Vector3Mp,
   heading: number
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