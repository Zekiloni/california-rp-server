import { FactionsPermissions } from '@enums';
import { factions, Jobs } from '@models';


export interface interactionPoint {
   colshape?: ColshapeMp
   blip?: BlipMp
   marker?: MarkerMp
   label?: TextLabelMp
};


export interface offer {
   title: string
   description: string
   offerer?: PlayerMp | null
   respond (player: PlayerMp, respond: boolean): void;
   faction?: factions
   job?: Jobs
}

export type commands = {
   [key: string]: command
};


export interface FactionTypeCommand {
   required?: boolean
   type?: number[] | null
   permission?: FactionsPermissions
}

export interface JobTypeCommands {
   required?: boolean
   id?: number
}

export interface command {
   description: string
   params?: any[]
   faction?: FactionTypeCommand
   item?: string
   vehicle?: boolean
   job?: JobTypeCommands
   position?: Vector3Mp
   admin?: number
   call (player: PlayerMp, ...params: any): void
};