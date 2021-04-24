
let usersTable = `CREATE TABLE IF NOT EXISTS users (
  id int(11) NOT NULL AUTO_INCREMENT,
  username varchar(48) NOT NULL,
  password varchar(256) NOT NULL,
  email_adress varchar(128) NOT NULL,
  registered_at timestamp NOT NULL DEFAULT current_timestamp(),
  last_login_at timestamp NOT NULL DEFAULT current_timestamp(),
  social_club varchar(64) DEFAULT NULL,
  ip_adress varchar(64) NOT NULL,
  online int(1) NOT NULL DEFAULT 0,
  hardwer_id text DEFAULT NULL,
  admin int(2) NOT NULL DEFAULT 0,
  donator int(2) NOT NULL DEFAULT 0,
  coins int(6) NOT NULL DEFAULT 0,
  warns text,
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
  create_date varchar(64) NOT NULL,
  sex int(1) NOT NULL DEFAULT 0,
  experience int(3) NOT NULL DEFAULT 0,
  hours_played int(12) NOT NULL DEFAULT 0,
  birth_date text,
  origin varchar(64),
  health int(4) NOT NULL DEFAULT 100,
  armour int(4) NOT NULL DEFAULT 0,
  money int(11) NOT NULL DEFAULT 800,
  salary int(6) NOT NULL DEFAULT 0,
  bank_account int(16) NOT NULL DEFAULT 0,
  last_position text,
  spawn_point int(2) NOT NULL DEFAULT 0,
  mask_id int(6) NOT NULL DEFAULT 0,
  job int(2) NOT NULL DEFAULT 0,
  faction int(2) NOT NULL DEFAULT 0,
  faction_rank varchar(64) NOT NULL DEFAULT 'no',
  faction_leader int(3) NOT NULL DEFAULT 0,
  radio_frequency int(6) NOT NULL DEFAULT 0,
  thirst int(4) NOT NULL DEFAULT 100,
  hunger int(4) NOT NULL DEFAULT 100,
  stress int(4) NOT NULL DEFAULT 0,
  weapon_skill int(2) NOT NULL DEFAULT 0,
  driving_skill int(2) NOT NULL DEFAULT 0,
  job_skill text,
  licenses text,
  screenshot int(1) NOT NULL DEFAULT 0,
  PRIMARY KEY(id))`;

db.query(charactersTable, function(err, results, fields) {
  if (err) { core.terminal(1, err.message) }
  core.terminal(3, `Checking charactersTable | MySQL`);
});

let vehicleTable = `CREATE TABLE IF NOT EXISTS vehicles (
  id int(11) NOT NULL AUTO_INCREMENT,
  price INT(4) NOT NULL,
  owner INT(11) NOT NULL,
  alpha INT(3) NOT NULL,
  model VARCHAR(32) NOT NULL,
  plate VARCHAR(8) NOT NULL,
  color TEXT NOT NULL,
  position TEXT NOT NULL,
  rotation TEXT NOT NULL,
  tuning TEXT NOT NULL,
  upgrades TEXT NOT NULL,
  fuel DECIMAL(3,1) NOT NULL,
  locked TINYINT(1) NOT NULL,
  visible TINYINT(1) NOT NULL,
  dimension INT(4) NOT NULL,
  kilometers INT(4) NOT NULL,
  dirt INT(3) NOT NULL,
  impounded TINYINT(1) NOT NULL,
  faction INT(3) NOT NULL DEFAULT 0,
  business INT(3) NOT NULL DEFAULT 0,
  PRIMARY KEY(id))`;

db.query(vehicleTable, function(err, results, fields) {
  if (err) { core.terminal(1, err.message) }
  core.terminal(3, `Checking vehiclesTable  | MySQL`);
}); 


let inventoryTable = `CREATE TABLE IF NOT EXISTS items (
  id int(11) NOT NULL AUTO_INCREMENT,
  item varchar(128) NOT NULL,
  quantity int(4) NOT NULL DEFAULT 1,
  entity int(2) NOT NULL DEFAULT -1,
  ammo int(4) NOT NULL DEFAULT 0,
  owner int(11) NOT NULL DEFAULT -1,
  dimension int(11) NOT NULL DEFAULT 0,
  position text DEFAULT NULL,
  extra text DEFAULT NULL,
  PRIMARY KEY(id))`;

db.query(inventoryTable, function(err, results, fields) {
  if (err) { core.terminal(1, err.message) }
  core.terminal(3, `Checking inventoryTable  | MySQL`);
});


// appearances

