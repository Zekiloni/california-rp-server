"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameObjectts = void 0;
const Settings_1 = require("../Server/Settings");
exports.GameObjectts = {
    Vehicles: {},
    tVehicles: {},
    Houses: {},
    Businesses: {},
    Items: {}
};
mp.events.add({
    'playerEnterColshape': (Player, Colshape) => {
        if (Player.vehicle)
            return;
        if (Colshape.OnPlayerEnter)
            Colshape.OnPlayerEnter(Player);
    },
    'playerExitColshape': (Player, Colshape) => {
        if (Player.vehicle)
            return;
        if (Colshape.OnPlayerLeave)
            Colshape.OnPlayerLeave(Player);
    }
});
mp.events.addProc({
    'SERVER::PLAYER:LOBY': (Player) => {
        Player.dimension = Player.id;
        console.log('stepbro');
        return Settings_1.Settings.Lobby;
    }
});
