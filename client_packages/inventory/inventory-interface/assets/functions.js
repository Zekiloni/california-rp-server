
var modal = document.getElementById('dajPredmet');
var currentItem = null;
var playerInventory;
var nearPlayers;

populateInventory = (inventoryItems) => {  playerInventory = inventoryItems; refreshInventory(); }
populateNearPlayers = (players) => { nearPlayers = players; }

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
                <li onclick='openGiveItem(${item.id})'>Daj predmet</li>
                <li onclick='dropItem(\"${item.id}\")'>Baci predmet</li>
            </ul>` 
        );
    });
}

populateInventory([{ id: 1, name: 'Kokain', quantity: 3}, { id: 2, name: 'puska', quantity: 1}])
closeInventory = () => {  mp.trigger('client:closeInventory'); }

var opened = false;
selectItem = (id) => {
    if (opened == false) { $(`.opcije-predmeta-${id}`).slideDown(); opened = true; }
    else { $(`.opcije-predmeta-${id}`).slideUp(); opened = false; } 
}


giveItem = (id, target) => { 
    var quant = $(".kolicina").val();
}

itemGiveValue = (value) => { 
    var givingItem = playerInventory.find( ({ id }) => id === parseInt(currentItem) );
    var quant = parseInt(value)
    if (quant > givingItem.quantity) { $('.quantity').css("borderColor", "red"); }
    else { $('.quantity').css("borderColor", "rgb(0 0 0 / 22%)"); }
}

closeGiveItem = () => { $('#giveItem').fadeOut(); }
openGiveItem = (id) => {
    currentItem = id;
    $('#giveItem').fadeIn();
    var item = playerInventory.find( ({ id }) => id === parseInt(currentItem) );
    $('#give-item-desc').html(`Predmet koji dajete <b>${item.name}</b>, imate <b>${item.quantity}</b>`)
    $(".lista-igraca").text(" ");
    $.each(nearPlayers, function(i, player) {
		$(".lista-igraca").append(
            `<li class='igrac' onclick='giveItem(\"${player.id}\", \"${currentItem}\")'>${player.name} [${player.id}] </li>`
        );
    });
}

window.onclick = function(event) {  if (event.target == modal) { modal.style.display = "none"; } }
document.addEventListener('keyup', function(e) { if (event.keyCode === 27) { closeInventory(); } })



