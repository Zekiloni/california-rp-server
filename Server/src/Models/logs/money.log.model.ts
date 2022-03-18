import { Column, DataType, Model, Table } from 'sequelize-typescript';
import rp from 'request-promise';
import { serverConfig } from '@configs';
import { colors, cmds } from '@constants';
import { logs } from '@models';
import { formatCommand, dollars } from '@shared';


@Table({ 
   updatedAt: false, createdAt: false 
})
export class moneyLogs extends Model {
   @Column({ 
      type: DataType.INTEGER, field: 'character_id'
   })
   character: number

   @Column({
      type: DataType.INTEGER, field: 'target_character_id'
   })
   targetCharacter: number
   
   @Column(DataType.INTEGER)
   amount: number

   @Column
   date: number

   static new (player: PlayerMp, target: PlayerMp, value: number) {
      moneyLogs.create({
         character: player.character.id,
         targetCharacter: target.character.id,
         amount: value,
         date: Date.now()
      });

      const embed = {
         title: formatCommand(cmds.names.PAY),
         description: player.name + ' to ' + target.name,
         color: parseInt(colors.hex.BROADCAST, 16),
         fields: [
            {
               name: player.name,
               value: 'SQL ID: ' + player.character.id + '\n' + 'IP: ' + player.ip,
               inline: false
            },
            {
               name: target.name,
               value: 'SQL ID: ' + target.character.id + '\n' + 'IP: ' + target.ip,
               inline: false,
            },
            {
               name: dollars(value),
               value: 'Money amount',
               inline: false
            }
         ]
      };

      const params = {
         username: serverConfig.name,
         embeds: [embed]
      };

      const options = {
         method: 'POST',
         uri: serverConfig.discord.moneyHook,
         body: params,
         json: true
      };

      rp(options)
         .catch(e => logs.error('discordMoneyHook: ' + e) );
   }
}