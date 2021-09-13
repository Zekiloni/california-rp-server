"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RandomInt = exports.DistanceBetweenVectors = void 0;
function DistanceBetweenVectors(First, Second) {
    return new mp.Vector3(First.x, First.y, First.z).subtract(new mp.Vector3(Second.x, Second.y, Second.z)).length();
}
exports.DistanceBetweenVectors = DistanceBetweenVectors;
function RandomInt(Min, Max) {
    return Math.random() * (Max - Min) + Min;
}
exports.RandomInt = RandomInt;
