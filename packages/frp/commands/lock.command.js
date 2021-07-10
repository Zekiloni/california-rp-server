module.exports = {
   commands: [
      {
         name: 'lock',
         desc: 'Zakljucati / otkljucati',
         call: async (player, args) => {
            const Character = await player.Character(), Nearest = await player.Nearest();
            
            switch (true) { 
               case Nearest instanceof frp.Business: { 

                  break;
               }

               case Nearest instanceof frp.Houses: { 

                  break;
               }

               
            }

         }
      },
   ]
};