let appearancesTable = 'CREATE TABLE IF NOT EXISTS appearances (' +
  '`character` int(11) NOT NULL,' +
  'blend_data text NOT NULL,' +
  'face_features text NOT NULL,' +
  'head_overlays text NOT NULL,' +
  'head_overlays_colors text NOT NULL,' +
  'hair text NOT NULL,' +
  'beard text NOT NULL,' +
  'eye_color int(2) NOT NULL DEFAULT 0,' +
  'torso int(2) NOT NULL DEFAULT 0,' +
  'shirt text NOT NULL,' +
  'legs text NOT NULL,' +
  'bags text NOT NULL,' +
  'shoes text NOT NULL,' +
  'accessories text NOT NULL,' +
  'undershirt text NOT NULL,' +
  'body_armours text NOT NULL,' +
  'mask text NOT NULL,' +
  'hats text NOT NULL,' +
  'glasses text NOT NULL,' +
  'ears text NOT NULL,' +
  'watches text NOT NULL,' +
  'bracelet text NOT NULL,' +
  'PRIMARY KEY(`character`));';

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
  data text,
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

let finesTable = `CREATE TABLE IF NOT EXISTS fines (
  id int(11) NOT NULL AUTO_INCREMENT,
  price int(11) NOT NULL DEFAULT 250,
  info varchar(128) NOT NULL DEFAULT 'info',
  issuer_id int(11) NOT NULL,
  char_id int(11) NOT NULL,
  paid tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY(id))`;

db.query(finesTable, function(err, results, fields) {
  if (err) { core.terminal(1, err.message) }
  core.terminal(3, `Checking finesTable  | MySQL`);
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
  id int(11) NOT NULL AUTO_INCREMENT,
  price int(11) NOT NULL DEFAULT 25000,
  owner int(11) NOT NULL DEFAULT -1,
  type int(2) NOT NULL DEFAULT 0,
  locked int(1) NOT NULL DEFAULT 0,
  entrance text,
  dimension int(11) DEFAULT 0,
  interior text,
  intDimension int(11) NOT NULL DEFAULT 0,
  ipl text DEFAULT NULL,
  rent int(6) NOT NULL DEFAULT 0,
  PRIMARY KEY(id))`;

db.query(housesTable, function(err, results, fields) {
  if (err) { core.terminal(1, err.message) }
  core.terminal(3, `Checking housesTable | MySQL`);
});

let bussinesTable = `CREATE TABLE IF NOT EXISTS business (
  id int(11) NOT NULL AUTO_INCREMENT,
  price int(11) NOT NULL DEFAULT 25000,
  owner int(11) NOT NULL DEFAULT -1,
  products int(4) NOT NULL DEFAULT 0,
  name varchar(128) NOT NULL DEFAULT 'Business',
  type int(2) NOT NULL DEFAULT 0,
  locked int(1) NOT NULL DEFAULT 0,
  entrance text,
  workers text,
  dimension int(11) DEFAULT 0,
  interior text,
  intDimension int(11) NOT NULL DEFAULT 0,
  ipl text DEFAULT NULL,
  rent int(11) NOT NULL DEFAULT -1,
  PRIMARY KEY(id))`;

db.query(bussinesTable, function(err, results, fields) {
  if (err) { core.terminal(1, err.message) }
  core.terminal(3, `Checking bussinesTable | MySQL`);
});

/* 
constructor (id, name, d) { 
      this.id = id;
      this.type = d.type;
      this.name = name;
      this.price = d.price;
      this.owner = d.owner;
      this.products = d.products;
      this.entrance = d.entrance;
      this.interior = d.interior;
      this.workers = d.workers;      
      this.price = data.price || 2500;
      this.owner = data.owner || -1;
*/


let plantsTable = `CREATE TABLE IF NOT EXISTS plants (
  ID int(11) NOT NULL AUTO_INCREMENT,
  type int(2) NOT NULL DEFAULT 0,
  contribution int(3) DEFAULT 10,
  dimension int(6) NOT NULL DEFAULT 0,
  position text,
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

let banksTable = `CREATE TABLE IF NOT EXISTS bank (
  number int(16) NOT NULL,
  pin int(3) NOT NULL,
  balance int(11) NOT NULL DEFAULT 500,
  savings int(11) NOT NULL DEFAULT 0,
  paycheck int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY(number))`;

db.query(banksTable, function(err, results, fields) {
  if (err) { core.terminal(1, err.message) }
  core.terminal(3, `Checking banksTable | MySQL`);
});

let bansTable = `CREATE TABLE IF NOT EXISTS bans (
  id int(11) NOT NULL AUTO_INCREMENT,
  account int(11) NOT NULL,
  social_club varchar(128) NOT NULL,
  ip varchar(64) NOT NULL,
  issuer int(11) NOT NULL,
  reason varchar(64) NOT NULL,
  banned_date text,
  expire_date text,
  PRIMARY KEY(id))`;

db.query(bansTable, function(err, results, fields) {
  if (err) { core.terminal(1, err.message) }
  core.terminal(3, `Checking bansTable | MySQL`);
});




