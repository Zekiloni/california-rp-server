module.exports = {
    commands: [
        {
            name: 'me',
            desc: 'Opis situacije, stanja',
            params: '[tekst]',
            call: (player, args) => {
                let message = args.splice(0).join(" ");
                player.ProximityMessage(distances.me, `** ${player.name} ${message}`, mp.colors.purple);
            }
        },
        {
            name: 'do',
            desc: 'Opis radnje koju radite',
            params: '[tekst]',
            call: (player, args) => {
                let message = args.splice(0).join(" ");
                player.ProximityMessage(distances.me, `** ${message} (( ${player.name} ))`, mp.colors.purple);
            }
        },
        {
            name: 'try',
            desc: 'Pokušaj',
            params: '[akcija]',
            call: (player, args) => {
                let message = args.splice(0).join(" "), msg = ['uspeva', 'ne uspeva'];
                let random = msg[Math.floor(Math.random() * msg.length)];
                player.ProximityMessage(distances.me, `* ${player.name} pokušava da ${message} i ${random}.`, mp.colors.purple);
            }
        },
        {
            name: 'l',
            desc: 'Izgovoriti nesto tiho',
            params: '[tekst]',
            call: (player, args) => {
                let message = args.splice(0).join(" ");
                player.ProximityMessage(distances.low, `${player.name} tiho: ${message}`, mp.colors.low);
            }
        },
        {
            name: 's',
            desc: 'Izgovoriti nesto glasnije',
            params: '[tekst]',
            call: (player, args) => {
                let message = args.splice(0).join(" ");
                player.ProximityMessage(distances.shout, `${player.name} se dere: ${message}`, mp.colors.white);
            }
        },
        {
            name: 'w',
            desc: 'Sapnuti nekome nesto',
            params: '[id / ime] [tekst]',
            call: (player, args) => {
                if (args.length < 2 || !args[0].length || !args[1].length)
                    return false;
                let target = mp.players.find(args[0]);
                if (target) {
                    if (!player.isNear(target))
                        return false;
                    let message = args.slice(1).join(' ');
                    target.sendMessage(`${player.name} vam sapuće: ${message}`, mp.colors.white[2]);
                    player.sendMessage(`${player.name} šapnuli ste ${target.name}: ${message}`, mp.colors.white[2]);
                }
                else
                    return false;
            }
        },
        {
            name: 'b',
            desc: 'Lokana OOC komunikacija',
            params: '[tekst]',
            call: (player, args) => {
                let message = args.splice(0).join(" ");
                player.ProximityMessage(distances.ooc, `(( ${player.name} [${player.id}]: ${message} ))`, mp.colors.white);
            }
        },
        {
            name: 'ame',
            desc: 'Lokana OOC komunikacija',
            params: '[tekst]',
            call: (player, args) => {
                let message = args.splice(0).join(" ");
                player.call('client:player.chat.bubble', [15, message, true]);
            }
        },
        {
            name: 'pm',
            desc: 'Privatna poruka',
            params: '[id / ime] [tekst]',
            call: (player, args) => {
                if (args.length < 2 || !args[0].length || !args[1].length)
                    return false;
                let target = mp.players.find(args[0]);
                if (target) {
                    let message = args.slice(1).join(' ');
                    target.sendMessage(`(( PM od ${player.name} [${player.id}]: ${message} ))`, mp.colors.pm.from);
                    player.sendMessage(`(( PM za ${target.name} [${target.id}]: ${message} ))`, mp.colors.pm.to);
                }
                else
                    return false;
            }
        },
    ]
};
