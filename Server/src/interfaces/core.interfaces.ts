import { FactionsPermissions } from '@enums';


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
   faction?: number
}

export type commands = {
   [key: string]: command
};


export interface factionTypeCmd  {
   required?: boolean
   type?: number
   permission?: FactionsPermissions
}

export interface command {
   description: string
   params?: any[]
   faction?: factionTypeCmd
   item?: any
   vehicle?: boolean
   job?: number
   position?: Vector3Mp
   admin?: number
   call (player: PlayerMp, ...params: any): void
};