
let accountsTable = `create table if not exists accounts (
  ID int(11) NOT NULL,
  username varchar(48) NOT NULL,
  password varchar(256) NOT NULL,
  registerDate timestamp NULL DEFAULT NULL,
  lastLogin timestamp NOT NULL DEFAULT current_timestamp(),
  ipAddress varchar(64) NOT NULL,
  online int(1) NOT NULL DEFAULT 0,
  admin int(2) NOT NULL DEFAULT 0,
  PRIMARY KEY(ID))`;

db.query(accountsTable, function(err, results, fields) {
  if (err) { core.terminal(1, err.message) }
  core.terminal(3, `Checking accountsTable | MySQL`);
});

let businessTable =  `CREATE TABLE IF NOT EXISTS business (
  ID int(11) NOT NULL,
  type int(1) NOT NULL DEFAULT 0,
  name varchar(64) NOT NULL DEFAULT 0,
  owner int(11) NOT NULL DEFAULT -1,
  price int(11) NOT NULL DEFAULT 15000,
  entrance text NOT NULL DEFAULT 0,
  interior int(2) NOT NULL DEFAULT 0,
  PRIMARY KEY(ID))`;

db.query(businessTable, function(err, results, fields) {
    if (err) { core.terminal(1, err.message) }
    core.terminal(3, `Checking businessTable | MySQL`);
});

let vehicleTable = `CREATE TABLE IF NOT EXISTS vehicles (
  ID int(11) NOT NULL,
  model varchar(24) NOT NULL,
  locked tinyint(1) NOT NULL,
  owner varchar(128) NOT NULL,
  price int(10) NOT NULL,
  position varchar(48) NOT NULL,
  fuel int(4) NOT NULL,
  color varchar(48) NOT NULL,
  mods text NOT NULL,
  ebts text NOT NULL,
  PRIMARY KEY(ID))`;

db.query(vehicleTable, function(err, results, fields) {
    if (err) { core.terminal(1, err.message) }
    core.terminal(3, `Checking vehicleTable  | MySQL`);
});


