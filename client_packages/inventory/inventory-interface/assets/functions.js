// By Zeki

var odabranPredmet = null;

inventoriPredmeti = (json) => {
	$("#inventar").text(" ");
    $.each(json, function(i, predmet) {
		if(predmet.amount > 0) {
		$("#inventar").append(
            `<div class='col-md-1 predmet' onclick='opcijePredmeta(${predmet.id})'> 
                <img class='slika-predmeta' src='resursi/slike/predmeti/${predmet.hash}.png'/> 
                <b class='kolicina-predmeta'>${predmet.amount}</b> 
            <div>
            <ul class='opcije-predmeta-${predmet.id}''>
                <li onclick='koristiPredmet(${predmet.id})'>Koristi predmet</li>
                <li onclick='opcijeDavanja(${predmet.id})'>Daj predmet</li>
                <li onclick='baciPredmet(${predmet.id})'>Baci predmet</li>
            </ul>` 
        );
		}
    });
}

var otvoreno = 0;

opcijePredmeta = (id) => {
    if(otvoreno == 0) {
        $(`.opcije-predmeta-${id}`).slideDown();
        otvoreno = 1;
    }
    else { $(`.opcije-predmeta-${id}`).slideUp(); otvoreno = 0; } 
}

koristiPredmet = (id) => { 
	mp.trigger("ProcessInventoryActions", id, "consume");
}

blizinaIgraci = (json) => {
    $(".lista-igraca").text(" ");
    $.each(json, function(i, igrac) {
		$(".lista-igraca").append(
            "<li class='igrac' onclick='dajPredmet(\""+ igrac.id +"\", \""+ odabranPredmet +"\")'>"+ igrac.ime + " [" + igrac.id +"] </li>"
        );
		
    });
}

var modal = document.getElementById("dajPredmet");


dajPredmet = (igrac) => {
    // ovo ti je predmet: odabranPredmet, i kolicina
    var kolicina = $(".kolicina").val();
    mp.trigger("ProcessInventoryActions", id, "give"); // odkomentarisi kad zavrsis zekirija
}

opcijeDavanja = (id) => {
    $('#dajPredmet').fadeIn();
    odabranPredmet = id;
}

zatvori = () => {
    $('#dajPredmet').fadeOut();
}
  
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

baciPredmet = (id) => {
	mp.trigger("ProcessInventoryActions", id, "drop");
}


function Upozorenje(tekst) {
    document.getElementById('upozorenje').innerHTML = tekst;
    $("#upozorenje").fadeIn(1000, function (){
        $("#upozorenje").fadeOut(2000, function (){
        })
    })
}


closeInventory = () => { 
    mp.trigger('client:closeInventory');
}

document.addEventListener("keyup", function(e) {
    if (event.keyCode === 27) {
        closeInventory();
    }
    else if (event.keyCode == 73) {
        closeInventory();
    }
})
