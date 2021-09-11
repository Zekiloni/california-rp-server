

let LiftCollection: ObjectMp[] = [];

enum Directions {
    Up, Down
}
const LiftObjectModel = mp.joaat('prop_bmu_02_ld');

let LiftPositions = [
    { Position: new mp.Vector3(8.303692817687988, 11.242047309875488, 70.70639038085938), Rotation: new mp.Vector3(0, 0, 180) }, // 166.86375427246094, -762.6183471679688, 74.15531921386719
    { Position: new mp.Vector3(124.35614013671875, -773.352783203125, 114.15603637695312), Rotation: new mp.Vector3(0, 0, -20.34836769104004) }
];

let MarkerPositions = [
    // Route 1
    [
        new mp.Vector3(122.2626953125, -771.9775390625, 123.32615661621094),
        new mp.Vector3(121.98973846435547, -771.888427734375, 118.89521026611328),
        new mp.Vector3(122.04393005371094, -771.866943359375, 122.42253875732422),
        new mp.Vector3(125.9626693725586, -773.364013671875, 126.4911117553711),
        new mp.Vector3(125.96053314208984, -773.354248046875, 130.52743530273438),
        new mp.Vector3(122.2466049194336, -771.927490234375, 134.16017150878906),
        new mp.Vector3(122.2466049194336, -771.927490234375, 138.1884765625),
        new mp.Vector3(125.98313903808594, -773.3374633789062, 138.6706085205078)
    ],

    // Route 2
    [

    ]
];

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
            let LiftObject = mp.objects.new(LiftObjectModel, Lift.Position, {
                rotation: Lift.Rotation,
                alpha: 255,
                dimension: 0
            });
            LiftCollection.push(LiftObject);
        }
    }

    static StartShift(Player: PlayerMp) {
        // if WINDOW_SHIFT
        Player.call('CLIENT::WINDOW:CLEANER:INSTRUCTIONS:TOGGLE');
        Player.setProp(0, 145, 0); // yellow helmet
        Player.setClothes(8, 181, 0, 2); // orange vest
        Player.setVariable('WINDOW_SHIFT', true);
        //WindowCleaning.CreateRandomMarker(Player, 0);
    }

    static CleanWindow(Player: PlayerMp) {
        Player.playScenario('WORLD_HUMAN_MAID_CLEAN');
        setTimeout(() => {
            Player.stopAnimation();
        }, 5000);
    }

    static GetNearestLift(Player: PlayerMp) {
        for (const Lift of LiftCollection) {
            if (Distance(Player.position, Lift.position) <= 3) {
                return Lift;
            }
        }
    }

    static GetMarkerForRoute(Player: PlayerMp, Route: number) {
        const Number = WindowCleaning.RandomNumber(0, MarkerPositions[Route].length);
        const MarkerPos = MarkerPositions[Route][Number];
 
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

