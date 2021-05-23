const fs = require("fs");
const { fileURLToPath } = require("url");
const savedPosition = 'saved_position.txt';
module.exports = {
    commands: [
        {
            name: 'adminhelp',
            admin: 1,
            call: (player, args) => {
                let adminCommands = {};
                for (let cmd in mp.commands) {
                    if (mp.commands[cmd].admin) {
                        adminCommands.push(mp.commands[cmd]);
                    }
                }
            }
        },
        {
            name: 'a',
            admin: 1,
            call: (player, args) => {
                let message = args.slice(0).join(' ');
                mp.admin.chat(player, message);
            }
        },
        {
            name: 'ao',
            admin: 2,
            call: (player, args) => {
                let message = args.slice(0).join(' ');
                mp.admin.broadcast(player, message);
            }
        },
        {
            name: 'h',
            admin: 1,
            call: (player, args) => {
                let message = args.slice(0).join(' ');
                mp.admin.helperChat(player, message);
            }
        },
        {
            name: 'duty',
            admin: 1,
            call: async (player, args) => {
                let Character = await player.Character();
                let Account = await player.Account();
                if (Character.Faction == frp.Globals.Factions.Police) {
                    // PD DUTY
                } else if (Account.Administrator > 0) {
                    let code = args.slice(0).join(' ');
                    if (Account.Admin_Code == code) {
                        player.duty = !player.duty;
                    } else { 
                        player.notification(MSG_ADMIN_WRONG_DUTY_CODE, NOTIFY_ERROR, 4); // MSG_ADMIN_WRONG_DUTY_CODE = 'Pogrešan admin kod 1/3';
                    } 
                }
            }
        },
        {
            name: 'slap',
            admin: 1,
            call: async (player, args) => {
                let Target = mp.players.find(args[0]), Reason = args.slice(1).join(' ');
                if (Target && Reason) {
                    let Slap = new mp.Vector3(Target.position.x, Target.position.y, Target.position.z + 3);
                    Target.position = Slap;
                    player.sendMessage(`Ošamareni ste od strane admina, razlog: ${Reason}`);
                    // Taj i taj je ošamario tog i tog
                }
            }
        },
        {
            name: 'ar', 
            admin: 1,
            call: async (player, args) => {
                // ACCEPT REPORT
            }
        },
        {
            name: 'spec', 
            admin: 2,
            call: async (player, args) => {
                let Target = mp.players.find(args[0]);
                if (Target) { player.call('client:spectate', target, true); } else { player.notification(frp.Globals.messages.USER_NOT_FOUND, NOTIFY_ERROR, 4); }
            }
        },
        {
            name: 'rtc', 
            admin: 2,
            call: (player, args) => {
                if (args) {
                    let VehId = parseInt(args[0]);
                    let TargetVeh = mp.vehicles.at(VehId);
                    if (TargetVeh) {
                        TargetVeh.destroy();
                        setTimeout(() => {
                            TargetVeh.spawn(mp.vehi); // ovo proveriti, verovatno ce morati iz modela vozila koordinate
                        }, 300);
                    }
                } else {
                    if(player.vehicle) {
                        let Veh = player.vehicle;
                        Veh.destroy();
                        setTimeout(() => {
                            Veh.spawn();
                        }, 300);
                    } else { player.notification('Niste u vozilu, koristite /rtc [Veh ID] ', NOTIFY_ERROR, 4); }
                }
            }
        },
        {
            name: 'position',
            admin: 4,
            call: (player, args) => {
                let name = args.slice(0).join(' '), pos = (player.vehicle) ? player.vehicle.position : player.position;
                rot = (player.vehicle) ? player.vehicle.rotation : player.heading;
                fs.appendFile(savedPosition, `Position: ${pos.x}, ${pos.y}, ${pos.z} | ${(player.vehicle) ? `Rotation: ${rot.x}, ${rot.y}, ${rot.z}` : `Heading: ${rot}`} | ${(player.vehicle) ? "InCar" : "OnFoot"} - ${name}\r\n`, (err) => {
                    if (err) {
                        core.terminal(1, `Saving Position Error: ${err.message}`);
                    }
                    else {
                        player.sendMessage(`Trenutna pozicija: ${name} { X: ${player.position.x}, Y: ${player.position.y}, Z: ${player.position.z} }.`, mp.colors.info);
                    }
                });
            }
        },
        {
            name: 'slot',
            admin: 4,
            call: (player, args) => {
                console.log('1');
                if (mp.characters[player.character].casinoSlot == -1) {
                    player.sendMessage("nisi");
                }
                else {
                    console.log('2');
                    let json = JSON.stringify(player.position);
                    console.log(json);
                    player.call('client:spinSlotMachine', mp.characters[player.character].casinoSlot, json);
                    console.log('3');
                }
            }
        },
        {
            name: 'kick',
            admin: 3,
            call: (player, args) => {
                let Target = mp.players.find(args[0]), Reason = args.slice(1).join(' ');
                if (Target) {
                    Target.kick(Reason);
                }
            }
        },
        {
            name: 'time',
            admin: 2,
            call: (player, args) => {
                mp.world.time.set(args[0], args[1], args[2]);
            }
        },
        {
            name: 'weather',
            admin: 2,
            call: (player, args) => {
                const weathers = ['EXTRASUNNY', 'CLEAR', 'CLOUDS', 'SMOG', 'FOGGY', 'OVERCAST', 'RAIN', 'THUNDER', 'CLEARING', 'NEUTRAL', 'SNOW', 'BLIZZARD', 'SNOWLIGHT', 'XMAS', 'HALLOWEEN'];
                if (args[0] === parseInt(args[0])) {
                    mp.world.weather = weathers[args[0]];
                }
                else {
                    mp.world.weather = args[0];
                }
            }
        },
        {
            name: 'sethp',
            admin: 3,
            call: (player, args) => {
                let target = mp.players.find(args[0]), amount = parseInt(args[1]);
                if (target) {
                    let character = target.getCharacter();
                    character.setHealth(target, amount);
                }
            }
        },
        {
            name: 'dimension',
            admin: 3,
            call: (player, args) => {
                let target = mp.players.find(args[0]), dimension = parseInt(args[1]);
                if (target)
                    player.dimension = dimension;
            }
        },
        {
            name: 'setarmour',
            admin: 4,
            call: (player, args) => {
                let target = mp.players.find(args[0]), amount = parseInt(args[1]);
                if (target) {
                    let character = target.getCharacter();
                    character.setArmour(target, amount);
                }
            }
        },
        {
            name: 'ban',
            description: 'Ban a player',
            admin: 3,
            call: (player, ...args) => {
            }
        },
        {
            name: 'goto',
            description: 'Teleport do igraca.',
            admin: 3,
            call: (player, args) => {
                let target = mp.players.find(args[0]);
                if (target) {
                    player.position = target.position;
                    player.dimension = target.dimension;
                    target.sendMessage('Admin ' + player.name + ' se teleportovao do vas !', mp.colors.tomato);
                    player.sendMessage('Teleportovali ste se do ' + target.name + ' !', mp.colors.tomato);
                }
            }
        },
        {
            name: 'gethere',
            description: 'Teleport igraca do sebe.',
            admin: 2,
            call: (player, args) => {
                let target = mp.players.find(args[0]);
                if (target) {
                    target.position = player.position;
                    target.dimension = player.dimension;
                    target.sendMessage('Admin ' + player.name + ' vas je teleportovao do sebe !', mp.colors.tomato);
                    player.sendMessage('Teleportovali ste ' + target.name + ' do sebe !', mp.colors.tomato);
                }
            }
        },
        {
            name: 'revive',
            admin: 2,
            call: (player, args) => {
                let target = mp.players.find(args[0]);
                if (target) {
                    let position = target.position;
                    clearTimeout(target.respawnTimer);
                    target.isDead = false;
                    setTimeout(() => { target.spawn(position); }, 350);
                }
            }
        },
        {
            name: 'givegun',
            admin: 5,
            desc: 'Davanje oruzija',
            call: (player, args) => {
                let target = mp.players.find(args[0]);
                if (target) {
                    let weaponHash = mp.joaat(args[1]);
                    target.giveWeapon(weaponHash, parseInt(args[2]) || 500);
                }
            }
        },
        {
            name: 'makeadmin',
            admin: 6,
            call: (player, args) => {
                let target = mp.players.find(args[0]);
                if (target) {
                    mp.accounts[target.account].admin = args[1];
                }
            }
        },
        {
            name: 'makeleader',
            admin: 5,
            call: (player, args) => {
                let target = mp.players.find(args[0]);
                if (target) {
                    if (mp.factions[args[1]]) {
                        mp.faction.leader(target, args[1]);
                        player.notification('Uspešno ste postavili lidera fakcije igraču ' + target.name, NOTIFY_SUCCESS, 4);
                    }
                }
            }
        },
        {
            name: 'freeze',
            admiin: 2,
            call: (player, args) => {
                let target = mp.players.find(args[0]), message = null;
                if (target) {
                    target.frozen = !target.frozen;
                    target.call('client:player.freeze', [target.frozen]);
                    target.frozen ? message = [' admin vas je zaledio.', 'Zaledili ste '] : message = [' admin vas je odledio.', 'Odledil ste '];
                    target.sendMessage(player.name + message[0], mp.colors.tomato);
                    player.sendMessage(message[1] + target.name, mp.colors.tomato);
                }
            }
        },
        {
            name: 'warn',
            admin: 2,
            call: (player, args) => {
            }
        },
        {
            name: 'disarm',
            admin: 3,
            call: (player, args) => {
                let target = mp.players.find(args[0]);
                if (target) {
                    target.removeAllWeapons();
                    target.sendMessage(player.name + ' vam je oduzeo sva oružija.', mp.colors.tomato);
                    player.sendMessage('Oduzeli ste sva oružija ' + target.name, mp.colors.tomato);
                }
            }
        },
        {
            name: 'cc',
            admin: 3,
            call: (player, args) => {
                mp.players.forEach((target) => {
                    if (target.data.logged) {
                        target.call('chat:clear');
                    }
                });
            }
        },
        {
            name: 'fixveh',
            admin: 3,
            call: (player, args) => {
                let vehicle = player.vehicle;
                if (vehicle) {
                    vehicle.repair();
                    player.sendMessage('Popravili ste vozilo !', mp.colors.tomato);
                }
            }
        },
        {
            name: 'setmoney',
            admin: 3,
            call: (player, args) => {
                let target = mp.players.find(args[0]);
                if (target) {
                    let TargetCharacter = mp.characters[target.character];
                    TargetCharacter.setMoney(player, args[1]);
                    target.sendMessage(player.name + ' vam je postavio novac na ' + args[1] + '$', mp.colors.tomato);
                    player.sendMessage('Postavili ste novac ' + target.name + ' na ' + args[1] + '$', mp.colors.tomato);
                }
            }
        },
        {
            name: 'givemoney',
            admin: 3,
            call: (player, args) => {
                let target = mp.players.find(args[0]);
                if (target) {
                    let TargetCharacter = mp.characters[target.character];
                    TargetCharacter.giveMoney(player, args[1]);
                    target.sendMessage(player.name + ' vam je dao novac ' + args[1] + '$', mp.colors.tomato);
                    player.sendMessage('Dali ste novac ' + target.name + ' na ' + args[1] + '$', mp.colors.tomato);
                }
            }
        },
    ]
};
