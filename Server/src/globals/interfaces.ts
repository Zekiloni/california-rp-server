import { spawnTypes } from './enums';


export interface spawnPoint { 
   name: string,
   description: string,
   type: spawnTypes,
   position: Vector3Mp,
   heading: number
};