

// cashFormat(broj); // seta pare u polje za pare
// showServerInfo(true, false) // true prikazuje, false krije
// showVehicle(true, false) // ptrue prikazuje info o vozilu, false krije
// UpdateHud(street, zone, heading, money, online) // updatea hud  vrednosti


var speedo;

$(document).on('keydown', function (e) { // pokazi kad stisne z
    if(e.keyCode == 90) {
        showServerInfo(true)
    }
});

$(document).on('keyup', function (e) { // sakrij kad pusti z
    if(e.keyCode == 90) {
        showServerInfo(false)
    }
});

showServerInfo = function(toggle) { { toggle ? $('.server').slideDown() :  $('.server').slideUp() } }
showVehicle = function(toggle) { toggle ? $('.vehicle').fadeIn() :  $('.vehicle').fadeOut() }

UpdateHud = function(street, zone, heading, money, online) {
    $('.current-zone').html(zone);
    $('.current-street').html(street)
    $('.current-heading').html(heading); 
    $('.online-players').html(online)
	$('.player-money').html(cashFormat(money))
    var date = curDate(),
        time = curTime();;
    $('.current-date').html(date)
    $('.current-time').html(time)
}

vehicleInfo = function(speed, lights) {
    var lightsState = parseInt(lights)
    $('.vehicle-speed').html(parseInt(speed))
    speedo.set(parseInt(speed));
    $('.lights-icon').attr(`src`,`assets/images/lights-${lightsState}.png`);
}