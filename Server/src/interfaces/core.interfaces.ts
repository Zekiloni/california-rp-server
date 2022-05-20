import { FactionsPermissions } from '@enums';
import { Factions, Jobs } from '@models';


export interface interactionPoint {
   colshape?: ColshapeMp
   blip?: BlipMp
   marker?: MarkerMp
   label?: TextLabelMp
};


export interface CharacterOffer {
   title: string
   description: string
   offerer?: PlayerMp | null
   respond (player: PlayerMp, respond: boolean): void;
   faction?: Factions
   job?: Jobs
}

export type commands = {
   [key: string]: Command
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

export interface Command {
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