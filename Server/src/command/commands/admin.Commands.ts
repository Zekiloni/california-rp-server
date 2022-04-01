
import fs from 'fs';

import { Commands } from '../command';
import { logs, Items, inventories, houses, Accounts, Busines, Factions, Characters, vehicles } from '@models';
import { cmds, colors, gDimension, Lang, none, weathers } from '@constants';
import { rank, notifications } from '@enums';
import { BusinesConfig, ServerConfig, VehicleConfig } from '@configs';
import { shared_Data } from '@shared';
import { admins } from '../../accounts/admin';


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

         player.notification('SUCCES TELEPORT', notifications.type.SUCCESS, 4);
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

         player.notification('SUCCES TELEPORT', notifications.type.SUCCESS, 4);
      }
   }
};


Commands[cmds.names.ITEMS] = { 
   description: cmds.descriptions.ITEMS,
   call (player: PlayerMp) { 
      console.log(Items.list);
   }
};


Commands[cmds.names.CLEAR_CHAT] = {
   description: cmds.descriptions.CLEAR_CHAT,
   admin: rank.LEAD_ADMINISTRATOR,
   call (player: PlayerMp) {
      mp.players.forEach(target => {
         target.call('CLIENT::CHAT_CLEAR');
         target.notification(Lang.chatIsClearedBy + player.character.name + ' (' + player.account.username + ').', notifications.type.INFO, notifications.time.MED);
      })
   }
}


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


Commands[cmds.names.CREATE_BUSINESS] = {
   description: cmds.descriptions.CREATE_BUSINESS,
   params: [
      cmds.params.TYPE,
      cmds.params.PRICE,
      cmds.params.WALK_IN,
      cmds.params.TEXT
   ],
   call (player: PlayerMp, type: string, price: string, walk_in: string, ...name) {
      Busines.create( 
         {
            name: [...name].join(' '), 
            type: Number(type), 
            price: Number(price), 
            walk_in: Number(walk_in) == 1 ? true : false,
            position: player.position, 
            dimension: player.dimension 
         } 
      );
   }
}


Commands[cmds.names.BUSINESS_TYPES] = {
   description: cmds.descriptions.BUSINESS_TYPES,
   admin: rank.LEAD_ADMINISTRATOR,
   call (player: PlayerMp) {
      let message = '';

      BusinesConfig.typeNames.forEach(type => {
         const index = BusinesConfig.typeNames.indexOf(type);
         message += '[' + index + '] ' + type + ', ';
      });
      player.sendMessage(message, colors.hex.Help);
   }
}

Commands[cmds.names.EDIT_BUSINESS] = {
   description: cmds.descriptions.EDIT_BUSINESS,
   admin: rank.LEAD_ADMINISTRATOR,
   params: [
      cmds.params.BUSINES_ID,
      cmds.params.FIELD
   ],
   call (player: PlayerMp, id: string, property: string, ...newValue) {
      const value = [...newValue].join(' ');
      
      Busines.findOne( { where: { id: Number(id) } } ).then(busines => {
         if (!busines) {
            return;
         }

         busines.edit(player, property, value);
      });
   }
}


