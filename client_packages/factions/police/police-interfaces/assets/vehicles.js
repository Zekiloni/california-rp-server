
var vehicles = [ 
    { name: 'Kruzer 1', model: 'police' },
    { name: 'Kruzer 2', model: 'police2' },
    { name: 'Kruzer 3', model: 'police3' },
    { name: 'Unmarked 1', model: 'police4' },
    { name: 'Motor', model: 'policeb' },
    { name: 'Marica', model: 'policet' },
    { name: 'Unmarked brrzi', model: 'fbi' },
    { name: 'Unmarked dzip', model: 'fbi2' },
    { name: 'Riot', model: 'riot' },
    { name: 'sherif dzip', model: 'sheriff2' },
    { name: 'Autobus', model: 'pbus' }
];

vehiclesMenu = () => {
    $.each(vehicles, function(i, item) { 
        $('.vehicles-list').append(`<li onclick='spawnVehicle(\"${item.name}\", \"${item.model}\")' id='${item.model}'><b>${i + 1}</b> ${item.name} </li>`);
    });
}

vehiclesMenu()

spawnVehicle = (name, model) => { mp.trigger('client:spawnPoliceVehicle', name, model); closeVehicles(); }

closeVehicles = () => { mp.trigger('client:hidePoliceVehicles'); }

$(window).on('load', function() { $('.menu').fadeIn(700) })
