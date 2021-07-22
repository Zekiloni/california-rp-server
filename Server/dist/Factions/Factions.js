"use strict";
var _a;
frp.Factions = (_a = class Factions {
        static Init() {
            for (const i in this.List) {
                const Faction = this.List[i];
                if (Faction.Sprite && Faction.Color) {
                    mp.blips.new(Faction.Sprite, Faction.Position, { name: Faction.Name, dimension: frp.Settings.default.dimension, shortRange: true, color: Faction.Color });
                }
                if (Faction.Type == this.Types.Law) {
                    frp.Main.InfoColshape(Faction.Position, Faction.Name, null, 1.85, frp.Globals.MarkerColors.Faction);
                    frp.Main.InfoColshape(Faction.Equipment, Faction.Name + ' Cloakroom', 'Korišćenje: /cloakroom', 1.8, frp.Globals.MarkerColors.Faction);
                    frp.Main.InfoColshape(Faction.Armory, Faction.Name + ' Armory', 'Korišćenje: /equipment', 1.8, frp.Globals.MarkerColors.Faction);
                    frp.Main.InfoColshape(Faction.Govrepair, Faction.Name + ' Mehanical', 'Korišćenje: /govrepair', 3, frp.Globals.MarkerColors.Faction);
                    frp.Main.InfoColshape(Faction.Garage, Faction.Name + ' Garage', 'Korišćenje: /garage', 2, frp.Globals.MarkerColors.Faction);
                }
            }
        }
        ;
        static async MakeLeader(player, faction) {
            if (this.List[faction]) {
                const Character = await player.Character();
                Character.Faction = faction;
                Character.Faction_Rank = 'Leader';
                Character.Faction_Perms = this.Permissions.Leader;
                await Character.save();
            }
        }
        static async Invite(player, target) {
        }
        static async Chat(player, message) {
            if (!message.trim())
                return;
            const Character = await player.Character();
            mp.players.forEach(async (target) => {
                if (target.data.logged && target.data.spawned) {
                    const TargetCharacter = await target.Character();
                    if (TargetCharacter.Faction == Character.Faction) {
                        target.SendMessage('(( ' + Character.Faction_Rank + ' ' + player.name + ': ' + message + ' ))', frp.Globals.Colors.faction);
                    }
                }
            });
        }
    },
    _a.Types = {
        Law: 0, Ems: 1, Gov: 2, News: 3, Gang: 4, Mafia: 5, Cartel: 7, Party: 8
    },
    _a.Permissions = {
        Member: 0, Moderator: 35, Leader: 100
    },
    _a.List = {
        1: {
            Name: 'Los Santos Police Department', Description: 'To protect & Serve', Type: _a.Types.Law, Sprite: 60, Color: 3,
            Position: new mp.Vector3(-1099.8215, -841.9021, 19.0015), Equipment: new mp.Vector3(-1094.0113, -825.75311, 26.8274),
            Govrepair: new mp.Vector3(-1077.8933, -846.7360, 4.8840), Garage: new mp.Vector3(-1117.0683593, -846.19830, 13.3847),
            Armory: new mp.Vector3(-1095.3900, -832.8939, 14.28303)
        }
    },
    _a);
