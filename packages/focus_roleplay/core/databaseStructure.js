
let usersTable = `CREATE TABLE IF NOT EXISTS users (
  id int(11) NOT NULL AUTO_INCREMENT,
  username varchar(48) NOT NULL,
  password varchar(256) NOT NULL,
  email_adress varchar(128) NOT NULL,
  registered_at timestamp NULL DEFAULT NULL,
  last_login_at timestamp NOT NULL DEFAULT current_timestamp(),
  ip_adress varchar(64) NOT NULL,
  online int(1) NOT NULL DEFAULT 0,
  xp int(2) NOT NULL DEFAULT 0,
  hours int(11) NOT NULL DEFAULT 0, 
  admin int(2) NOT NULL DEFAULT 0,
  donator int(2) NOT NULL DEFAULT 0,
  coins int(6) NOT NULL DEFAULT 0,
  PRIMARY KEY(id))`;

db.query(usersTable, function(err, results, fields) {
  if (err) { core.terminal(1, err.message) }
  core.terminal(3, `Checking usersTable | MySQL`);
});

let charactersTable = `CREATE TABLE IF NOT EXISTS characters (
  id int(11) NOT NULL AUTO_INCREMENT,
  master_account int(11) NOT NULL,
  first_name varchar(64) NOT NULL,
  last_name varchar(64) NOT NULL,
  sex int(1) NOT NULL DEFAULT 0,
  birth_date date,
  origin varchar(64),
  cash int(11) NOT NULL DEFAULT 800,
  salary int(6) NOT NULL DEFAULT 0,
  last_position text NOT NULL DEFAULT 0,
  job int(2) NOT NULL DEFAULT 0,
  faction int(2) NOT NULL DEFAULT 0,
  faction_rank varchar(64) NOT NULL DEFAULT 'no',
  radio_frequency int(6) NOT NULL DEFAULT 0,
  thirst int(4) NOT NULL DEFAULT 100,
  hunger int(4) NOT NULL DEFAULT 100,
  stress int(4) NOT NULL DEFAULT 0,
  weapon_skill int(2) NOT NULL DEFAULT 0,
  driving_skill int(2) NOT NULL DEFAULT 0,
  job_skill text NOT NULL DEFAULT 0,
  licenses text NOT NULL DEFAULT 0,
  PRIMARY KEY(id))`;

db.query(charactersTable, function(err, results, fields) {
  if (err) { core.terminal(1, err.message) }
  core.terminal(3, `Checking charactersTable | MySQL`);
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
  model varchar(32) NOT NULL,
  locked tinyint(1) NOT NULL,
  owner int(11) NOT NULL DEFAULT -1,
  price int(10) NOT NULL,
  position text NOT NULL,
  rotation text NOT NULL,
  mileage FLOAT NOT NULL DEFAULT 0,
  fuel int(4) NOT NULL,
  color text NOT NULL,
  mods text NOT NULL,
  ebts text NOT NULL,
  PRIMARY KEY(ID))`;

db.query(vehicleTable, function(err, results, fields) {
  if (err) { core.terminal(1, err.message) }
  core.terminal(3, `Checking vehicleTable  | MySQL`);
}); 


let inventoryTable = `CREATE TABLE IF NOT EXISTS inventory (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(64) NOT NULL,
  hash varchar(128) NOT NULL,
  quantity int(4) NOT NULL DEFAULT 1,
  entity int(2) NOT NULL DEFAULT -1,
  owner int(11) NOT NULL DEFAULT -1,
  dimension int(11) NOT NULL DEFAULT 0,
  position text NOT NULL,
  extra text NOT NULL,
  PRIMARY KEY(ID))`;

db.query(inventoryTable, function(err, results, fields) {
  if (err) { core.terminal(1, err.message) }
  core.terminal(3, `Checking inventoryTable  | MySQL`);
});



// appearances

let appearancesTable = `CREATE TABLE IF NOT EXISTS appearances (
  character_id int(11) NOT NULL,
  hair
  blemishes
  facial_hair
  eyebrows
  ageing
  makeup
  blush
  complexion
  sun_damage	
  lipstick
  moles_freckles	
  chest_hair	
  PRIMARY KEY(character_id))`;

db.query(appearancesTable, function(err, results, fields) {
  if (err) { core.terminal(1, err.message) }
  core.terminal(3, `Checking appearancesTable  | MySQL`);
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


let freqTable = `CREATE TABLE IF NOT EXISTS channels (
  frequency int(11) NOT NULL,
  password varchar(64) DEFAULT 0,
  owner int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY(frequency))`;

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
  model int(32),
  position text,
  rotation text,
  dimension int(24),
  PRIMARY KEY(ID))`;

db.query(furnitureTable, function(err, results, fields) {
  if (err) { core.terminal(1, err.message) }
  core.terminal(3, `Checking furnitureTable | MySQL`);
});





