import { Browser } from '../../browser';


let factionPanel: boolean = false;


const toggleFaction = async () => {
   factionPanel = !factionPanel;
   Browser.call(factionPanel  ? 'BROWSER::SHOW' : 'BROWSER::HIDE', 'factionPanel');
   

   if (factionPanel) {
      const faction = await mp.events.callRemoteProc('SERVER::FACTION:INFO');
      Browser.call('BROWSER::FACTION:INFO', faction);;
   }
};


const createRank = async (name: string, description: string, permissions: string) => {
   const response = await mp.events.callRemoteProc('SERVER::RANK:CREATE', name, description, permissions);
   return response;
}

const deleteRank = (rankID: number) => {
   return mp.events.callRemoteProc('SERVER::RANK:DELETE', rankID).then(rankDeleted => {
      return rankDeleted;
   });
}


const updateRank = (rankID: number, name: string, description: string, salary: number) => {
   return mp.events.callRemoteProc('SERVER::RANK:UPDATE', rankID, name, description, salary).then(rankUpdated => {
      return rankUpdated;
   });
};


mp.events.add('CLIENT::FACTION:PANEL', toggleFaction);
mp.events.addProc('CLIENT::RANK:CREATE', createRank);
mp.events.addProc('CLIENT::RANK:DELETE', deleteRank);
mp.events.addProc('CLIENT::RANK:UPDATE', updateRank);
