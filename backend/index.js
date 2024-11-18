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

// Define another route for kitchenpage that frontend can call
app.get('/api/kitchen', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM xreport');
    res.status(200).json(result.rows); // This exports result.rows
    console.log(result.rows);
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// Deleting from xreport, SHOULD MAKE NEW TABLE SO REPORT FUNCTIONALITY STILL WORKS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
app.delete('/api/kitchen/:id', async (req, res) => {
  const { id } = req.params;  // Get the ID from the URL parameter
  try {
    // Execute the DELETE query
    const result = await pool.query('DELETE FROM xreport WHERE ID = $1 RETURNING *', [id]);
    
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

/* Cashier Page */

app.get('/next-order-id', (req, res) => {
  const sqlMaxId = "SELECT COALESCE(MAX(id), 0) AS max_id FROM neworderhistory";
  
  db.query(sqlMaxId, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Database error' });
      return;
    }

    const maxId = result[0].max_id;
    const nextOrderId = maxId + 1; // Increment the max ID by 1
    res.json({ nextOrderId });
  });
});

app.get('/current-order-id', (req, res) => {
  const sqlMaxId = "SELECT COALESCE(MAX(id), 0) AS max_id FROM neworderhistory";
  
  db.query(sqlMaxId, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Database error' });
      return;
    }

    const maxId = result[0].max_id;
    const currentOrderId = maxId; // Increment the max ID by 1
    res.json({ nextOrderId });
  });
});

// app.post('/api/insertOrder', async (req, res) => {
//   const { id, priceditem, cost, itemid } = req.body;
//   const currentHour = new Date().getHours(); // Get current hour
  
//   const sqlInsert = `
//       INSERT INTO neworderhistory (id, priceditem, cost, premium, itemid, hour)
//       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;
//   `;
  
//   try {
//       const result = await client.query(sqlInsert, [id, priceditem, cost, 0, itemid, currentHour]);
//       const newOrderId = result.rows[0].id;
//       res.status(201).json({ id: newOrderId });
//   } catch (error) {
//       console.error('Error inserting order:', error);
//       res.status(500).json({ error: 'Failed to insert new order' });
//   }
// });

// app.post('/api/updateIngredient', async (req, res) => {
//   const { ingredientId, quantity } = req.body;


//   // Check if both ingredientId and quantity are provided
//   if (!ingredientId || !quantity) {
//       return res.status(400).json({ error: 'ingredientId and quantity are required' });
//   }


//   try {
//       // Prepare SQL query to update the ingredient quantity
//       const sqlUpdate = 'UPDATE ingredients SET units = units - $1 WHERE ingredientid = $2';


//       // Execute the SQL query with parameterized values
//       await pool.query(sqlUpdate, [quantity, ingredientId]);


//       // Respond with success message
//       res.status(200).json({ message: 'Ingredient quantity updated successfully' });
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Error updating ingredient quantity' });
//   }
// });


app.get('/getPrice/:itemid', async (req, res) => {
  const { itemid } = req.params;

  try {
    // Query to fetch the price from the priceditems table
    const result = await client.query('SELECT price FROM priceditems WHERE itemid = $1', [itemid]);

    // Check if the item exists
    if (result.rows.length > 0) {
      // Return the price as JSON
      res.json({ itemid, price: result.rows[0].price });
    } else {
      // Item not found
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (err) {
    console.error('Error fetching price:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/* Checkout Page */

// app.get('/order-details', async (req, res) => {
//   try {
//     // Query to get the latest order ID
//     const result = await pool.query('SELECT MAX(id) AS max_id FROM neworderhistory');
//     const maxId = result.rows[0].max_id;

//     if (maxId === null) {
//       return res.json({ message: 'No orders found.' });
//     }

//     // Query to get the details for the latest order
//     const orderDetailsResult = await pool.query(
//       'SELECT priceditem, side, entree1, entree2, entree3, cost, premium FROM neworderhistory WHERE id = $1',
//       [maxId]
//     );

//     const orderDetails = orderDetailsResult.rows;
//     let totalCost = 0.0;
//     const formattedDetails = orderDetails.map(item => {
//       totalCost += item.cost + item.premium;
//       return {
//         pricedItem: item.priceditem,
//         side: item.side,
//         entree1: item.entree1,
//         entree2: item.entree2,
//         entree3: item.entree3,
//         cost: `$${item.cost.toFixed(2)}`,
//         premium: `$${item.premium.toFixed(2)}`,
//       };
//     });

//     res.json({
//       orderDetails: formattedDetails,
//       totalCost: `$${totalCost.toFixed(2)}`,
//     });
//   } catch (err) {
//     console.error('Error fetching order details:', err);
//     res.status(500).json({ message: 'Error accessing the database.' });
//   }
// });

// // Insert into the XReport table
// app.post('/checkout', async (req, res) => {
//   try {
//     const currentHour = new Date().getHours();

//     // Query to get the latest order ID and its total cost
//     const result = await pool.query('SELECT MAX(id) AS max_id FROM neworderhistory');
//     const maxId = result.rows[0].max_id;

//     if (maxId === null) {
//       return res.status(400).json({ message: 'No order found to checkout.' });
//     }

//     const costResult = await pool.query(
//       'SELECT SUM(cost + premium) AS total_cost FROM neworderhistory WHERE id = $1',
//       [maxId]
//     );
//     const totalCost = costResult.rows[0].total_cost;

//     // Insert the checkout record into xreport
//     await pool.query(
//       'INSERT INTO xreport (hour, id, cost) VALUES ($1, $2, $3)',
//       [currentHour, maxId, totalCost]
//     );

//     res.json({ message: 'Checkout successful!', totalCost: `$${totalCost.toFixed(2)}` });
//   } catch (err) {
//     console.error('Error processing checkout:', err);
//     res.status(500).json({ message: 'Error processing checkout.' });
//   }
// });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
