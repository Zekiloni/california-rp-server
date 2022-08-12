
export const enum AnimationFlags {
   LOOP = 1 << 0,
   STOP_ON_LAST_FRAME = 1 << 1,
   ONLY_ANIMATE_UPPERBODY = 1 << 4,
   ALLOW_PLAYER_CONTROL = 1 << 5,
   CANCELLABLE = 1 << 7
}
