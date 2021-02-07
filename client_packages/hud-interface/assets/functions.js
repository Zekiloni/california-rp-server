

// novacIgraca(broj); // seta pare u polje za pare
// prikaziServerInformacije(true, false) // true prikazuje, false krije
// brojIgraca(broj) // ispisuje broj igraca
// informacijeVozila(true, false) // ptrue prikazuje info o vozilu, false krije
// trenutnaLokacija(imeUlice) // seta trenutnu lokaciju


$(document).on('keydown', function (e) { // pokazi kad stisne z
    if(e.keyCode == 90) {
        prikaziServerInformacije(true)
    }
});

$(document).on('keyup', function (e) { // sakrij kad pusti z
    if(e.keyCode == 90) {
        prikaziServerInformacije(false)
    }
});

brojIgraca = function(broj) {  // stavlja broj online igraca
    $('.broj-online-igraca').html(parseInt(broj));
}

prikaziServerInformacije = function(bool) { // bool true, false
    if (bool == true)
        $('.server').slideDown()
    else  
         $('.server').slideUp()
}

informacijeVozila = function(bool) {
    if (bool == true)
        $('.vozilo').fadeIn()
    else  
        $('.vozilo').fadeOut()
}

UpdateHud = function(street, zone, heading, money) {
    $('.trenutna-lokacija').html(`${street}<br>${zone}`);
    $('.trenutni-smer').html(`${heading}`); 
	$('.kolicina-novca').html(cashFormat(money))
    
}

UpdateHudMoney = function(money) {
    $('.kolicina-novca').html(cashFormat(money))
}

cashFormat = (x) => {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

brzinaVozila = function(kolicina) {
    $('.brzina').html(parseInt(kolicina))
}


notification = (message, type, time = 3) => { 
    var msTime = time * 1000;
    var border = 'info';
    if (type == 'success') { border = 'uspesno'; }
    else if (type == 'error') { border = 'greska'; }
    else if (type == 'info') { border = 'info'; }

    $('.notif').append(`<div class='notifikacija ${border}'>${message}</div>`)
    setTimeout(function() { 
        $('.notifikacija').fadeOut(3000, function() {
            setTimeout(function() { $('.notifikacija').remove(); }, 1500);
        });
     }, parseInt(msTime));
}