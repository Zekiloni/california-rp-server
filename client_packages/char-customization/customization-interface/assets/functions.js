

const intro = { 
    song: new Audio('assets/2pac.mp3'),
    playing: false,
    skip: false,
}

const headOverlay = [ 
    { name: 'Blemishes', min: 0, max: 23 },
    { name: 'Facial Hair', min: 0, max: 20 },
    { name: 'Eyebrows', min: 0, max: 20 },
    { name: 'Ageing', min: 0, max: 20 },
    { name: 'Makeup', min: 0, max: 20 },
    { name: 'Blush', min: 0, max: 20 },
    { name: 'Complexion', min: 0, max: 20 },
    { name: 'Sun Damage', min: 0, max: 20 },
    { name: 'Lipstick', min: 0, max: 20 },
    { name: 'Moles / Freckles', min: 0, max: 20 },
    { name: 'Chest Hair', min: 0, max: 20 },
];

const faceFeatures = [ 
    { index: 0, name: 'Širina nosa' },
    { index: 1, name: 'Visina nosa' },
    { index: 2, name: 'Dužina nosa' },
    { index: 3, name: 'Nosni most' },
    { index: 4, name: 'Vrh nosa' },
    { index: 6, name: 'Visina obrva' },
    { index: 7, name: 'Širina obrva' },
    { index: 8, name: 'Visina jagodične kosti' },
    { index: 9, name: 'Širina jagodične kosti' },
    { index: 10, name: 'Širina obraza' },
    { index: 11, name: 'Oči' },
    { index: 12, name: 'Usne' },
    { index: 13, name: 'Širina vilice' },
    { index: 14, name: 'Visina vilice' },
    { index: 15, name: 'Dužina brade' },
    { index: 16, name: 'Položaj brade' },
    { index: 17, name: 'Širina brade' },
    { index: 18, name: 'Oblik brade' },
    { index: 19, name: 'Širina vrata' }
]

const blend = [ 
    { name: 'Genetika Majke', min: 0, max: 45, step: 1, value: 0 },
    { name: 'Genetika Oca', min: 0, max: 45, step: 1, value: 0 },
    { name: 'Skin First', min: 0, max: 45, step: 1, value: 0 },
    { name: 'Skin Second', min: 0, max: 45, step: 1, value: 0 },
    { name: 'Shape Mix', min: 0, max: 1.0, step: 0.1, value: 0 },
    { name: 'Skin Mix', min: 0, max: 1.0, step: 0.1, value: 0 }
]

const clothing = { 
    male: [
        masks = { id: 1, min: 0, max: 189 },
        hairStyles = { id: 2, min: 0, max: 74 },
        torsos = { id: 3, min: 0, max: 194 },
        legs = { id: 4, min: 0, max: 132},
        bags = { id: 5, min: 0, max: 88 },
        shoes = { id: 6, min: 0, max: 97 },
        accessories = { id: 7, min: 0, max: 150 },
        undershirts = { id: 8, min: 0, max: 177 },
        tops = { id: 11, min: 0, max: 361 }
    ],

    female: [ 
        masks = { id: 1, min: 0, max: 189 },
        hairStyles = { id: 2, min: 0, max: 78 },
        torsos = { id: 3, min: 0, max: 239 },
        legs = { id: 4, min: 0, max: 139 },
        bags = { id: 5, min: 0, max: 88 },
        shoes = { id: 6, min: 0, max: 101 },
        accessories = { id: 7, min: 0, max: 110 },
        undershirts = { id: 8, min: 0, max: 215 },
        tops = { id: 11, min: 0, max: 380 }
    ]
}

var character = { 
    firstName: $('#char-first-name').val(),
    lastName: $('#char-last-name').val(),
    origin: $('#char-origin').val(),
    birth: $('#char-birth-date').val(),
    gender: 0
}

$('#char-birth-date').change(function () { 
    let date = this.value.split('-'), year = parseInt(date[0]);
    year > 2001 || year < 1916 ? $(this).css('borderColor', 'tomato') : $(this).css('borderColor', 'transparent');
})

var preview = { 

    gender: (element, sex) => { 
        $('.gender').removeClass('selected')
        $(element).addClass('selected')
        character.gender = sex;
        mp.trigger('client:creator.gender', sex)
    },

    faceFeatures: (index, val) => { 
        console.log(index, val)
        let value = faceFeatures[index].value = val;
        mp.trigger('client:creator.faceFeature', parseInt(index), parseFloat(value))
    },
    
    blendData: (index, val, element = null) => { 
        if (element) { 
            switch (index) { 
                case 0:
                    $('img[data-id="mother"]').removeClass('selected')
                    $(element).addClass('selected')
                    break;
                case 1:
                    $('img[data-id="father"]').removeClass('selected')
                    $(element).addClass('selected')
                    break;
                default:
                    return false;
            }
        }
        blend[index].value = val;
        mp.trigger('client:previewBlendData', blend)
    }

}

var range = { 
    value: (el) => { 
        let value = el.value, index = el.id,
        previous = $(el).prev('label')
        $(previous).find('.slider-value').html(value)
    }
}



var customization = { 
    init: () => { 
        for (let mother = 0; mother < 22; mother ++) { 
            $('#mother-faces').append(
                `<img class='face-photo' data-id="mother" src='assets/images/parents/female_${mother}.png' onclick='preview.blendData(0, ${mother}, this)' />`
            )
        }

        for (let father = 0; father < 24; father ++) { 
            $('#father-faces').append(
                `<img class='face-photo' data-id="father" src='assets/images/parents/male_${father}.png' onclick='preview.blendData(1, ${father}, this)' />`
            )
        }

        for (const feature of faceFeatures) { 
            $('#face-features').append(`
                <div class='slider-handler'>
                    <label> ${feature.name} <b class='slider-value'> 0 </b></label>
                    <input class='slider' type='range' min='-1' max='1' step='0.1' value='0' data-customization='face-feature' id='${feature.index}' oninput='range.value(this)' />
                </div>
            `)
        }

        headOverlay.forEach( (el) => { 
            //$('#')
        })
    },

    finish: () => { 
        if (character.firstName && character.lastName && character.gender && character.age) { 
            mp.trigger('client:finishCharacter', character)
        } else { 
            
        }
        
    }
}


var slider = { 
    el: $('.customizators'),
    elements: $('.customizator'),
    indicator: $('.indicators > .indicator'),
    active: 0,

    open: (n) => { 
        if (n >= slider.elements.length) { n = 0; }
        if (n < 0) { n = slider.elements.length -1 }
        slider.active = n;
        $(slider.el).css('transform', `translate(-${455 * n}px)`)
        $(slider.indicator).removeClass('active')
        $(slider.indicator[n]).addClass('active')
    }
}

$(window).on('load', () => { 
    customization.init();
    slider.open(0)
})

$(document.body).click((e) => {
    if (intro.playing == false && intro.skip == false) { 
        intro.playing = true;
        // intro.song.play()
        // intro.song.volume = 0.05;
    }
})


$(window).keydown(function(e) {
    // console.log(e.keyCode)
    switch (e.keyCode) { 
        case 39:
            slider.open(slider.active + 1)
            break;
        
        case 37:
            slider.open(slider.active - 1)
            break;

        case 32:
            if (intro.playing == true) { 
                intro.skip = true;
                $('.pause-song > h2').html('<b>Space</b> da nastavite muziku')
                intro.playing = false;
                intro.song.pause();
            } else { 
                intro.playing = true;
                $('.pause-song > h2').html('<b>Space</b> da pauzirate muziku')
                intro.song.play()
            }
            break;

    }
});







