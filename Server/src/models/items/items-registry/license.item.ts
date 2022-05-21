
import { BaseItem } from '../base.item';
import { Items  } from '../item';
import { ItemEnums } from "@enums";
import { itemNames } from '@constants';


const licenseTypes = [
   ItemEnums.type.MISC, 
   ItemEnums.type.LEGAL, 
   ItemEnums.type.LICENSE,
];


export enum weapLicenseType { CCV, PF }


export class LicenseItem extends BaseItem {
   
   constructor (name: string, model: string, description: string) { 
      super (name, licenseTypes, model, 0.15, description);

      this.use = function (player: PlayerMp, item: Items,target: PlayerMp = player) {
         target.call('CLIENT::LICENSE:SHOW', [item]);
      }
   }
}


new LicenseItem(itemNames.DRIVING_LICENSE, 'prop_cs_documents_01', 'a');
new LicenseItem(itemNames.BOATING_LICENSE, 'prop_cs_documents_01', 'a');
new LicenseItem(itemNames.FISHING_LICENSE, 'prop_cs_documents_01', 'a');
new LicenseItem(itemNames.FLYING_LICENSE, 'prop_cs_documents_01', 'a');
new LicenseItem(itemNames.WEAPON_LICENSE, 'prop_cs_documents_01', 'a');
new LicenseItem(itemNames.HUNTING_LICENSE, 'prop_cs_documents_01', 'a');
new LicenseItem(itemNames.TRUCK_LICENSE, 'prop_cs_documents_01', 'a');
