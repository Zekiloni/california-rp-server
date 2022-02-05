
import fs from 'fs';

import { Commands } from '../commands';
import { logs, items, inventories, houses, accounts } from '@models';
import { cmds, colors, lang, none, ranks, weathers } from '@constants';
import { rank, notifications } from '@enums';
import { houseConfig, serverConfig } from '@configs';
import { checkForDot, shared_Data } from '@shared';


const savedPositions = 'savedPositions.txt';

Commands[cmds.names.SAVE_POS] = { 
   description: cmds.descriptions.ITEMS,
   admin: rank.LEAD_ADMINISTRATOR,
   call (player: PlayerMp, ...saveName) { 
      let positionName = saveName.slice(0).join(' '); 
      const position = (player.vehicle) ? player.vehicle.position : player.position;
      const rotation = (player.vehicle) ? player.vehicle.rotation : player.heading;
      
      fs.appendFile(savedPositions, `Position: { x: ${position.x}, y: ${position.y}, z: ${position.z} } | ${(player.vehicle) ? `Rotation: ${JSON.stringify(rotation)}` : `Heading: ${rotation}`} | ${(player.vehicle) ? 'inCar' : 'onFoot'} - ${positionName}\r\n`, (err) => {
         if (err) {
            logs.error(err);
         }
      });
   }
}


Commands[cmds.names.GOTO] = {
   description: cmds.descriptions.GOTO,
   admin: rank.ADMINISTRATOR,
   params: [
      cmds.params.PLAYER
   ],
   call (player: PlayerMp, targetSearch: string | number) {
      const target = mp.players.find(targetSearch);

      if (target && target.id != player.id) {

         if (!target.account) {
            return;
         }

         if (player.vehicle) {

            const { seat, vehicle } = player;

            vehicle.position = new mp.Vector3(target.position.x + 2, target.position.y, target.position.z);
            vehicle.dimension = target.dimension;
            player.putIntoVehicle(vehicle, seat);

         } else {
            player.position = target.position;
            player.dimension = target.dimension;
         }

         player.sendNotification('SUCCES TELEPORT', notifications.type.SUCCESS, 4);
      }
   }
};


Commands[cmds.names.GET_HERE] = {
   description: cmds.descriptions.GET_HERE,
   admin: rank.SENIOR_ADMINISTRATOR,
   params: [
      cmds.params.PLAYER
   ],
   call (player: PlayerMp, targetSearch: string | number) {
      const target = mp.players.find(targetSearch);

      if (target && target.id != player.id) {
         if (target.vehicle) {

            const { seat, vehicle } = target;

            vehicle.position = new mp.Vector3(player.position.x + 2, player.position.y, player.position.z);
            vehicle.dimension = player.dimension;

            const occupants = vehicle.getOccupants();

            occupants.forEach(occupant => {
               occupant.dimension = player.dimension;
               occupant.putIntoVehicle(vehicle, occupant.seat);
            });

         } else {
            target.position = player.position;
            target.dimension = player.dimension;
         }

         player.sendNotification('SUCCES TELEPORT', notifications.type.SUCCESS, 4);
      }
   }
};


Commands[cmds.names.ITEMS] = { 
   description: cmds.descriptions.ITEMS,
   call (player: PlayerMp) { 
      console.log(items.list);
   }
};


Commands[cmds.names.INVICIBLE] = { 
   description: cmds.descriptions.INVICIBLE,
   admin: rank.ADMINISTRATOR_2,
   call (player: PlayerMp) { 
      
      const toggle = player.alpha == 255 ? 0 : 255;
      player.alpha = toggle;

      if (player.vehicle) {
         const vToggle = player.vehicle.alpha == 255 ? 0 : 255;
         console.log(player.vehicle.alpha)
         player.vehicle.alpha =vToggle;
      }
   }
};



Commands[cmds.names.GIVE_ITEM] ={
   description: cmds.descriptions.GIVE_ITEM,
   admin: rank.SENIOR_ADMINISTRATOR,
   call (player: PlayerMp, targetSearch: any, quantity: number, ...itemName: any) { 

      itemName = itemName.join(' ');

      if (items.list[itemName]) {
         const foundItem = items.list[itemName];
         const target = mp.players.find(targetSearch);

         if (!target) {
            // PORUKA: igrac nije
            return;
         }; 

         try { 
            inventories.giveItem(target, foundItem, quantity);
         } catch(e) { 
            console.log(e)
         }

      } else { 
         // PORUKA: Predmet ne postoji
      }
   }
}


Commands[cmds.names.FREEZE] = {
   description: cmds.descriptions.FREEZE,
   params: [
      cmds.params.PLAYER
   ],
   call (player: PlayerMp, targetSearch: string) {
      const target = mp.players.find(targetSearch);

      if (!target) {
         player.sendNotification(lang.userNotFound, notifications.type.ERROR, notifications.time.SHORT);
         return;
      }

      target.character.freezed! = !target.character.freezed;

      target.call('CLIENT::FREEZE', [target.character.freezed]);
   }
}

Commands[cmds.names.CLEAR_INVENTORY] = { 
   description: cmds.descriptions.CLEAR_INVENTORY,
   call (player: PlayerMp, target: any) { 
      
   }
}


Commands[cmds.names.HEALTH] = { 
   description: cmds.descriptions.HEALTH,
   admin: rank.SENIOR_ADMINISTRATOR,
   params: [
      cmds.params.PLAYER,
      cmds.params.NUMBER
   ],
   call (player: PlayerMp, targetSearch: string, hp: string) { 
      const target = mp.players.find(targetSearch);

      if (!target) {
         player.sendNotification(lang.userNotFound, notifications.type.ERROR, notifications.time.SHORT);
         return;
      }
      
      target.health = Number(hp);
   }
};


Commands[cmds.names.REVIVE] = { 
   description: cmds.descriptions.REVIVE,
   admin: rank.SENIOR_ADMINISTRATOR,
   params: [
      cmds.params.PLAYER
   ],
   call (player: PlayerMp, targetSearch: string) { 
      const target = mp.players.find(targetSearch);

      if (!target) {
         // PORUKA: Nije pronadjen
      }
      
      clearTimeout(target?.character.respawnTimer!);
      target?.call('CLIENT::DEATHSCREEN', [false])
      target?.setVariable(shared_Data.INJURIES, []);
      target?.setVariable(shared_Data.WOUNDED, false);
      target?.spawn(player.position);
   }
};


Commands[cmds.names.DISARM] = { 
   description: cmds.descriptions.DISARM,
   admin: rank.SENIOR_ADMINISTRATOR,
   params: [
      cmds.params.PLAYER
   ],
   call (player: PlayerMp, targetSearch: string) { 
      const target = mp.players.find(targetSearch);

      if (!target) {
         player.sendNotification(lang.userNotFound, notifications.type.ERROR, notifications.time.SHORT);
         return;
      }
      
      target.removeAllWeapons();

      if (target.character) {
         target.character.equiped.forEach(async equipment => {
            const item = items.list[equipment.name];
            const index = target.character.equiped.indexOf(equipment);

            if (item.isWeapon()) {
               equipment.equiped = false;
               target.character.equiped.splice(index, 1);
               await equipment.save();
            }
         })
      }

      target.sendNotification(lang.admin + ' ' + player.name + lang.disarmedYou, notifications.type.INFO, notifications.time.MED);
      player.sendNotification(lang.youDisarmedPlayer + ' ' + target.name + '.', notifications.type.SUCCESS, notifications.time.MED);
   }
};


Commands[cmds.names.COP] = { 
   description: cmds.descriptions.COP,
   admin: rank.ADMINISTRATOR_2,
   call (player: PlayerMp, targetSearch: string) { 
      
      const target = mp.players.find(targetSearch);

      if (!target) {
         return;
      }

      target.setClothes(3, 0, 0, 2);
      target.setClothes(8, 58, 0, 2);
      target.setClothes(6, 25, 0, 2);
      target.setClothes(4, 35, 0, 2);
      target.setClothes(11 ,55, 0, 2);
   }
}


Commands[cmds.names.GIVE_GUN] = { 
   description: cmds.descriptions.GIVE_GUN,
   admin: rank.LEAD_ADMINISTRATOR,
   params: [
      cmds.params.PLAYER,
      cmds.params.WEAPON,
      cmds.params.AMMO
   ],
   call (player: PlayerMp, targetSearch, weapon, ammo) { 
      const target = mp.players.find(targetSearch);

      if (!target) {
         player.sendNotification(lang.userNotFound, notifications.type.ERROR, notifications.time.SHORT)
         return;
      }

      target.giveWeapon(mp.joaat(weapon), parseInt(ammo));
   }
}


