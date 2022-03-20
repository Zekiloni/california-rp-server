import { Browser } from "../../browser";


let active = {
   document: false,
   licenses: false
};

mp.events.add(
   {
      'CLIENT::ID:SHOW': showIdentityDocument
   }
);


function showIdentityDocument (info?: object) {
   active.document = !active.document;
   Browser.call(active.document ? 'BROWSER::SHOW' : 'BROWSER::HIDE', 'idDocument');

   if (active.document) {
      Browser.call('BROWSER::IDENTITY:INFO', info!);
   }
}


function showLicenses (info?: object) {
   
}