
$(window).on('load', function() {
    $('.circle').fadeIn(700)
})

var items = document.querySelectorAll('.menuItem');

for(var i = 0, l = items.length; i < l; i ++) {
    items[i].style.left = (50 - 35 * Math.cos(-0.5 * Math.PI - 2 * (1 / l) * i* Math.PI)).toFixed(4) + "%";
    items[i].style.top = (50 + 35 * Math.sin(-0.5 * Math.PI - 2 * (1 / l) * i * Math.PI)).toFixed(4) + "%";
}

document.querySelector('.center').onclick = function(e) {
    e.preventDefault(); document.querySelector('.circle').classList.toggle('open');
}

$('.menuItem').on('click', function () {
    var id = this.id;
    console.log(id)
});

openMenu = (id) => { 
    
}