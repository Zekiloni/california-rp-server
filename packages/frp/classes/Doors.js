let DOORS = require('../data/Doors.json');
mp.doors = {};
class Door {
    constructor(id, name, position, model, state) {
        this.id = id;
        this.name = name;
        this.position = position;
        this.model = model;
        this.state = state;
        this.faction = null;
        this.colshape = mp.colshapes.newRectangle(position[0], position[1], 3, 2, 0);
        this.colshape.doors = this.id;
        mp.doors[this.id] = this;
    }
    status() {
        this.state = !this.state;
        mp.players.call('client:doors.state', [this.model, this.position, this.state]);
    }
}
class Doors {
    constructor() {
        mp.events.add({
            'playerEnterColshape': (player, colshape) => {
                if (colshape.doors) {
                    let door = colshape.doors;
                    let state = mp.doors[door].state, position = mp.doors[door].position, model = mp.doors[door].model;
                    player.call('client:doors.sync', [model, position, state]);
                    player.near = { type: 'door', id: door };
                }
            },
            'playerExitColshape': (player, colshape) => {
                if (colshape.doors && player.near) {
                    player.near = null;
                }
            }
        });
    }
    init() {
        let counter = 0;
        for (let door of DOORS) {
            let d = new Door(door.id, door.name, door.position, door.model, door.locked);
            if (door.faction) {
                d.faction = door.faction;
            }
            counter++;
        }
        frp.Main.Terminal(3, counter + ' Doors Loaded !');
    }
    lock() {
    }
    unlock() {
    }
}
let doors = new Doors();
doors.init();
