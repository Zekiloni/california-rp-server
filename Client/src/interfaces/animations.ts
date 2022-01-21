import { animationFlags } from '../enums/animations.flags';


export interface animationData { 
   dictionary: string,
   name: string,
   flag?: animationFlags,
   duration?: number
};