Commands[cmds.names.GIVE_ITEM] ={
   description: cmds.descriptions.GIVE_ITEM,
   admin: rank.SENIOR_ADMINISTRATOR,
   params: [
      cmds.params.PLAYER,
      cmds.params.TEXT
   ],
   call (player: PlayerMp, targetSearch: any, ...itemName: any) { 
      itemName = itemName.join(' ');

      if (Items.list[itemName]) {
         const foundItem = Items.list[itemName];
         const target = mp.players.find(targetSearch);

         if (!target) {
            player.notification(Lang.userNotFound, notifications.type.ERROR, notifications.time.MED);
            return;
         }; 

         try { 
            inventories.giveItem(target, foundItem);
         } catch(e) { 
            console.log(e)
         }

      } else { 
         player.notification(Lang.itemDoesntExist, notifications.type.ERROR, notifications.time.MED);
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
         player.notification(Lang.userNotFound, notifications.type.ERROR, notifications.time.SHORT);
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
   call (player: PlayerMp, targetSearch: string, value: string) { 
      const target = mp.players.find(targetSearch);

      if (!target) {
         player.notification(Lang.userNotFound, notifications.type.ERROR, notifications.time.SHORT);
         return;
      }

      if (Number(value) < 0 || Number(value) > 300) {
         return;
      }
      
      target.health = Number(value);
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

      player.character.respawn(target!, false);
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
         player.notification(Lang.userNotFound, notifications.type.ERROR, notifications.time.SHORT);
         return;
      }
      
      target.removeAllWeapons();

      if (target.character) {
         inventories.findAll( { where: { owner: target.character.id, equiped: true } } ).then(equipment => {
            equipment.forEach(async equipedItem => {
               const item = Items.list[equipedItem.name];
               if (item.isWeapon()) {
                  equipedItem.equiped = false;
                  await equipedItem.save();
               }
            })
         })
      }

      target.notification(Lang.admin + ' ' + player.name + Lang.disarmedYou, notifications.type.INFO, notifications.time.MED);
      player.notification(Lang.youDisarmedPlayer + ' ' + target.name + '.', notifications.type.SUCCESS, notifications.time.MED);
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
         player.notification(Lang.userNotFound, notifications.type.ERROR, notifications.time.SHORT)
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
   call (player: PlayerMp, model: string, pColor: string = '0,0,0', sColor: string = '0,0,0', numberPlate?: string) { 

      const primaryColor = pColor.split(',');
      const secondaryColor = sColor.split(',');

      if (!model.trim()) {
         return;
      }

      const color: [RGB, RGB] = [
         [
            Number(primaryColor[0]), 
            Number(primaryColor[1]), 
            Number(primaryColor[2])
         ],
         [
            Number(secondaryColor[0]),
            Number(secondaryColor[1]), 
            Number(secondaryColor[2])
         ]
      ];

      const rotation = new mp.Vector3(0, 0, player.heading);

      vehicles.new(model, VehicleConfig.type.ADMIN, true, player.character.id, color, player.position, rotation, {
         locked: false, spawned: false
      }).then(createdVehicle => {
         if (!createdVehicle) {
            return;
         }

         const vehicle = createdVehicle.load();

         if (!vehicle) {
            return;
         }
         
         player.putIntoVehicle(vehicle, RageEnums.VehicleSeat.DRIVER);
      });
   } 
};



Commands[cmds.names.SPAWN_VEHICLE] = {
   description: cmds.descriptions.SPAWN_VEHICLE,
   admin: rank.SENIOR_ADMINISTRATOR,
   params: [
      cmds.params.VEHICLE_ID,
   ],
   call (player: PlayerMp, vehicleID: string) {
      vehicles.findOne( { where: { id: Number(vehicleID) } } ).then(vehicle => {
         if (!vehicle) {
            player.notification(Lang.noVehicleFound, notifications.type.ERROR, notifications.time.MED);
            return;
         }

         if (vehicle.spawned) {
            player.notification(Lang.vehicleAlreadySpawned, notifications.type.ERROR, notifications.time.MED);
            return;
         }

         vehicle.load();
         player.notification(Lang.vehicleLoaded, notifications.type.SUCCESS, notifications.time.MED);
      })
   }
};


Commands[cmds.names.GET_VEHICLE] = {
   description: cmds.descriptions.GET_VEHICLE,
   admin: rank.SENIOR_ADMINISTRATOR,
   params: [
      cmds.params.VEHICLE_ID
   ],
   call (player: PlayerMp, vehicleID: string) {
      const vehicle = mp.vehicles.toArray().find(vehicle => vehicle.instance.id == Number(vehicleID));

      if (!vehicle) {
         player.notification(Lang.noVehicleFound, notifications.type.ERROR, notifications.time.MED);
         return;
      }

      if (!vehicle.instance.spawned) {
         player.notification(Lang.vehicleNotSpawned, notifications.type.ERROR, notifications.time.MED);
         return;
      }

      const { position, dimension } = player;

      vehicle.position = new mp.Vector3(position.x + 3, position.y + 3, position.z);
      vehicle.dimension = dimension;

      const occupants = vehicle.getOccupants();

      if (occupants.length > 0) {
         occupants.forEach(occupant => {
            occupant.putIntoVehicle(vehicle, occupant.seat);
         })
      }

      player.notification(Lang.uTeleportedVehicleToYou, notifications.type.SUCCESS, notifications.time.MED);
   }
}

Commands['alarm'] = {
   description: 'aa',
   call (player: PlayerMp) {
      if (!player.vehicle) {
         return;
      }
      const status = player.vehicle.getVariable(shared_Data.ALARM);
      player.vehicle.setVariable(shared_Data.ALARM, !status);
   }
}

Commands[cmds.names.DESTROY_VEHICLE] = {
   description: cmds.descriptions.DESTROY_VEHICLE,
   admin: rank.LEAD_ADMINISTRATOR,
   params: [
      cmds.params.VEHICLE_ID
   ],
   call (player: PlayerMp, vehicleID: string) {
      vehicles.findOne( { where: { id: vehicleID } } ).then(vehicle => {
         if (!vehicle) {
            player.notification(Lang.noVehicleFound, notifications.type.ERROR, notifications.time.MED);
            return;
         }

         vehicle?.destroy( );
      })
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
         ServerConfig.freezeTime = false;
      } else { 
         ServerConfig.freezeTime = true;
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
         player.notification(Lang.userNotFound, notifications.type.ERROR, notifications.time.LONG);
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
         player.notification(Lang.userNotFound, notifications.type.ERROR, notifications.time.LONG);
         return;
      }; 

      target.character?.setMoney(target, Number(money));
   }
}


Commands[cmds.names.TELEPORT] = {
   description: cmds.descriptions.TELEPORT,
   admin: rank.ADMINISTRATOR_2,
   params: [
      cmds.params.TP_TYPE
   ],
   async call (player: PlayerMp, type: string, id: string) {

      if (!id) {
         return;
      }

      switch (type) {
         case cmds.actions.vehicle: {
            const vehicle = mp.vehicles.at(Number(id));

            if (!vehicle) {
               // vehicle not found
               return;
            }

            player.position = new mp.Vector3(vehicle.position.x + 1, vehicle.position.y + 2, vehicle.position.z);
            player.dimension = vehicle.dimension;

            break;
         }

         case cmds.actions.job: {
            player.dimension = gDimension;
            break;
         }

         case cmds.actions.busines: {
            Busines.findOne( { where: { id: Number(id) } } ).then(busines => {
               if (!busines) {
                  return;
               }

               player.position = busines.position!;
               player.dimension = busines.dimension!;
            });

            break;
         }

         case cmds.actions.house: {
            houses.findOne( { where: { id: Number(id) } } ).then(house => {
               if (!house) {
                  return;
               }

               player.position = house.position;
               player.dimension = house.dimension;
            })

            break;
         }

         default: {
            
            break;
         }
      }
   }
}


Commands[cmds.names.CREATE_HOUSE] =  {
   admin: rank.LEAD_ADMINISTRATOR,
   description: cmds.descriptions.CREATE_HOUSE,
   params: [
      cmds.params.HOUSE_TYPE,
      cmds.params.PRICE
   ],
   call (player: PlayerMp, type: string, price: string) { 
      houses.new(player, Number(type), Number(price));
   }
}


Commands[cmds.names.DESTROY_HOUSE] =  {
   admin: rank.LEAD_ADMINISTRATOR,
   description: cmds.descriptions.DESTROY_HOUSE,
   async call (player: PlayerMp, id?: number) { 
      const nearest = await houses.getNearest(player);

      if (!nearest) {
         return;
      }

      nearest.destroy();
   }
}


Commands[cmds.names.EDIT_HOUSE] =  {
   admin: rank.LEAD_ADMINISTRATOR,
   description: cmds.descriptions.EDIT_HOUSE,
   params: [
      cmds.params.HOUSE_ID,
      cmds.params.FIELD,
      cmds.params.VALUE
   ],
   call (player: PlayerMp, id: string, property: string, value: string) { 
      houses.findOne( { where: { id: id } } ).then(house => { 
         if (!house) {
            return;
         }
         
         house.edit(player, property, value);
      })
   }
}


Commands[cmds.names.DESTROY_BUSINESS] = {
   admin: rank.LEAD_ADMINISTRATOR,
   description: cmds.descriptions.DESTROY_BUSINESS,
   async call (player: PlayerMp) {
      const nearest = await Busines.getNearest(player);

      if (!nearest) {
         return;
      }
      
      nearest.destroy();
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
         player.notification(Lang.userNotFound, notifications.type.ERROR, notifications.time.MED);
         return;
      }

      // LOGS

      target.kick('admin ' + player.account.username + ', reason ' + reason);
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
         player.notification(Lang.userNotFound, notifications.type.ERROR, notifications.time.MED);
      }

      const { position } = target!;
      
      if (target) {
         target.position = new mp.Vector3(position.x, position.y, position.z + 2);
         target.notification(Lang.admin + ' ' + player.character.name + ' ' + Lang.adminWarnedYou + '.', notifications.type.ERROR, notifications.time.SHORT);
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
      
     admins.chat(player, text);
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
      
      admins.broadcast(player, message);
   }
};


