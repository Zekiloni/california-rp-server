
loginUser = () => { 
    var userName = document.getElementById("korisnicko_ime").value;
    var password = document.getElementById("korisnicka_sifra").value;
 
	if(userName && password) {
        mp.trigger("client:sendLoginToServer", userName, password);
    } 
	else {
		mp.trigger("Invalid_Password");
    }
}

 
function nastaviNaIzborKaraktera(){
	 $("#login-form").fadeOut(1000, function (){ $("#character-select").fadeIn(2000, function () { } ) }) // krije login ukoliko je ispravno i prikazuje selektor
        sakrijPozadinu();
}

function zavrsiIzborKaraktera(value){
	if(value == 1){
		mp.trigger("LoadCharacterToClient", 1);
	}
	else if(value == 2){
		mp.trigger("LoadCharacterToClient", 2);
	}
}
 
function Upozorenje(tekst) {
    document.getElementById('upozorenje').innerHTML = tekst;
    $("#upozorenje").fadeIn(1000, function (){
        $("#upozorenje").fadeOut(2000, function (){
        })
    })
}

function SetPlayerName(name)
{
	$(".player-name").html(name);
}
// gdje ti je ono od maloprije
sakrijPozadinu = () => {
    setTimeout(function(){ $("body").removeClass("pozadina");}, 3000);
}
 
 
 
