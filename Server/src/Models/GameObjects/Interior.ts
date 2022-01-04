import { Globals } from "../../Global/Globals";

export class Interior {
    Name: string;
    IPL: string;
    Positions: { Entrance: Vector3Mp, Exit: Vector3Mp };
    ColShapes: { EnterShape: ColshapeMp, ExitShape: ColshapeMp };
    Dimensions: { EntranceDim: number, InsideDim: number };
    Message?: string;

    constructor(Name: string, IPL: string = '', Positions: { Entrance: Vector3Mp, Exit: Vector3Mp }, Dimensions: { EntranceDim: number, InsideDim: number }, Message?: string) {
        this.Name = Name;
        this.IPL = IPL;
        this.Positions = Positions;
        this.Dimensions = Dimensions;
        if (Message) this.Message = Message;

        this.ColShapes.EnterShape = mp.colshapes.newSphere(this.Positions.Entrance.x, this.Positions.Entrance.y, this.Positions.Entrance.z, 2, this.Dimensions.EntranceDim);
        this.ColShapes.ExitShape = mp.colshapes.newSphere(this.Positions.Exit.x, this.Positions.Exit.y, this.Positions.Exit.z, 2, this.Dimensions.InsideDim);

        // Markeri?

        this.ColShapes.EnterShape.OnPlayerEnter = (Player: PlayerMp) => {
            if (this.IPL.length > 1) {
                Player.call('CLIENT::STREAMER:LOAD:IPL', [this.IPL]);
            }
            setTimeout(() => {
                Player.position = this.Positions.Exit;
                Player.dimension = this.Dimensions.InsideDim;
                if (this.Message) {
                    Player.Notification(this.Message, Globals.Notification.Info, 5);
                }
            }, 200);
        }

        this.ColShapes.ExitShape.OnPlayerEnter = (Player: PlayerMp) => {
            Player.position = this.Positions.Entrance;
            Player.dimension = Globals.Dimension;
            setTimeout(() => {
                if (this.IPL.length > 1) {
                    Player.call('CLIENT::STREAMER:UNLOAD:IPL', [this.IPL]);
                }
            }, 200);
        };
    }
}