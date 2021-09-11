"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WindowCleaning = void 0;
let LiftPositions = [
    new mp.Vector3(166.86375427246094, -762.6183471679688, 74.15531921386719)
];
class WindowCleaning {
    static OnInit() {
        for (const Pos of LiftPositions) {
            const LiftObject = mp.objects.new(mp.joaat('prop_bmu_02_ld'), Pos);
        }
    }
    static StartCleaning(Player) {
        Player.setProp(0, 145, 0); // yellow helmet
        Player.setClothes(8, 59, 0, 2); // green vest
    }
}
exports.WindowCleaning = WindowCleaning;
mp.events.addCommand("daj", (player, _) => {
    console.log(JSON.stringify(player.position));
});
