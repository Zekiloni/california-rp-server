
let playersTable = `CREATE TABLE IF NOT EXISTS players (
  ID int(11) NOT NULL AUTO_INCREMENT,
  username varchar(48) NOT NULL,
  first_Name varchar(32) NOT NULL,
  last_Name varchar(32) NOT NULL,
  password varchar(256) NOT NULL,
  registerDate timestamp NULL DEFAULT NULL,
  lastLogin timestamp NOT NULL DEFAULT current_timestamp(),
  ipAddress varchar(64) NOT NULL,
  online int(1) NOT NULL DEFAULT 0,
  xp int(2) NOT NULL DEFAULT 0,
  donator int(2) NOT NULL DEFAULT 0,
  hours int(11) NOT NULL DEFAULT 0, 
  admin int(2) NOT NULL DEFAULT 0,
  cash int(11) NOT NULL DEFAULT 800,
  bank int(11) NOT NULL DEFAULT 1000,
  savings int(11) NOT NULL DEFAULT 0,
  salary int(6) NOT NULL DEFAULT 0,
  credit int(10) NOT NULL DEFAULT 0,
  clothing text NOT NULL DEFAULT 0,
  headOverlays text NOT NULL DEFAULT 0,
  faceFeatures text NOT NULL DEFAULT 0,
  headBlendData text NOT NULL DEFAULT 0,
  lastPosition text NOT NULL DEFAULT 0,
  job int(2) NOT NULL DEFAULT 0,
  faction int(2) NOT NULL DEFAULT 0,
  factionRank varchar(64) NOT NULL DEFAULT 'no',
  radioFreq int(6) NOT NULL DEFAULT 0,
  thirst int(4) NOT NULL DEFAULT 100,
  hunger int(4) NOT NULL DEFAULT 100,
  stress int(4) NOT NULL DEFAULT 0,
  weaponSkill int(2) NOT NULL DEFAULT 0,
  PRIMARY KEY(ID))`;

db.query(playersTable, function(err, results, fields) {
  if (err) { core.terminal(1, err.message) }
  core.terminal(3, `Checking playersTable | MySQL`);
});

let businessTable = `CREATE TABLE IF NOT EXISTS business (
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
  itemHash varchar(128) NOT NULL,
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

let logsTable = `CREATE TABLE IF NOT EXISTS logs (
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

let leadersTable = `CREATE TABLE IF NOT EXISTS factions (
  faction int(11) NOT NULL,
  leader int(11) NOT NULL DEFAULT 0,
  budget int(11) NOT NULL DEFAULT 0)`;

db.query(leadersTable, function(err, results, fields) {
  if (err) { core.terminal(1, err.message) }
  core.terminal(3, `Checking leadersTable  | MySQL`);
});


let freqTable = `CREATE TABLE IF NOT EXISTS radio_frequencies (
  ID int(11) NOT NULL AUTO_INCREMENT,
  frequency int(11) NOT NULL,
  password varchar(64) DEFAULT 0,
  owner int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY(ID))`;

db.query(freqTable, function(err, results, fields) {
  if (err) { core.terminal(1, err.message) }
  core.terminal(3, `Checking freqTable | MySQL`);
});


let housesTable = `CREATE TABLE IF NOT EXISTS houses (
  ID int(11) NOT NULL AUTO_INCREMENT,
  type int(2) NOT NULL DEFAULT 0,
  price int(10) DEFAULT 25000,
  owner int(11) DEFAULT -1,
  entrance text NOT NULL,
  interior text NOT NULL,
  ipl text DEFAULT 0,
  dimension int(11) NOT NULL,
  PRIMARY KEY(ID))`;

db.query(housesTable, function(err, results, fields) {
  if (err) { core.terminal(1, err.message) }
  core.terminal(3, `Checking housesTable | MySQL`);
});


let plantsTable = `CREATE TABLE IF NOT EXISTS plants (
  ID int(11) NOT NULL AUTO_INCREMENT,
  type int(2) NOT NULL DEFAULT 0,
  contribution int(3) DEFAULT 10,
  dimension int(6) NOT NULL DEFAULT 0,
  position text NOT NULL,
  owner int(11) NOT NULL DEFAULT -1,
  progress int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY(ID))`;

db.query(plantsTable, function(err, results, fields) {
  if (err) { core.terminal(1, err.message) }
  core.terminal(3, `Checking plantsTable | MySQL`);
});

let furnitureTable = `CREATE TABLE IF NOT EXISTS furniture (
  ID int(11) NOT NULL AUTO_INCREMENT,
  model int(32) NOT NULL DEFAULT 0,
  position text ,
  rotation text ,
  dimension int(24) NOT NULL DEFALT 0,
  PRIMARY KEY(ID))`;

db.query(furnitureTable, function(err, results, fields) {
  if (err) { core.terminal(1, err.message) }
  core.terminal(3, `Checking furnitureTable | MySQL`);
});





