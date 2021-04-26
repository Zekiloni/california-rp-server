
module.exports = { 
   commands: [
      {
         name: 'buy',
         desc: 'Kupovina',
         call: (player, args) => { 
            let character = player.getCharacter();
            if (player.near) { 
               let nearby = player.near;
               switch (nearby.type) { 
                  case 'house': { 
                     
                     break;
                  }

                  case 'business': { 
                     break;
                  }

                  case 'shop_menu': { 

                     break;
                  }
               }
            }
         }
      },
   ]
}