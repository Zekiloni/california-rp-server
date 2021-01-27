var color_max = 63;
var customization = [
    setHeadBlendData = [
        shapeFirstID = { id: -6, min: 0, max: 45, step: 1, name: 'Oblik 1' },
        shapeSecondID = { id: -5, min: 0, max: 45, step: 1, name: 'Oblik 2' },
        skinFirstID = { id: -4, min: 0, max: 45, step: 1, name: 'Boja koze 1' },
        skinSecondID = { id: -3, min: 0, max: 45, step: 1, name: 'Boja koze 2' },
        shapeMix = { id: -2, min: 0.0, max: 1.0, step: 0.1, name: 'Miks oblika' },
        skinMix = { id: -1, min: 0.0, max: 1.0, step: 0.1, name: 'Miks koze' }
    ],

    setHeadOverlay = [
        blemishes = { id: 0, min: 0, max: 23, step: 1, name: 'blemishes' },
        facial_hair = { id: 1, min: 0, max: 28, step: 1, name: 'facial_hair' },
        eyebrows = { id: 2, min: 0, max: 33, step: 1, name: 'eyebrows' },
        ageing = { id: 3, min: 0, max: 14, step: 1, name: 'ageing' },
        makeup = { id: 4, min: 0.0, max: 74, step: 1, name: 'makeup' },
        //blush = { id: 5, min: 0.0, max: 32, step: 1, name: 'blush' }, 
        complexion = { id: 6, min: 0, max: 11, step: 1, name: 'complexion' },
        sun_damage = { id: 7, min: 0, max: 10, step: 1, name: 'sun_damage' },
        //lipstick = { id: 8, min: 0, max: 9, step: 1, name: 'lipstick' },
        moles_freckles = { id: 9, min: 0, max: 17, step: 1, name: 'moles_freckles' },
        chest_hair = { id: 10, min: 0.0, max: 16, step: 1, name: 'chest_hair' },
        body_blemishes = { id: 11, min: 0.0, max: 11, step: 1, name: 'body_blemishes' },
        add_body_blemishes = { id: 12, min: 0.0, max: 1, step: 1, name: 'add_body_blemishes' }   
    ],

    setFaceFeature = [
        Nose_width = { id: 'face-' + 0, min: -1.0, max: 1.0, step: 0.1, name: 'Nose_width' },
        Nose_height	= { id: 'face-' + 1, min: -1.0, max: 1.0, step: 0.1, name: 'Nose_height' },
        Nose_length = { id: 'face-' + 2, min: -1.0, max: 1.0, step: 0.1, name: 'Nose_length' },
        Nose_bridge	= { id: 'face-' + 3, min: -1.0, max: 1.0, step: 0.1, name: 'Nose_bridge' },
        Nose_tip = { id: 'face-' + 4, min: -1.0, max: 1.0, step: 0.1, name: 'Nose_tip' },
        Nose_bridge_shift = { id: 'face-' + 5, min: -1.0, max: 1.0, step: 0.1, name: 'Nose_bridge_shift' },
        Brow_height = { id: 'face-' + 6, min: -1.0, max: 1.0, step: 0.1, name: 'Brow_height' },
        Brow_width = { id: 'face-' + 7, min: -1.0, max: 1.0, step: 0.1, name: 'Brow_width' },
        Cheekbone_height = { id: 'face-' +  8, min: -1.0, max: 1.0, step: 0.1, name: 'Cheekbone_height' },
        Cheekbone_width = { id: 'face-' +  9, min: -1.0, max: 1.0, step: 0.1, name: 'Cheekbone_width' },
        Cheeks_width = { id: 'face-' + 10, min: -1.0, max: 1.0, step: 0.1, name: 'Cheeks_width' },
        Eyes = { id: 'face-' + 11, min: -1.0, max: 1.0, step: 0.1, name: 'Eyes' },
        Lips = { id: 'face-' + 12, min: -1.0, max: 1.0, step: 0.1, name: 'Lips' },
        Jaw_width = { id: 'face-' + 13, min: -1.0, max: 1.0, step: 0.1, name: 'Jaw_width' },
        Jaw_height = { id: 'face-' + 14, min: -1.0, max: 1.0, step: 0.1, name: 'Jaw_height' },
        Chin_length = { id: 'face-' + 15, min: -1.0, max: 1.0, step: 0.1, name: 'Chin_length' },
        Chin_position = { id: 'face-' + 16, min: -1.0, max: 1.0, step: 0.1, name: 'Chin_position' },
        Chin_width = { id: 'face-' + 17, min: -1.0, max: 1.0, step: 0.1, name: 'Chin_width' },
        Chin_shape = { id: 'face-' + 18, min: -1.0, max: 1.0, step: 0.1, name: 'Chin_shape' },
        Neck_width = { id: 'face-' + 19, min: -1.0, max: 1.0, step: 0.1, name: 'Neck_width' }
    ]
];