Commands[cmds.names.CREATE_VEHICLE] = { 
   description: cmds.descriptions.CREATE_VEHICLE,
   admin: rank.LEAD_ADMINISTRATOR,
   params: [
      cmds.params.VEHICLE_MODEL
   ],
   call (player: PlayerMp, vName: string, primaryColor: number, secondaryColor: number) { 

      const vehicle = mp.vehicles.new(mp.joaat(vName), player.position);
      vehicle.setColor(Number(primaryColor), Number(secondaryColor));

      player.putIntoVehicle(vehicle, RageEnums.VehicleSeat.DRIVER);
   } 
};

Commands[cmds.names.DESTROY_VEHICLE] = {
   description: cmds.descriptions.DESTROY_VEHICLE,
   admin: rank.LEAD_ADMINISTRATOR,
   call (player: PlayerMp) {
      const vehicle = mp.vehicles.getClosest(player.position);

      if (!vehicle) {
         return;
      }

      if (vehicle.getVariable(shared_Data.DATABASE)) {

      }

      vehicle?.destroy();
   }
}


Commands[cmds.names.TIME] = {
   admin: rank.LEAD_ADMINISTRATOR,
   description: cmds.descriptions.SET_TIME,
   params: [
      cmds.params.HOUR,
      cmds.params.MINUTE,
      cmds.params.SECONDS
   ],
   call (player: PlayerMp, hour: number, minute: number = 0, second: number = 0) {
      if (hour == 666) {
         serverConfig.freezeTime = false;
      } else { 
         serverConfig.freezeTime = true;
         mp.world.time.set(hour, minute, second);
      }
   }
};


Commands[cmds.names.WEATHER] = {
   admin: rank.SENIOR_ADMINISTRATOR,
   description: cmds.descriptions.SET_WEATHER,
   params: [
      cmds.params.WEATHER
   ],
   call (player: PlayerMp, weather: string | number) {
      if (weather == Number(weather) && weather < weathers.length - 1 && weather >= 0) {
         mp.world.weather = weathers[Number(weather)];
      } else {
         mp.world.weather = String(weather);
      }
   }
};


Commands[cmds.names.FIX_VEH] = {
   admin: rank.SENIOR_ADMINISTRATOR,
   description: cmds.descriptions.FIX_VEH,
   vehicle: true,
   async call (player: PlayerMp) {
      if (!player.vehicle) {
         return;
      }

      player.vehicle.repair();
   }
};


Commands[cmds.names.GIVE_MONEY] =  {
   admin: rank.LEAD_ADMINISTRATOR,
   description: cmds.descriptions.GIVE_MONEY,
   params: [
      cmds.params.PLAYER,
      cmds.params.NUMBER
   ],
   call (player: PlayerMp, targetSearch: string, money: string) { 
      const target = mp.players.find(targetSearch);

      if (!target) {
         player.sendNotification(lang.userNotFound, notifications.type.ERROR, notifications.time.LONG);
         return;
      };

      target.character?.giveMoney(target, Number(money));
   }
};


Commands[cmds.names.SET_MONEY] =  {
   admin: rank.LEAD_ADMINISTRATOR,
   description: cmds.descriptions.SET_MONEY,
   params: [
      cmds.params.PLAYER,
      cmds.params.NUMBER
   ],
   call (player: PlayerMp, targetSearch: string, money: string) { 
      const target = mp.players.find(targetSearch);

      if (!target) {
         player.sendNotification(lang.userNotFound, notifications.type.ERROR, notifications.time.LONG);
         return;
      }; 

      target.character?.setMoney(target, Number(money));
   }
}


Commands[cmds.names.CREATE_HOUSE] =  {
   admin: rank.LEAD_ADMINISTRATOR,
   description: 'opis napisati',
   call (player: PlayerMp, type: houseConfig.type, price: number) { 
      houses.new(player, type, price);
   }
}


Commands[cmds.names.DESTROY_HOUSE] =  {
   admin: rank.LEAD_ADMINISTRATOR,
   description: 'opis napisati',
   async call (player: PlayerMp, id?: number) { 
      const nearestHouse = await houses.getNearest(player);
      if (nearestHouse) nearestHouse.destroy();
   }
}


