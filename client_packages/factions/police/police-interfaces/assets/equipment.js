


var skins = [ 
    { model: 'my_cloth', name: 'Vaša odeća'},
    { model: 'basic_patrol', name: 'Osnovna Patrolna Uniforma'},
    { model: 'basic_patrol', name: 'Osnovna Patrolna Uniforma'}
]

vehiclesMenu = () => {
    $.each(skins, function(i, item) { 
        $('.equipment-list').append(`<li onclick='choseEquipment(\"${item.data}\")' id='${item.name}'><b>${i + 1}</b> ${item.name} </li>`);
    });
}

vehiclesMenu()

choseEquipment = (receivedData) => { 
    console.log(receivedData)
}


closeEquipment = () => { mp.trigger('client:hidePoliceEquipment'); }

$(window).on('load', function() { $('.menu').fadeIn(700) })


