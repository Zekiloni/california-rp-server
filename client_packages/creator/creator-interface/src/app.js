

const sliders = { 
   element: $('.slides'),
   elements: $('.slide'),
   indicators: $('.navigation > li'),
   active: 0,

   open: (n) => { 
      if (n >= sliders.elements.length) { n = 0; }
      if (n < 0) { n = sliders.elements.length -1 }
      sliders.active = n;
      $(sliders.element).css('transform', `translateY(-${(100 + 1.5) * n}vh)`)
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
   faceFeatures: { }
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