Commands[cmds.names.FLY] =  {
   admin: rank.SENIOR_ADMINISTRATOR,
   description: 'opis napisati',
   async call (player: PlayerMp) { 
      player.call('CLIENT::ADMIN:FLY');
   }
}


Commands[cmds.names.KICK] = {
   description: cmds.descriptions.KICK,
   admin: rank.ADMINISTRATOR,
   params: [
      cmds.params.PLAYER,
      cmds.params.REASON
   ],
   call (player: PlayerMp, targetSearch: string | number, ...res) {
      const reason = [...res].join(' ');

      if (!reason.trim()) {
         // PORUKA: 'razlog ne moze biti prazan, space'
         return;
      }

      const target = mp.players.find(targetSearch);

      if (!target) {
         player.sendNotification(lang.userNotFound, notifications.type.ERROR, notifications.time.MED);
         return;
      }

      // LOGS

      player.kick('admin ' + player.account.username + ', reason ' + reason);
   }
}


Commands[cmds.names.SLAP] = {
   description: cmds.descriptions.SLAP,
   admin: rank.ADMINISTRATOR_2,
   params: [
      cmds.params.PLAYER
   ],
   call (player: PlayerMp, targetSearch: string) {
      const target = mp.players.find(targetSearch);

      if (!target) {
         player.sendNotification(lang.userNotFound, notifications.type.ERROR, notifications.time.MED);
      }

      const { position } = target!;
      
      if (target) {
         target.position = new mp.Vector3(position.x, position.y, position.z + 2);
         target.sendNotification(lang.admin + ' ' + player.character.name + ' ' + lang.adminWarnedYou + '.', notifications.type.ERROR, notifications.time.SHORT);
      }
   }
};


Commands[cmds.names.XYZ] = {
   description: cmds.descriptions.XYZ,
   admin: rank.ADMINISTRATOR_2,
   params: [
      cmds.params.COORD,
      cmds.params.COORD,
      cmds.params.COORD
   ],
   call (player: PlayerMp, x: string, y: string, z: string) {
      if (!x || !y || !z) {
         return;
      }
      
      player.position = new mp.Vector3(Number(x), Number(y), Number(z));
   }
};


Commands[cmds.names.A_CHAT] = {
   description: cmds.descriptions.A_CHAT,
   admin: rank.GAME_ASISSTANT,
   params: [
      cmds.params.TEXT,
   ],
   call (player: PlayerMp, ...content) {
      const text = [...content].join(' ');

      if (!text.trim()) {
         return;
      }
      
      const rank = ranks[player.account.administrator];

      const admins = mp.players.toArray().filter(player => player.account.administrator > none);
      admins.forEach(admin => {
         admin.sendMessage(rank + ' ' + player.name + ': ' + checkForDot(text), colors.hex.BROADCAST);
      });
   }
};


Commands[cmds.names.ANNOUNCEMENT] = {
   description: cmds.descriptions.ANNOUNCEMENT,
   admin: rank.SENIOR_ADMINISTRATOR,
   params: [
      cmds.params.TEXT,
   ],
   call (player: PlayerMp, ...content) {
      const message = [...content].join(' ');
      
      if (!message.trim()) {
         return;
      }

      const rank = ranks[player.account.administrator];
      const name = player.name + ' (' + player.account.username + ')';

      mp.players.forEach(target => {
         target.sendMessage(rank + ' ' + name + ': ' + checkForDot(message), colors.hex.BROADCAST);
      })
   }
};


Commands[cmds.names.MAKE_ADMIN] = {
   description: cmds.descriptions.MAKE_ADMIN,
   admin: rank.OWNER,
   params: [
      cmds.params.USERNAME,
      cmds.params.NUMBER
   ],
   call (player: PlayerMp, targetSearch: string, adminLevel: string) {
      const target = mp.players.find(targetSearch);

      if (!target) {
         player.sendNotification(lang.userNotFound, notifications.type.ERROR, notifications.time.MED);
         return;
      }

      target.account.setAdministrator(target, Number(adminLevel));
   }
};


Commands[cmds.names.CREATE_ACCOUNT] = {
   description: cmds.descriptions.CREATE_ACCOUNT,
   admin: rank.SENIOR_ADMINISTRATOR,
   params: [
      cmds.params.USERNAME,
      cmds.params.PASSWORD,
      cmds.params.E_MAIL
   ],
   call (player: PlayerMp, username: string, password: string, mail: string) {
      accounts.create( { username: username, password: password, email: mail } ).catch(e => logs.error('creatingAccount: ' + e) );
      // LOGS
      player.sendNotification(lang.accountCreated + ' (' + username + ', ' + password + ')', notifications.type.SUCCESS, notifications.time.LONG);
   }
};


