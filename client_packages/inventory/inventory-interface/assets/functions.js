
var modal = document.getElementById('dajPredmet');
var currentItem = null;
var playerInventory;
var nearPlayers;

populateInventory = (inventoryItems) => {  playerInventory = inventoryItems; refreshInventory(); }
populateNearPlayers = (players) => { nearPlayers = players; }

useItem = (id) => { 
     mp.trigger('client:processInventoryItem', id, 'use'); 
     var index = playerInventory.findIndex((el) => el.id === id);
     playerInventory.splice(index, 1);
     refreshInventory();
}

dropItem = (id) => { 
    mp.trigger('client:processInventoryItem', id, 'drop'); 
    var index = playerInventory.findIndex((el) => el.id === id);
    playerInventory.splice(index, 1);
    refreshInventory();
}


giveItem = (target, item) => { 
    var quant = $(".quantity").val();
    if (!quant) { $('.quantity').css('borderColor', 'tomato'); $('.player-list').hide(); }
    mp.trigger('client:processInventoryItem', item, 'give', parseInt(target), parseInt(quant));
}

refreshInventory = () => { 
    $("#inventory").text('');
    $.each(playerInventory, function(i, item) {
        $("#inventory").append(
            `<div class='predmet' onclick='selectItem(${item.id})'>
                <img src='assets/images/items/${item.hash}.png'/>
                <b class='kolicina-predmeta'>${item.quantity}</b> 
            <div>
            <ul class='item-options-${item.id}''>
                <li onclick='useItem(\"${item.id}\")'>Koristi predmet</li>
                <li onclick='openGiveItem(${item.id})'>Daj predmet</li>
                <li onclick='dropItem(\"${item.id}\")'>Baci predmet</li>
            </ul>` 
        );
    });
}

populateInventory([{ id: 1, quantity: 1, hash: 'ng_proc_beerbottle_01a'}, { id: 2, quantity: 2, hash: 'w_ar_carbinerifle' } ])
closeInventory = () => {  mp.trigger('client:closeInventory'); }

var opened = false;
selectItem = (id) => {
    if (opened == false) { $(`.item-options-${id}`).slideDown(); opened = true; }
    else { $(`.item-options-${id}`).slideUp(); opened = false; } 
}

itemGiveValue = (value) => { 
    var givingItem = playerInventory.find( ({ id }) => id === parseInt(currentItem) );
    var quant = parseInt(value)
    if (quant > givingItem.quantity) { $('.quantity').css('borderColor', 'tomato'); $('.player-list').fadeOut(); }
    else if (quant == 0) { $('.quantity').css('borderColor', 'tomato'); $('.player-list').hide(); $('.quantity').val(''); }
    else { $('.quantity').css('borderColor', 'rgb(0 0 0 / 22%)'); $('.player-list').show(); }
}

closeGiveItem = () => { $('#giveItem').fadeOut(); }
openGiveItem = (id) => {
    currentItem = id;
    $('#giveItem').fadeIn();
    var item = playerInventory.find( ({ id }) => id === parseInt(currentItem) );
    $('#give-item-desc').html(`Predmet koji dajete <b>${item.name}</b> <br><small> Kolčina koju posedujete <b>${item.quantity}</b></small>`)
    $(".player-list").text(" ");
    $.each(nearPlayers, function(i, player) {
		$(".player-list").append(
            `<li class='igrac' onclick='giveItem(\"${player.id}\", \"${currentItem}\")'>${player.name} [${player.id}] </li>`
        );
    });
}

window.onclick = function(event) { if (event.target == modal) { modal.style.display = "none"; } }
document.addEventListener('keyup', function(e) { if (event.keyCode === 27) { closeInventory(); } })



