// Import dependencies
import express from 'express';
import pkg from 'pg';
import cors from 'cors';

const { Pool } = pkg; 

// Initialize Express app
const app = express();
app.use(express.json());
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

// app.use(cors());

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
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// Define another route for kitchenpage that frontend can call
app.get('/api/kitchen', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM kitchentable');
    res.status(200).json(result.rows); // This exports result.rows
    console.log(result.rows);
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});
app.get('/api/priceditems', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM priceditems');
    res.status(200).json(result.rows); // This exports result.rows
    console.log(result.rows);
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});
app.get('/api/menuitems', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM menuitems');
    res.status(200).json(result.rows); // This exports result.rows
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});



app.delete('/api/kitchen/:id', async (req, res) => {
  const { id } = req.params;  // Get the ID from the URL parameter
  try {
    // Execute the DELETE query
    const result = await pool.query('DELETE FROM kitchentable WHERE ID = $1 RETURNING *', [id]);
    
    if (result.rowCount === 0) {  // No rows were deleted
      return res.status(404).json({ error: 'Item not found' });
    }

    // Successfully deleted the item
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (err) {
    console.error('Error executing delete query', err.stack);
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

app.post('/api/SalesData', async (req, res) => {
  const startCompositeTime = req.body.startCompositeTime;
  const endCompositeTime = req.body.endCompositeTime;
  try {
      const result = await pool.query(
        "SELECT pi.item_name, SUM(item_count) AS total_sales " +
        "FROM (" +
        "    SELECT priceditem AS item_id, COUNT(*) AS item_count " +
        "    FROM neworderhistory " +
        "    WHERE (week * 10000 + day * 100 + hour) BETWEEN $1 AND $2 " +
        "    GROUP BY priceditem " +
        "    UNION ALL " +
        "    SELECT side AS item_id, COUNT(*) AS item_count " +
        "    FROM neworderhistory " +
        "    WHERE (week * 10000 + day * 100 + hour) BETWEEN $1 AND $2 " +
        "    GROUP BY side " +
        "    UNION ALL " +
        "    SELECT entree1 AS item_id, COUNT(*) AS item_count " +
        "    FROM neworderhistory " +
        "    WHERE (week * 10000 + day * 100 + hour) BETWEEN $1 AND $2 " +
        "    GROUP BY entree1 " +
        "    UNION ALL " +
        "    SELECT entree2 AS item_id, COUNT(*) AS item_count " +
        "    FROM neworderhistory " +
        "    WHERE (week * 10000 + day * 100 + hour) BETWEEN $1 AND $2 " +
        "    GROUP BY entree2 " +
        "    UNION ALL " +
        "    SELECT entree3 AS item_id, COUNT(*) AS item_count " +
        "    FROM neworderhistory " +
        "    WHERE (week * 10000 + day * 100 + hour) BETWEEN $1 AND $2 " +
        "    GROUP BY entree3 " +
        ") AS combined_items " +
        "JOIN priceditems pi ON combined_items.item_id = pi.itemid " +
        "GROUP BY pi.item_name " +
        "ORDER BY total_sales DESC;",
        [startCompositeTime, endCompositeTime]
      );
      res.status(200).json(result.rows);
  } catch (error) {
      console.error('Error executing query', error.stack);
      res.status(500).json({ error: 'Error fetching sales data' });
  }
});

app.get('/api/StaffData', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM staff');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.get('/api/RestockData', async(req,res) =>{
  try{
    const result = await pool.query("SELECT * FROM ingredients ORDER BY units ASC");
    res.status(200).json(result.rows);
  }
  catch(err){
    console.error('Error executing query', err.stack);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.get('/api/OrderHistoryData', async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM neworderhistory ORDER BY id DESC LIMIT 100");
    console.log(result.rows);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.get('/api/XReportData/', async(req,res) =>{
  try{
    const result = await pool.query("SELECT * FROM xreport");
    res.status(200).json(result.rows);
  }
  catch(err){
    console.error('Error executing query', err.stack);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.get('/api/ZReportData/generate', async(req,res) =>{
  try{
    await pool.query(`TRUNCATE TABLE zreport;
    INSERT INTO zreport (hour, cost, order_id)
    SELECT hour, cost, id
    FROM xreport;

    DELETE FROM xreport;`);

    const result = await pool.query("SELECT * FROM zreport")
    console.log(result.rows)
    res.status(200).json(result.rows);
  }
  catch(err){
    console.error('Error executing query', err.stack);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.get('/api/ZReportData/request', async(req,res) =>{
  try{
    const result = await pool.query("SELECT * FROM zreport");
    res.status(200).json(result.rows);
  }
  catch(err){
    console.error('Error executing query', err.stack);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