Commands[cmds.names.FLIP] = {
   description: cmds.descriptions.FLIP,
   admin: rank.ADMINISTRATOR_2,
   call (player: PlayerMp) {
      if (player.vehicle) {
         player.sendNotification(lang.notInVehicle, notifications.type.ERROR, notifications.time.SHORT);
         player.vehicle.rotation = new mp.Vector3(0, 0, player.vehicle.heading);
      } else if (mp.vehicles.getClosest(player.position)) { 
         const closestVehicle = mp.vehicles.getClosest(player.position);
         closestVehicle.rotation = new mp.Vector3(0, 0, closestVehicle.heading);
      }
   }
}


Commands[cmds.names.DIMENSION] = {
   description: cmds.descriptions.XYZ,
   admin: rank.ADMINISTRATOR_2,
   params: [
      cmds.params.PLAYER,
      cmds.params.NUMBER
   ],
   call (player: PlayerMp, targetSearch: string, dimension: string) {
      const target = mp.players.find(targetSearch);

      if (!target) {
         player.sendNotification(lang.userNotFound, notifications.type.ERROR, notifications.time.MED);
         return;
      }

      if (target.vehicle) {
         target.vehicle.dimension = Number(dimension);
      }
      
      // PORUKA: Admin vam je promenio dimenziju
      // LOGS

      target.dimension = Number(dimension);
   }
};



// Commands['rtc'] = {
//    description: 'Specanje igrača',
//    Admin: 2,
//    params: ['id vozila'],
//    call: (Player: PlayerMp, Args: string[]) => {
//       if (Player.vehicle) {
//          //provera da li je vlasničko vozilo 
//       } else {
//          const Target = parseInt(Args[0]);
//          const TargetVehicle = mp.vehicles.at(Target);

//          if (Target && TargetVehicle) {
//             const SpawnData = {
//                X: 1,
//                Y: 1,
//                Z: 1,
//                Heading: 30
//             };
//             //Napraviti da kada se spawna vozilo seta mu se spawn data
//             const SpawnData = TargetVehicle.data.VEHICLE_SPAWN_DATA;
//             TargetVehicle.destroy();
//             TargetVehicle.spawn(new mp.Vector3(SpawnData.X, SpawnData.Y, SpawnData.Z), SpawnData.Heading);
//             Admin.AdminActionNotify(Player, `je respawnovao vozilo ID: ` + TargetVehicle.id);
//          }
//       }

//    }
// };


// Commands['sethp'] = {
//    Admin: 3,
//    description: '',
//    params: ['igrač', 'hp'],
//    Call: async (Player, Args: string[]) => {
//       const TargetPlayer = mp.players.find(Args[0]), Health = parseInt(Args[1]);
//       if (TargetPlayer && Health) {
//          Helth varijabla i setanje helti
//          Admin.AdminActionNotify(Player, `je namestio helte igraču ${TargetPlayer.name} na ${Health}.`);
//       }
//    }
// };

// Commands['setarmor'] = {
//    Admin: 3,
//    description: '',
//    params: ['igrač', 'armor'],
//    Call: async (Player, Args: string[]) => {
//       const TargetPlayer = mp.players.find(Args[0]), Health = parseInt(Args[1]);
//       if (TargetPlayer && Health) {
//          Helth varijabla i setanje helti
//          Admin.AdminActionNotify(Player, `je namestio armor igraču ${TargetPlayer.name} na ${Health}.`);
//       }
//    }
// };

// Commands['setvw'] = {
//    Admin: 5,
//    description: '',
//    params: ['igrač', 'dimenzija'],
//    Call: async (Player, Args: string[]) => {
//       const TargetPlayer = mp.players.find(Args[0]), Dimension = parseInt(Args[1]);
//       if (TargetPlayer && Dimension) {
//          TargetPlayer.dimension = Dimension;
//          Admin.AdminActionNotify(Player, `je namestio dimenziju igraču ${TargetPlayer.name} na ${Dimension}.`);
//       }
//    }
// };

