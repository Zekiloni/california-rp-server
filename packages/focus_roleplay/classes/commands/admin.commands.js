

module.exports = { 
   commands: [

      {
         name: 'adminhelp',
         admin: 1,
         call: (player, args) => { 
            let adminCommands = {};
            for (let cmd in mp.commands) { 
               if (mp.commands[cmd].admin) { 
                  adminCommands.push(mp.commands[cmd])
               }
            }
         }
      },

      {
         name: 'a',
         admin: 1,
         call: (player, args) => { 
            let message = args.slice(0).join(' '); 
            mp.admin.chat(player, message)
         }
      },

      {
         name: 'ao',
         admin: 2,
         call: (player, args) => { 
            let message = args.slice(0).join(' '); 
            mp.admin.broadcast(player, message)
         }
      },

      
    {
      name: 'slot',
      admin: 4,
      call: (player, args) => { 
         console.log('1');
         if(mp.characters[player.character].casinoSlot == -1) {
            player.sendMessage("nisi");
         }
         else {
            console.log('2') ;
            let json = JSON.stringify(player.position);
            console.log(json);
            player.call('client:spinSlotMachine', mp.characters[player.character].casinoSlot, json);
            console.log('3');
         }
         
      }
   },
      {
         name: 'coord',
         admin: 4,
         call: (player, args) => { 
            let coord = args[0].split(',');
            console.log(coord);
            player.position = new mp.Vector3(parseFloat(coord[0]), parseFloat(coord[1]), parseFloat(coord[2]));
         }
      },

      {
         name: 'kick',
         admin: 3,
         call: (player, args) => { 
            let target = mp.players.find(args[0]), reason = args.slice(1).join(' '); 
            if (target) { target.kick(reason); }
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
            const weathers = ['EXTRASUNNY', 'CLEAR', 'CLOUDS', 'SMOG', 'FOGGY', 'OVERCAST', 'RAIN', 'THUNDER', 'CLEARING', 'NEUTRAL', 'SNOW', 'BLIZZARD', 'SNOWLIGHT', 'XMAS', 'HALLOWEEN']
            if (args[0] === parseInt(args[0])) { 
               mp.world.weather = weathers[args[0]];
            } else { 
               mp.world.weather = args[0];
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
               clearTimeout(target.respawnTimer)
               target.isDead = false;
               setTimeout(() => { target.spawn(position); }, 350)

            }
         }
      },

      {
         name: 'givegun',
         admin: 2,
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
                  mp.faction.leader(target, args[1])
                  player.notification('Uspešno ste postavili lidera fakcije igraču ' + target.name, NOTIFY_SUCCESS, 4)
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
                  target.call('chat:clear')
               }
            })
         }
      },
   
      {
         name: 'fixveh',
         admin: 3,
         call: (player, args) => {
            let vehicle = player.vehicle;
            if (vehicle) { 
               vehicle.repair();
               player.sendMessage('Popravili ste vozilo !', mp.colors.tomato)
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
   ]
}