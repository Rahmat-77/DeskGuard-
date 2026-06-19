const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function updateDesksForTesting() {
  // Let's make A-101 free (green), A-102 away (yellow), and A-103 occupied (red)
  const queryText = `
    UPDATE desks SET status = 'free' WHERE desk_number = 'A-101';
    UPDATE desks SET status = 'away' WHERE desk_number = 'A-102';
    UPDATE desks SET status = 'occupied' WHERE desk_number = 'A-103';
  `;

  try {
    await pool.query(queryText);
    console.log("Database statuses updated for testing!");
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    await pool.end();
  }
}

updateDesksForTesting();