

const Flags = { 
   0 : 'Health hack',
   1 : 'Armour hack',
   2 : 'Godmode',
   3 : 'Teleport hack',
   4 : 'Fly hack',
   5 : 'Ammo hack',
   6 : 'Blacklisted weapon',
   7 : 'High ping',
   8 : 'Headshot Aim',
   9 : 'Aim',
   10 : 'No Reload',
   11 : 'Speed hack (OnFoot)',
   12 : 'Speed hack (Vehicle)',
   13 : 'Vehicle Repair',
   14 : ''
}


class Anticheat {
   constructor () {
      mp.events.add(
         'server:anti_cheat:detected', async (player, flag, action) => {
            const Character = await frp.Characters.findOne({ where: { id: player.character } })
            const Account = await frp.Accounts.findOne({ where: { id: player.account } })
       
            switch (action) 
            {
               case 'kick':
                  frp.Admin.Warning(`${Character.Name} je kikovan od strane antičita. Razlog: ${Flags[flag]}. Ping: ${player.ping}ms.`);
                  //player.kick();
                  break;
               case 'warn':
                  Account.Warns ++;
                  if (Account.Warns > 5) {
                     frp.Admin.Warning(`${Character.Name} je banovan od strane antičita. Razlog: ${Flags[flag]}[6/6].`);
                     // Ban
                  } else {
                     frp.Admin.Warning(`${Character.Name}[${player.remoteId}] je označen da koristi ${Flags[flag]}[${Account.Warns}/6]. Ping: ${player.ping}ms.`);
                  }
                  break;
               case 'ban':
                  frp.Admin.Warning(`${Character.Name} je banovan od strane antičita. Razlog: ${Flags[flag]}.`);
                  // Ban
                  break;
            }
      },
      'server:ac.chat', async (player, message) => {
         const Character = await frp.Characters.findOne({ where: { id: player.character } })
         frp.Admin.Warning(`[! ! !] ${Character.Name}: ${message}`);
      });
   }
}


frp.Anticheat = new Anticheat();

