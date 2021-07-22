"use strict";
const InsideType = {
    House: 0,
    Business: 1,
    Entrance: 3
};
module.exports = {
    commands: [
        {
            name: 'enter',
            desc: 'Ulaz u interijer.',
            call: async (Player) => {
                const Character = await Player.Character();
                const Nearest = await Player.Nearest();
                if (Nearest.Locked)
                    return;
                switch (true) {
                    case Nearest instanceof frp.Houses: {
                        Character.Inside = { Type: InsideType.House, id: Nearest.id };
                        Player.position = Nearest.Interior_Position;
                        Player.dimension = Nearest.Interior_Dimension;
                        if (Nearest.IPL) {
                        }
                        break;
                    }
                    case Nearest instanceof frp.Business: {
                        if (Nearest.Walk_in)
                            return;
                        Character.Inside = { Type: InsideType.Business, id: Nearest.id };
                        Player.position = Nearest.Interior_Position;
                        Player.dimension = Nearest.Interior_Dimension;
                        if (Nearest.IPL) {
                        }
                        break;
                    }
                }
            }
        },
        {
            name: 'exit',
            desc: 'Izlaz iz interijera.',
            call: async (Player) => {
                const Character = await Player.Character();
                if (!Character.Inside)
                    return;
                switch (true) {
                    case Character.Inside.Type == InsideType.House: {
                        const House = await frp.Houses.findOne({ where: { id: Character.Inside.id } });
                        if (House.Locked)
                            return;
                        Character.Inside = null;
                        await Character.save();
                        Player.position = House.Position;
                        Player.dimension = House.Dimension;
                        break;
                    }
                    case Character.Inside.Type == InsideType.Business: {
                        const Business = await frp.Business.findOne({ where: { id: Character.Inside.id } });
                        if (Business.Locked)
                            return;
                        Character.Inside = null;
                        await Character.save();
                        Player.position = Business.Position;
                        Player.dimension = Business.Dimension;
                        break;
                    }
                }
            }
        }
    ]
};
