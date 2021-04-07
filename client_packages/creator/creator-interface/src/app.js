

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

const initCustomization = () => { 
   // for ()
}

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
   faceFeatures: { 
      'Nos širina' : 0, 
      'Nos visina' : 0,
      'Nos dužina' : 0,
      'Nos - širina mosta' : 0,
      'Nos - pozicija' : 0,
      'Nos - pomak mosta nosa': 0,
      'Obrve visina' : 0,
      'Obrve širina' : 0,
      'Jagodična kost visina' : 0,
      'Jagodična kost širina' : 0,
      'Obrazi širina' : 0,
      'Oči' : 0,
      'Usne' : 0,
      'Dužina vilice' : 0,
      'Visina vilice' : 0,
      'Dužina brade': 0,
      'Pozicija brade': 0,
      'Širina brade': 0,
      'Oblik brade': 0,
      'Sirina vrata' : 0,
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



