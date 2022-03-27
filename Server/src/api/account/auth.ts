import { Lang } from '@constants';
import { Accounts } from '@models';
import { api } from '../index';




api.post('/login', (request, response) => {
   const { username, password } = request.body;
   
   if (!username || !password) {
      return response.json({ success: false, message: Lang.ACCOUNT_DOESNT_EXIST });
   }

   Accounts.findOne({ where: { username: username } }).then(account => {
      if (!account) {
         return response.json({ success: false, message: Lang.ACCOUNT_DOESNT_EXIST });
      }
      
      if (account.login(password)) {
         response.json({ success: true, message: Lang.SUCCESFULLY_LOGED_IN })
      } else {
         response.json({ success: false, message: Lang.INCORRECT_PASSWORD });
      }

   });
});

api.post('/register', (request, response) => {
  const { email, username, password } = request.body;
  
   if (!email || !username || !password) {
      return response.json({ success: false, message: Lang.INPUT_ALL_FIELDS });
   }
   
   Accounts.findOne( { where: { username: username, email: email } }).then(account => {
      if (account) {
         return response.json({ success: false, messages: Lang.ACCOUNT_ALREADY_EXIST });
      }

      Accounts.create({
         username: username,
         email: email,
         password: password,
         ip: request.socket.remoteAddress
      });

      response.json({ success: true, message: Lang.ACCOUNT_SUCCESFULLY_CREATED });

   })

})