
import { BaseItem } from '../base.Item';
import { inventories  } from '../item';
import { ItemEnums } from "@enums";
import { itemNames } from '@constants';


const licenseTypes = [
   ItemEnums.type.MISC, 
   ItemEnums.type.LEGAL, 
   ItemEnums.type.LICENSE,
];


export enum weapLicenseType { CCV, PF }


export class licenseItem extends BaseItem {
   
   constructor (name: string, model: string, description: string) { 
      super (name, licenseTypes, model, 0.15, description);

      this.use = function (player: PlayerMp, item: inventories,target: PlayerMp = player) {
         target.call('CLIENT::LICENSE:SHOW', [item]);
      }
   }
}


new licenseItem(itemNames.DRIVING_LICENSE, 'prop_cs_documents_01', 'a');
new licenseItem(itemNames.BOATING_LICENSE, 'prop_cs_documents_01', 'a');
new licenseItem(itemNames.FISHING_LICENSE, 'prop_cs_documents_01', 'a');
new licenseItem(itemNames.FLYING_LICENSE, 'prop_cs_documents_01', 'a');
new licenseItem(itemNames.WEAPON_LICENSE, 'prop_cs_documents_01', 'a');
new licenseItem(itemNames.HUNTING_LICENSE, 'prop_cs_documents_01', 'a');
new licenseItem(itemNames.TRUCK_LICENSE, 'prop_cs_documents_01', 'a');
