var vehicles = null,
    bussinesInfo = null,
    customMenu = false,
    firstColor,
    secondColor
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
    var rgb = hexToRgb(color.hex)
    mp.trigger('client:vehicleColorPreview', colorPreview, rgb);
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
    mp.trigger('client:vehiclePreview', vehicles[index].model)
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

hexToRgb = (hex) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }