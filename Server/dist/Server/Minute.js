"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Settings_1 = require("./Settings");
const interval = 60 * 1000;
async function Update(Player) {
    const Character = await Player.Character(), account = await Player.Account();
    Character.increment('Minutes', { by: Settings_1.Settings.HappyHours == true ? 2 : 1 });
    if (Character.Minutes >= 60) {
        await Character.increment('Hours', { by: 1 });
        Character.update({ Minutes: 0 });
    }
    Character.increment('Hunger', { by: -0.35 });
    Character.increment('Thirst', { by: -0.70 });
    if (Character.Muted > 0) {
        await Character.increment('Muted', { by: -1 });
    }
}
function Minute() {
    mp.players.forEach((player) => {
        if (player.data.logged && player.data.spawned) {
            Update(player);
        }
    });
    setTimeout(() => { Minute(); }, interval);
}
Minute();
