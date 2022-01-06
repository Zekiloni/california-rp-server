import { DistanceBetweenVectors, RandomInt } from "../Global/Utils";

let LiftCollection: ObjectMp[] = [];

enum Directions {
    Up, Down
}

const Objects = {
    Lift: mp.joaat('prop_bmu_02_ld'),
    Wiping_Rag: mp.joaat('prop_rag_01')
}

const LiftPositions = [
    { Position: new mp.Vector3(-1.0624277591705322, -717.603271484375, 222.39064025878906), Rotation: new mp.Vector3(2.6680336162598906e-8, 1.78813579054804e-7, 25.09992027282715) }
];

/* { Position: new mp.Vector3(8.303692817687988, 11.242047309875488, 70.70639038085938), Rotation: new mp.Vector3(0, 0, 180) }, // 166.86375427246094, -762.6183471679688, 74.15531921386719
    { Position: new mp.Vector3(124.35614013671875, -773.352783203125, 114.15603637695312), Rotation: new mp.Vector3(0, 0, -20.34836769104004) }*/

let Right: any,
    Left: any;

Right = {
    X: 2.65021014213562, Y: -715.3552856445312
};

Left = {
    X: -5.153435230255127, Y: -719.0043334960938
};

export class WindowCleaning {

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

    static StartShift(Player: PlayerMp) {
        const Lift = WindowCleaning.GetNearestLift(Player);
        if (Lift != undefined) {
            Player.call('CLIENT::WINDOW:CLEANER:INSTRUCTIONS:TOGGLE');
            Player.setProp(0, 145, 0); // yellow helmet
            Player.setClothes(8, 181, 0, 2); // orange vest
            Player.setVariable('WINDOW_SHIFT', true);
            WindowCleaning.GetCleaningDestination(Player, 0);
        } else Player.notify('Nisi kod mesta za konopac.');

    }

    static CleanWindow(Player: PlayerMp) {
        if (Player.getVariable('CLEANING_ALLOWED')) {
            Player.setVariable('CLEANING_ALLOWED', false);
            Player.playScenario('WORLD_HUMAN_MAID_CLEAN');
            setTimeout(() => {
                Player.stopAnimation();
                Player.call('CLIENT::SCENARIO:REMOVE:PROP', [Objects.Wiping_Rag]);
            }, 5000);
        } else { /* Ne moze */ }
        
    }

    static GetNearestLift(Player: PlayerMp) {
        for (const Lift of LiftCollection) {
            if (DistanceBetweenVectors(Player.position, Lift.position) <= 3) {
                return Lift;
            }
        }
    }

    static GetCleaningDestination(Player: PlayerMp, Route: number) {
        const Height = RandomInt(96, 220);
        const PlayerHeight = Player.position.z;
        const DiffHeight = Height - PlayerHeight;
        const Message = DiffHeight > 0 ? 'Podignite lift ' : 'Spustite lift ';
        const LeftOrRight = RandomInt(0, 1);
        // Dodati rutu
        const Position = LeftOrRight == 0 ? new mp.Vector3(Right.X, Right.Y, Height) : new mp.Vector3(Left.X, Left.Y, Height);

        Player.call('CLIENT::WINDOW:CLEANER:MARKER:SET', [Position]);
        Player.notify(Message + 'do sledeceg prozora.');
    }
}

/* const Checkpoint = mp.markers.new(0, Position, 2, {
            direction: new mp.Vector3(2.66803361625989, 1.7881357905480, 25.09992027282715),
            color: [242, 226, 2, 225],
            visible: true,
            dimension: Globals.Dimension
        });
*/

WindowCleaning.Init();

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