Commands[cmds.names.CREATE_FACTION] = {
   admin: rank.SENIOR_ADMINISTRATOR,
   description: cmds.descriptions.CREATE_FACTION,
   params: [
      cmds.params.TYPE,
      cmds.params.FACTION_NAME
   ],
   async call (player: PlayerMp, type: number, ...name) {
      const factionName = [...name].join(' ');

      if (type < 0 || type > 14)

      if (!factionName.trim()) {
         return;
      }

      const faction = await Factions.create(
         {
            type: type,
            name: factionName,
            description: '',
            leader: none,

         }
      ).catch(e => logs.error(e));
      
      if (faction) {
         player.notification(Lang.succesfullyCreatedFaction + faction.name + Lang.underId + faction.id + '.', notifications.type.SUCCESS, notifications.time.MED);
      }
   }
}


Commands[cmds.names.EDIT_FACTION] = {
   description: cmds.descriptions.EDIT_FACTION,
   admin: rank.LEAD_ADMINISTRATOR,
   params: [
      cmds.params.FACTION_ID,
      cmds.params.FIELD
   ],
   async call (player: PlayerMp, factionID: string, property: string, ...newValue) {
      Factions.findOne( { where: { id: factionID } } ).then(faction => {
         if (!faction) {
            player.notification(Lang.factionNotFound, notifications.type.ERROR, notifications.time.MED);
            return;
         }
   
         const value = [...newValue].join(' ');
   
         faction.edit(player, property, value);
      });
   }
}