// Commands['setskin'] = {
//    Admin: 6,
//    description: '',
//    params: ['igrač', 'model'],
//    Call: async (Player, Args: string[]) => {
//       const TargetPlayer = mp.players.find(Args[0]), PedModel = mp.joaat(Args[1]);
//       if (TargetPlayer && PedModel) {
//          TargetPlayer.model = PedModel;
//          Admin.AdminActionNotify(Player, `je promenio skin igraču ${TargetPlayer.name} na ${Args[1]}.`);
//       }
//    }
// };

// Commands['setmoney'] = {
//    Admin: 7,
//    params: ['igrac', 'vrednost'],
//    description: 'Postavite novac u džepu igraču na određenu vrednost',
//    Call: async (Player: PlayerMp, Args: string[]) => {
//       const TargetPlayer = mp.players.find(Args[0]), Value = parseInt(Args[1]);

//       if (TargetPlayer && Value) {
//          const Character = await Characters.findOne({ where: { id: Player.character.id } });
//          if (Character) {
//             Character.Money = Value;
//             Character.save();
//             TargetPlayer.SendMessage('[OOC] Admin Vam je postavio novac u džepu na ' + Value, Colors.tomato);
//             Admin.AdminActionNotify(Player, `je postavio novac u džepu igraču ${TargetPlayer.name} na ${Value}$.`);
//          }
//       }
//    }
// };

// Commands['givemoney'] = {
//    Admin: 7,
//    description: 'Dodajte novac igraču u džep',
//    params: ['igrac', 'vrednost'],
//    Call: async (Player: PlayerMp, Args: string[]) => {
//       const TargetPlayer = mp.players.find(Args[0]), Value = parseInt(Args[1]);

//       if (TargetPlayer && Value) {
//          Player.character.GiveMoney(Player, Value);
//          TargetPlayer.SendMessage('[OOC] Admin Vam je dao novac.' + Value + '$', Colors.tomato);
//       }
//    }
// };




// Commands['happyhours'] = {
//    description: 'Aktiviranje / deaktiviranje duplog XP-a',
//    Admin: 6,
//    Call: async (Player: PlayerMp, Args: string[]) => {
//       //HappyHours
//       mp.players.broadcast('Srećni sati su uključeni.');
//    }
// };

// Commands['ban'] = {
//    description: 'Banovanje korisničkog naloga.',
//    Admin: 5,
//    params: ['Celo ime jednog od karaktera', 'vreme(dani)', 'razlog'],
//    Call: async (Player: PlayerMp, Args: string[]) => {
//       //todo
//    }
// };

// Commands['unban'] = {
//    description: 'Ukidanje bana korisničkog naloga.',
//    Admin: 5,
//    params: ['Celo ime jednog od karaktera', 'razlog'],
//    Call: async (Player: PlayerMp, Args: string[]) => {
//       // todo
//    }
// };

// Commands['acclock'] = {
//    description: 'Zaključavanje korisničkog naloga.',
//    Admin: 5,
//    params: ['Celo ime jednog od karaktera', 'razlog'],
//    Call: async (Player: PlayerMp, Args: string[]) => {
//       // todo
//    }
// };

// Commands['accunlock'] = {
//    description: 'Zaključavanje korisničkog naloga.',
//    Admin: 5,
//    params: ['Celo ime jednog od karaktera', 'razlog'],
//    Call: async (Player: PlayerMp, Args: string[]) => {
//       // TODO
//    }
// };

// Commands['warn'] = {
//    description: 'Upozoravanje igrača i dodavanje warning poena.',
//    Admin: 3,
//    params: ['Celo ime jednog od karaktera', 'razlog'],
//    Call: async (Player: PlayerMp, Args: string[]) => {

//    }
// };

// Commands['fly'] = {
//    description: 'Uključi/isključi admin letenje',
//    Admin: 5,
//    Call: async (Player: PlayerMp, Args: string[]) => {
//       Player.call('CLIENT::ADMIN:FLY');
//    }
// };


