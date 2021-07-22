

const player = mp.players.local;
let interactionMenu, opened = false;


 

mp.events.addDataHandler({

    'ragdoll': (entity, newValue, oldValue) => { 
        if (entity.type === 'player') { 
            if (newValue != oldValue) { 
                ragdoll(entity, newValue);
            }
        }
    }
});

mp.events.add({
    'entityStreamIn': (entity) => {
        if (entity.type === 'player') { 
            setMood(entity, entity.getVariable('Mood')); 
            setWalkingStyle(entity, entity.getVariable('Walking_Style'))
        }
    },

    'client:player.interactions.menu': (toggle) => { 
        if (toggle) { 
            interactionMenu = mp.browsers.new('package://player/Interactions/interactions-interface/interactions.html');
            interactionMenu.execute(`interactions.moods = ${JSON.stringify(moods)}`);
            opened = true;
            setTimeout(() => { mp.gui.cursor.show(true, true); }, 100);
        } else { 
            opened = false;
            setTimeout(() => { mp.gui.cursor.show(false, false); }, 100);
            interactionMenu.destroy();
            
        }
    },

    'client:player.mood': (mood) => { 
        mp.events.callRemote('server:player.mood', mood);
    },

    'client:player.scenario': Scenario,

    'client:player.walking_style': (style) => {
        mp.events.callRemote('server:player.walking_style', style);
        setMovementClipset(player, style);
     }
});


mp.keys.bind(0x4D, false, function() {
    if (mp.players.local.isTypingInTextChat) return;
    if (player.logged && player.spawned) { 
        if (opened) { 
            mp.events.call('client:player.interactions.menu', false);
        } else { 
            mp.events.call('client:player.interactions.menu', true);
        }
    }
});


function setWalkingStyle(entity, walkstyle) {
    try {
       if (walkstyle == null) entity.resetMovementClipset(0.0);
       else entity.setMovementClipset(walkstyle, 0.0);
    } catch (e) { }
}

function ragdoll (entity, status) { 
    if (status) { 
       entity.setToRagdoll(500, 500, 0, true, true, true); 
    } else { 
        entity.resetRagdollTimer();
    }
}

function Scenario (name, delay, enterAnim, time) { 
   player.taskStartScenarioInPlace(name, delay, enterAnim);
   if (time) setTimeout(() => { player.clearTasks(); }, time * 1000);
}
 
