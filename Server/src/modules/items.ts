
import weaponData from '../configs/weapon.data.json';
import { itemNames } from '@constants';
import { ItemEnums } from '@enums';
import { BaseItem, Items, Logs } from '@models';


// mp.events.addProc(
//    {
//       'SERVER::PLAYER:ITEMS:GET': getPlayerItems,
//       'SERVER::ITEM:INFO': getItemInfo,      
//       'SERVER::ITEM:DROP': onItemDrop,
//       'SERVER::ITEM:PICKUP': onItemPickup,
//       'SERVER::ITEM:EQUIP': onItemEquip,
//       'SERVER::ITEM:USE': onItemUse,
//       'SERVER::ITEM:UNEQUIP': onItemUnequip
//    }
// );


// mp.events.add(
//    {
//       'SERVER::ITEM:WEAPON:SHOT': onWeaponShot,
//       'SERVER::ITEMS:RADIO:UPDATE': updateHandheldRadio,
//       'SERVER::USE:EQUIPED': useEquiped,
//    }
// )






async function onItemDrop (player: PlayerMp, itemId: number, positionString: string) { 
   return Items.findOne({ where: { id: itemId } }).then(async item => { 
      const groundPosition = JSON.parse(positionString);
      const { position, rotation } = groundPosition;

      await item?.dropItem(player, new mp.Vector3(position.x, position.y, position.z), new mp.Vector3(rotation.x, rotation.y, rotation.z));

      // const inventory = await Items.getEntityItems(ItemEnums.entity.PLAYER, player.character.id);
      // return inventory;
   });
};


async function onWeaponShot (player: PlayerMp) {
   if (!player.weapon) { 
      // no weapon in hand
      return;
   }

   //@ts-ignore
   const weapon = weaponData[player.weapon.toString()];

   const weaponItem = await Items.findOne(
      { 
         where: { 
            owner: player.character.id, 
            name: weapon?.Name, 
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

   await weaponItem.save();
}

