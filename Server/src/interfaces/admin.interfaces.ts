

export interface playerReport {
   sender: PlayerMp
   message: string
   answer?: string | null
   answered_By?: PlayerMp | null
   time: number
   readed: boolean
};