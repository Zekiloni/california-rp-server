"use strict";
const Zone = {};
const Status = {
    Alive: 0, Woundend: 1, Dead: 2
};
class Animals {
    constructor(model, position, heading) {
        this.Model = model;
        this.Position = new mp.Vector3(position.x, position.y, position.z);
        this.Ped = mp.peds.new(mp.joaat(this.Model), this.Position, heading, 0);
        this.Status = Status.Alive;
        const Health = this.Ped.health;
        this.Ped.health = Health - 1;
        Animals.All.push(this);
    }
    Delete() {
        const Index = Animals.All.indexOf(this);
        this.Ped.destroy();
        Animals.All.splice(Index, 1);
    }
    static Nearest(player) {
        Animals.All.forEach((Animal) => {
            if (player.dist(Animal.Ped.position) < 4)
                return Animal;
        });
    }
    static New(model, position, heading) {
        new Animals(model, position, heading);
    }
    ;
}
Animals.All = [];
frp.Animals = Animals;
