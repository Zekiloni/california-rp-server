

var basic_patrol = [ {index: 1, value: 2}, {index: 2, value: 3}]

var skins = [
    { name: 'Osnovna Patrolna Uniforma', data: basic_patrol },
]


vehiclesMenu = () => {
    $.each(skins, function(i, item) { 
        $('.equipment-list').append(`<li onclick='choseEquipment(\"${item.data}\")' id='${item.name}'><b>${i + 1}</b> ${item.name} </li>`);
    });
}

vehiclesMenu()

choseEquipment = (skin) => { 
    //let data = JSON.parse(skin)
    console.log(skin); 
    /* mp.trigger('client:chosePoliceEquipment', skin); */
}

closeEquipment = () => { mp.trigger('client:hidePoliceEquipment'); }

$(window).on('load', function() { $('.menu').fadeIn(700) })
