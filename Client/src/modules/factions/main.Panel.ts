import { Browser } from '../../browser';


let factionPanel: boolean = false;


const toggleFaction = async (info?: object) => {
   factionPanel = !factionPanel;
   Browser.call(factionPanel  ? 'BROWSER::SHOW' : 'BROWSER::HIDE', 'factionPanel');
   
   if (factionPanel && info) {
      Browser.call('BROWSER::FACTION:INFO', info);;
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
};


const kickMember = (characterID: number) => {
   return mp.events.callRemoteProc('SERVER::FACTION:KICK_MEMBER', characterID).then(isKicked => {
      return isKicked;
   })
};

const rankupMember = (characterID: number, rankID: number) => {
   return mp.events.callRemoteProc('SERVER::FACTION:RANKUP_MEMBER', characterID, rankID).then(isRanked => {
      return isRanked;
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
mp.events.addProc('CLIENT::FACTION:RANKUP_MEMBER', rankupMember);
mp.events.addProc('CLIENT::FACTION:KICK_MEMBER', kickMember);
