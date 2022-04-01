import { Accounts } from 'src/vehicles';
import { api } from '../index';
import { authenticateToken } from '../middleware';


api.get('/account/:username', authenticateToken, (request, response) => {
   Accounts.findOne({ where: { username: request.params.username } }).then(account => {
      if (!account) {
         return response.json({ success: false });
      }

      response.json(account);
   })
});