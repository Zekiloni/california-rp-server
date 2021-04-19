

module.exports = { 
   commands: [

      {
         name: 'lock',
         desc: 'Zakljucati / otkljucati',
         params: '[tekst]',
         call: (player, args) => { 
            if (player.data.logged && player.data.spawned) { 
               let character = player.getCharacter();
               if (player.near) { 
                  switch (player.near.type) { 
                     case 'house': { 
                        break;
                     }
   
                     case 'door': { 
                        let door = mp.doors[player.near.id];
                        if (door.faction != character.faction) return false;
                        door.status = !door.status;
                        break;
                     }
                  }
               }
            }
         }
      },
   ]
}