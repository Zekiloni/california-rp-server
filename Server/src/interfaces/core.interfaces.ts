import { FactionsPermissions } from '@enums';
import { Factions, Jobs } from 'src/vehicles';


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
   faction?: Factions
   job?: Jobs
}