Commands[cmds.names.MAKE_LEADER] = {
   description: cmds.descriptions.MAKE_LEADER,
   admin: rank.SENIOR_ADMINISTRATOR,
   params: [
      cmds.params.PLAYER,
      cmds.params.FACTION_ID
   ],
   async call (player: PlayerMp, targetSearch: string, factionID: string) {
      const target = mp.players.find(targetSearch);

      if (!target) {
         player.notification(Lang.userNotFound, notifications.type.ERROR, notifications.time.SHORT);
         return;
      };

      if (Number(factionID) == 0) {
         Factions.findOne( { where: { id: target.character.id } } ).then(faction => {
            target.character.setFaction(target, none);
   
            if (faction) {
               faction.setLeader(none);
            }        
            
            target.notification(Lang.uAreNotLeaderAnymore + faction?.name + '.', notifications.type.INFO, notifications.time.LONG);
         })

      } else {
         Factions.findOne( { where: { id: factionID } } ).then(faction => {
            if (!faction) {
               player.notification(Lang.factionNotFound, notifications.type.ERROR, notifications.time.LONG);
               return;
            }
            
            faction.makeLeader(player, target);
         })
      }
   }
}


Commands[cmds.names.FACTIONS] = {
   description: cmds.descriptions.FACTIONS,
   admin: rank.ADMINISTRATOR_2,
   async call (player: PlayerMp) {
      Factions.findAll().then(factions => {
         if (Factions.length < 1) {
            player.sendMessage(Lang.thereIsNoFactionsRn, colors.hex.Info);
            return;
         }

         factions.forEach(async faction => {
            const members = await Characters.count( { where: { faction: faction.id } } );
            const leader = await Characters.findOne( { where: { id: faction.leader } } );
            
            player.sendMessage('[' + faction.id + '] ' + faction.name + ', Lider ' + (leader ? leader?.name : 'Niko') + ', clanova ' + members + '.', colors.hex.Info); // PORUKA
         })
      })
   }
}

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
         player.notification(Lang.userNotFound, notifications.type.ERROR, notifications.time.MED);
         return;
      }

      target.account.setAdministrator(target, Number(adminLevel));
      player.notification(Lang.usetAdminTo + adminLevel + ' ' + target.name + '.', notifications.type.INFO, notifications.time.MED);
      target.notification(player.name + Lang.setUAdminLevel + adminLevel + '.', notifications.type.INFO, notifications.time.MED);
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
      Accounts.create( { username: username, password: password, email: mail } ).catch(e => logs.error('creatingAccount: ' + e) );
      // LOGS
      player.notification(Lang.ACCOUNT_SUCCESFULLY_CREATED + ' (' + username + ', ' + password + ')', notifications.type.SUCCESS, notifications.time.LONG);
   }
};


