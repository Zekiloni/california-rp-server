
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


export class LicenseItem extends baseItem {
   
   constructor (name: string, model: string, description: string) { 
      super (name, licenseTypes, model, 0.15, description);

      this.use = function (player: PlayerMp, item: Items,target: PlayerMp = player) {
         target.call('CLIENT::LICENSE:SHOW', [item]);
      }
   }
}

new LicenseItem(itemData.Names.drivingLicense, 'prop_cs_documents_01', 'a');
new LicenseItem(itemData.Names.boatingLicense, 'prop_cs_documents_01', 'a');
new LicenseItem(itemData.Names.fishingLicense, 'prop_cs_documents_01', 'a');
new LicenseItem(itemData.Names.flyingLicense, 'prop_cs_documents_01', 'a');
new LicenseItem(itemData.Names.weaponLicense, 'prop_cs_documents_01', 'a');
new LicenseItem(itemData.Names.huntingLicense, 'prop_cs_documents_01', 'a');
new LicenseItem(itemData.Names.truckLicense, 'prop_cs_documents_01', 'a');
