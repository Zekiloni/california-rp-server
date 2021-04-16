

let types = require('../configs/Houses.json');
let { ItemEntities, ItemType } = require('./modules/ItemRegistry');

mp.houses = {};

class House { 
   constructor (id, data) { 
      this.id = id;
      this.price = data.price || 2500;
      this.owner = data.owner || -1;
      this.type = data.type || 0;
      this.locked = data.locked || 0;
      this.entrance = data.entrance;
      this.dimension = data.dimension || 0;
      this.interior = data.interior;
      this.intDimenison = data.intDimension;
      this.ipl = data.ipl;
      this.rent = data.rent || 0;

      // mp.world.requestIpl(this.ipl);

      this.colshape = mp.colshapes.newRectangle(this.entrance.x, this.entrance.y, 3, 2, 0);
      this.colshape.house = this.id;
      this.blip = mp.blips.new(40, new mp.Vector3(this.entrance.x, this.entrance.y, this.entrance.z), { dimension: this.dimension, name: 'Kuca', color: 36, shortRange: true });

      mp.houses[this.id] = this;
   }

   delete () { 
      this.blip.destroy();
      this.colshape.destroy();
      delete mp.houses[this.id];
   }

   refresh () { 
      let colors = [1, 2]
      this.owner == -1 ? ( this.blip.color = colors[0] ) : ( this.blip.color = color[1] );
      this.owner == -1 ? ( this.blip.name = 'Kuca na prodaju !' ) : ( this.blip.name = 'Kuca' );
   }
}

class Houses { 
   constructor () { 
      mp.events.add({
         'playerEnterColshape': (player, shape) => { 
            if (player.vehicle) return;
            if (shape.house) { 
               player.near = { type: 'house', id: shape.house };
               let house = mp.houses[shape.house];
               if (house) { 
                  if (house.owner != -1) { 
                     player.message('C0F0B6', `Kuca id ${house.id}`)
                  } else { 
                     player.message('C0F0B6', `Kuća na prodaju ! Cena ${house.price}$.`)
                  }
               }
            }
         },

         'playerExitColshape': (player, shape) => {
            if (player.near) { 
               player.near = null;
            }
         }
      })
   }

   load = () => { 
      let counter = 0;
      db.query("SELECT * from `houses`", function(error, results, fields) { 
         if (error) return core.terminal(1, 'Loading Houses ' + error);
         results.forEach(result => {
            let house = new House(result.id, 
               { entrance: JSON.parse(result.entrance), type: result.type, price: result.price, dimension: result.dimension, ipl: result.ipl, interior: result.interior, intDimension: result.intDimension })
            house.refresh();
            counter ++;
         });
         core.terminal(3, counter + ' Houses loaded')
      })
   }

   new = (player, type, price) => { 
      let info = types[type];
      let position = player.position;
      db.query("INSERT INTO `houses` (type, price, dimension, entrance, interior, ipl) VALUES (?, ?, ?, ?, ?, ?)", 
         [type, price, player.dimension, JSON.stringify(position), JSON.stringify(info.interior), info.ipl], function (error, results, fields) {
            if (error) return core.terminal(1, 'House creating ' + error);
            let house = new House(results.insertId, 
               { entrance: position, type: type, price: price, dimension: player.dimension, ipl: info.ipl, interior: info.interior, intDimension: results.insertId })
            house.refresh();
      });
   }

   update = (house) => { 
      db.query("UPDATE `houses` SET (type, price, dimension, entrance, interior, ipl) VALUES (?, ?, ?, ?, ?, ?)", 
         [house.type, house.price, house.dimension, JSON.stringify(house.entrance), JSON.stringify(house.interior), house.ipl], function (error, results, fields) {
            if (error) return core.terminal(1, 'House updating ' + error);
            house.refresh();
      });
   }

   delete = (house) => { 
      db.query("DELETE FROM `houses` WHERE `id` = ?", [house.id], function (error, results, fields) {
         if (error) return core.terminal(1, 'House deleting ' + error);
         house.delete();
     });
   }

   buy = (player, house) => { 
      if (mp.houses[house] && house.owner == -1) {
         if (mp.characters[player.character].cash >= house.price) { 
            mp.characters[player.character].giveMoney(player, -house.price);
            house.owner = player.character; 
            this.update(house);
         } else { 
            player.notification(MSG_NOT_ENOUGH_MONEY, NOTIFY_ERROR, 4); 
         }      
      }
   }

   sell = (player, house, target = -1, price = 1) => {
      if (price <= 0) return core.terminal(1, '[House sell] Invalid house price');
      if(house.owner == player.character) {
         if(target == -1) {
            house.owner = -1;
            this.update(house);
            mp.characters[player.character].giveMoney(player, price / 2);
            player.notification(MSG_HOUSE_SOLD_SUCCSESSFULY, NOTIFY_SUCCESS, 4);
         } else {
            if (player.isNear(target)) {
               let targetCharacter = mp.characters[target.character],
                   sellerCharacter = mp.characters[player.character]; 

               if(targetCharacter) {
                  if(targetCharacter.data.money >= price) {
                     targetCharacter.giveMoney(target, -price);
                     sellerCharacter.giveMoney(player, price);

                     house.owner = target.character;
                     this.update(house);

                     player.notification(MSG_HOUSE_SOLD_SUCCSESSFULY, NOTIFY_SUCCESS, 4);
                  }
                  else {
                     player.notification(MSG_NOT_ENOUGH_FOR_TRANSACTION, NOTIFY_ERROR, 4); 
                     target.notification(MSG_NOT_ENOUGH_MONEY, NOTIFY_ERROR, 4); 
                  }
               }
            }           
         }      
      }
   }

   storage = (player, house, interaction, itemId = -1) => {
      switch(interaction) 
      {
         case ARG_LOAD:
            let houseItems = [];
            for(let i in mp.items) {
               if(mp.items[i].entity == ItemEntities.House && mp.items[i].owner == house.id) {
                  houseItems.add(mp.items[i]);
               }
            }
            // let houseJson = JSON.stringify(houseItems);
            // player.call('client:inventory.house.action', 'load', houseJson);
            break;
         case ARG_PUT:
            if (itemId != -1) {
               let itemToLeave = mp.items[itemId];
               if (itemToLeave) {
                  itemToLeave.entity = ItemEntities.House;
                  itemToLeave.owner = house.id;
                  itemToLeave.update(itemToLeave);
                  player.notification(MSG_HOUSE_ITEM_LEFT, NOTIFY_SUCCESS, 4);
               }
            }
            break;
         case ARG_TAKE:
            if (itemId != -1) {
               let itemToTake = mp.items[itemId];
               if (itemToTake) {
                  itemToTake.entity = ItemEntities.Player;
                  itemToLeave.owner = player.character;
                  itemToTake.update(itemToTake);
                  player.notification(MSG_HOUSE_ITEM_TAKEN, NOTIFY_SUCCESS, 4);
               }
            }
            break;
      }
   }
}

mp.house = new Houses();
mp.house.load();