cusomizationMenu = (menu, menu_2, menu_3) => { 
    $(".sadrzaj").text(" ");
    $.each(menu, function(i, item) { 
        var price = Math.round(item.length * 0.65) * 1;
        $(".sadrzaj").append(
            `<div class="form-group"> 
                <label for="${item.id}"> ${item.name} <b id="vrednost-${item.id}">0</b></label>
                <input type="range" min="${item.min}" step="${item.step}" max="${item.max}" value="0" class="slajder" id="${item.id}">
            </div>` 
        );
    });

    $.each(menu_2, function(i, item) { 
        $(".sadrzaj_2").append(
            `<div class="form-group"> 
                <label for="${item.id}"> ${item.name} <b id="vrednost-${item.id}">0</b></label>
                <input type="range" min="${item.min}" step="${item.step}" max="${item.max}" value="0" class="slajder" id="${item.id}">
                <br> <label for="color"> Boja ${item.name} </label>
                <input type="range" min="${item.min}" step="1" max="${color_max}" value="0" class="slajder" id="color" data-id="${item.id}">
            </div>` 
        );
    });

    $.each(menu_3, function(i, item) { 
        $(".sadrzaj_3").append(
            `<div class="form-group"> 
                <label for="${item.id}"> ${item.name} <b id="vrednost-${item.id}">0</b></label>
                <input type="range" min="${item.min}" step="${item.step}" max="${item.max}" value="0" class="slajder" id="${item.id}">
            </div>` 
        );
    });
}

cusomizationMenu(setHeadBlendData, setHeadOverlay, setFaceFeature) 

$('.slajder').on('input', function () {
    var value = this.value;
    var index = this.id
    var data_id = $(this).attr("data-id");
    var same_index = $(`#${index}`).val();
    $(`#vrednost-${this.id}`).html(this.value)
    if(index >= -6 && index <= -1) {
        var shapeFirstID_val = $('#-6').val(),
            shapeSecondID_val = $('#-5').val(),
            skinFirstID_val = $('#-4').val(),
            skinSecondID_val = $('#-3').val(),
            shapeMix_val = $('#-2').val(),
            skinMix_val = $('#-1').val();
       mp.trigger('client:setHeadBlendDataPreview', parseInt(shapeFirstID_val), parseInt(shapeSecondID_val), parseInt(skinFirstID_val), parseInt(skinSecondID_val), parseFloat(shapeMix_val), parseFloat(skinMix_val))
    }
    if(index >= 0 && index <= 12) { 
        mp.trigger('client:setHeadOverlayPreview', false, parseInt(index), parseInt(value))
    }

    if(index == 'color') { 
        mp.trigger('client:setHeadOverlayPreview', true, parseInt(data_id), parseInt(value))
    }

    if(index.includes("face")) {
        var index_id = index.replace('face-',' ');
        mp.trigger('client:setFaceFeaturePreview', parseInt(index_id), parseFloat(value))
    }
});

$('.rotacija').on('input', function () {
    var value = this.value;
    $('#verdnost-rotacije').html(`${value} °`)
    mp.trigger("client:rotateCharacter", parseFloat(value));
});


document.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        var overlaysFinished = [],
            faceFeatures = [];

        $(".slajder").each(function(index) {
            if(this.id >= 0 && this.id <= 12) {
                var colorVal = $(this).nextAll('#color').val();
                overlaysFinished.push({index: this.id, value: this.value, color: colorVal})
            }

            if(this.id.includes("face")) { 
                var realIndex = this.id.replace('face-',' ');
                faceFeatures.push({index: realIndex, value: parseFloat(this.value)})
            }
        });
        var headOverlays = JSON.stringify(overlaysFinished)
        var faceFinished = JSON.stringify(faceFeatures)
        mp.trigger('client:disableCustomizationPreview', headOverlays, faceFinished)
      }
})

