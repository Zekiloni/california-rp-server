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

export function GetPlayerFromArgument(Arg: string) {
    const Target = parseInt(Arg);
    if (Target) {
       const TargetPlayer = mp.players.at(Target);
       if (TargetPlayer) 
          return TargetPlayer;
       else
          return undefined;
    }
 }