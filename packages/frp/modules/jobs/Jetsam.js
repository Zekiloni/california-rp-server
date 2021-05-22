const ContainerTypes = ['Maloprodajne Zalihe', 'Oprema za Oruzije i Municija', 'Namestaj i Pokucstvo'];
const DropZone = new mp.Vector3(1111.625, -3139.361, 6.14), RefreshInterval = 60000 * 20;
const PortPositions = [
    [858.7689, -2926.11914], [870.7026, -2926.32714], [889.9401, -2926.15454],
    [910.0266, -2925.97851], [925.7468, -2925.81713], [910.1923, -2914.47070],
    [887.1997, -2914.36376], [867.2453, -2914.49121], [847.2453, -2914.49121]
];
const ContainerStatus = {
    Load: 0, Attached: 1, Dropzone: 2
};
let containers = {};
let counter = 1;
class Container {
    constructor(id, type, position) {
        this.id = id;
        this.type = type;
        this.position = position;
        this.object = mp.objects.new('prop_container_03a', position, { rotation: new mp.Vector3(0, 0, 90), alpha: 255, dimension: 0 });
        this.object.notifyStreaming = true;
        this.status = ContainerStatus.Load;
        containers[this.id] = this;
    }
    pickup(vehicle) {
        if (this.status == ContainerStatus.Load) {
            this.status = ContainerStatus.Attached;
            this.object.destroy();
            vehicle.setVariable('container', this.id);
        }
    }
    drop(vehicle, offset) {
        this.status = ContainerStatus.Dropzone;
        vehicle.setVariable('container', false);
        let position = new mp.Vector3(offset.x, offset.y, 4.9042);
        this.object = mp.objects.new('prop_container_03a', position, { rotation: new mp.Vector3(0, 0, vehicle.heading + 90), alpha: 255, dimension: 0 });
    }
    tow(player) {
        delete containers[this.id];
    }
}
class Port {
    constructor() {
        mp.events.add({
            'server:vehicle.attach.container': (player) => {
                let near = this.nearbyContainer(player);
                if (near) {
                    near.pickup(player.vehicle);
                }
            },
            'server:vehicle.detach.container': function (player, offset) {
                let container = containers[player.vehicle.data.container];
                if (player.dist(DropZone) < 30) {
                    container.drop(player.vehicle, offset);
                }
            }
        });
    }
    load() {
        for (let i in PortPositions) {
            let id = counter++, pos = PortPositions[i], type = Math.floor(Math.random() * ContainerTypes.length);
            new Container(id, type, new mp.Vector3(pos[0], pos[1], 4.9042));
        }
        setTimeout(() => { this.refresh(); }, RefreshInterval);
    }
    start(player, args) {
        let character = player.getCharacter();
        switch (args) {
            case 'load': {
                character.working.duty = true;
                player.notification('Započeli ste posao !', NOTIFY_SUCCES, 4);
                player.sendMessage('Koristite Y kako bi ste zakačili kontenjer za lift, takodje da bi ste otkačili.', mp.colors.help);
                break;
            }
            case 'transfer': {
                break;
            }
        }
    }
    refresh() {
    }
    nearbyContainer(player) {
        if (player.vehicle) {
            for (let i in containers) {
                let container = containers[i];
                if (container.status == ContainerStatus.Load) {
                    if (player.vehicle.dist(container.object.position) < 6.5) {
                        console.log(container);
                        return container;
                    }
                    else {
                        return false;
                    }
                }
            }
        }
    }
}
let port = new Port();
port.load();
module.exports = port;