Commands[cmds.names.FLIP] = {
   description: cmds.descriptions.FLIP,
   admin: rank.ADMINISTRATOR_2,
   call (player: PlayerMp) {
      if (player.vehicle) {
         player.notification(Lang.notInVehicle, notifications.type.ERROR, notifications.time.SHORT);
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
         player.notification(Lang.userNotFound, notifications.type.ERROR, notifications.time.MED);
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


Commands[cmds.names.RESPAWN_VEHICLE] = {
   description: cmds.descriptions.RESPAWN_VEHICLE,
   admin: rank.SENIOR_ADMINISTRATOR,
   call (player: PlayerMp) {
      if (player.vehicle) {
         player.vehicle.instance.respawn(player.vehicle);
      } else if (player.dist(mp.vehicles.getClosest(player.position).position) < 10) {
         const vehicle = mp.vehicles.getClosest(player.position);
         vehicle.instance.respawn(vehicle);
      } else { 
         player.notification(Lang.notInVehicle, notifications.type.ERROR, notifications.time.SHORT);
      }
   }
}

Commands[cmds.names.RESPAWN_ALL_VEHICLES] = {
   description: cmds.descriptions.RESPAWN_ALL_VEHICLES,
   admin: rank.LEAD_ADMINISTRATOR,
   call (player: PlayerMp) {
      mp.vehicles.forEach(vehicle => {
         if (vehicle.getOccupants().length == 0) {
            if (vehicle.instance) {
               vehicle.instance.respawn(vehicle);
            }
         }
      })
   }
};


Commands[cmds.names.SET_ARMOUR] = {
   description: cmds.descriptions.SET_ARMOUR,
   admin: rank.SENIOR_ADMINISTRATOR,
   call (player: PlayerMp, targetSearch: string, armour: string) {
      const target = mp.players.find(targetSearch);

      if (!target) {
         player.notification(Lang.userNotFound, notifications.type.ERROR, notifications.time.MED);
         return;
      }

      target.armour = Number(armour);
   }
}

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