(async () => {
    frp.Factions.Init();
})();
frp.Factions.prototype.Classing = function () { };
// class Factions { 
//    constructor () { 
//       mp.events.add({
//          'server:police.giveWeapon': (player, name, weapon, ammo) => {
//             let weaponHash = mp.joaat(weapon);
//             player.giveWeapon(weaponHash, parseInt(ammo) || 15);
//             account.sendProxMessage(player, CHAT_RADIUS.ME, `* ${player.name} uzima ${name} iz ormarica.`, PURPLE_1, PURPLE_2, PURPLE_3, PURPLE_4, PURPLE_5);
//          },
//          'server:police.spawnVehicle': (player, name, model) => {
//             let faction = factions.getFaction(player.faction);
//             let vPos = faction.VEH_POINT;
//             let vehPos = new mp.Vector3(vPos.x, vPos.y, vPos.z)
//             let hash = mp.joaat(model);
//             let numberPlate = Math.floor(1000 + Math.random() * 9000);
//             let vehicle = mp.vehicles.new(hash, vehPos, { numberPlate: `LSPD ${numberPlate}`, heading: 90,color: [[255, 255, 246], [0, 255, 0]], locked: false, dimension: 0 });
//             vehicle.faction = player.faction;
//             vehicle.callsign = null;
//          }
//       })
//    }
//    init () { 
//       let counter = 0;
//       for (let i in mp.factions) { 
//          let faction = mp.factions[i];
//          if (faction.label) { 
//             mp.labels.new(faction.name + '~n~' + faction.motd, faction.label, { los: true, font: 0, drawDistance: 4} );
//          }
//          if (faction.blip) { 
//             mp.blips.new(faction.sprite, faction.blip, {
//                name: faction.name,
//                color: 3,
//                shortRange: true,
//             })
//          }
//          if (faction.garage) { 
//             faction.garage.marker = mp.markers.new(27, faction.garage, 0.85, {
//                color: mp.settings.color.rgba, rotation: new mp.Vector3(0, 0, 90), visible: true, dimension: 0
//             })
//             faction.garage.colshape = mp.colshapes.newRectangle(faction.garage.x, faction.garage.y, 1.75, 2, 0);
//             faction.garage.colshape.name = 'garage';
//          }
//          if (faction.equip) { 
//             faction.equip.marker = mp.markers.new(27, faction.equip, 0.85, {
//                color: mp.settings.color.rgba, rotation: new mp.Vector3(0, 0, 90), visible: true, dimension: 0
//             })
//             faction.equip.colshape = mp.colshapes.newRectangle(faction.equip.x, faction.equip.y, 1.5, 2, 0);
//             faction.equip.colshape.name = 'equip';
//          }
//          if (faction.armory) { 
//             faction.armory.marker = mp.markers.new(27, faction.armory, 0.85, {
//                color: mp.settings.color.rgba, rotation: new mp.Vector3(0, 0, 90), visible: true, dimension: 0
//             })
//             faction.armory.colshape = mp.colshapes.newRectangle(faction.armory.x, faction.armory.y, 1.5, 2, 0);
//             faction.armory.colshape.name = 'weapon';
//          }
//          counter ++;
//       } 
//       core.terminal(3, counter + ' Factions loaded')
//    }
//    leader (player, f) { 
//       let character = player.getCharacter();
//       let faction = mp.factions[f];
//       if (character) { 
//          let values = { leader: player.character };
//          db.query('UPDATE `factions` SET ? WHERE faction = ?', [values, faction.id], function (err, re, fields) {
//             if (err) return core.terminal(1, 'Updating Faction Error ' + err);
//             character.faction = faction.id;
//             faction.leader = character.id;
//             player.sendMessage('Postavljeni ste za lidera fakcije ' + faction.name + '.', mp.colors.info);
//          });
//       }
//    }
//    invite (player, target) { 
//       let character = player.getCharacter(), targetcharacter = target.getCharacter();
//       if (character && targetcharacter) { 
//          if (character.faction == 0) return;
//          if (mp.factions[character.faction].leader != character.id) return;
//          player.sendMessage('Pozvali ste ' + target.name + ' u vasu fakciju.', mp.colors.info);
//          target.sendMessage(target.name + ' vam je poslao zahtev za pridruzivanje ' + mp.factions[character.faction].name + '.', mp.colors.info);
//          target.sendMessage('Koristite /accept invite kako bi prihvatili zahtev.', mp.colors.help);
//          targetcharacter.invite_request = character.faction;
//       }
//    }
//    uninvite (player, target) { 
//       let character = player.getCharacter(), targetcharacter = target.getCharacter();
//       if (character && targetcharacter) { 
//          if (character.faction != targetcharacter.faction) return false;
//          if (mp.factions[character.faction].leader != character.id) return false;
//          targetcharacter.faction = 0;
//          player.sendMessage('Izbacili ste ' + target.name + ' iz fakcije.', mp.colors.info);
//          target.sendMessage(target.name + ' vas je izbacio iz fakcije ' + mp.factions[character.faction].name + '.', mp.colors.info);
//       }
//    }
//    rank (player, target, rank) { 
//       let targetcharacter = target.getCharacter(), character = player.getCharacter();
//       if (targetcharacter && character) { 
//          if (character.faction != targetcharacter.faction) return;
//          if (mp.factions[character.faction].leader != character.id) return;
//          targetcharacter.rank = rank;
//          player.sendMessage('Postavili ste rank ' + rank + ' clanu ' + target.name + '.', mp.colors.info);
//          target.sendMessage(target.name + ' vam je postavio rank na ' + rank + '.', mp.colors.info);
//       }
//    }
//    chat (faction, message) { 
//       mp.players.forEach( (target) => { 
//          if (target.data.logged && target.data.spawned) { 
//             let char = target.getCharacter();
//             if (char) { 
//                if (char.faction == faction) { 
//                   target.sendMessage('(( ' + message + ' ))', mp.colors.faction)
//                }
//             }
//          }
//       })
//    }
// }
// mp.faction = new Factions();
// mp.faction.init();
