import { Natives } from "./Data/Natives";

const Player: PlayerMp = mp.players.local;

mp.events.add({
    'CLIENT::SCENARIO:REMOVE:PROP': (Model: number) => { // 'prop_rag_01'
        RemoveScenarioProp(Model);
    },

    'CLIENT::CREATE:ROPE': () => {
        CreateAttachedRope();
    }
});

function RemoveScenarioProp(Model: number) {
    const Handle = mp.game.object.getClosestObjectOfType(Player.position.x, Player.position.y, Player.position.z, 5, Model, false, true, true);
    if (Handle) {
        const Object = mp.objects.newWeak(Handle);
        if (Object) {
            Object.destroy();
        }
    }
}

// True = Load | False = Unload
function LoadRopeTextures(Load: boolean) {
    if (Load) {
        mp.game.invoke(Natives.ROPE_LOAD_TEXTURES);
        while (!mp.game.invoke(Natives.ROPE_ARE_TEXTURES_LOADED)) {
            mp.game.waitAsync(1);
        }
    } else {
        if (mp.game.invoke(Natives.ROPE_ARE_TEXTURES_LOADED)) {
            mp.game.invoke(Natives.ROPE_UNLOAD_TEXTURES)
        }
    }
}

function CreateAttachedRope() {
    LoadRopeTextures(true);
    
    const Rope = mp.game.rope.addRope(Player.position.x,
        Player.position.y,
        Player.position.z,
        0,
        0,
        0,
        5.0,
        3,
        5.0,
        10.0,
        0.5,
        false,
        false,
        false,
        5.0,
        false,
        0);
    mp.game.rope.attachRopeToEntity(Rope, Player.handle, 0, 0, 0, true);
    //mp.game.rope.attachEntitiesToRope(parseInt(Rope), handle, Player.handle, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 10.0, false, false, 0, 0);
}

export { };