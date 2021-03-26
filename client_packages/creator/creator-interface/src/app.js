


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



$(window).on('load', () => { 
   sliders.open(0)
})



