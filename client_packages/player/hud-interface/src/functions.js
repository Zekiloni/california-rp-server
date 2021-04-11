

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

cashFormat = (x) => {
}



// function toDataUrl(url, callback) {
    
//     var xhr = new XMLHttpRequest();
//     xhr.onload = function() {
//         var reader = new FileReader();
//         reader.onloadend = function() {
//             callback(reader.result);
//         }
//         reader.readAsDataURL(xhr.response);
//     };

//     xhr.open('GET', url);
//     xhr.responseType = 'blob';
//     xhr.send();
// }



createSpeedo = () => { 
    var opts = {
        angle: 0.26, // The span of the gauge arc
        radiusScale: 0.93, // Relative radius
        limitMax: false,     // If false, max value increases automatically if value > maxValue
        limitMin: false,     // If true, the min value of the gauge will be fixed
        colorStart: '#00BD13',   // Colors
        colorStop: '#00A111',    // just experiment with them
        strokeColor: 'rgb(134 135 130 / 80%)',  // to see which ones work best for you
        generateGradient: true,
        highDpiSupport: true,     // High resolution support
    };

    var target = document.getElementById('speedo'); // your canvas element
    speedo = new Donut(target).setOptions(opts); // create sexy gauge!
    speedo.maxValue = 250; // set max gauge value
    speedo.setMinValue(0);  // Prefer setter over gauge.minValue = 0
    speedo.animationSpeed = 35; // set animation speed (32 is default value)
    speedo.set(0); // set actual value
}

createSpeedo()