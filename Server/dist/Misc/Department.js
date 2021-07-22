"use strict";
const Department = {
    Position: new mp.Vector3(-761.8135, -1308.1590, 5.150),
    Vehicle: {
        Position: new mp.Vector3(-759.0048, -1318.384, 4.3801),
        Rotation: new mp.Vector3(-0.031622, 0.0304401, -43.57),
        Models: ['asea', 'intruder'],
        Color: 69
    }
};
module.exports = { Department };
const Route = require('../data/Driving.Route');
const Quiz = require('../data/Driving.Quiz');
mp.events.add({
    'server:vehicle.department.license:give': async (Player, Category, vehicle) => {
        frp.Main.Sleep(4).then(async () => {
            frp.GameObjects.TemporaryVehicles[vehicle].destroy();
            const Character = await Player.Character();
            Character.GiveLicense(Category);
            Player.Notification(frp.Globals.messages.SUCCEFULLY_GET_LICENSE + Category + '.', frp.Globals.Notification.Succes, 6);
        });
    },
    'server:vehicle.department:menu': async (player) => {
        const Character = await player.Character();
        const Player = { Money: Character.Money, Licenses: Character.Licenses };
        const Department = { Quiz: Quiz, Licenses: frp.Settings.Licenses };
        player.call('client:vehicle.department:menu', [Player, Department]);
    }
});
mp.events.addProc({
    'server:vehicle.department.driving:start': (player) => {
        let Model = Department.Vehicle.Models[Math.floor(Math.random() * Department.Vehicle.Models.length)];
        const Vehicle = frp.Vehicles.CreateTemporary(Model, Department.Vehicle.Position, Department.Vehicle.Rotation, [Department.Vehicle.Color, Department.Vehicle.Color], 'DMV' + frp.Main.GenerateNumber(3));
        player.SendMessage(frp.Globals.messages.DMV_INSTRUCTOR_GO_VEHICLE, frp.Globals.Colors.white[0]);
        return [Vehicle.id, Route];
    }
});
class DMV {
    static Working() {
        if (mp.world.time.hour < 6 || mp.world.time.hour > 20) {
            DMV.Colshape.OnPlayerEnter = (player) => { player.Notification(frp.Globals.messages.DMV_NOT_WORKING, frp.Globals.Notification.Info, 5); };
        }
        else {
            DMV.Colshape.OnPlayerEnter = (player) => { player.Notification(frp.Globals.messages.DMV_USAGE, frp.Globals.Notification.Info, 5); };
        }
        setTimeout(() => { DMV.Working(); }, 30 * 1000);
    }
}
DMV.Colshape = mp.colshapes.newRectangle(Department.Position.x, Department.Position.y, Department.Position.z, 2.0, 2.0, frp.Settings.default.dimension);
DMV.Blip = mp.blips.new(530, new mp.Vector3(Department.Position.x, Department.Position.y, 0), {
    name: 'Department of Motor Vehicles',
    scale: 0.85,
    color: 54,
    alpha: 255,
    shortRange: true,
    dimension: frp.Settings.default.dimension,
});
;
DMV.Working();
