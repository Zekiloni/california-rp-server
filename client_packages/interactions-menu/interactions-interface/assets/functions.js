
var menus = [
    facialAnims = [
        { name: 'Normalna Ekspresija', emoji: '', anim: 'mood_normal_1', dict: 'facials@gen_male@variations@normal' },
        { name: 'Osmeh na licu', anim: "anim name", dict: "anim dict" },
        { name: 'Osmeh na licu', anim: "anim name", dict: "anim dict" },
        { name: 'Osmeh na licu', anim: "anim name", dict: "anim dict" },
        { name: 'Osmeh na licu', anim: "anim name", dict: "anim dict" },
        { name: 'Osmeh na licu', anim: "anim name", dict: "anim dict" },
        { name: 'Osmeh na licu', anim: "anim name", dict: "anim dict" },
        { name: 'Osmeh na licu', anim: "anim name", dict: "anim dict" },
        { name: 'Osmeh na licu', anim: "anim name", dict: "anim dict" },
        { name: 'Osmeh na licu', anim: "anim name", dict: "anim dict" },
        { name: 'Osmeh na licu', anim: "anim name", dict: "anim dict" },
        { name: 'Osmeh na licu', anim: "anim name", dict: "anim dict" },
        { name: 'Osmeh na licu', anim: "anim name", dict: "anim dict" },
        { name: 'Osmeh na licu', anim: "anim name", dict: "anim dict" }
    ]
]

facialMenu = () => {
    $.each(facialAnims, function(i, item) { 
        $('.expressions-list').append(
            `<li onclick='playAnim(\"${item.anim}\", \"${item.dict}\")' id='${item.anim}'><b>${i}</b> ${item.name} ${item.emoji} </li>` 
        );
    });
}
facialMenu()

playAnim = (anim, dict) => { 
    console.log(anim)
    console.log(dict)
}

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
    openMenu(id)
});

openMenu = (id) => { 
    $(".circle").fadeOut(700, function() {
        $(`#menu-${id}`).fadeIn(500)
    });
}