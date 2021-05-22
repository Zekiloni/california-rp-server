let { ItemRegistry, ItemEntities } = require('./Items.Registry');
class Inventory {
    constructor() {
        mp.events.add({
            'server:player.inventory.item:drop': async (player, item, quantity = 1) => {
                const Item = await frp.Items.findOne({ where: { id: item } });
                Item.Drop(player, quantity, place);
            },
            'server:player.inventory.item:pickup': async (player) => {
                let Near = await frp.Items.Near(player);
                if (Near) {
                    await Near.Pickup();
                }
            },
            'server:player.inventory.item:give': async (player, target, item, quantity = 1) => {
                target = mp.players.at(target);
                if (target) {
                    const Item = await frp.Items.findOne({ where: { id: item } });
                    Item.Give(player, target, quantity);
                }
            },
            'server:player.inventory.item.weapon:take': async (player, item) => {
                let Item = await frp.Items.findOne({ where: { id: item } });
                Item.Entity = ItemEntities.Wheel;
                let Weapon = ItemRegistry[Item.item].weapon;
                player.giveWeapon(mp.joaat(Weapon), Item.Ammo);
                await Item.save();
            },
            'server:player.inventory.item.weapon:put': async (player, item, ammo) => {
                let Item = await frp.Items.findOne({ where: { id: item } });
                Item.Entity = ItemEntities.Player;
                await Item.save();
            }
        });
        mp.events.addProc({
            'server:player.inventory:open': async (player) => {
                let Inventory = await frp.Items.Inventory(player);
                return Inventory;
            }
        });
    }
}
new Inventory();
