import { Browser } from '../../browser';
import { Business } from '../../interfaces/business';
import { toggleBusinesInfo } from './business.Core';


let active: boolean = false;


mp.events.add(
   {
      'CLIENT::BUSINES:MANAGEMENT': openBusinessManagement,
      'CLIENT::BUSINESS:WORKER_REMOVE': removeWorker,
      'CLIENT::BUSINESS:LOCK': lock,
      'CLIENT::BUSINESS:PRODUCT_ADD': addProduct
   }
)

mp.events.addProc(
   {
      'CLIENT::BUSINESS:UPDATE': updateBusiness,
      'CLIENT::BUSINESS:WORKER_ADD': addWorker,
   }
)


function openBusinessManagement (info: boolean | Business, availableItems: string) {
   active = !active;
   Browser.call(active ? 'BROWSER::SHOW' : 'BROWSER::HIDE', 'businessManagement')

   if (active) {
      toggleBusinesInfo(false);
      Browser.call('BROWSER::BUSINESS:MANAGEMENT', info, availableItems);
   }
}


async function addProduct (businesID: number, name: string, price: number) {
   const isAdded = await mp.events.callRemoteProc('SERVER::BUSINES:PRODUCT_ADD', businesID, name, price);
   if (isAdded) {
      mp.gui.chat.push(JSON.stringify(isAdded.products))
      Browser.call('BROWSER::BUSINESS:MANAGEMENT', isAdded);
   }
}


async function addWorker (bizId: number, name: string, salary: number) {
   const response = await mp.events.callRemoteProc('SERVER::BUSINESS:WORKER_ADD', bizId, name, salary);
   return response;
}


function removeWorker (name: string) {
   mp.events.callRemote('SERVER::BUSINESS:WORKER:REMOVE', name);
};


function lock (bId: number, locked: boolean) {
   mp.events.callRemote('SERVER::BUSINESS:LOCK', bId, locked);
};


async function updateBusiness (name: string) {
   const response = await mp.events.callRemoteProc('SERVER::BUSINESS:UPDATE', name);
   if (response) {
      Browser.call('BROWSER::BUSINESS:MANAGEMENT', response);
   }
}