
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
         name: 'deletebiz',
         admin: 3,
         call: async (player, args) => {
            const Nearest = await frp.Business.Nearest(player);
            if (Nearest) await Nearest.destroy();
         }
      },
      {
         name: 'house',
         desc: 'Kuća',
         call: (player, args) => {
               player.call('client:house.management');
         }
      },
   ]
};
