

interface ReportAnswer {
   name: string
   username: string
   answer: string
   time: number
}

export interface PlayerReport {
   sender: PlayerMp
   message: string
   time: number
   answer?: ReportAnswer | null
};