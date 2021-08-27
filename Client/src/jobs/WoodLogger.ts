import { Natives } from '../Data/Natives';
import { EntityData } from '../Data/EntityData';

let TreeID = -1, CurrentTreeObject = null, Working = true, Hits = 0;

mp.game.invoke(Natives.REQUEST_COLLISION_FOR_MODEL, mp.game.joaat('test_tree_forest_trunk_fall_01')); // 	REQUEST_COLLISION_FOR_MODEL
mp.game.invoke(Natives.REQUEST_COLLISION_FOR_MODEL, mp.game.joaat('test_tree_cedar_trunk_001'));
mp.game.invoke(Natives.REQUEST_COLLISION_FOR_MODEL, mp.game.joaat('test_tree_forest_trunk_01'));

function EnableTreeDamage () {
    mp.objects.forEach(object => {
        const TreeObject = mp.objects.at(object.id), Exists = mp.objects.exists(object.id);
        if (TreeObject && Exists) {
            if (TreeObject.hasVariable(EntityData.TREE_IN_PROCESS)) return;
            if (TreeObject.hasVariable(EntityData.TREE_ID)) { 
                TreeID = object.getVariable(EntityData.TREE_ID);
                TreeObject.setCanBeDamaged(true);
                TreeObject.Hits = 0;
            }
        }
    });
}

function LoggingRender () {
    if (!player.hasVariable(EntityData.PLAYER_LOGGED_IN) || !player.getVariable(EntityData.PLAYER_LOGGED_IN)) return;
    //if (LastCheck != null && (Date.now() - LastCheck) < 1000) return; // Limit checks to 1 per second

    if (Working) {
        mp.objects.forEach(object => { 
        const TreeObject = mp.objects.at(object.id), Exists = mp.objects.exists(object.id);
        if (TreeObject && Exists) {
            if (!TreeObject.hasVariable(EntityData.TREE_ID) || !TreeObject.hasVariable(EntityData.TREE_HP) || !TreeObject.hasVariable(EntityData.TREE_STATE)) return;
                const TreeID = TreeObject.getVariable(EntityData.TREE_ID),
                    TreeHP = TreeObject.getVariable(EntityData.TREE_HP),
                    TreeState = TreeObject.getVariable(EntityData.TREE_STATE);
                
                if (TreeObject.hasBeenDamagedByAnyPed()) {
                    if (TreeObject.Hits < TreeHP  && TreeState < 4) {
                        mp.game.invoke(Natives.CLEAR_ENTITY_LAST_DAMAGE_ENTITY, TreeObject.handle);
                        mp.game.wait(5);
                        mp.events.callRemote('server:job.logging.tree:cutting', TreeID); // server:job.logging.tree:cutting
                        mp.game.wait(5);
                        TreeObject.Hits++;
                        mp.gui.chat.push(`[DEBUG] You are cutting tree ID: ${TreeID} Hits: ${TreeObject.Hits}`);
                    }    

                    if(TreeObject.Hits >= TreeHP) {
                        mp.gui.chat.push(`[DEBUG] You cutted tree ID: ${TreeID} Hits: ${TreeObject.Hits}`);
                        TreeObject.Hits = 0;
                        mp.game.invoke(Natives.CLEAR_ENTITY_LAST_DAMAGE_ENTITY, TreeObject.handle);
                        mp.game.wait(5);
                        mp.events.callRemote('server:job.logging.tree:harvested', TreeID);
                    }  

                    if (TreeState == 4) {         
                        mp.game.invoke(Natives.CLEAR_ENTITY_LAST_DAMAGE_ENTITY, TreeObject.handle);
                        mp.game.wait(5);
                        //mp.events.callRemote('server:job.logging.tree:chopping', TreeID);
                        TreeObject.Hits++;
                        mp.gui.chat.push(`[DEBUG] You are chopping tree ID: ${TreeID} Hits: ${TreeObject.Hits}`);
                        //mp.events.remove('render', LoggingRender);    
                    }

                    if (TreeState == 4 && TreeObject.Hits >= TreeHP) {
                        mp.gui.chat.push(`IF ${TreeState} == 4 && ${TreeObject.Hits} >= ${TreeHP}`);                                
                        mp.game.invoke(Natives.CLEAR_ENTITY_LAST_DAMAGE_ENTITY, TreeObject.handle);
                        mp.game.wait(5);
                        mp.events.callRemote('server:job.logging.tree:chopped', TreeID);
                        mp.gui.chat.push(`[DEBUG] You chopped up tree ID: ${TreeID} Hits: ${TreeObject.Hits}`);                   
                        TreeObject.Hits = 0;  
                    } 
                }
            }
        });
    }
}

mp.events.add('client:job.logging:start', () => {
    Working = true;
    mp.events.add('render', LoggingRender);
    EnableTreeDamage ();
});

mp.events.add('client:job.logging:stop', () => {
    Working = false;
    mp.events.remove('render', LoggingRender);
});

mp.events.add('client:job.logging.trees.damage:enable', () => {
    EnableTreeDamage ();
});


