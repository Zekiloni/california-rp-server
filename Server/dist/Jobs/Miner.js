"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Miner = void 0;
const MiningSpots = [
    [2955.808, 2769.739, 39.228], [2965.794, 2772.616, 39.404],
    [2968.642, 2782.328, 39.037], [2981.407, 2780.817, 39.590],
    [2977.299, 2791.166, 40.584], [2977.871, 2797.864, 42.583],
    [2970.321, 2800.066, 41.402], [2957.465, 2774.163, 39.964],
    [2938.866, 2772.893, 39.267], [2938.799, 2768.156, 39.533],
    [2934.525, 2783.241, 39.366], [2928.315, 2792.685, 40.494],
    [2919.107, 2798.439, 40.998], [2936.635, 2812.305, 42.972],
    [2945.963, 2818.271, 42.655]
];
class Miner {
    constructor() {
    }
    start(Player) {
        Player.call('client:player.miner.start', [MiningSpots]);
        Player.setProp(0, 145, 0); // yellow helmet
        Player.setClothes(8, 59, 0, 2); // green vest
    }
}
exports.Miner = Miner;