// Commands['gethere'] = {
//    description: 'Uključi/isključi admin letenje',
//    Admin: 3,
//    params: ['igrač'],
//    Call: async (Player: PlayerMp, Args: string[]) => {
//       const TargetPlayer = mp.players.find(Args[0]);
//       if (TargetPlayer) {
//          if (TargetPlayer.vehicle) {
//             const Seat = TargetPlayer.seat, Vehicle = TargetPlayer.vehicle;
//             Vehicle.position = new mp.Vector3(Player.position.x + 2, Player.position.y, Player.position.z);
//             Vehicle.dimension = Player.dimension;
//             Player.putIntoVehicle(Vehicle, Seat);
//          } else {
//             TargetPlayer.position = Player.position;
//             TargetPlayer.dimension = Player.dimension;
//          }
//          TargetPlayer.SendMessage('Admin ' + Player.name + ' vas je teleportovao do sebe !', Colors.tomato);
//          Player.SendMessage('Teleportovali ste ' + TargetPlayer.name + ' do sebe !', Colors.tomato);
//          Admin.AdminActionNotify(Player, `je teleportovao igrača ${TargetPlayer.name} do sebe.`);
//       }
//    }
// };

// Commands['revive'] = {
//    Admin: 4,
//    description: '',
//    params: ['igrač', 'razlog'],
//    Call: async (Player: PlayerMp, Args: string[]) => {
//       const TargetPlayer = mp.players.find(Args[0]), Reason = Args[1];
//       if (TargetPlayer && Reason) {
//          Player.character.Wounded = false;
//          Player.character.Health = 100;
//          TargetPlayer.spawn(Player.character.Last_Position);
//          Admin.AdminActionNotify(Player, `je oživeo igrača ${TargetPlayer.name}. Razlog: ${Reason}.`);
//       }
//    }
// };

// Commands['givegun'] = {
//    Admin: 6,
//    description: 'Davanje oružja',
//    params: ['igrač', 'oružje', 'municija'],
//    Call: async (Player: PlayerMp, Args: string[]) => {
//       const TargetPlayer = mp.players.find(Args[0]), GunName = Args[1], Ammo = parseInt(Args[2]);
//       if (TargetPlayer && GunName.length > 0 && Ammo > 0) {
//          TargetPlayer.giveWeapon(mp.joaat(GunName), Ammo);
//          TargetPlayer.SendMessage('[OOC] Admin Vam je dao oružje ' + GunName + `(${Ammo})`, Colors.info);
//          Admin.AdminActionNotify(Player, `je dao oružje ${GunName}(${Ammo}) igraču ${TargetPlayer.name}.`);
//       }
//    }
// };

// Commands['makeadmin'] = {
//    Admin: 6,
//    description: '',
//    params: ['igrač', 'level'],
//    Call: async (Player: PlayerMp, Args: string[]) => {
//       const TargetPlayer = mp.players.find(Args[0]), AdminLevel = parseInt(Args[1]);
//       if (TargetPlayer) {
//          if (AdminLevel > 0) {
//             player.account.Administrator = AdminLevel;
//             Admin.AdminActionNotify(Player, `je postavio ${Administrators[AdminLevel]}-a igraču ${TargetPlayer.name}.`);
//          } else {
//             player.account.Administrator = 0;
//             Admin.AdminActionNotify(Player, `je skinuo ${Administrators[AdminLevel]}-a igraču ${TargetPlayer.name}.`);
//          }
//          player.account.save();
//       }
//    }
// };

// Commands['makeleader'] = {
//    Admin: 5,
//    description: 'Postavljanje/skidanje lidera.',
//    params: ['igrač', 'level'],
//    Call: async (Player: PlayerMp, Args: string[]) => {
//       const TargetPlayer = mp.players.find(Args[0]), PedModel = mp.joaat(Args[1]);
//       if (TargetPlayer && PedModel) {
//          TargetPlayer.model = PedModel;
//          Admin.AdminActionNotify(Player, `je promenio skin igraču ${TargetPlayer.name} na ${Args[1]}.`);
//       }
//    }
// };




// Commands['disarm'] = {
//    Admin: 4,
//    description: 'Oduzmite oružje igraču iz ruku.',
//    params: ['igrač', 'razlog'],
//    Call: async (Player: PlayerMp, Args: string[]) => {
//       const TargetPlayer = mp.players.find(Args[0]), Reason = Args[0];
//       if (TargetPlayer) {
//          TargetPlayer.removeAllWeapons();
//          TargetPlayer.SendMessage('[OOC] Admin Vam je oduzeo oružje iz ruke.', Colors.info);
//          Admin.AdminActionNotify(Player, `je oduzeo oružje iz ruke igraču ${TargetPlayer.name}. Razlog: ${Reason}`);
//       }
//    }
// };



