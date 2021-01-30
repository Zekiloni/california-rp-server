


playerInfo = (name, cash, id) => { 
    $('.player-name').text(name)
    $('.player-money').text(moneyFormat(cash))
}

document.addEventListener("keyup", function(e) {
    if (event.keyCode === 27) {
        closeATM();
    }
})

var activePage = null;

menu = (page) => { 
    switch (page) {
        case 'withdraw':
            $("#general").fadeOut(400, function() { $(`#withdraw`).fadeIn(500) });
            activePage = 'withdraw';
            break;
        case 'deposit':
            $("#general").fadeOut(400, function() { $(`#deposit`).fadeIn(500) });
            activePage = 'deposit';
            break;
        case 'transfer':
            $("#general").fadeOut(400, function() { $(`#transfer`).fadeIn(500) });
            activePage = 'transfer';
            break;
        default:
            $(`#${activePage}`).fadeOut(400, function() { $(`#general`).fadeIn(500) });
    }
}

closeATM = () => {
    mp.trigger('client:hideATM');
}


transfer = () => { 
    notification('transfered')
}


moneyFormat = (x) => {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

notification = (msg) => { 
    $('.notification').text(msg)
    setTimeout(function() { $('.notification').text(' ') }, 3000);

}