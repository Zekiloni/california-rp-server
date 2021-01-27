
let accountsTable = `create table if not exists accounts (
  ID int(11) NOT NULL,
  username varchar(48) NOT NULL,
  password varchar(256) NOT NULL,
  registerDate timestamp NULL DEFAULT NULL,
  lastLogin timestamp NOT NULL DEFAULT current_timestamp(),
  ipAddress varchar(64) NOT NULL,
  online int(1) NOT NULL DEFAULT 0,
  admin int(2) NOT NULL DEFAULT 0
  )`;

db.query(accountsTable, function(err, results, fields) {
  if (err) { core.terminal(1, err.message) }
  core.terminal(3, `Checking accountsTable | MySQL`);
});