var skin = {    // tip 0 - integer, 1 - float
    stranica_1 : {
        "1" : { sintaksa: "firstHeadShape", minimalna: 0, tip: 0, maksimalna: 45, tekst: 'Oblik glave'},
        "2" : { sintaksa: "secondHeadShape", minimalna: 0, tip: 0, maksimalna: 45, tekst: 'Drugi oblik glave'},
        "3" : { sintaksa: "firstSkinTone", minimalna: 0, tip: 0, maksimalna: 255, tekst: 'Boja kože'},
        "4" : { sintaksa: "secondSkinTone", minimalna: 0, tip: 0, maksimalna: 255, tekst: 'Druga boja kože'},
        "5" : { sintaksa: "headMix", minimalna: -1.0, tip: 1, maksimalna: 1, tekst: 'Mežavina Glave'},
        "6" : { sintaksa: "skinMix", minimalna: -1.0, tip: 1, maksimalna: 1, tekst: 'Mešavina kože'},
        "7" : { sintaksa: "hairModel", minimalna: 0, tip: 0, maksimalna: 74, tekst: 'Model frizure'},
        "8" : { sintaksa: "firstHairColor", minimalna: 0, tip: 0, maksimalna: 255, tekst: 'Boja kose'},
        "9" : { sintaksa: "secondHairColor", minimalna: 0, tip: 0, maksimalna: 255, tekst: 'Druga boja kose'},
        "10" : { sintaksa:  "beardModel", minimalna: 0, tip: 0, maksimalna: 28, tekst: 'Model brade'},
        "11" : { sintaksa:  "beardColor", minimalna: 0, tip: 0, maksimalna: 255, tekst: 'Boja brade'},
    }
    ,stranica_2 : {
        "12" : { sintaksa: "chestModel", minimalna: 0, tip: 0, maksimalna: 16, tekst: 'Model grudi'},
        "13" : { sintaksa: "chestColor", minimalna: 0, tip: 0, maksimalna: 255, tekst: 'Boja grudi'},
        "14" : { sintaksa: "blemishesModel", minimalna: 0, tip: 0, maksimalna: 23, tekst: 'Model mrlja'},
        "15" : { sintaksa: "ageingModel", minimalna: 0, tip: 0, maksimalna: 14, tekst: 'Godine model'},
        "16" : { sintaksa: "complexionModel", minimalna: 0, tip: 0, maksimalna: 11, tekst: 'Ten'},
        "17" : { sintaksa: "sundamageModel", minimalna: 0, tip: 0, maksimalna: 10, tekst: 'Oštećenje od sunca'},
        "18" : { sintaksa: "frecklesModel", minimalna: 0, tip: 0, maksimalna: 17, tekst: 'Model pega'},
        "19" : { sintaksa: "eyesColor", minimalna: 0, tip: 0, maksimalna: 255, tekst: 'Boja oćiju'},
        "20" : { sintaksa: "eyebrowsModel", minimalna: 0, tip: 0, maksimalna: 33, tekst: 'Model obrva'},
        "21" : { sintaksa: "eyebrowsColor", minimalna: 0, tip: 0, maksimalna: 255, tekst: 'Boja obrva'},
        "22" : { sintaksa: "makeupModel", minimalna: 0, tip: 0, maksimalna: 74, tekst: 'Model šminke'},
    }
    ,stranica_3 : {    
        "23" : { sintaksa: "blushModel", minimalna: 0, tip: 0, maksimalna: 6, tekst: 'Model rumenila'},
        "24" : { sintaksa: "blushColor", minimalna: 0, tip: 0, maksimalna: 255, tekst: 'Boja rumenila'},
        "25" : { sintaksa: "lipstickModel", minimalna: 0, tip: 0, maksimalna: 9, tekst: 'Karmin model'},
        "26" : { sintaksa: "lipstickColor", minimalna: 0, tip: 0, maksimalna: 255, tekst: 'Boja karmina'},
        "27" : { sintaksa: "noseWidth", minimalna: -1.0, tip: 1, maksimalna: 1.0, tekst: 'Širina nosa'},
        "28" : { sintaksa: "noseHeight", minimalna: -1.0, tip: 1, maksimalna: 1.0, tekst: 'Visina nosa'},
        "29" : { sintaksa: "noseLength", minimalna: -1.0, tip: 1, maksimalna: 1.0, tekst: 'Dužina Glave'},
        "30" : { sintaksa: "noseBridge", minimalna: -1.0, tip: 1, maksimalna: 1.0, tekst: 'Rastojanje nosa'},
        "31" : { sintaksa: "noseTip", minimalna: -1.0, tip: 1, maksimalna: 1.0, tekst: 'Tip nosa'},
        "32" : { sintaksa: "noseShift", minimalna: -1.0, tip: 1, maksimalna: 1.0, tekst: 'Pomeranje nosa'},
        "33" : { sintaksa: "browHeight", minimalna: -1.0, tip: 1, maksimalna: 1.0, tekst: 'Obrva visina'},
        "34" : { sintaksa: "browWidth", minimalna: -1.0, tip: 1, maksimalna: 1.0, tekst: 'Obrva širina'},          
    }
   ,stranica_4 : { 
        "35" : { sintaksa: "cheekboneHeight", minimalna: -1.0, tip: 1, maksimalna: 1.0, tekst: 'Visina jagodica'},
        "36" : { sintaksa: "cheekboneWidth", minimalna: -1.0, tip: 1, maksimalna: 1.0, tekst: 'Širina jagodica'},
		"37" : { sintaksa: "cheeksWidth", minimalna: -1.0, tip: 1, maksimalna: 1.0, tekst: 'Širina cheeka'},	 
        "38" : { sintaksa: "eyes", minimalna: -1.0, tip: 1, maksimalna: 1.0, tekst: 'Oči'},
        "39" : { sintaksa: "lips", minimalna: -1.0, tip: 1, maksimalna: 1.0, tekst: 'Usne'},
        "40" : { sintaksa: "jawWidth", minimalna: -1.0, tip: 1, maksimalna: 1.0, tekst: 'Širina vilice'},
        "41" : { sintaksa: "jawHeight", minimalna: -1.0, tip: 1, maksimalna: 1.0, tekst: 'Visina vilice'},
        "42" : { sintaksa: "chinLength", minimalna: -1.0, tip: 1, maksimalna: 1.0, tekst: 'Dužina brade'},
        "43" : { sintaksa: "chinPosition", minimalna: -1.0, tip: 1, maksimalna: 1.0, tekst: 'Pozicija brade'},
        "44" : { sintaksa: "chinWidth", minimalna: -1.0, tip: 1, maksimalna: 1, tekst: 'Širina brade'},
        "45" : { sintaksa: "chinShape", minimalna: -1.0, tip: 1, maksimalna: 1.0, tekst: 'Oblik brade'},
        "46" : { sintaksa: "neckWidth", minimalna: -1.0, tip: 1, maksimalna: 1.0, tekst: 'Širina Vrata'}
    }  
}
 
 
$.each(skin.stranica_1, function(i, item) { // baca ime tog polja i korisnik posloe namesti taj slajder
    if (item.tip == 0) { var step = 'step="1"'; }
    else if (item.tip == 1) { var step = 'step="0.1"'; }
    $("#stranica-1").append(`
        <div class="form-group">
            <label for="${item.sintaksa}">${item.tekst} <b id="tekst-${item.sintaksa}"></b></label>
            <input type="range" min="${item.minimalna}" ${step} data-id="${item.tip}" max="${item.maksimalna}" value="0" class="slajder" id="${item.sintaksa}">
        </div>`);
});
 
