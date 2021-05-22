module.exports = {
    commands: [
        {
            name: 'createhouse',
            admin: 3,
            call: (player, args) => {
                mp.house.new(player, args[0], args[1]);
            }
        },
        {
            name: 'deletehouse',
            admin: 3,
            call: (player, args) => {
                if (player.near != null && player.near.type == 'house') {
                    let house = mp.houses[player.near.id];
                    if (house) {
                        mp.house.delete(house);
                    }
                }
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
