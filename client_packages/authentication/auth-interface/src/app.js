


const login = { 
   element: $('.login-box'),
   button: $('button.login'),
   username: $('#login-username'),
   password: $('#login-password'),

   show: () => { 
      $(login.element).fadeIn(2000)
      $(login.element).css('display', 'flex')
   },

   triger: () => { 
      mp.trigger('client:login.sendCredentials', $(login.username).val(),  $(login.password).val())
   }
}

const selector = { 
   element: $('.selector'),

   init: (characters) => { 
      $(login.element).css('transition', 'all 0.5s ease')
      $(login.element).css('transform', 'translateX(1300px)')
      console.log('Init pozvan')
      console.log('Karakteri')
   }
}

$(window).on('load', () => { 
   login.show()
})

$(login.button).on('click', function () { 
   login.triger()
})


