import { offerTypes, offerStatus, factionPermissions } from '@enums';



export interface interactionPoint {
   colshape?: ColshapeMp
   blip?: BlipMp
   marker?: MarkerMp
   label?: TextLabelMp
};


export interface offer {
   type: offerTypes
   offeredBy: PlayerMp
   expire: ReturnType <typeof setTimeout>
   status: offerStatus
   id?: number
}

export type commands = {
   [key: string]: command
};


export interface factionTypeCmd  {
   required?: boolean
   type?: number
   permissions?: factionPermissions[]
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