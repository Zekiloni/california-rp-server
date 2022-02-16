import { Browser } from '../../browser';
import { business } from '../../interfaces/business';
import { showBusinessInfo } from './business.Core';


let active: boolean = false;


mp.events.add(
   {
      'CLIENT::BUSINES:MANAGEMENT': openBusinessManagement,
      'CLIENT::BUSINESS:WORKER:REMOVE': removeWorker,
      'CLIENT::BUSINESS:LOCK': lock
   }
)

mp.events.addProc(
   {
      'CLIENT::BUSINESS:UPDATE': updateBusiness,
      'CLIENT::BUSINESS:WORKER:ADD': addWorker,
      'CLIENT::BUSINES:GET_AVAILABLE:PRODUCTS': getAvailableProducts
   }
)


function openBusinessManagement (info: boolean | business) {
   active = !active;
   Browser.call(active ? 'BROWSER::SHOW' : 'BROWSER::HIDE', 'businessManagement')

   if (active) {
      showBusinessInfo(false);
      Browser.call('BROWSER::BUSINESS:MANAGEMENT', info);
   }
}


async function getAvailableProducts (type: number) {
   return mp.events.callRemoteProc('SERVER::BUSINESS:GET_AVAILABLE_PRODUCTS', type);
}


async function addWorker (name: string, salary: number) {
   const response = await mp.events.callRemoteProc('SERVER::BUSINESS:WORKER:ADD', name, salary);
   Browser.call('BROWSER::BUSINESS:MANAGEMENT', response);
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