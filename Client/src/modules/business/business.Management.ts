import { Browser } from '../../browser';
import { Business } from '../../interfaces/business';
import { toggleBusinesInfo } from './business.Core';


let bizManagementActive: boolean = false;


function openBusinessManagement (info: boolean | Business) {
   bizManagementActive = !bizManagementActive;
   Browser.call(bizManagementActive ? 'BROWSER::SHOW' : 'BROWSER::HIDE', 'businessManagement')

   if (bizManagementActive) {
      toggleBusinesInfo(false);
      Browser.call('BROWSER::BUSINESS_MANAGEMENT', info);
   }
}


function getAvailableProducts (type: number) {
   return mp.events.callRemoteProc('SERVER::BUSINES_AVAILABLE_PRODUCTS', type).then(
      products => JSON.stringify(products)
   );
}


function addProduct (businesID: number, productName: string, productPrice: number) {
   return mp.events.callRemoteProc('SERVER::BUSINES_ADD_PRODUCT', businesID, productName, productPrice).then(
      added => JSON.stringify(added)
   );
}

function editProduct (businesID: number, productID: number, price: number) {
   return mp.events.callRemoteProc('SERVER::BUSINES_PRODUCT_EDIT', businesID, productID, price).then(
      edited => JSON.stringify(edited)
   );
}


mp.events.add('CLIENT::BUSINES_MANAGEMENT', openBusinessManagement);
mp.events.addProc('CLIENT::BUSINES_AVAILABLE_PRODUCTS', getAvailableProducts);
mp.events.addProc('CLIENT::BUSINES_ADD_PRODUCT', addProduct);
mp.events.addProc('CLIENT::BUSINES_PRODUCT_EDIT', editProduct);