let ActorID: number = -1,
    AllActors: Array<Actor>;



class Actors {

    static CreateActor(name: string, pedModel: string, position: Vector3Mp, rotation: number) {
        ActorID++;
        const NewActor = new Actor(ActorID, name, pedModel, position, rotation);
        AllActors.push(NewActor);
    }

    static GetActorById(actorId: number) {
        if (AllActors.length > 0) {
            const Ped = AllActors.find( ({ Id }) => Id === actorId );
            if (Ped) { return Ped; } else { return undefined; }
        }   
    }
}

class Actor {
    Id: number;
    Name: string;
    PedModel: number;
    Position: Vector3Mp;
    Rotation: number;
    Ped: PedMp;
    Label: any = undefined;

    constructor(id: number, name: string, pedModel: string, position: Vector3Mp, rotation: number, labeled: any = false) {
        this.Id = id;
        this.Name = name;
        this.PedModel = mp.joaat(pedModel);
        this.Position = position;
        this.Rotation = rotation;
        this.Ped = mp.peds.new(
            this.PedModel, 
            this.Position, {
                dynamic: true,
                frozen: true,
                invincible: true,
            }
        );
        this.Label = null;
        if (labeled) {
            this.Label = mp.labels.new(this.Name.toString(), new mp.Vector3(this.Position.x, this.Position.y, this.Position.z + 0.3), {
                los: true,
                font: 1,
                drawDistance: 5,
            });
        } 
    }
}