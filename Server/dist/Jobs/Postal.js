"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Postal = void 0;
class Postal {
    constructor() {
        mp.events.add({
            'server:job.postal:start': (Player) => {
            }
        });
    }
}
exports.Postal = Postal;
;
