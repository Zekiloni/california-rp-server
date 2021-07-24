"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameObjectts = void 0;
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
