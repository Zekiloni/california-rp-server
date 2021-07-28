

const Player = mp.players.local;

enum PhoneContactActions {
   Add, Remove, Update
}

mp.events.add({
   'CLIENT::PLAYER:PHONE': (Phone: string) => { 
      
   },

   'CLIENT::PLAYER:PHONE:CONTACTS': (Action: PhoneContactActions, Info: any) => { 
      Info = JSON.parse(Info);
      switch (Action) {
         case PhoneContactActions.Add: { mp.events.callRemote('server:player.phone.contacts.add', Info.Name, Info.Number); break; }
         case PhoneContactActions.Remove: { mp.events.callRemote('server:player.phone.contacts.remove', Info.Id); break; }
      }
   }
})


