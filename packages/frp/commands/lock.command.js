module.exports = {
   commands: [
      {
         name: 'lock',
         desc: 'Zakljucati / otkljucati',
         call: async (Player) => {
            const Character = await Player.Character(), Nearest = await Player.Nearest();
            
            if (Nearest) { 
               switch (true) { 
                  case Nearest instanceof frp.Business: { 
                     console.log(Nearest);
                     break;
                  }
   
                  case Nearest instanceof frp.Houses: { 
   
                     console.log(Nearest);
                     break;
                  }
   
                  case Nearest.type == 'vehicle': { 
   
                     break;
                  }
   
               }
            }
         }
      },
   ]
};
