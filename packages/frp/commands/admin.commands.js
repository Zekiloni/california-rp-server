const fs = require("fs");
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
         name: 'createaccount',
         admin: 1,
         params: ['ime', 'email', 'sifra'],
         call: async (player, args) => {
            const Username = args[0], Email = args[1], Password = args[2];
            await frp.Accounts.create({ Username: Username, Email: Email, Password: Password });
         }
      },

      {
         name: 'a',
         admin: 1,
         params: ['tekst'],
         call: (player, args) => {
            const Message = args.slice(0).join(' ');
            frp.Admin.Chat(player, Message);
         }
      },

      {
         name: 'ao',
         admin: 2,
         params: ['tekst'],
         call: (player, args) => {
            const Message = args.slice(0).join(' ');
            frp.Admin.Broadcast(player, Message);
         }
      },  

      {
         name: 'notify',
         admin: 2,
         params: ['igrac', 'tip', 'tekst'],
         call: (player, args) => {
            let Target = mp.players.find(args[0]);
            let Message = args.slice(2).join(' ');
            if (Target) Target.Notification(Message, args[1], 4);
         }
      },  

      {
         name: 'slap',
         admin: 1,
         params: ['igrac'],
         call: async (player, args) => {
            let Target = mp.players.find(args[0]);
            if (Target) { 
               Target.position = new mp.Vector3(Target.position.x, Target.position.y, Target.position.z + 3);;
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
         params: ['igrac'],
         call: async (player, args) => {
            let Target = mp.players.find(args[0]);
            if (Target) { player.call('client:spectate', target, true); } else { player.Notificatioon(frp.Globals.messages.USER_NOT_FOUND, frp.Globals.Notification.Error, 4); }
         }
      },

      {
         name: 'nearest', 
         admin: 2,
         call: async (player, args) => {
            const result = await player.Nearest();
            if (result)
               player.outputChatBox('Ima blizu ' + result.id);
            else
               player.outputChatBox('Nema nista');

         }
      },

      {
         name: 'rtc', 
         admin: 2,
         call: async (player, args) => {
            let Vehicle = null;
            if (args[0]) { 
               Vehicle = await frp.Vehicles.findOne({ where: { id: args[0] }});
               if (Vehicle) { 
                  Vehicle.Respawn();
               } else { 
                  Vehicle = mp.vehicles.at(args[0]);
                  Vehicle.destroy();
               }
            } else if (player.vehicle) { 
               Vehicle = await frp.Vehicles.findOne({ where: { vehicle: player.vehicle }});
               if (Vehicle) { 
                  Vehicle.Respawn();
               } else { 
                  player.vehicle.destroy();
               }
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
                     player.SendMessage(`Trenutna pozicija: ${name} { X: ${player.position.x}, Y: ${player.position.y}, Z: ${player.position.z} }.`, mp.colors.info);
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
                  player.SendMessage("nisi");
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
            if (Target) Target.kick(Reason);
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
         name: 'health',
         admin: 3,
         params: ['igrac', 'hp'],
         call: async (player, args) => {
            let Target = mp.players.find(args[0]), Health = parseInt(args[1]);
            if (Target) {
               let Character = await Target.Character();
               Character.SetHealth(Target, Health);
            }
         }
      },
      {
         name: 'dimension',
         admin: 2,
         params: ['igrac', 'dimenzija'],
         call: (player, args) => {
            const [toSet, dimension] = args;
            
            const Target = mp.players.find(toSet);
            if (Target) Target.dimension = parseInt(dimension);
         }
      },
      {
         name: 'happyhours', 
         desc: 'Aktiviranje / deaktiviranje duplog XP-a',
         admin: 4,
         call: async (player, args) => {
            frp.Settings.HappyHours = !frp.Settings.HappyHours;
            let Status = frp.Settings.HappyHours ? 'aktivirani' : 'deaktivirani';
            player.SendMessage('Srećni sati ' + Status, frp.Globals.Colors.info);
         }
      },
      {
         name: 'armour',
         admin: 3,
         params: ['igrac'],
         call: async (player, args) => {
            let Target = mp.players.find(args[0]), Armour = parseInt(args[1]);
            if (Target) {
               let Character = await Target.Character();
               Character.SetArmour(Target, Armour);
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
         name: 'fly',
         description: 'Letiš',
         admin: 2,
         call: (player, ...args) => {
            player.call('client:player.administrator:fly');
         }
      },
      {
         name: 'goto',
         description: 'Teleport do igraca.',
         admin: 3,
         params: ['igrac'],
         call: (player, args) => {
            let target = mp.players.find(args[0]);
            if (target) {
               if (player.vehicle) { 
                  const Seat = player.seat, Vehicle = player.vehicle;
                  Vehicle.position = new mp.Vector3(target.position.x + 2, target.position.y, target.position.z);
                  Vehicle.dimension = target.dimension;
                  player.putIntoVehicle(Vehicle, Seat);
               } else { 
                  player.position = target.position;
                  player.dimension = target.dimension;
               }
               target.SendMessage('Admin ' + player.name + ' se teleportovao do vas !', frp.Globals.Colors.tomato);
               player.SendMessage('Teleportovali ste se do ' + target.name + ' !', frp.Globals.Colors.tomato);
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
               if (target.vehicle) { 
                  const Seat = target.seat, Vehicle = target.vehicle;
                  Vehicle.position = new mp.Vector3(player.position.x + 2, player.position.y, player.position.z);
                  Vehicle.dimension = player.dimension;
                  player.putIntoVehicle(Vehicle, Seat);
               } else { 
                  target.position = player.position;
                  target.dimension = player.dimension;
               }
               target.SendMessage('Admin ' + player.name + ' vas je teleportovao do sebe !', frp.Globals.Colors.tomato);
               player.SendMessage('Teleportovali ste ' + target.name + ' do sebe !',frp.Globals.Colors.tomato);

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
         params: ['igrac', 'oruzije', 'municija'],
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
         params: ['igrac', 'level'],
         call: async (player, args) => {
            const Target = mp.players.find(args[0]), Level = parseInt(args[1]);
            if (Target) {
               const Account = await frp.Accounts.findOne({ where: { id: player.account } });
               Account.SetAdmin(Level);
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
               target.SendMessage(player.name + message[0], frp.Globals.Colors.tomato);
               player.SendMessage(message[1] + target.name, frp.Globals.Colors.tomato);
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
               target.SendMessage(player.name + ' vam je oduzeo sva oružija.', mp.colors.tomato);
               player.SendMessage('Oduzeli ste sva oružija ' + target.name, mp.colors.tomato);
            }
         }
      },

      {
         name: 'reports',
         admin: 1,
         call: (player, args) => {
            frp.Admin.Reports.forEach((Report) => { 
               let Index = frp.Admin.Reports.indexOf(Report);
               player.SendMessage(Report, frp.Globals.Colors.grey);
            })
         }
      },

      {
         name: 'fixveh',
         admin: 3,
         call: (player, args) => {
            const Vehicle = player.vehicle;
            if (Vehicle) {
               Vehicle.repair();
               player.SendMessage('Popravili ste vozilo !', frp.Globals.Colors.tomato);
            }
         }
      },
      {
         name: 'setmoney',
         admin: 4,
         params: ['igrac', 'vrednost'],
         call: async (player, args) => {
            let Target = mp.players.find(args[0]), Money = parseInt(args[1]);
            if (Target) {
               let Character = await frp.Characters.findOne({ where: { id: Target.character }});
               Character.SetMoney(Target, Money);
               // PORUKA: novac
            }
         }
      },
      {
         name: 'givemoney',
         admin: 4,
         params: ['igrac', 'vrednost'],
         call: async (player, args) => {
            let Target = mp.players.find(args[0]), Money = parseInt(args[1]);
            if (Target) {
               let Character = await frp.Characters.findOne({ where: { id: Target.character }});
               Character.GiveMoney(Target, Money);
               // PORUKA: novac
            }
         }
      },

      {
         name: 'cloneped',
         admin: 4,
         call: (player, args) => {
            console.log('pozvan')
            player.call('client:clone.ped', [true]);
         }
      },
   ]
};
