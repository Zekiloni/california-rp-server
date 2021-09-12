export function DistanceBetweenVectors (First: Vector3Mp, Second: Vector3Mp) {
    return new mp.Vector3(First.x, First.y, First.z).subtract(new mp.Vector3(Second.x, Second.y, Second.z)).length();
 }

 export function RandomInt(Min: number, Max: number) {
    return Math.random() * (Max - Min) + Min;
}