const Database = require('better-sqlite3');
const db = new Database('game.db');

db.prepare(`
CREATE TABLE IF NOT EXISTS characters (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE,
  role TEXT,
  main_stat TEXT,
  sub_stat TEXT,
  weapon TEXT,
  sub_weapon TEXT,
  armor TEXT,
  gloves TEXT,
  kit TEXT,
  avatar TEXT,
  image TEXT
)
`).run();

module.exports = db;
