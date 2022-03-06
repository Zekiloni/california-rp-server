# midnight-rp-server


server name: "Midnight Roleplay - discord.gg/mn-rp 🌙 [balkan] [roleplay] [text based]"
mysql server: mariadb 10.3 +

{
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "module-alias": "^2.2.2",
    "mysql2": "^2.3.3",
    "request-promise": "^4.2.6",
    "sequelize-typescript": "^2.1.3"
  },
  "_moduleAliases": {
    "@configs": "packages/mnrp/configs/index",
    "@constants": "packages/mnrp/constants/index",
    "@shared": "packages/mnrp/shared/index",
    "@enums": "packages/mnrp/enums/index",
    "@models": "packages/mnrp/models/index",
    "@interfaces": "packages/mnrp/interfaces/index"
  }
}
