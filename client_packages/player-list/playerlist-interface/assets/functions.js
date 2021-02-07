

$(window).on('load', function() { $('.box').fadeIn(1000) })

closePlayerList = () => { mp.trigger('client:hidePlayerList'); }

var players;

onlinePlayers = (onlinePlayers) => { players = []; players = onlinePlayers; playerList(); }

playerList = () => { 
    $('#player-list').text(' ');
    $.each(players, function(i, player) { 
        $('#player-list').append(`<tr>  <td>${player.id}</td> <td>${player.name}</td> <td>1</td> </tr>`);
    })
}

searchPlayer = (value) => { 
    var searchQuery = value.toLowerCase();
    $('#player-list tr').filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(searchQuery) > -1)
    });
}