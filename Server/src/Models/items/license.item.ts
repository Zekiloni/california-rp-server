
import { itemData } from '../../globals/enums';
import Items from '../inventory.item.model';
import { baseItem } from '../item.model';


const licenseTypes = [itemData.Type.MISC, itemData.Type.LEGAL, itemData.Type.LICENSE];

export enum weapLicenseType { CCV, PF }

interface LicenseData {
   Issued: Date
   Expiring: Date
   Type?: weapLicenseType
}


export class licenseItem extends baseItem {
   
   constructor (name: string, model: string, description: string) { 
      super (name, licenseTypes, model, 0.15, description);

      this.use = function (player: PlayerMp, item: Items,target: PlayerMp = player) {
         target.call('CLIENT::LICENSE:SHOW', [item]);
      }
   }
}

new licenseItem(itemData.Names.DRIVING_LICENSE, 'prop_cs_documents_01', 'a');
new licenseItem(itemData.Names.BOATING_LICENSE, 'prop_cs_documents_01', 'a');
new licenseItem(itemData.Names.FISHING_LICENSE, 'prop_cs_documents_01', 'a');
new licenseItem(itemData.Names.FLYING_LICENSE, 'prop_cs_documents_01', 'a');
new licenseItem(itemData.Names.WEAPON_LICENSE, 'prop_cs_documents_01', 'a');
new licenseItem(itemData.Names.HUNTING_LICENSE, 'prop_cs_documents_01', 'a');
new licenseItem(itemData.Names.TRUCK_LICENSE, 'prop_cs_documents_01', 'a');
