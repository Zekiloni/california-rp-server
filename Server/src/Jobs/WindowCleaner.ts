

let LiftCollection: ObjectMp[] = [];

enum Directions {
    Up, Down
}

const Objects = {
    Lift: mp.joaat('prop_bmu_02_ld'),
    Wiping_Rag: mp.joaat('prop_rag_01')
}

let LiftPositions = [
    { Position: new mp.Vector3(8.303692817687988, 11.242047309875488, 70.70639038085938), Rotation: new mp.Vector3(0, 0, 180) }, // 166.86375427246094, -762.6183471679688, 74.15531921386719
    { Position: new mp.Vector3(124.35614013671875, -773.352783203125, 114.15603637695312), Rotation: new mp.Vector3(0, 0, -20.34836769104004) }
];

let Right: any,
    Left: any;


Right = {
    X: 2.65021014213562, Y: -715.3552856445312
};

Left = {
    X: -5.153435230255127, Y: -719.0043334960938
};


function RandomNumber(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export class WindowCleaning {

    static RandomNumber(Min: number, Max: number) {
        return Math.random() * (Max - Min) + Min;
    }

    static MoveLift(ID: number, Direction: Directions) { // 0 - UP | 1 - DOWN
        const LiftObject = mp.objects.at(ID);
        if (LiftObject && mp.objects.exists(ID)) {
            switch (Direction) {
                case Directions.Up:
                    const MoveUp = setInterval(() => {
                        LiftObject.position = new mp.Vector3(LiftObject.position.x, LiftObject.position.y, LiftObject.position.z + 0.05);
                    }, 50);
                    setTimeout(() => {
                        clearInterval(MoveUp);
                    }, 500);
                    break;
                case Directions.Down:
                    const MoveDown = setInterval(() => {
                        LiftObject.position = new mp.Vector3(LiftObject.position.x, LiftObject.position.y, LiftObject.position.z - 0.05);
                    }, 50);
                    setTimeout(() => {
                        clearInterval(MoveDown);
                    }, 500);
                    break;
                default:
                    console.log("[WindowCleaning][MoveLift]: Unknown direction: " + Direction);
            }
        }
    }

    static Init() {
        for (const Lift of LiftPositions) {
            let LiftObject = mp.objects.new(Objects.Lift, Lift.Position, {
                rotation: Lift.Rotation,
                alpha: 255,
                dimension: 0
            });
            LiftCollection.push(LiftObject);
        }
    }

    static StartShift(Player: PlayerMp) {
        const Lift = WindowCleaning.GetNearestLift(Player);
        if (Lift != undefined) {
            Player.call('CLIENT::WINDOW:CLEANER:INSTRUCTIONS:TOGGLE');
            Player.setProp(0, 145, 0); // yellow helmet
            Player.setClothes(8, 181, 0, 2); // orange vest
            Player.setVariable('WINDOW_SHIFT', true);
            WindowCleaning.CreateRandomMarker(Player, 0);
        } else Player.notify('Nisi kod mesta za konopac.');

    }

    static CleanWindow(Player: PlayerMp) {
        Player.playScenario('WORLD_HUMAN_MAID_CLEAN');
        setTimeout(() => {
            Player.stopAnimation();
            Player.call('CLIENT::SCENARIO:REMOVE:PROP', [Objects.Wiping_Rag]);
        }, 5000);
    }

    static GetNearestLift(Player: PlayerMp) {
        for (const Lift of LiftCollection) {
            if (Distance(Player.position, Lift.position) <= 3) {
                return Lift;
            }
        }
    }

    static CreateRandomMarker(Player: PlayerMp, Route: number) {
        const Height = RandomNumber(96, 220);
        const PlayerHeight = Player.position.z;
        const DiffHeight = Height - PlayerHeight;
        const Message = DiffHeight > 0 ? 'Podignite lift ' : 'Spustite lift ';
        const LeftOrRight = RandomNumber(0, 1);
        const Position = LeftOrRight == 0 ? new mp.Vector3(Right.X, Right.Y, Height) : new mp.Vector3(Left.X, Left.Y, Height);

        const Checkpoint = mp.markers.new(0, Position, 2, {
            direction: new mp.Vector3(2.66803361625989, 1.7881357905480, 25.09992027282715),
            color: [255, 255, 255, 255],
            visible: true,
            dimension: 0
        });

        Player.notify(Message + 'do sledeceg prozora.');
    }
}

WindowCleaning.Init();

function Distance(First: Vector3Mp, Second: Vector3Mp) {
    return new mp.Vector3(First.x, First.y, First.z).subtract(new mp.Vector3(Second.x, Second.y, Second.z)).length();
}

mp.events.addCommand(
    {
        "lifts": (Player, _) => {
            const Lift = WindowCleaning.GetNearestLift(Player);
            if (Lift != undefined) {
                Player.outputChatBox(JSON.stringify(Lift.position));
            } else Player.notify('You are not near any lift.');
        },

        "duty": (Player, _) => {
            WindowCleaning.StartShift(Player);
        },

        "clean": (Player, _) => {
            WindowCleaning.CleanWindow(Player);
        },
    });