$.each(skin.stranica_2, function(i, item) {
    if (item.tip == 0) { var step = 'step="1"'; }
    else if (item.tip == 1) { var step = 'step="0.1"'; }
    $("#stranica-2").append(`
        <div class="form-group">
            <label for="${item.sintaksa}">${item.tekst} <b id="tekst-${item.sintaksa}"></b></label>
            <input type="range" min="${item.minimalna}" ${step} data-id="${item.tip}" max="${item.maksimalna}" value="0" class="slajder" id="${item.sintaksa}">
        </div>`);
});
 
$.each(skin.stranica_3, function(i, item) {
    if (item.tip == 0) { var step = 'step="1"'; }
    else if (item.tip == 1) { var step = 'step="0.1"'; }
    $("#stranica-3").append(`
        <div class="form-group">
            <label for="${item.sintaksa}">${item.tekst} <b id="tekst-${item.sintaksa}"></b></label>
            <input type="range" min="${item.minimalna}" ${step} data-id="${item.tip}" max="${item.maksimalna}" value="0" class="slajder" id="${item.sintaksa}">
        </div>`);
});
 
$.each(skin.stranica_4, function(i, item) {
    if (item.tip == 0) { var step = 'step="1"'; }
    else if (item.tip == 1) { var step = 'step="0.1"'; }
    $("#stranica-4").append(`
        <div class="form-group">
            <label for="${item.sintaksa}">${item.tekst} <b id="tekst-${item.sintaksa}"></b></label>
            <input type="range" min="${item.minimalna}" ${step} data-id="${item.tip}" max="${item.maksimalna}" value="0" class="slajder" id="${item.sintaksa}">
        </div>`);
});
 
vrednosti_skina = {"firstHeadShape":0,"secondHeadShape":0,"firstSkinTone":0,"secondSkinTone":0,"headMix":0,"skinMix":0,"hairModel":0,"firstHairColor":0,"secondHairColor":0,"beardModel":0,"beardColor":0,"chestModel":0,"chestColor":0,"blemishesModel":0,"ageingModel":0,"complexionModel":0,"sundamageModel":0,"frecklesModel":0,"eyesColor":0,"eyebrowsModel":0,"eyebrowsColor":0,"makeupModel":0,"blushModel":0,"blushColor":0,"lipstickModel":0,"lipstickColor":0,"noseWidth":0,"noseHeight":0,"noseLength":0,"noseBridge":0,"noseTip":0,"noseShift":0,"browHeight":0,"browWidth":0,"cheekboneHeight":0,"cheekboneWidth":0,"cheeksWidth":0,"eyes":0,"lips":0,"jawWidth":0,"jawHeight":0,"chinLength":0,"chinPosition":0,"chinWidth":0,"chinShape":0,"neckWidth":0,"noseWidth":0}
var slajderi = document.getElementsByClassName("slajder");
var skinJson = undefined;

registracija = () => {

	var ime = document.getElementById("ime_karaktera").value;
	var prezime = document.getElementById("prezime_karaktera").value;
 
    for (i = 0; i < slajderi.length; i++) { 
        var polje = slajderi[i].id;
        var vrednost = slajderi[i].value;
        vrednosti_skina[polje] = parseInt(vrednost);
    }
 
	if(ime && prezime) {
		$(".zid").fadeOut(1000, function (){

			var godine = document.getElementById("godine_karaktera").value;
			var pol = document.getElementById("pol").value;
	 
			// karakter
			var ime_prezime = ime + ' ' + prezime;
			skinJson = JSON.stringify(vrednosti_skina);
			
			mp.trigger("Spawn_Player");
			
			mp.trigger("CreateCharacterToClient", ime_prezime, godine, pol, skinJson); // ime+prezime, godine, pol, skinJSON
		})
	}

}
 
$('.rotacija').on('input', function () {
    var rotacija = this.value;
	
    mp.trigger("RotateCharacter", parseFloat(rotacija));
}); 
 
$('.slajder').on('input', function () {
    var vrednost = this.value;
    var ime = this.id
    $(`#tekst-${ime}`).html(vrednost)
    vrednosti_skina[ime] = vrednost; // evo ti ode salji ovaj kurac  za preview
    var j_s_o_n = JSON.stringify(vrednosti_skina);
	mp.trigger("SkinPreview", j_s_o_n);
});