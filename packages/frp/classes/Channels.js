class Channels {
    static Create(player, frequency, password = null, name = null) {
        frp.Channels.New(player, frequency, name, password);
    }
    static Delete(palyer) {
        frp.Channels.Delete(player);
    }
    static async Send(frequency, message) {
        mp.players.forEach(async (player) => {
            if (!player.data.logged || !player.data.spawned)
                return;
            let Character = await player.Character();
            if (Character.Frequency == frequency) {
                player.sendMessage('[CH: ' + frequency + '] ' + message, frp.Globals.Colors.radio);
            }
        });
    }
}
module.exports = Channels;
