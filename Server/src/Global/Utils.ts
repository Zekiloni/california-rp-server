export function DistanceBetweenVectors(First: Vector3Mp, Second: Vector3Mp) {
    return new mp.Vector3(First.x, First.y, First.z).subtract(new mp.Vector3(Second.x, Second.y, Second.z)).length();
}

export function RandomInt(Min: number, Max: number) {
    return Math.random() * (Max - Min) + Min;
}

export function KickEx(Target: PlayerMp, Reason: string) {
    setTimeout(() => {
        Target.kick(Reason);
    }, 300);
}

export function IsPlayerNearPlayer(Player: PlayerMp, Target: PlayerMp, MaxDistance: number = 0.5) {
    if (DistanceBetweenVectors(Player.position, Target.position) <= MaxDistance) 
        return true;
    return false;
}

export function IsPlayerNearPoint(Player: PlayerMp, Position: Vector3Mp, MaxDistance: number = 1.5) {
    if (DistanceBetweenVectors(Player.position, Position) <= MaxDistance)
        return true;
    return false;
}