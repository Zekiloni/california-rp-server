
let { ItemRegistry, ItemEntities } = require('../classes/Items.Registry');

module.exports = {
   commands: [
      {
         name: 'createitem',
         admin: 3,
         call: (player, args) => {
            let Quantity = args[0];
            const Item = args.slice(1).join(' ');
            let Position = { x: player.position.x, y: player.position.y, z: player.position.z - 0.9 };

            if (ItemRegistry[Item]) {
               console.log('DEBUG ' + 1);
               console.log(Position)
               console.log(player.dimension)
               frp.Items.New(Item, Quantity, ItemEntities.Ground, 0, Position, { x: 0, y: 0, z: 0 }, player.dimension);
            }

         }
      },
      {
         name: 'giveitem',
         admin: 3,
         call: (player, args) => {
               console.log('1');
               let target = mp.players.find(args[0]), quantity = args[1], item = args.slice(2).join(' ');
               if (target)
                  mp.item.create(target, quantity, item, ItemEntities.Player, target.character);
         }
      },
      {
         name: 'deleteitem',
         admin: 3,
         call: (player, args) => {
         }
      },
      {
         name: 'clearinventory',
         admin: 3,
         call: (player, args) => {
               let target = mp.players.find(args[0]);
               if (target) {
                  mp.item.clear(target);
               }
         }
      }
   ]
};
