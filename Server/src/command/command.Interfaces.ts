

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

export interface FactionTypeCommand {
   required?: boolean
   type?: number[] | null
   permission?: FactionsPermissions
}

export interface JobTypeCommands {
   required?: boolean
   id?: number
}