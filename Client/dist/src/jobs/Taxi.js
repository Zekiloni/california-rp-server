"use strict";
const Player = mp.players.local;
mp.events.add({
    'playerEnterVehicle': (Vehicle, Seat) => {
        if (Vehicle.getVariable('Job') == 7) {
            if (Seat == -1)
                return;
            const Driver = Vehicle.getPedInSeat(-1);
            mp.gui.chat.push(JSON.stringify(Driver));
            mp.gui.chat.push(JSON.stringify(Driver.id));
        }
    },
    'playerLeaveVehicle': (Vehicle, Seat) => {
        if (Seat == -1)
            return;
    }
});
