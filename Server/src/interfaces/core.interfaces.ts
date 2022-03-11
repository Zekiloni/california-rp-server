import { FactionsPermissions } from '@enums';
import { factions } from '@models';


export interface interactionPoint {
   colshape?: ColshapeMp
   blip?: BlipMp
   marker?: MarkerMp
   label?: TextLabelMp
};


export interface offer {
   title: string
   description: string
   offerer: PlayerMp
   respond (player: PlayerMp, respond: boolean): void;
   faction?: factions
}

export type commands = {
   [key: string]: command
};


export interface factionTypeCmd  {
   required?: boolean
   type?: number[] | null
   permission?: FactionsPermissions
}

export interface command {
   description: string
   params?: any[]
   faction?: factionTypeCmd
   item?: string
   vehicle?: boolean
   job?: number
   position?: Vector3Mp
   admin?: number
   call (player: PlayerMp, ...params: any): void
};