

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
   14 : 'Vehicle Mods',
   15 : 'Teleport Hack (OnFoot)',
   16 : 'Teleport Hack (Vehicle)',
   17 : 'Teleport Hack (Water)',
   18 : 'Teleport Hack (Waypoint)'
}


class Anticheat {
   constructor () {
      mp.events.add({
         'server:anti_cheat:detected': async (player, flag, action, comment = undefined) => {
            const Character = await frp.Characters.findOne({ where: { id: player.character } })
            const Account = await frp.Accounts.findOne({ where: { id: player.account } })
       
            switch (action) 
            {
               case 'kick':
                  comment === undefined ? frp.Admin.Warning(`${Character.Name} je kikovan od strane antičita. Razlog: ${Flags[flag]}. Ping: ${player.ping}ms.`) : frp.Admin.Warning(`${Character.Name} je kikovan od strane antičita. Razlog: ${Flags[flag]}(${comment}). Ping: ${player.ping}ms.`);
                  //player.kick();
                  break;
               case 'warn':
                  Account.Warns ++;
                  if (Account.Warns > 5) {
                     frp.Admin.Warning(`${Character.Name} je banovan od strane antičita. Razlog: ${Flags[flag]}[6/6].`);
                     // Ban
                  } else {
                     comment === undefined ? frp.Admin.Warning(`${Character.Name}[${player.id}] je označen da koristi ${Flags[flag]}[${Account.Warns}/6]. Ping: ${player.ping}ms.`) : frp.Admin.Warning(`${Character.Name}[${player.remoteId}] je označen da koristi ${Flags[flag]}[${Account.Warns}/6](${comment}). Ping: ${player.ping}ms.`);
                  }
                  break;
               case 'ban':
                  comment === undefined ? frp.Admin.Warning(`${Character.Name} je banovan od strane antičita. Razlog: ${Flags[flag]}(${comment}).`) : frp.Admin.Warning(`${Character.Name} je banovan od strane antičita. Razlog: ${Flags[flag]}(${comment}).`)
                  // Ban
                  break;
            }
         },
         
         'server:ac.chat': async (player, message) => {
            const Character = await frp.Characters.findOne({ where: { id: player.character } })
            frp.Admin.Warning(`${Character.Name}: ${message}`);
         }
         
      });
   }
}


frp.Anticheat = new Anticheat();

