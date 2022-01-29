
import { lang } from '@constants';
import { itemEnums } from '@enums';
import { itemAction } from '@interfaces';
import { items, inventories } from '@models';


mp.events.addProc(
   {

      'SERVER::PLAYER:ITEMS:GET': async (player: PlayerMp) => { 
         return inventories.getItems(itemEnums.entity.PLAYER, player.character!.id);
      },


      'SERVER::ITEM:INFO': (player: PlayerMp, itemName: string) => { 
         const item = items.list[itemName];
         const actions: itemAction[] = [];

         actions.push(
            { name: lang.itemAction.use, event: 'CLIENT::ITEM:USE', icon: 'use' },
            { name: lang.itemAction.drop, event: 'CLIENT::ITEM:DROP', icon: 'drop' },
            { name: lang.itemAction.give, event: 'CLIENT::ITEM:GIVE', icon: 'give' },
         );

         if (item.isStackable()){
            actions.push({ name: lang.itemAction.split, event: 'CLIENT::ITEM:SPLIT', icon: 'split' });
         } 

         return { info: item, actions: actions };
      },

      
      'SERVER::ITEM:USE': async (player: PlayerMp, itemId: number): Promise < inventories[] > => { 
         return new Promise((resolve) => { 
            inventories.findOne({ where: { id: itemId } }).then(async item => { 
               const rItem = items.list[item?.name!];
               await rItem?.use!(player, item);

               const newInventory = await inventories.getItems(itemEnums.entity.PLAYER, player.character.id);
               if (newInventory) resolve(newInventory)
            })
         });
      },

      'SERVER::ITEM:DROP': async (player: PlayerMp, itemId: number, positionString: string): Promise < inventories[] > => { 
         return new Promise((resolve) => { 
            inventories.findOne({ where: { id: itemId } }).then(async item => { 

               const groundPosition = JSON.parse(positionString);
               const { position, rotation } = groundPosition;

               item!.owner = 0;
               item!.on_ground = true;
               item!.dimension = player.dimension;
               item!.fingerprint = player.character.id;
               item!.position = new mp.Vector3(position.x, position.y, position.z);
               item!.rotation = new mp.Vector3(rotation.x, rotation.y, rotation.z);
               
               await item?.save();
               
               const newInventory = await inventories.getItems(itemEnums.entity.PLAYER, player.character.id);
               if (newInventory) resolve(newInventory);
            });
         });
      },

      'SERVER::ITEM:PICKUP': (player: PlayerMp, itemId: number) => { 
         return new Promise((resolve) => { 
            inventories.findOne({ where: { id: itemId } }).then(async item => { 
               await item?.pickup(player);      

               player.setVariable('ANIMATION', { name: 'pickup_low', dictionary: 'random@domestic', flag: 0 });
               const newInventory = await inventories.getItems(itemEnums.entity.PLAYER, player.character.id);
               if (newInventory) resolve(newInventory);   
            });
         })
      }
   }
);


mp.events.add(
   {
      'CLIENT::ITEM:WEAPON:SHOT': async (player: PlayerMp) => {
         console.log(1)
         if (!player.weapon) { 
            // no weapon in hand
            return;
         }

         const weapon = await player.call('CLIENT::WEAPON:NAME', [player.weapon]);

         const weaponItem = await inventories.findOne(
            { 
               where: { 
                  owner: player.character.id, 
                  name: weapon!, 
                  equiped: true
               } 
            }
         );
         
         if (!weaponItem) { 
            return;
         }

         let data = weaponItem.data;
         if (data.ammo! > 0) {
            data.ammo! --;
         }

         weaponItem.data = data;
         console.log(1)

         await weaponItem.save();
      }
   }
);