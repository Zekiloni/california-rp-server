
import { itemNames } from '../../enums';
import Items from '../inventory.item.model';
import { Item } from '../item.model';


const licenseTypes = [Item.Type.Misc, Item.Type.Legal, Item.Type.License];

export enum weapLicenseType { CCV, PF }

interface LicenseData {
   Issued: Date
   Expiring: Date
   Type?: weapLicenseType
}


export class LicenseItem extends Item {
   
   constructor (name: string, model: string, description: string) { 
      super (name, licenseTypes, model, 0.15, description);

      this.Use = function (player: PlayerMp, item: Items,target: PlayerMp = player) {
         target.call('CLIENT::LICENSE:SHOW', [item]);
      }
   }
}

new LicenseItem(itemNames.drivingLicense, 'prop_cs_documents_01', 'a');
new LicenseItem(itemNames.boatingLicense, 'prop_cs_documents_01', 'a');
new LicenseItem(itemNames.fishingLicense, 'prop_cs_documents_01', 'a');
new LicenseItem(itemNames.flyingLicense, 'prop_cs_documents_01', 'a');
new LicenseItem(itemNames.weaponLicense, 'prop_cs_documents_01', 'a');
new LicenseItem(itemNames.huntingLicense, 'prop_cs_documents_01', 'a');
new LicenseItem(itemNames.truckLicense, 'prop_cs_documents_01', 'a');
