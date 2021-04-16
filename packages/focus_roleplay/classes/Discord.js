
const rp = require('request-promise');
const hook = 'https://discord.com/api/webhooks/776875976633876490/zjzUiip35FUX5arAdjtKnpHGP4RRQ-nP9j_Frlqs63QrRC279_Uq-CHlBi3KipFWzGRx';

const vinewoodOnline = { 
   color: '#ffa657',
   url: 'https://discord.com/api/webhooks/823659820833832971/Jcpo0AcSVsTU_labTWbnO8dSLg0yxQFd9fDDYuDH5DfL6DKHFkd1FGF7tCxJCDp1STdn'
}

class Discord { 
   constructor () { 
      // screenshot
      mp.events.add({
         'server:disord.screenshot.send': (player, image, zone, street) => {
            let res = JSON.parse(image)

            var myEmbed = {
               author: {
                 name: 'Uzivo slika sa servera'
               },
               title: player.name,
               description: zone + ', ' + street,
               image: {
                  url: res.data.image.url
               },
               color: core.hexToDecimal(vinewoodOnline.color)
             } 

             
             var params = {
               username: 'focus.online',
               embeds: [ myEmbed ]
            }
      
            var options = {
               method: 'POST',
               uri: vinewoodOnline.url,
               body: params,
               json: true 
           };
           
            rp(options)
               .then(function (parsedBody) {
               })
               .catch(function (err) {
                   core.terminal(1, 'Discord send Error ' + err)
               });
          },
          
      })
   }


   // send hook
   send = (title, subtitle, message, color) => {
      var myEmbed = {
         author: {
           name: title
         },
         title: subtitle,
         description: message,
         color: core.hexToDecimal(color)
       }
       
       var params = {
         username: 'Focus Roleplay',
         embeds: [ myEmbed ]
      }

      var options = {
         method: 'POST',
         uri: hook,
         body: params,
         json: true 
     };
     
      rp(options)
         .then(function (parsedBody) {
         })
         .catch(function (err) {
             core.terminal(1, 'Discord send Error ' + err)
         });
   }
}

mp.discord = new Discord();

// mp.discord.send('Server Startovan', 'adadada', 'adada', '#fffff')



