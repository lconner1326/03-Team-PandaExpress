// Import dependencies
import express from 'express';
import pkg from 'pg';
import cors from 'cors';
import dotenv from 'dotenv';

const { Pool } = pkg; 

// Initialize Express app
const app = express();
app.use(express.json());
const PORT = 3000;

// Set up PostgreSQL connection
dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT, // Default PostgreSQL port
});

// Middleware to parse JSON bodies

app.use(cors());

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

app.get('/api/getPrice', async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM neworderhistory ORDER BY id DESC LIMIT 100");
    console.log(result.rows);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.post('/api/placeOrder', async (req, res) => {
  const orders = req.body.orders; // Expecting an array of orders
  console.log("Route hit: /api/placeOrder");
  console.log("Incoming orders:", JSON.stringify(orders, null, 2));

  if (!orders || !Array.isArray(orders)) {
    console.warn("Invalid orders format");
    return res.status(400).json({ error: 'Invalid orders format' });
  }

  const priced_dictionary = { 
    "Bowl": 0, 
    "Plate": 1, 
    "Bigger Plate": 2,
    "Medium Side": 6,
    "Large Side": 7,
    "Premium Small Entree": 11,
    "Premium Medium Entree": 12,
    "Premium Large Entree": 13,
    "Small Fountain Drink": 14,
    "Medium Fountain Drink": 15,
    "Large Fountain Drink": 16,
    "Bottled Water": 17,
    'Gatorade': 18,
    "Crab Rangoon": 19,
    "Apple Pie Roll": 20,
    "Egg Rolls": 21,
    "Spring Rolls": 22,
  };

  const menu_dictionary = {
    'Chow Mein': 0,
    'Fried Rice': 1,
    'White Rice': 2,
    'Super Greens': 3,
    'Bourbon Chicken': 4,
    'Orange Chicken': 5,
    'Black Pepper Sirloin Steak': 6,
    'Honey Walnut Shrimp': 7,
    'Teriyaki Chicken': 8,
    'Broccoli Beef': 9,
    'Kung Pao Chicken': 10,
    'Honey Sesame Chicken Breast': 11,
    'Beijing Beef': 12,
    'Mushroom Chicken': 13,
    'Sweet Fire Chicken Breast': 14,
    'String Bean Chicken Breast': 15,
    'Black Pepper Chicken': 16,
  };

  const validItemTypes = ["Bowl", "Plate", "Bigger Plate"]; // Valid priced item types

  try {
    // Get the latest order ID
    await pool.query("BEGIN");
    const latestOrderResult = await pool.query("SELECT MAX(id) as latestOrder FROM neworderhistory");
    console.log("Latest Order Query Result:", latestOrderResult.rows);
    const latestOrderId = latestOrderResult.rows[0]?.latestorder || 0; // Extract the integer value
    const newOrderId = latestOrderId + 1; // Increment the ID correctly


    
    console.log("New Order ID:", newOrderId);

    // Start transaction

    for (const order of orders) {
      const { itemType, sides = [], entrees = [], name } = order;

      console.log("Processing Order:", order);


      if (validItemTypes.includes(itemType)) {
        let premium = 0;
        let costResult = await pool.query("SELECT price FROM priceditems WHERE item_name = ($1)", [itemType]);
        console.log("Price Query Result for itemType:", itemType, costResult.rows);

        let price = costResult.rows[0]?.price || 0;
        console.log("Price Retrieved:", price);


        // Calculate premium for premium entrees
        entrees.forEach((entree) => {
          if (["Black Pepper Sirloin Steak", "Honey Walnut Shrimp"].includes(entree)) {
            premium += 1.5;
          }
        });

        price += premium;

        // Map sides and entrees to their corresponding IDs from the dictionary
        const sideID = menu_dictionary[sides[0]] || -1;
        const entree1ID = menu_dictionary[entrees[0]] || -1;
        const entree2ID = entrees[1] ? menu_dictionary[entrees[1]] || -1 : -1;
        const entree3ID = entrees[2] ? menu_dictionary[entrees[2]] || -1 : -1;

        console.log(`Inserting order with itemType ${itemType}`);
        await pool.query(
          "INSERT INTO neworderhistory (id, priceditem, side, entree1, entree2, entree3, cost, premium) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
          [
            newOrderId,
            priced_dictionary[itemType],
            sideID,
            entree1ID,
            entree2ID,
            entree3ID,
            price,
            premium,
          ]
        );
      } else if (name) {
        // Handle standalone items like drinks
        console.log("Inserting standalone item: ${name}", name);
        const itemCostResult = await pool.query("SELECT price FROM priceditems WHERE item_name = ($1)", [name]);
        const itemCost = itemCostResult.rows[0]?.price || 0;
        console.log("Price of item: ", itemCost);
        await pool.query(
          "INSERT INTO neworderhistory (id, priceditem, side, entree1, entree2, entree3, cost, premium) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
          [
            newOrderId,
            priced_dictionary[name] || -1,
            -1,
            -1,
            -1,
            -1,
            itemCost,
            0,
          ]
        );
      } else {
        console.warn("Skipping invalid order:", order);
      }
    }

    // Commit transaction
    await pool.query("COMMIT");
    console.log("Transaction committed successfully");
    res.status(200).json({ success: true, message: "Orders processed successfully", orderId: newOrderId });
  } catch (err) {
    // Rollback transaction on error
    await pool.query("ROLLBACK");
    console.error("Error processing orders:", err);
    res.status(500).json({ error: "Failed to process orders" });
  }
});



/*app.post('/api/placeOrder', async (req, res) => {
  console.log("Request received:", req.body);

  const orders = req.body.orders;

  

  // Validate orders
  if (!orders || !Array.isArray(orders)) {
    return res.status(400).json({ error: 'Invalid orders format' });
  }

  try {
    // Simulate processing orders
    console.log('Orders received:', orders);
    res.status(200).json({ success: true, message: 'Orders processed successfully' });
  } catch (error) {
    console.error('Error processing orders:', error);
    res.status(500).json({ error: 'Failed to process orders' });
  }
});*/




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
