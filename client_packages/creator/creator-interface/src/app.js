
let character = { 
   firstname: null,
   lastname: null,
   birth: null,
   origin: null,
   gender: 0
}

let customization = { 
   blendData: { firstShape: 0, secondShape: 0, firstSkin: 0, secondSkin: 0, shapeMix: 0, skinMix: 0 },
   headOverlays: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 },
   headOverlaysColors: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
   torso: 0,
   'faceFeatures': [
      {name: 'Nos širina', value: 0}, 
      {name: 'Nos visina', value: 0},
      {name: 'Nos dužina', value: 0},
      {name: 'Nos - širina mosta', value: 0},
      {name: 'Nos - pozicija', value: 0},
      {name: 'Nos - pomak mosta nosa', value: 0},
      {name: 'Obrve visina', value: 0},
      {name: 'Obrve širina', value: 0},
      {name: 'Jagodična kost visina', value: 0},
      {name: 'Jagodična kost širina', value: 0},
      {name: 'Obrazi širina', value: 0},
      {name: 'Oči', value: 0},
      {name: 'Usne', value: 0},
      {name: 'Dužina vilice', value: 0},
      {name: 'Visina vilice', value: 0},
      {name: 'Dužina brade', value: 0},
      {name: 'Pozicija brade', value: 0},
      {name: 'Širina brade', value: 0},
      {name: 'Oblik brade', value: 0},
      {name: 'Sirina vrata', value: 0},
   ]
};
   // 'hat', 'mask', 'shirt', 'bottoms', 'shoes', 'glasses', 'ear', 'backpack', 'armour', 'watch', 'bracelet'

// male , female
var validTorsoIDs = [
   [0, 0, 2, 14, 14, 5, 14, 14, 8, 0, 14, 15, 12],
   [0, 5, 2, 3, 4, 4, 5, 5, 5, 0]
];

let clothing = [
   { name: 'Majca', value: 0, color: 0, max: 361 },
   { name: 'Pantalone', value: 0, color: 0, max: 132 },
   { name: 'Patike', value: 0, color: 0, max: 97 }
]

const sliders = { 
   element: $('.slides'),
   elements: $('.slide'),
   indicators: $('.navigation > li'),
   active: 0,

   open: (n) => { 
      if (n >= sliders.elements.length) { n = 0; }
      if (n < 0) { n = sliders.elements.length -1 }
      sliders.active = n;
      let height = $(sliders.elements[n]).height();
      $(sliders.element).css('transform', `translateY(-${(height) * n}px)`)
      $(sliders.indicators).removeClass('active')
      $(sliders.indicators[n]).addClass('active')
   }
}

let preview = (element) => { 
   let value = element.value,
      syntax = $(element).attr('data-customization'),
      name = $(element).attr('data-name'),
      index = $(element).attr('data-index');
   
   switch (syntax) { 
      case 'faceFeatures':
         customization['faceFeatures'][index].value = value;
         mp.trigger('client:creator.preview.faceFeature', index, value)
         break;
      
      case 'clothing':
         clothing[index].value = value;
         mp.trigger('client:creator.preview.clothing', JSON.stringify(clothing))
         break;

      case 'clothingColor':
         clothing[index].color = value;
         mp.trigger('client:creator.preview.clothing', JSON.stringify(clothing))
         break;
   }
   
}

input = (val, element) => { 
   if (val == 1) { 
      element.parentNode.querySelector('input[type=number]').stepUp()
   } else { 
      element.parentNode.querySelector('input[type=number]').stepDown()
   }
   let el = element.parentNode.querySelector('input[type=number]');
   preview(el);
}

const initCustomization = () => { 
   for (let i in customization.faceFeatures) { 
      let feature = customization.faceFeatures[i];
      $('.faceFeatures').append(
         `<div class='slider-handler'>
            <label> ${feature.name} <b class='slider-value'>${feature.value}</b> </label>
            <input class='slider' type='range' data-customization='faceFeatures' oninput='preview(this)' data-name='${feature.name}' data-index='${i}' value='${feature.value}' min='-1' step='0.1' max='1'>
         </div>`
      )
   }

   for (let i in clothing) { 
      let cloth = clothing[i];
      $('.clothing').append(
         `<div class='item'>
            <label> ${cloth.name} </label>
            <div class='number-input'>
               <button onclick='input(0, this)' ></button>
               <input class='quantity' min='0' placeholder='0' data-customization='clothing' data-index='${i}' name='quantity' value='0' type='number' disabled>
               <button onclick='input(1, this)' class='plus'></button>
            </div>
            <input class='slider' type='range' data-customization='clothingColor' oninput='preview(this)' data-name='${cloth.name}' data-index='${i}' value='${cloth.color}' min='0' step='1' max='30'>
         </div>`
      )
   }
}


identity = (x, i) => { 
   character[x] = i;
}

faceFeature = (x, i) => { 
   mp.trigger('client:creator.faceFeature', gender)
}

$(window).on('load', () => { 
   sliders.open(0);
   initCustomization();
})


$('.genders h2').on('click', function () { 
   let gender = $(this).attr('data-gender');
   $('.genders h2').removeClass('active');
   $(this).addClass('active');
   character.gender = gender;
   mp.trigger('client:creator.gender', gender)
})

$('#char-birth-date').change(function () { 
   let date = this.value.split('-'), year = parseInt(date[0]);
   let dateFormat = parseInt(date[2]) + '/' + parseInt(date[1]) + '/' + parseInt(date[0]);
   year > 2001 || year < 1916 ? ( $(this).css('borderColor', 'tomato'), character.brith = false ) : ( $(this).css('borderColor', 'transparent'), character.birth = dateFormat );
})



