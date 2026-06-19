const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware settings
app.use(cors());
app.use(express.json()); // Allows our server to read JSON sent from React

// Connect to PostgreSQL database using values from the .env file
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// ================= ORIGINAL DESK ROUTES =================

// 1. ROUTE: Get all desks from the database
app.get('/api/desks', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM desks ORDER BY desk_number ASC');
    res.json(result.rows); // Sends the list of desks back to React
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. ROUTE: Automatically update seat to occupied when clicked/scanned
app.post('/api/bookings/checkin', async (req, res) => {
  const { desk_id } = req.body; // Gets the ID of the clicked desk
  
  try {
    // Run SQL command to update that desk's status to 'occupied'
    await pool.query("UPDATE desks SET status = 'occupied' WHERE id = $1", [desk_id]);
    res.json({ success: true, message: "Seat booked successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ================= NEW ADDED AUTHENTICATION & SESSION ROUTES =================

// 3. ROUTE: Register a new student or librarian
app.post('/api/auth/register', async (req, res) => {
  try {
    const { uin, name, email, mobile, dob, password, role } = req.body;
    
    // Check if user already exists by email or UIN
    const checkUser = await pool.query('SELECT * FROM users WHERE email = $1 OR uin = $2', [email, uin]);
    if (checkUser.rows.length > 0) {
      return res.status(400).json({ message: "UIN or Email identity already registered!" });
    }

    // Insert the new profile dataset into the database
    await pool.query(
      'INSERT INTO users (uin, name, email, mobile, dob, password, role) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [uin, name, email, mobile, dob, password, role]
    );

    res.status(201).json({ message: "Account successfully saved to database!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. ROUTE: Sign In users and fetch their direct credentials
app.post('/api/auth/signin', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const result = await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2 AND role = $3', [email, password, role]);
    
    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Invalid credentials or role parameters!" });
    }

    const user = result.rows[0];
    
    // Convert underscore database keys into frontend-friendly camelCase variables
    res.json({
      uin: user.uin,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      dob: user.dob,
      role: user.role,
      sessionsCompleted: 0, // Initialized base placeholder for local multi-user UI fallback
      totalStudySeconds: 0
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start our server on port 5000
app.listen(5000, () => {
  console.log("Backend server active on http://localhost:5000");
});