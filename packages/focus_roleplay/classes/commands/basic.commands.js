
module.exports = { 
   commands: [
      {
         name: 'help',
         desc: 'Lista Komand',
         call: (player, args) => { 
            let result = ''
            for (let i in mp.cmds) { 
               let cmd = mp.cmds[i], desc = cmd.desc;

               if (!cmd.admin) {
                  result += `/${cmd.name} `
               }
            }  

            player.sendMessage(result, mp.colors.server)
         }
      },
   ]
}