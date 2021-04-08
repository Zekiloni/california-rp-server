
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
   hair: [0, 0, 0],
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

let clothing = [
   { name: 'Majca', value: 0, color: 0 },
   { name: 'Pantalone', value: 0, color: 0 },
   { name: 'Patike', value: 0, color: 0 }
];

const hairs = [
   [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 
      34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64,
      65, 66, 67, 68, 69, 70, 71, 72, 73, 74
   ],
   [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
      25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45,
      46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66,
      67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 
   ]
]

const validTorsos = [
   [0, 0, 2, 14, 14, 5, 14, 14, 8, 0, 14, 15, 12],
   [0, 5, 2, 3, 4, 4, 5, 5, 5, 0]
];

const hairColors = [
   '#0c0c0c', '#1d1a17', '#281d18', '#3d1f15', '#682e19', '#954b29', '#a35234', '#9b5f3d', '#b57e54', '#c19167',
   '#af7f53', '#be9560', '#d0ac75', '#b37f43', '#dbac68', '#e4ba7e', '#bd895a', '#83422c', '#8e3a28', '#8a241c',
   '#962b20', '#a7271d', '#c4351f', '#d8421f', '#c35731', '#d24b21', '#816755', '#917660', '#a88c74', '#d0b69e',
   '#513442', '#744557', '#a94663', '#cb1e8e', '#f63f78', '#ed9393', '#0b917e', '#248081', '#1b4d6b', '#578d4b',
   '#235433', '#155146', '#889e2e', '#71881b', '#468f21', '#cc953d', '#ebb010', '#ec971a', '#e76816', '#e64810',
   '#ec4d0e', '#c22313', '#e43315', '#ae1b18', '#6d0c0e', '#281914', '#3d241a', '#4c281a', '#5d3929', '#69402b',
   '#291b16', '#0e0e10', '#e6bb84', '#d8ac74'
];

const beardColors = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 26, 27, 28, 29, 55, 56, 57, 58, 59, 60, 61, 62, 63]

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

let maxmiums = { 
   drawables: (list) => { 
      $(".clothings[data-index='0']").attr('max', list[0])
      $(".clothings[data-index='1']").attr('max', list[1])
      $(".clothings[data-index='2']").attr('max', list[2])
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
         mp.trigger('client:clothing.max.textures', )
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
               <input class='clothings' min='0' placeholder='0' data-customization='clothing' data-index='${i}' name='quantity' value='0' type='number' disabled>
               <button onclick='input(1, this)' class='plus'></button>
            </div>
            <input class='slider' type='range' data-customization='clothingColor' oninput='preview(this)' data-name='${cloth.name}' data-index='${i}' value='${cloth.color}' min='0' step='1' max='30'>
         </div>`
      );
   }

   for (let color in hairColors) { 
      $('ul[data-hair-colors="1"]').append('<li style="background: ' + hairColors[color] + ';" onclick="hair(1, '+ color + ');"></li>');
      $('ul[data-hair-colors="2"]').append('<li style="background: ' + hairColors[color] + ';" onclick="hair(2, '+ color + ');"></li>');
   }

   for (let hair in hairs[character.gender]) { 
      $('#hairStyles').append('<option value="'+ hairs[character.gender][hair] +'"> '+ hairs[character.gender][hair] +' </option');
   }
}


identity = (x, i) => { character[x] = i; }

hair = (x, i) => { 
   customization.hair[x] = i; 
   mp.trigger('client:creator.hair.preview', JSON.stringify(customization.hair))
}

faceFeature = (x, i) => { 
   mp.trigger('client:creator.faceFeature', gender);
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
   mp.trigger('client:creator.gender', gender);
   mp.trigger('client:creator.clothing.max.drawables')
})


$('#char-birth-date').change(function () { 
   let date = this.value.split('-'), year = parseInt(date[0]);
   let dateFormat = parseInt(date[2]) + '/' + parseInt(date[1]) + '/' + parseInt(date[0]);
   year > 2001 || year < 1916 ? ( $(this).css('borderColor', 'tomato'), character.brith = false ) : ( $(this).css('borderColor', 'transparent'), character.birth = dateFormat );
})



