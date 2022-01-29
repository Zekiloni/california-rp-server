import { itemEnums } from "@enums";
import { items, inventories } from '@models';
import { itemNames } from '@constants';


const licenseTypes = [
   itemEnums.type.MISC, 
   itemEnums.type.LEGAL, 
   itemEnums.type.LICENSE
];

export enum weapLicenseType { CCV, PF }


export class licenseItem extends items {
   
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
