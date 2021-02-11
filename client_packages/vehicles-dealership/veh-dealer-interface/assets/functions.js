var vehicles = null,
    bussinesInfo = null,
    customMenu = false,
    colorPreview = 1,
    vehIndex = 0;


colorPicker = new ColorPicker.Default('#color-picker', {
    inline: true,
    color: '000000',
    hexOnly: true,
    format: 'rgb',
    history: { hidden: true, },
    anchor: { hidden: true }
});

colorPicker.on('change', function (color) {
    mp.trigger('client:vehicleColorPreview', colorPreview, color.hex);
});

$(window).on('load', function() { $('.box').fadeIn(1000); })
setTimeout(() => { vehInfo(vehIndex); }, 1000)

$(window).keyup(function(e) {
    if (e.keyCode === 27) closeVehicleDealership();  
});

closeVehicleDealership = () => { mp.trigger('client:closeVehicleDealership'); }

vehicleList = (vehs) => { vehicles = vehs; }

customizationMenu = () => { 
    if (customMenu) { 
        $('#veh-customization').slideUp(1000)
        customMenu = false;
    } else { 
        $('#veh-customization').slideDown(1000)
        customMenu = true;
    }
}

vehInfo = (index) => { 
    var vehPrice = cashFormat(vehicles[index].price),
        vehName = vehicles[index].name;
    $('#veh-model').text(vehName)
    $('#veh-price').text(vehPrice)
}

vehPreview = (n) => { 
    if (n == -1) { 
        vehIndex --; 
        if (vehIndex < 0) { vehIndex = vehicles.length -1; }
    }
    else { 
        vehIndex ++;
        if (vehIndex >= vehicles.length) { vehIndex = 0; }
    }
    vehInfo(vehIndex)
}

changeColor = (el, n) => { 
    colorPreview = n; 
    $('.color').removeClass('active'); 
    $(el).addClass('active') 
}

cashFormat = (x) => { return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","); }