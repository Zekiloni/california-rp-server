const accounts = require("../accounts/accounts");

module.exports =
{
	"a": (player, args) =>
	{
        if (typeof args[0] === 'undefined') return player.outputChatBox("<b style='color:#999'>(Syntax)</b> /a [text]");
        if(!args[0].length) return player.outputChatBox("<b style='color:#999'>(Syntax)</b> /a [text]");
        if(!player.admin) return player.outputChatBox("<span style='color:#ff2d00'>(!) Nu esti administrator!");
        mp.players.forEach(_player => {
            if(_player.admin)
                _player.outputChatBox("<span style='color:#f3cb8f'>Admin "  + player.name + ": " + args.join(' '))
        });
	},
    
    "goto" : (player, args) => {
        if (typeof args[0] === 'undefined') return player.outputChatBox("<b style='color:#999'>(Syntax)</b> /goto [id]");
        if(!args[0].length) return player.outputChatBox("<b style='color:#999'>(Syntax)</b> /goto [id]");
        if(!player.admin) return player.outputChatBox("<span style='color:#ff2d00'>(!) Nu esti administrator!");
        var id = findPlayerByIdOrNickname(args[0]);
        player.position = id.position;
        player.ouputChatBox("<span style = 'color: grey'>Ai fost teleportat!</span>");
    },
    
    "veh": (player, args) =>
	{
        if (typeof args[0] == 'undefined') return player.outputChatBox("<b style='color:#999'>(Syntax)</b> /veh [name]");
        if(!args[0].length) return player.outputChatBox("<b style='color:#999'>(Syntax)</b> /veh [name]");
        
		var pos = player.position;
		pos.x += 2.0;
			
		if(player.veh)
			player.veh.destroy();
		
		player.veh = mp.vehicles.new(mp.joaat(args[0]), pos);
		player.veh.dimension = player.dimension;
        
        player.outputChatBox("You've spawn a " + args[0]);
	},
    
    "dive": (player, args) =>
	{  
		var pos = player.position;
		pos.z += 100.0;
		
		player.position = new mp.Vector3(pos.x, pos.y, pos.z);
	},
    
    "pos": (player, args) =>
    {
        if(!player.admin) return player.outputChatBox("<span style='color:#ff2d00'>(!) Nu esti administrator!");
        player.outputChatBox(player.position.x + " " + player.position.y + " " + player.position.z);
    },

    "agun": (player, args) =>
    {
        if(!player.admin) return player.notify("Niste ovlasceni da koristite ovu komandu.");
        var arguments = args.split(' ');
        if(arguments.length != 3) return player.ouputChatBox("KORISCENJE: /agun [ID-igraca] [Ime oruzja] [Metkovi]");
        var targetPlayer = accounts.getPlayerById(arguments[0]);        
        
        if(targetPlayer != null)
        {
            var weaponHash = mp.joaat(arguments[1]);
            var ammo = parseInt(arguments[2]);
            player.giveWeapon(weaponHash, ammo);
            player.notify("Dobili ste oruzje.");
        }
        else
        {
            player.ouputChatBox("Taj igrac nije konektovan na server.");
        }
    }
}