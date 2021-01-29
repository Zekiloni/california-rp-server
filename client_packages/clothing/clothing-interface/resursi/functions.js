
var male = [
    masks = { id: 1, min: 0, max: 189, name: 'Maske' },
    hairStyles = { id: 2, min: 0, max: 74, name: 'Dodatne Frizure' },
    torsos = { id: 3, min: 0, max: 194, name: 'Torzo' },
    legs = { id: 4, min: 0, max: 132, name: 'Donji delovi' },
    bags = { id: 5, min: 0, max: 88, name: 'Torbe' },
    shoes = { id: 6, min: 0, max: 97, name: 'Obuca' },
    accessories = { id: 7, min: 0, max: 150, name: 'Dodaci' },
    undershirts = { id: 8, min: 0, max: 177, name: 'Potkosulja' },
    tops = { id: 11, min: 0, max: 361, name: 'Topovi' },

    props = [ 
        masks = { id: 1, min: 0, max: 189, name: 'Maske' },
    ]
];

clothingMenu = (menu) => { 
    $(".sadrzaj").text(" ");
    $.each(menu, function(i, item) { 
        var price = Math.round(item.length * 0.65) * 1;
        $(".sadrzaj").append(
            `<div class="form-group"> 
                <label for="${item.id}"> ${item.name} <b id="vrednost-${item.id}">0</b></label>
                <input type="range" min="${item.min}" step="1" max="${item.max}" value="0" class="slajder" id="${item.id}">
            </div>` 
        );
    });
}

clothingMenu(male) 

$('.slajder').on('input', function () {
    var value = this.value;
    var index = this.id;
    $(`#vrednost-${this.id}`).html(this.value)
    mp.trigger("client:clothingPreview", parseInt(index), parseInt(value));
});

$('.rotacija').on('input', function () {
    var value = this.value;
    $('#verdnost-rotacije').html(`${value} °`)
    mp.trigger("client:rotateCharacter", parseFloat(value));
});

document.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        var clothingFinished = [];
        $(".slajder").each(function(index) {
            clothingFinished.push({index: this.id, value: this.value})
        });
        let skinJSON = JSON.stringify(clothingFinished)
        mp.trigger('client:disableClothingPreview', skinJSON)
      }
})

