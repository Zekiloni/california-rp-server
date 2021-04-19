
var weapons = [ 
    { name: 'Pendrek', model: 'weapon_nightstick', ammo: 1 },
    { name: 'Taser X26', model: 'weapon_stungun', ammo: 50 },
    { name: 'Glock 19,  9mm ', model: 'weapon_combatpistol', ammo: 35 },
    { name: 'Beretta 92FS, 9mm', model: 'weapon_pistol', ammo: 35 },
    { name: 'Beretta 845F, .45 kalibar', model: 'weapon_pistol50', ammo: 35 },
    { name: 'Glock 21, .45 kalibar', model: 'weapon_heavypistol', ammo: 35 },
    { name: 'Pelican Taktička Lampa', model: 'weapon_flashlight', ammo: 1 },
    { name: 'Remington 870 Pumparica', model: 'weapon_pumpshotgun', ammo: 25 },
    { name: 'Benelli M4 Pumparica', model: 'weapon_pumpshotgun_mk2', ammo: 25 },
    { name: 'Remington 1100 Taktička Pumparica', model: 'weapon_combatshotgun', ammo: 25 },
    { name: 'Heckler & Koch, 416D, 5.56mm kalibar ', model: 'weapon_smg', ammo: 115 },
    { name: 'Bushmaster BCW A3F-16D Automatska', model: 'weapon_carbinerifle', ammo: 170 },
    { name: 'Colt 6920 Automatska', model: 'weapon_bullpuprifle', ammo: 25 },
    { name: 'White Smoke-110 HC', model: 'weapon_smokegrenade', ammo: 4 },
    { name: 'Teargas 324F Suzavac', model: 'weapon_bzgas', ammo: 4 }
];

weaponsMenu = () => {
    $.each(weapons, function(i, item) { 
        $('.weapons-list').append(`
        <li onclick='giveWeapon(\"${item.name}\", \"${item.model}\", \"${item.ammo}\")' id='${item.model}'>
            <img class='weap-icon' src='assets/images/locker_Weapons/${item.model}.png'>
            <b>${i + 1}</b> ${item.name} 
        </li>`);
    });
}

weaponsMenu()

giveWeapon = (name, weapon, ammo) => { mp.trigger('client:policeGiveWeapon', name, weapon, ammo); }

closeWeaponary = () => { mp.trigger('client:hidePoliceWeaponary'); }

$(window).on('load', function() { $('.menu').fadeIn(700) })
