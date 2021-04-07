
var player = { 
   characters: null
}

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

const error = (message, fields = 0) => { 

}

const goToCreator = () => { 
   mp.trigger('client:creator.show')
   mp.trigger('client:login.hide');
}

const selector = { 
   element: $('#selector'),
   character: $('.character'),
   userName: $('#account-name'),

   init: (name, characters) => { 
      player.characters = characters;
      $(selector.userName).html(name)
      $(login.element).css('transition', 'all 0.5s ease');
      $(login.element).css('transform', 'translateX(1300px)');
      setTimeout(() => { $(`#login`).css('display', 'none'); }, 1500);

      $(selector.element).fadeIn(2000);
      $(selector.element).css('display', 'flex')

      selector.load();
   },

   select: (char) => { 
      $('.black-screen').fadeIn(2500, function() {
         mp.trigger('client:select.Character', char)
      });
   },

   load: () => { 
      for (i = 0; i < 3; i ++) {
         if (player.characters[i]) { 
            let char = player.characters[i];
            $(selector.character[i]).append(`
               <div class='char-info' onclick='selector.select(${char.id})'>
                  <h2 id='char-name'>${char.first_name} ${char.last_name}</h2>
                  <h3 id='char-age'>Datum rodjenja <br> <b>${char.birth_date}</b></h3>
                  <h4 id='char-origin'>Poreklo <b>${char.origin}</b></h4>
               </div>
            `);
         }
         else { 
            $(selector.character[i]).append(`
               <div class="create-character" >
                  <i onclick='goToCreator()' class="fa fa-plus" aria-hidden="true"></i>
               </div>
            `);

         }
      }
   }
}


$(window).on('load', () => { 
   login.show()
})

$(login.button).on('click', function () { 
   login.triger()
})


