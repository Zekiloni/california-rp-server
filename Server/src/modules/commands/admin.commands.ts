
import fs from 'fs';

import { Commands } from '../commands';
import { logs, items, inventories, houses } from '@models';
import { cmds, lang, weathers } from '@constants';
import { rank, notifications } from '@enums';
import { houseConfig, serverConfig } from '@configs';
import { shared_Data } from '@shared';


const savedPositions = 'savedPositions.txt';

Commands[cmds.names.SAVE_POS] = { 
   description: cmds.descriptions.ITEMS,
   admin: rank.LEAD_ADMINISTRATOR,
   call: (player: PlayerMp, ...saveName) => { 
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
   call: (player: PlayerMp, targetSearch: string | number) => {
      const target = mp.players.find(targetSearch);

      if (target && target.id != player.id) {
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
   call: (player: PlayerMp, targetSearch: string | number) => {
      const target = mp.players.find(targetSearch);

      if (target && target.id != player.id) {
         if (target.vehicle) {

            const { seat, vehicle } = target;

            vehicle.position = new mp.Vector3(player.position.x + 2, player.position.y, player.position.z);
            vehicle.dimension = player.dimension;
            target.dimension = player.dimension;
            target.putIntoVehicle(vehicle, seat);

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
      console.log('usi u cmd')
      itemName = itemName.join(' ');
      if (items.list[itemName]) {
         const foundItem = items.list[itemName];
         const target = mp.players.find(targetSearch);
         if (!target) return; // no target found
         try { 
            console.log('give 1')
            inventories.giveItem(target, foundItem, quantity);
         } catch(e) { 
            console.log(e)
         }

      } else { 
         // that item doesnt exist
      }
   }
}


Commands[cmds.names.CLEAR_INVENTORY] = { 
   description: cmds.descriptions.CLEAR_INVENTORY,
   call (player: PlayerMp, target: any) { 
      
   }
}


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
      
      target?.spawn(player.position);
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
   description: 'opis napisati',
   call (player: PlayerMp, targetSearch: any, money: number) { 
      const target = mp.players.find(targetSearch);

      if (!target) {
         // PORUKA: // nema igraca
         return;
      };

      target.character.giveMoney(target, money);
   }
};

Commands[cmds.names.SET_MONEY] =  {
   admin: rank.LEAD_ADMINISTRATOR,
   description: 'opis napisati',
   call (player: PlayerMp, targetSearch: any, money: number) { 
      const target = mp.players.find(targetSearch);
      if (!target) return; // nema
      target.character.setMoney(target, money);
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




//  Commands['adminhelp'] = {
//     description: 'Admin pomoc',
//     Admin: 1,
//     call: (Player: PlayerMp, Args: string[]) => {
//        let AllowedCommands = [];
//        for (const i in Commands) {
//           const Command = Commands[i];
//           if (Command) {
//              if (Command.Admin! > 0 && Command.Admin! <= player.account.Administrator) {
//                 AllowedCommands.push(Command);
//              }
//           }

//        }
//     }
//  };

// Commands['createaccount'] = {
//    description: 'Kreiranje korisničkog računa',
//    Admin: 5,
//    params: ['ime', 'e-mail', 'šifra'],
//    call: (Player: PlayerMp, Args: string[]) => {
//       try {
//          const [Username, Email, Password] = Args;
//          Accounts.create({ UserName: Username, Email: Email, Password: Password });
//          Admin.AdminActionNotify(Player, 'je napravio novi nalog. UserName: ' + Username);
//       } catch (Ex) {
//          Main.Terminal(1, JSON.stringify(Ex));
//       }

//    }
// };

// Commands['coord'] = {
//    description: 'Teleportovanje do komandi',
//    Admin: 3,
//    params: ['x', 'y', 'z'],
//    call: (Player: PlayerMp, Args: string[]) => {
//       const [x, y, z] = Args;
//       Player.position = new mp.Vector3(parseFloat(x), parseFloat(y), parseFloat(z));
//       Admin.AdminActionNotify(Player, `se teleportovao na koordinate. ${x} ${y} ${z}`);
//    }
// };

// Commands['a'] = {
//    description: 'Admin čet',
//    Admin: 1,
//    params: ['poruka'],
//    call: (Player: PlayerMp, Args: string[]) => {
//       const Message = Args[0].toLowerCase();
//       Admin.Chat(Player, Message);
//    }
// };

// Commands['ao'] = {
//    description: 'Globalno server obaveštenje',
//    Admin: 3,
//    params: ['poruka'],
//    call: (Player: PlayerMp, Args: string[]) => {
//       const Message = Args[0];
//       Admin.Broadcast(Player, Message);
//    }
// };

// Commands['tpm'] = {
//    description: 'Teleport do waypointa sa mape',
//    Admin: 3,
//    call: (Player: PlayerMp, Args: string[]) => {
//       Player.callProc('CLIENT::ADMINI:TP:WAYPOINT').then(Waypoint => {
//          Player.position = new mp.Vector3(Waypoint.x, Waypoint.y, Waypoint.z);
//          Admin.AdminActionNotify(Player, `se teleportovao na waypoint. ${Waypoint.x} ${Waypoint.y} ${Waypoint.z}`);
//       }).catch(() => {
//          Player.Notification('Nema markera', notifications.type.ERROR, 4);
//       });
//    }
// };

// Commands['slap'] = {
//    description: 'Upozorenje/skretanje pažnje igraču na određenu stvar',
//    Admin: 2,
//    params: ['igrač', 'razlog'],
//    call: (Player: PlayerMp, Args: string[]) => {
//       const [Target, Reason] = Args;
//       const TargetPlayer = mp.players.find(Target);
//       if (Target) {
//          TargetPlayer.position = new mp.Vector3(TargetPlayer.position.x, TargetPlayer.position.y, TargetPlayer.position.z + 2);
//          Admin.AdminActionNotify(Player, `je ošamario igrača ${TargetPlayer.name}. Razlog: ${Reason}.`);
//          TargetPlayer.SendMessage('[OOC] Admin vas je ošamario. Razlog: ' + Reason, Colors.info);
//       }
//    }
// };

// Commands['ar'] = {
//    description: 'Prihvatite report sa liste',
//    Admin: 2,
//    params: ['broj'],
//    call: (Player: PlayerMp, Args: string[]) => {
//       const ReportNumber = Args[0];
//    }
// };

// Commands['spec'] = {
//    description: 'Specanje igrača',
//    Admin: 2,
//    params: ['igrač'],
//    call: (Player: PlayerMp, Args: string[]) => {
//       const Target = parseInt(Args[0]);
//       const TargetPlayer = mp.players.at(Target);

//       if (Target && TargetPlayer) {
//          //TargetPlayer.call('SPEC_EVENT', [TargetPlayer]);
//       }
//    }
// };


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

// Commands['save'] = {
//    Admin: 7,
//    description: 'Sačuvajte trenutnu poziciju',
//    params: ['ime'],
//    call: (Player: PlayerMp, Args: string[]) => {
//       let Name = Args.slice(0).join(' '), Pos = (Player.vehicle) ? Player.vehicle.position : Player.position;
//       const rot = Player.vehicle ? Player.vehicle.rotation : new mp.Vector3(0, 0, Player.heading);
//       fs.appendFile(savedPosition, `Position: ${Pos.x}, ${Pos.y}, ${Pos.z} | ${(Player.vehicle) ? `Rotation: ${rot.x}, ${rot.y}, ${rot.z}` : `Heading: ${rot.z}`} | ${(Player.vehicle) ? 'InCar' : 'OnFoot'} - ${name}\r\n`, (err: any) => {
//          if (err) {
//             Main.Terminal(3, 'Greska u cuvanju pozicije. Igrac: ' + Player.name + ' Pozicija: ' + Pos)
//          }
//          else {
//             Player.SendMessage(`Trenutna pozicija: ${Name} { X: ${Player.position.x}, Y: ${Player.position.y}, Z: ${Player.position.z} }.`, Colors.info);
//          }
//       });
//    }
// };

// Commands['kick'] = {
//    Admin: 2,
//    description: 'Izbacite igrača sa servera.',
//    params: ['igrač', 'razlog'],
//    call: (Player: PlayerMp, Args: string[]) => {
//       const TargetPlayer = mp.players.find(Args[0]);
//       const Reason = Args[1];

//       if (TargetPlayer) {
//          TargetPlayer.SendMessage('[OOC] Admin vas je ošamario. Razlog: ' + Reason, Colors.info);
//          Admin.AdminActionNotify(Player, `je kikovao igrača ${TargetPlayer.name}. Razlog: ${Reason}.`);
//          KickEx(Player, Reason);
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

// Commands['freeze'] = {
//    Admin: 3,
//    description: 'Zaledite igrača u mestu..',
//    params: ['igrač', 'razlog'],
//    Call: async (Player: PlayerMp, Args: string[]) => {
//       const TargetPlayer = mp.players.find(Args[0]), Reason = Args[1];
//       if (TargetPlayer && Reason.length > 0) {
//          TargetPlayer.call('CLIENT::FREEZE');
//          TargetPlayer.SendMessage('[OOC] Admin Vas je zaledio. Razlog: ' + Reason, Colors.info);
//          Admin.AdminActionNotify(Player, `je zaledio igraca ${TargetPlayer.name}. Razlog: ${Args[1]}.`);
//       }
//    }
// };

// Commands['unfreeze'] = {
//    Admin: 3,
//    description: 'Odledite igrača',
//    params: ['igrač'],
//    Call: async (Player: PlayerMp, Args: string[]) => {
//       const TargetPlayer = mp.players.find(Args[0]);
//       if (TargetPlayer) {
//          TargetPlayer.call('CLIENT::UNFREEZE');
//          TargetPlayer.SendMessage('[OOC] Admin Vas je odledio.', Colors.info);
//          Admin.AdminActionNotify(Player, `je odledio igrača ${TargetPlayer.name}.`);
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

// Commands['lr'] = {
//    Admin: 2,
//    description: 'Lista svih reportova.',
//    Call: async (Player: PlayerMp, Args: string[]) => {
//       // todo
//    }
// };

