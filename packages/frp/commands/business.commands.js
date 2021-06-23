
const BussinesTypes = require('../data/Businesses.json');

module.exports = {
   commands: [
      {
         name: 'createbiz',
         admin: 4,
         desc: 'Kreiranje biznisa',
         params: ['tip', 'otvorenog tipa (0 / 1)', 'cena'],
         call: (player, args) => {
            const [type, walkin, price] = args;
            let Message = '';
            if (type < 0 || type > 16) { 
               BussinesTypes.forEach((b) => { 
                  let info = b.id + '. ' + b.name;
                  Message += info + ', ';
               });
               player.SendMessage(Message, frp.Globals.Colors.info);
            }
            frp.Business.New(player, type, walkin, price);
         }
      },

      {
         name: 'destroybiz',
         admin: 3,
         desc: 'Brisanje biznisa',
         call: async (player, args) => {
            const Nearest = await frp.Business.Nearest(player);
            if (Nearest) await Nearest.destroy();
         }
      },
      {
         name: 'editbiz',
         desc: 'Podešavanje biznisa',
         admin: 3,
         params: ['opcija', 'vrednost'],
         call: async (player, args) => {
            const [option, value] = args;
            const Nearest = await frp.Business.Nearest(player);
            if (Nearest) {
               switch (option) { 
                  case 'price': { Nearest.Price = value; break; }
                  case 'name': { 
                     const Name = args.splice(value).join(' ');
                     if (!Name.trim()) return;
                     Nearest.Name = Name;
                     break;
                  }

                  case 'vehicle-point': { Nearest.Vehicle_Point = player.position; break; }
                  default: 
                     return;
               }

               await Nearest.save();
            }
         }
      },
   ]
};
