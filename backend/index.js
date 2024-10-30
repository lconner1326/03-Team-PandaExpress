// Import dependencies
import express from 'express';
import pkg from 'pg';
import cors from 'cors';

const { Pool } = pkg; 

// Initialize Express app
const app = express();
const PORT = 3000;

// Set up PostgreSQL connection
const pool = new Pool({
  user: 'csce331_03',
  host: 'csce-315-db.engr.tamu.edu',
  database: 'csce331_03',
  password: 'team3team',
  port: 5432, // Default PostgreSQL port
});

// Middleware to parse JSON bodies
app.use(cors({
  origin: 'http://localhost:3001'  // Allow only your React app
}));

// Test database connection
pool.connect()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch((err) => console.error('Database connection error', err.stack));

// Define a route the frontend can call
app.get('/api/data', async (req, res) => {
  try {
    // Example query to get data from a table called "your_table"
    const result = await pool.query('SELECT * FROM menuitems');
    res.status(200).json(result.rows); // This exports result.rows
    console.log(result.rows);
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
