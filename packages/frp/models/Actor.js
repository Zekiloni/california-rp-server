let ActorID = -1;

frp.Actors = class Actors {

    static CreateActor(name, pedModel, position, rotation) {
        ActorID++;
        const NewActor = new Actor(ActorID, name, pedModel, position, rotation);
        frp.Actors.AllActors.push(NewActor);
    }

    static GetActorById(actorId) {
        if (frp.Actors.AllActors.length > 0) {
            const Ped = frp.Actors.AllActors.find( ({ Id }) => Id === actorId );
            if (Ped) { return Ped; } else { return undefined; }
        }   
    }

    static 
}


// On init
frp.Actors.AllActors = [];

// Ovo u drugi fajl
class Actor {
    constructor(id, name, pedModel, position, rotation, labeled = false) {
        this.Id = id;
        this.Name = name;
        this.PedModel = mp.joaat(pedModel);
        this.Position = position;
        this.Rotation = rotation;
        this.Ped = mp.peds.new(
            this.PedModel, 
            this.Position,
            this.Rotation,
            0 // Globalna dimenzija
        );
        if (labeled) {
            this.Label = mp.labels.new(this.Name.toString(), new mp.Vector3(this.Position.x, this.Position.y, this.Position.z + 0.3), {
                los: true,
                font: 1,
                drawDistance: 5,
            });
        } 
    }
}