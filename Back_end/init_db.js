const { Client } = require('pg');
require('dotenv').config();

// Connect to the default 'postgres' system database first
const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: 'postgres',
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function setupDatabase() {
  try {
    await client.connect();
    
    // 1. Create the new DeskGuard database if it doesn't exist
    await client.query(`CREATE DATABASE ${process.env.DB_DATABASE};`).catch(() => {
      console.log("Database already exists or is being created...");
    });
    await client.end();

    // 2. Connect directly to our new deskguard_db to build tables
    const dbClient = new Client({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    });

    await dbClient.connect();

    // Clean out old tables first, then build the updated structures with Foreign Keys
    const createTablesQuery = `
      DROP TABLE IF EXISTS bookings CASCADE;
      DROP TABLE IF EXISTS desks CASCADE;
      DROP TABLE IF EXISTS users CASCADE;

      CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          uin VARCHAR(10) UNIQUE NOT NULL,
          name VARCHAR(100) NOT NULL,
          email VARCHAR(150) UNIQUE NOT NULL,
          mobile VARCHAR(15) NOT NULL,
          dob DATE NOT NULL,
          password VARCHAR(255) NOT NULL,
          role VARCHAR(20) DEFAULT 'student' CHECK (role IN ('student', 'librarian'))
      );

      CREATE TABLE IF NOT EXISTS desks (
          id SERIAL PRIMARY KEY,
          desk_number VARCHAR(20) UNIQUE NOT NULL,
          status VARCHAR(20) DEFAULT 'free' CHECK (status IN ('free', 'occupied', 'away'))
      );

      CREATE TABLE IF NOT EXISTS bookings (
          id SERIAL PRIMARY KEY,
          user_id INT REFERENCES users(id) ON DELETE CASCADE,
          desk_id INT REFERENCES desks(id) ON DELETE CASCADE,
          status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'away', 'completed')),
          started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          expires_at TIMESTAMP,
          last_ping_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await dbClient.query(createTablesQuery);
    console.log("Successfully cleared old tables and created the updated ones! 🎉");
    await dbClient.end();

  } catch (err) {
    console.error("Error setting up database:", err);
  }
}

setupDatabase();