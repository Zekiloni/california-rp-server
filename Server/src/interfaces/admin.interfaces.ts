

interface ReportAnswer {
   name: string
   username: string
   message: string
   time: number
}

export interface PlayerReport {
   sender: PlayerMp
   message: string
   time: number
   answer?: ReportAnswer | null
};

