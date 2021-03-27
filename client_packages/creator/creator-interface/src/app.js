


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


let character = { 
   firstname: $('#character-first-name'),
   lastname: $('#character-last-name').val(),
   birth: $('#character-birth-date').val(),
   origin: $('#character-origin').val(),
   gender: 0
}

const preview = { 
   gender: (element, sex) => { 
      $('.gender').removeClass('selected')
      $(element).addClass('selected')
      character.gender = sex;
      mp.trigger('client:creator.gender', sex)
  },
}

$(window).on('load', () => { 
   sliders.open(0)
})


$('#char-birth-date').change(function () { 
   let date = this.value.split('-'), year = parseInt(date[0]);
   year > 2001 || year < 1916 ? $(this).css('borderColor', 'tomato') : $(this).css('borderColor', 'transparent');
})



