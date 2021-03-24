

let characters = null;


const login = { 
   element: $('.login-box'),
   username: $('#login-username').val(),
   password: $('#login-password').val(),

   show: () => { 
      $(login.element).fadeIn(1500)
   },

   finish: () => { 
      mp.trigger('client:login.sendCredentials', login.username, login.password)
   }
}

const selector = { 
   element: $('.selector'),

   init: () => { 
      // $(selector.element)
   }
}

$(window).on('load', () => { 
   login.show()
})


