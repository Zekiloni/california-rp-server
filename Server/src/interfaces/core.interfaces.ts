


export interface interactionPoint {
   colshape?: ColshapeMp
   blip?: BlipMp
   marker?: MarkerMp
   label?: TextLabelMp
};


export type commands = {
   [key: string]: command
};


interface factionTypeCmd  {
   type?: number,
   id?: number
}

export interface command {
   description: string;
   params?: any[];
   faction?: factionTypeCmd;
   item?: any;
   vehicle?: boolean;
   job?: number;
   position?: Vector3Mp;
   admin?: number;
   call (player: PlayerMp, ...params: any): void;
};