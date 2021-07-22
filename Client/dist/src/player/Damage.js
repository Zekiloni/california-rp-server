"use strict";
const Player = mp.players.local;
let SendToServer = true;
mp.events.add({
    'outgoingDamage': (sourceEntity, targetEntity, sourcePlayer, weapon, boneIndex, damage) => {
        // if (targetEntity.type === 'player') {
        //    if (targetEntity.getHealth() - damage < damage) { 
        //       mp.events.callRemoteProc('server:character.wounded', mp.players.at(targetEntity.id)).then((Response) => { 
        //          mp.gui.chat.push(JSON.stringify(Response));
        //          return true;
        //       });
        //    }
        // }
    },
    'incomingDamage': (sourceEntity, sourcePlayer, targetEntity, weapon, boneIndex, damage) => {
        if (targetEntity.id == Player.id) {
            if (Player.getVariable('Wounded')) {
                mp.gui.chat.push('wounded');
            }
            else {
                let Injury = { Weapon: weapon, Bone: boneIndex };
                Damage.Effect(boneIndex);
                mp.gui.chat.push('Nije wounded');
                if (SendToServer) {
                    mp.events.callRemote('server:character.injuries:add', JSON.stringify(Injury));
                    SendToServer = false;
                    setTimeout(() => { SendToServer = true; }, 1000);
                }
                //    if (Player.getHealth() - damage < damage) {
                //       mp.gui.chat.push('Zadnji hitac')
                //       return true;
                //    }
            }
        }
    }
});
const Damage = {
    Check: function () {
        if (Player.logged && Player.spawned) {
            const Injuries = Player.getVariable('Injuries');
            if (Injuries.length > 0 && Player.getSpeed() > 5) {
                if (Injuries.find(Element => Element.Bone == 4 || Element.Bone == 2)) {
                    if (SendToServer)
                        mp.events.callRemote('server:character.wounded:fall');
                }
            }
        }
        setTimeout(() => { Damage.Check(); }, 1000);
    },
    Effect: function (Bone) {
        switch (Bone) {
            case 20: {
                mp.game.graphics.startScreenEffect('DefaultFlash', 1500, false);
                break;
            }
            default: {
            }
        }
    }
};
Damage.Check();
