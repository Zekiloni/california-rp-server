

const player = mp.players.local;
let interactionMenu, opened = false;

const moods = [
    { name: 'Normalna', AnimName: 'normal' },
    { name: 'Zamišljena', AnimName: 'mood_aiming_1' },
    { name: 'Ljutita', AnimName: 'mood_angry_1' },
    { name: 'Pijana', AnimName: 'mood_drunk_1' },
    { name: 'Srećna', AnimName: 'mood_happy_1' },
    { name: 'Povredjena', AnimName: 'mood_injured_1' },
    { name: 'Stresirana', AnimName: 'mood_stressed_1' },
    { name: 'Uvređena', AnimName: 'mood_sulk_1' }
];

const walkingStyles = [
    {Name: "Normalna", AnimSet: null},
    {Name: "Brave", AnimSet: "move_m@brave"},
    {Name: "Confident", AnimSet: "move_m@confident"},
    {Name: "Drunk", AnimSet: "move_m@drunk@verydrunk"},
    {Name: "Fat", AnimSet: "move_m@fat@a"},
    {Name: "Gangster", AnimSet: "move_m@shadyped@a"},
    {Name: "Hurry", AnimSet: "move_m@hurry@a"},
    {Name: "Injured", AnimSet: "move_m@injured"},
    {Name: "Intimidated", AnimSet: "move_m@intimidation@1h"},
    {Name: "Quick", AnimSet: "move_m@quick"},
    {Name: "Sad", AnimSet: "move_m@sad@a"},
    {Name: "Tough", AnimSet: "move_m@tool_belt@a"}
];
 

mp.events.addDataHandler({
    'mood': (entity, value) => {
        if (entity.type === 'player') setMood(entity, value);
    },

    'walking_style': (entity, value) => {
        if (entity.type === 'player') setWalkingStyle(entity, value);
    },

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
            setMood(entity, entity.getVariable('mood')); 
            setWalkingStyle(entity, entity.getVariable('walking_style'))
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

function setMood (entity, mood) {
    if (mood == 'normal') {
        entity.clearFacialIdleAnimOverride();
    } else {
        mp.game.invoke('0xFFC24B988B938B38', entity.handle, mood, 0);
    }
}

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
 
