
let character = { 
   firstname: null,
   lastname: null,
   birth: null,
   origin: null,
   gender: null,
   blendData: [ 0, 0, 0, 0, 0, 0],
   headOverlays: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 },
   headOverlaysColors: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
   hair: [0, 0, 0],
   beard: [0, 0],
   torso: 0,
   faceFeatures: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
   clothing: [
      [0, 0], [0, 0], [0, 0]
   ]
}


const data = { 
   faceFeatures: [
      'Nos širina', 'Nos visina', 'Nos dužina', 'Nos - širina mosta', 'Nos - pozicija', 
      'Nos - pomak mosta nosa', 'Obrve visina', 'Obrve širina', 'Jagodična kost visina', 
      'Jagodična kost širina', 'Obrazi širina', 'Oči', 'Usne', 'Dužina vilice', 'Visina vilice', 
      'Dužina brade', 'Pozicija brade', 'Širina brade', 'Oblik brade',  'Sirina vrata', 
   ],

   invalidHairs: [23, 24],

   hairColors: [
      '#0c0c0c', '#1d1a17', '#281d18', '#3d1f15', '#682e19', '#954b29', '#a35234', '#9b5f3d', '#b57e54', '#c19167',
      '#af7f53', '#be9560', '#d0ac75', '#b37f43', '#dbac68', '#e4ba7e', '#bd895a', '#83422c', '#8e3a28', '#8a241c',
      '#962b20', '#a7271d', '#c4351f', '#d8421f', '#c35731', '#d24b21', '#816755', '#917660', '#a88c74', '#d0b69e',
      '#513442', '#744557', '#a94663', '#cb1e8e', '#f63f78', '#ed9393', '#0b917e', '#248081', '#1b4d6b', '#578d4b',
      '#235433', '#155146', '#889e2e', '#71881b', '#468f21', '#cc953d', '#ebb010', '#ec971a', '#e76816', '#e64810',
      '#ec4d0e', '#c22313', '#e43315', '#ae1b18', '#6d0c0e', '#281914', '#3d241a', '#4c281a', '#5d3929', '#69402b',
      '#291b16', '#0e0e10', '#e6bb84', '#d8ac74'
   ],

   beardColors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 26, 27, 28, 29, 55, 56, 57, 58, 59, 60, 61, 62, 63],

   validTorsos: [
      [0, 0, 2, 14, 14, 5, 14, 14, 8, 0, 14, 15, 12],
      [0, 5, 2, 3, 4, 4, 5, 5, 5, 0]
   ],

   clothings: ['Majca', 'Pantalone', 'Patike'],
   clothingsMax: [0, 0, 0]
}

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


// input = (val, element) => { 
//    if (val == 1) { 
//       element.parentNode.querySelector('input[type=number]').stepUp()
//    } else { 
//       element.parentNode.querySelector('input[type=number]').stepDown()
//    }
//    let el = element.parentNode.querySelector('input[type=number]');
//    preview(el);
// }


const gender = (el, i) => { 
   character.gender = i; $('.genders h2').removeClass('active'); $(el).addClass('active');
   mp.trigger('client:creator.preview', 'gender', JSON.stringify(character.gender))

   customization.reload();
}

const customize = (x, id, val) => { 
   character[x][id] = val;
   if (x == 'faceFeatures')
      mp.trigger('client:creator.preview', x, JSON.stringify([id, val]))
   else
      mp.trigger('client:creator.preview', x, JSON.stringify(character[x]));
}

const customization = { 
   init () { 
      for (let f in data.faceFeatures) { 
         $('.faceFeatures').append(`<div class='slider-handler'> <label> ${data.faceFeatures[f]} </label>
            <input type='range' class='slider' oninput='customize("faceFeatures", ${f}, this.value)' min='-1' max='1' step='0.1' > </div>`)
      }

      for (let h in data.hairColors) { 
         $('.hairColors-1').append(`<li style='background: ${data.hairColors[h]};' onclick='customize("hair", 1, ${h})'> </li>`);
         $('.hairColors-2').append(`<li style='background: ${data.hairColors[h]};' onclick='customize("hair", 2, ${h})'> </li>`);
      }

      for (let c in data.clothings) { 
         $('.clothing').append(`<input type='number' min="0" value="0" step="5" disabled />`)
      }

      for (let b in data.beardColors) { 
         let hair = data.beardColors[b], color = data.hairColors[hair];
         $('.beardColors').append(`<li style='background: ${color};' onclick='customize("beard", 1, ${hair})'> </li>`);
      }
   },

   reload () { 
      if (character.gender == 1) { 
         $('.beard').css('display', 'none');
      }
      else { 
         $('.beard').css('display', 'flex');
      }
   }
}


$(window).on('load', () => { sliders.open(0); customization.init(); })

$('#char-birth-date').change(function () { 
   let date = this.value.split('-'), year = parseInt(date[0]), dateFormat = date[2] + '/' + date[1] + '/' + date[0];
   year > 2001 || year < 1916 ? ( $(this).css('borderColor', 'tomato'), character.brith = null ) : ( $(this).css('borderColor', 'transparent'), character.birth = dateFormat );
})



