
const rp = require('request-promise');
const hook = 'https://discord.com/api/webhooks/776875976633876490/zjzUiip35FUX5arAdjtKnpHGP4RRQ-nP9j_Frlqs63QrRC279_Uq-CHlBi3KipFWzGRx';

class Discord { 
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

mp.discord.send('Server Startovan', 'adadada', 'adada', '#fffff')