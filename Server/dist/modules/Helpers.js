"use strict";
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
        return frp.Settings.Lobby;
    }
});
