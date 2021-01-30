
let accountsTable = `create table if not exists accounts (
  ID int(11) NOT NULL AUTO_INCREMENT,
  username varchar(48) NOT NULL,
  password varchar(256) NOT NULL,
  registerDate timestamp NULL DEFAULT NULL,
  lastLogin timestamp NOT NULL DEFAULT current_timestamp(),
  ipAddress varchar(64) NOT NULL,
  online int(1) NOT NULL DEFAULT 0,
  admin int(2) NOT NULL DEFAULT 0,
  clothing text NOT NULL DEFAULT 0,
  headOverlays text NOT NULL DEFAULT 0,
  faceFeatures text NOT NULL DEFAULT 0,
  headBlendData text NOT NULL DEFAULT 0,
  lastPosition text NOT NULL DEFAULT 0,
  PRIMARY KEY(ID))`;

db.query(accountsTable, function(err, results, fields) {
  if (err) { core.terminal(1, err.message) }
  core.terminal(3, `Checking accountsTable | MySQL`);
});

let businessTable =  `CREATE TABLE IF NOT EXISTS business (
  ID int(11) NOT NULL AUTO_INCREMENT,
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
  ID int(11) NOT NULL AUTO_INCREMENT,
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


let inventoryTable = `CREATE TABLE IF NOT EXISTS inventory (
  ID int(11) NOT NULL AUTO_INCREMENT,
  itemName varchar(64) NOT NULL,
  itemType varchar(24) NOT NULL,
  itemHash varchar(128) NOT NULL,
  itemWeight double(3,3) NOT NULL,
  itemQuantity int(4) NOT NULL,
  itemEntity int(2) NOT NULL,
  itemOwner int(11) NOT NULL,
  itemDimension int(11) NOT NULL,
  itemPos text NOT NULL,
  itemSpecs text NOT NULL,
  PRIMARY KEY(ID))`;

db.query(inventoryTable, function(err, results, fields) {
  if (err) { core.terminal(1, err.message) }
  core.terminal(3, `Checking inventoryTable  | MySQL`);
});

let logsTable = `create table if not exists logs (
  ID int(11) NOT NULL AUTO_INCREMENT,
  type int(2) NOT NULL,
  account int(11) NOT NULL,
  player varchar(128) NOT NULL,
  target int(11) NOT NULL,
  message varchar(128) NOT NULL,
  data text NOT NULL,
  dateTime timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY(ID))`;

db.query(logsTable, function(err, results, fields) {
  if (err) { core.terminal(1, err.message) }
  core.terminal(3, `Checking logsTable  | MySQL`);
});


