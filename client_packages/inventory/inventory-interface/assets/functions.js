
var modal = document.getElementById('dajPredmet');
var currentItem = null;
var playerInventory;

populateInventory = (inventoryItems) => {  playerInventory = inventoryItems; refreshInventory(); }

useItem = (id) => {  mp.trigger('client:processInventoryItem', id, 'use'); }
dropItem = (id) => { 
    mp.trigger('client:processInventoryItem', id, 'drop'); 
    var index = playerInventory.findIndex((el) => el.id === id);
    playerInventory.splice(index, 1);
    refreshInventory();
}

refreshInventory = () => { 
    $("#inventar").text('');
    $.each(playerInventory, function(i, item) {
        $("#inventar").append(
            `<div class='predmet' onclick='selectItem(${item.id})'> 
                <img class='slika-predmeta' src='assets/images/items/${item.hash}.png'/> 
                <b class='kolicina-predmeta'>${item.quantity}</b> 
            <div>
            <ul class='opcije-predmeta-${item.id}''>
                <li onclick='useItem(\"${item.id}\")'>Koristi predmet</li>
                <li onclick='nearPlayersToGive(${item.id})'>Daj predmet</li>
                <li onclick='dropItem(\"${item.id}\")'>Baci predmet</li>
            </ul>` 
        );
    });
}

closeInventory = () => {  mp.trigger('client:closeInventory'); }

var opened = false;
selectItem = (id) => {
    if (opened == false) { $(`.opcije-predmeta-${id}`).slideDown(); opened = true; }
    else { $(`.opcije-predmeta-${id}`).slideUp(); opened = false; } 
}


giveItem = (id, target) => { 
    var quant = $(".kolicina").val();
}

closeGiveItem = () => { $('#dajPredmet').fadeOut(); }

nearPlayers = (players) => {
    $(".lista-igraca").text(" ");
    $.each(players, function(i, player) {
		$(".lista-igraca").append(
            "<li class='igrac' onclick='dajPredmet(\""+ player.id +"\", \""+ currentItem +"\")'>"+ player.name + " [" + player.id +"] </li>"
        );
		
    });
}

window.onclick = function(event) { 
    if (event.target == modal) { modal.style.display = "none"; }
}

document.addEventListener('keyup', function(e) {
    if (event.keyCode === 27) { closeInventory(); }
})

function Upozorenje(tekst) {
    document.getElementById('upozorenje').innerHTML = tekst;
    $("#upozorenje").fadeIn(1000, function (){
        $("#upozorenje").fadeOut(2000, function (){
        })
    })
}



