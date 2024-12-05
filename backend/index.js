// Import dependencies
import express from 'express';
import pkg from 'pg';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
// Stuff for OAuth
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import cookieSession from 'cookie-session';
import session from 'express-session';
import { OAuth2Client } from 'google-auth-library';
import path from 'path';
const { Pool } = pkg; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Initialize the Express application.
 * @constant
 * @type {Object}
 */
const app = express();

app.use(express.json());

/**
 * Port number for the server.
 * @constant
 * @type {number}
 */
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
app.use('/docs', express.static(path.join(__dirname, '../docs')));
// app.use(cors());
app.use(cors({
    // origin: 'http://localhost:3001', // Frontend URL- local host
    origin: 'https://project-3-03-team-1.onrender.com', // Frontend URL- deployed
    credentials: true, // Allow sending cookies (if using sessions)
  }));

// Test database connection
pool.connect()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch((err) => console.error('Database connection error', err.stack));

// Define a route the frontend can call
/**
 * GET /api/menuItems
 * Fetches all menu items from the database.
 */
app.get('/api/menuItems', async (req, res) => {
  try {
    // Example query to get data from a table called "your_table"
    const result = await pool.query('SELECT * FROM menuitems');
    res.status(200).json(result.rows); // This exports result.rows
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

/**
 * GET /api/kitchen
 * Fetches all data from the kitchen table.
 */
app.get('/api/kitchen', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM kitchentable');
    res.status(200).json(result.rows); // This exports result.rows
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

/**
 * GET /api/priceditems
 * Fetches all items from the `priceditems` table.
 */
app.get('/api/priceditems', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM priceditems');
    res.status(200).json(result.rows); // This exports result.rows
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

/**
 * DELETE /api/kitchen/:id
 * Deletes a kitchen item by ID.
 * @param {string} id - ID of the kitchen item to delete.
 */
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


/**
 * POST /api/SalesData
 * Fetches sales data between specified composite times.
 * @param {number} startCompositeTime - Start time.
 * @param {number} endCompositeTime - End time.
 */
app.post('/api/SalesData', async (req, res) => {
  const startCompositeTime = req.body.startCompositeTime;
  const endCompositeTime = req.body.endCompositeTime;
  try {
      const result = await pool.query(
        "SELECT pi.item_name, SUM(item_count) AS total_sales " +
        "FROM (" +
        "    SELECT priceditem AS itemid, COUNT(*) AS item_count " +
        "    FROM neworderhistory " +
        "    WHERE (week * 10000 + day * 100 + hour) BETWEEN $1 AND $2 " +
        "    GROUP BY priceditem " +
        "    UNION ALL " +
        "    SELECT side AS itemid, COUNT(*) AS item_count " +
        "    FROM neworderhistory " +
        "    WHERE (week * 10000 + day * 100 + hour) BETWEEN $1 AND $2 " +
        "    GROUP BY side " +
        "    UNION ALL " +
        "    SELECT entree1 AS itemid, COUNT(*) AS item_count " +
        "    FROM neworderhistory " +
        "    WHERE (week * 10000 + day * 100 + hour) BETWEEN $1 AND $2 " +
        "    GROUP BY entree1 " +
        "    UNION ALL " +
        "    SELECT entree2 AS itemid, COUNT(*) AS item_count " +
        "    FROM neworderhistory " +
        "    WHERE (week * 10000 + day * 100 + hour) BETWEEN $1 AND $2 " +
        "    GROUP BY entree2 " +
        "    UNION ALL " +
        "    SELECT entree3 AS itemid, COUNT(*) AS item_count " +
        "    FROM neworderhistory " +
        "    WHERE (week * 10000 + day * 100 + hour) BETWEEN $1 AND $2 " +
        "    GROUP BY entree3 " +
        ") AS combined_items " +
        "JOIN priceditems pi ON combined_items.itemid = pi.itemid " +
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

/**
 * GET /api/StaffData
 * Fetches all staff data from the `staff` table.
 */
app.get('/api/StaffData', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM staff');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

/**
 * POST /api/addStaffData
 * Adds a new staff member to the `staff` table.
 * @param {Object} req.body - Request body containing staff details.
 * @param {string} req.body.staff_name - Name of the staff member.
 * @param {string} req.body.position - Position of the staff member.
 */
app.post('/api/addStaffData', async (req, res) => {
  const { staff_name, position } = req.body;
  try {
    await pool.query('INSERT INTO staff (employee_id, staff_name, position, active) VALUES ((SELECT MAX(employee_id) from staff) + 1, $1, $2, true )', [staff_name, position]);
    res.status(201).json({ message: 'Staff member added successfully' });
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).json({ error: 'Failed to add staff member' });
  }
});

/**
 * GET /api/RestockData
 * Fetches ingredient restock data, sorted by units.
 */
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

/**
 * POST /api/ProductUsageData
 * Fetches product usage data for a given time range.
 * @param {Object} req.body - Request body containing time range details.
 * @param {number} req.body.startCompositeTime - Start time.
 * @param {number} req.body.endCompositeTime - End time.
 */
app.post('/api/ProductUsageData', async(req,res) =>{
    const startCompositeTime = req.body.startCompositeTime;
    const endCompositeTime = req.body.endCompositeTime;
    try {
        const result = await pool.query(
         ` WITH OrderItems AS (
            SELECT priceditem AS itemid, COUNT(DISTINCT id) AS item_count
            FROM neworderhistory
            WHERE ((week * 10000) + (day * 100) + hour) BETWEEN $1 AND $2
            GROUP BY priceditem
            UNION ALL
            SELECT side AS itemid, COUNT(DISTINCT id) AS item_count
            FROM neworderhistory
            WHERE ((week * 10000) + (day * 100) + hour) BETWEEN $1 AND $2
            GROUP BY side
            UNION ALL
            SELECT entree1 AS itemid, COUNT(DISTINCT id) AS item_count
            FROM neworderhistory
            WHERE ((week * 10000) + (day * 100) + hour) BETWEEN $1 AND $2
            GROUP BY entree1
            UNION ALL
            SELECT entree2 AS itemid, COUNT(DISTINCT id) AS item_count
            FROM neworderhistory
            WHERE ((week * 10000) + (day * 100) + hour) BETWEEN $1 AND $2
            GROUP BY entree2
            UNION ALL
            SELECT entree3 AS itemid, COUNT(DISTINCT id) AS item_count
            FROM neworderhistory
            WHERE ((week * 10000) + (day * 100) + hour) BETWEEN $1 AND $2
            GROUP BY entree3
          )
          SELECT ing.ingredient_name,
                 SUM(oi.item_count) AS total_items_used
          FROM OrderItems oi
          JOIN menuitems mi ON oi.itemid = mi.menuid
          JOIN LATERAL unnest(mi.ingredientsused) AS u(ingredientid) ON TRUE
          JOIN ingredients ing ON ing.ingredientid = u.ingredientid
          GROUP BY ing.ingredient_name
          ORDER BY total_items_used DESC;
        `,
          [startCompositeTime, endCompositeTime]
        );
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error executing query', error.stack);
        res.status(500).json({ error: 'Error fetching sales data' });
    }
});

/**
 * GET /api/ingredients
 * Fetches all ingredients from the `ingredients` table.
 */

app.get('/api/ingredients', async(req,res) =>{
  try{
    const result = await pool.query("SELECT * FROM ingredients");
    res.status(200).json(result.rows);
  }
  catch(err){
    console.error('Error executing query', err.stack);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

/**
 * GET /api/OrderHistoryData
 * Fetches recent order history data from the `neworderhistory` table.
 */
app.get('/api/OrderHistoryData', async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM neworderhistory ORDER BY id DESC LIMIT 100");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});


/**
 * POST /api/placeOrder
 * Places a new order in the database.
 * @param {Object} req.body - Order details.
 */
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
    "Small Entree" : 8,
    "Medium Entree" : 9,
    "Large Entree" : 10,
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

  const validItemTypes = ["Bowl", "Plate", "Bigger Plate", 'Small Entree', "Medium Entree", "Large Entree", "Premium Small Entree", "Premium Medium Entree", "Premium Large Entree"]; // Valid priced item types

  try {
    // Get the latest order ID
    await pool.query("BEGIN");
    const latestOrderResult = await pool.query("SELECT MAX(id) as latestOrder FROM neworderhistory");
    console.log("Latest Order Query Result:", latestOrderResult.rows);
    const latestOrderId = latestOrderResult.rows[0]?.latestorder || 0; // Extract the integer value
    const newOrderId = latestOrderId + 1; // Increment the ID correctly
    let itemId = 0;
    let totalPrice = 0;
    let date = new Date();
    let currentHour = date.getHours();
    let currentDay = date.getDay() + 1;
    let startOfYear = new Date(date.getFullYear(), 0, 1);
    let daysSinceStartOfYear = Math.floor((date - startOfYear) / (24 * 60 * 60 * 1000));
    let jan1Day = startOfYear.getDay();
    let adjustedDays = daysSinceStartOfYear + jan1Day;
    let currentWeek = Math.ceil(adjustedDays / 7);
    
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
        let entree1ID = menu_dictionary[entrees[0]] || -1;
        // Calculate premium for premium entrees
        if (!["Small Entree", "Medium Entree", "Large Entree", "Premium Small Entree", "Premium Medium Entree", "Premium Large Entree"].includes(itemType)) {      
          entrees.forEach((entree) => {
            if (["Black Pepper Sirloin Steak", "Honey Walnut Shrimp"].includes(entree)) {
              premium += 1.5;
            }
            });
        }
        else{
          entree1ID = menu_dictionary[name] || -1;
          console.log("Entree ID: ", entree1ID);
        }

        price += premium;
        totalPrice += price;

        // Map sides and entrees to their corresponding IDs from the dictionary
        const sideID = Array.isArray(sides) 
          ? (menu_dictionary.hasOwnProperty(sides[0]) ? menu_dictionary[sides[0]] : -1)
          : (menu_dictionary.hasOwnProperty(sides) ? menu_dictionary[sides] : -1);
        const entree2ID = entrees[1] ? menu_dictionary[entrees[1]] || -1 : -1;
        const entree3ID = entrees[2] ? menu_dictionary[entrees[2]] || -1 : -1;

        console.log(`Inserting order with itemType ${itemType}`);
        console.log('Sides received:', sides);
        console.log('Mapped sideID:', sideID);
        console.log("Menu dictionary for Chow Mein:", menu_dictionary["Chow Mein"]);

        await pool.query(
          "INSERT INTO neworderhistory (id, priceditem, side, entree1, entree2, entree3, cost, premium, itemid, hour, day, week) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)",
          [
            newOrderId,
            priced_dictionary[itemType],
            sideID,
            entree1ID,
            entree2ID,
            entree3ID,
            price,
            premium,
            itemId,
            currentHour,
            currentDay,
            currentWeek,
          ]
        );
        await pool.query(
          "INSERT INTO kitchentable (id, priceditem, side, entree1, entree2, entree3, itemid) VALUES ($1, $2, $3, $4, $5, $6, $7)",
          [
            newOrderId,
            priced_dictionary[itemType],
            sideID,
            entree1ID,
            entree2ID,
            entree3ID,
            itemId,
          ]
        );
        itemId += 1;
      } else if (name) {
        // Handle standalone items like drinks
        console.log("Inserting standalone item: ${name}", name);
        const itemCostResult = await pool.query("SELECT price FROM priceditems WHERE item_name = ($1)", [name]);
        const itemCost = itemCostResult.rows[0]?.price || 0;
        totalPrice += itemCost;

        console.log("Price of item: ", itemCost);
        await pool.query(
          "INSERT INTO neworderhistory (id, priceditem, side, entree1, entree2, entree3, cost, premium, itemid, hour, day, week) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)",
          [
            newOrderId,
            priced_dictionary[name] || -1,
            -1,
            -1,
            -1,
            -1,
            itemCost,
            0,
            itemId,
            currentHour,
            currentDay,
            currentWeek,
          ]
        );
        await pool.query(
          "INSERT INTO kitchentable (id, priceditem, side, entree1, entree2, entree3, itemid) VALUES ($1, $2, $3, $4, $5, $6, $7)",
          [
            newOrderId,
            priced_dictionary[name] || -1,
            -1,
            -1,
            -1,
            -1,
            itemId,
          ]
        );
        itemId += 1;
      } else {
        console.warn("Skipping invalid order:", order);
      }
    }
    await pool.query(
      "INSERT INTO xreport (hour, id, cost) VALUES ($1, $2, $3)",
      [
        currentHour,
        newOrderId,
        totalPrice,
      ]
    );
    // Commit transaction
    await pool.query("COMMIT");
    console.log("Transaction committed successfully");
    res.status(200).json({ success: true, message: "Orders processed successfully" });
  } catch (err) {
    // Rollback transaction on error
    await pool.query("ROLLBACK");
    console.error("Error processing orders:", err);
    res.status(500).json({ error: "Failed to process orders" });
  }
});

/**
 * POST /api/cashierPlaceOrder
 * Places a new order in the database from cashier page
 * @param {Object} req.body - Order details.
 */
app.post('/api/cashierPlaceOrder', async (req, res) => {
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
    "Small Entree" : 8,
    "Medium Entree" : 9,
    "Large Entree" : 10,
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

  const validItemTypes = ["Bowl", "Plate", "Bigger Plate", 'Small Entree', "Medium Entree", "Large Entree", "Premium Small Entree", "Premium Medium Entree", "Premium Large Entree"]; // Valid priced item types

  try {
    // Get the latest order ID
    await pool.query("BEGIN");
    const latestOrderResult = await pool.query("SELECT MAX(id) as latestOrder FROM neworderhistory");
    console.log("Latest Order Query Result:", latestOrderResult.rows);
    const latestOrderId = latestOrderResult.rows[0]?.latestorder || 0; // Extract the integer value
    const newOrderId = latestOrderId + 1; // Increment the ID correctly
    let itemId = 0;
    let totalPrice = 0;
    let date = new Date();
    let currentHour = date.getHours();
    let currentDay = date.getDay() + 1;
    let startOfYear = new Date(date.getFullYear(), 0, 1);
    let daysSinceStartOfYear = Math.floor((date - startOfYear) / (24 * 60 * 60 * 1000));
    let jan1Day = startOfYear.getDay();
    let adjustedDays = daysSinceStartOfYear + jan1Day;
    let currentWeek = Math.ceil(adjustedDays / 7);
    
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
        let entree1ID = menu_dictionary[entrees[0]] || -1;
        // Calculate premium for premium entrees
        if (!["Small Entree", "Medium Entree", "Large Entree", "Premium Small Entree", "Premium Medium Entree", "Premium Large Entree"].includes(itemType)) {      
          entrees.forEach((entree) => {
            if (["Black Pepper Sirloin Steak", "Honey Walnut Shrimp"].includes(entree)) {
              premium += 1.5;
            }
            });
        }
        else{
          entree1ID = menu_dictionary[name] || -1;
          console.log("Entree ID: ", entree1ID);
        }

        price += premium;
        totalPrice += price;

        // Map sides and entrees to their corresponding IDs from the dictionary
        const sideID = Array.isArray(sides) ? menu_dictionary[sides[0]] || -1 : menu_dictionary[sides] || -1;
        const entree2ID = entrees[1] ? menu_dictionary[entrees[1]] || -1 : -1;
        const entree3ID = entrees[2] ? menu_dictionary[entrees[2]] || -1 : -1;

        console.log(`Inserting order with itemType ${itemType}`);
        await pool.query(
          "INSERT INTO neworderhistory (id, priceditem, side, entree1, entree2, entree3, cost, premium, itemid, hour, day, week) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)",
          [
            newOrderId,
            priced_dictionary[itemType],
            sideID,
            entree1ID,
            entree2ID,
            entree3ID,
            price,
            premium,
            itemId,
            currentHour,
            currentDay,
            currentWeek,
          ]
        );
        itemId += 1;
      } else if (name) {
        // Handle standalone items like drinks
        console.log("Inserting standalone item: ${name}", name);
        const itemCostResult = await pool.query("SELECT price FROM priceditems WHERE item_name = ($1)", [name]);
        const itemCost = itemCostResult.rows[0]?.price || 0;
        totalPrice += itemCost;

        console.log("Price of item: ", itemCost);
        await pool.query(
          "INSERT INTO neworderhistory (id, priceditem, side, entree1, entree2, entree3, cost, premium, itemid, hour, day, week) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)",
          [
            newOrderId,
            priced_dictionary[name] || -1,
            -1,
            -1,
            -1,
            -1,
            itemCost,
            0,
            itemId,
            currentHour,
            currentDay,
            currentWeek,
          ]
        );
        itemId += 1;
      } else {
        console.warn("Skipping invalid order:", order);
      }
    }
    await pool.query(
      "INSERT INTO xreport (hour, id, cost) VALUES ($1, $2, $3)",
      [
        currentHour,
        newOrderId,
        totalPrice,
      ]
    );
    // Commit transaction
    await pool.query("COMMIT");
    console.log("Transaction committed successfully");
    res.status(200).json({ success: true, message: "Orders processed successfully" });
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



/**
 * POST /api/XReportData
 * Fetches data from Xreport table
 */
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

/**
 * GET /api/ZReportData/generate
 * Generates the Z Report by moving data from `xreport` to `zreport`.
 */
app.get('/api/ZReportData/generate', async(req,res) =>{
  try{
    await pool.query(`TRUNCATE TABLE zreport;
    INSERT INTO zreport (hour, cost, order_id)
    SELECT hour, cost, id
    FROM xreport;

    DELETE FROM xreport;`);

    const result = await pool.query("SELECT * FROM zreport")
    res.status(200).json(result.rows);
  }
  catch(err){
    console.error('Error executing query', err.stack);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

/**
 * GET /api/ZReportData/request
 * Fetches all data from the `zreport` table.
 */
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

/**
 * POST /api/modify/neworderhistory
 * Modifies data in the `neworderhistory` table.
 * @param {Object} req.body - Data to be updated in the table.
 */
app.post('/api/modify/neworderhistory', async(req,res) =>{
  try{
    const { id, priceditem, side, entree1, entree2, entree3, cost, premium, itemid, hour, day, week } = req.body;
    const result = await pool.query("UPDATE neworderhistory SET priceditem = $1, side = $2, entree1 = $3, entree2 = $4, entree3 = $5, cost = $6, premium = $7, itemid = $8, hour = $9, day = $10, week = $11 WHERE id = $12",
    [priceditem, side, entree1, entree2, entree3, cost, premium, itemid, hour, day, week, id]);
    res.status(200).json(result.rows);
  }
  catch(err){
    console.error('Error executing query', err.stack);
    res.status(500).json({ error: 'Failed to modify data' });
  }
});

/**
 * POST /api/modify/staff
 * Modifies data in the `staff` table.
 * @param {Object} req.body - Staff details to be updated.
 */
app.post('/api/modify/staff', async(req,res) =>{
  try{
    const { employee_id, staff_name, position, active } = req.body;
    const result = await pool.query("UPDATE staff SET staff_name = $1, position = $2, active = $3 WHERE employee_id = $4",
    [staff_name, position, active, employee_id]);
    res.status(200).json(result.rows);
  }
  catch(err){
    console.error('Error executing query', err.stack);
    res.status(500).json({ error: 'Failed to modify data' });
  }
});

/**
 * POST /api/modify/ingredients
 * Modifies data in the `ingredients` table.
 * @param {Object} req.body - Ingredient details to be updated.
 */
app.post('/api/modify/ingredients', async(req,res) =>{
  try{
    const { ingredientid, ingredient_name, units, restock_level } = req.body;
    const result = await pool.query("UPDATE ingredients SET ingredient_name = $1, units = $2, restock_level = $3 WHERE ingredientid = $4",
    [ingredient_name, units, restock_level, ingredientid]);
    res.status(200).json(result.rows);
  }
  catch(err){
    console.error('Error executing query', err.stack);
    res.status(500).json({ error: 'Failed to modify data' });
  }
});

/**
 * POST /api/modify/priceditems
 * Modifies data in the `priceditems` table.
 * @param {Object} req.body - Priced item details to be updated.
 */
app.post('/api/modify/priceditems', async(req,res) =>{
  try{
    const { itemid, item_name, category, price } = req.body;
    const result = await pool.query("UPDATE priceditems SET item_name = $1, category = $2, price = $3 WHERE itemid = $4",
    [item_name, category, price, itemid]);
    res.status(200).json(result.rows);
  }
  catch(err){
    console.error('Error executing query', err.stack);
    res.status(500).json({ error: 'Failed to modify data' });
  }
});

/**
 * POST /api/modify/menuitems
 * Modifies data in the `menuitems` table.
 * @param {Object} req.body - Menu item details to be updated.
 */
app.post('/api/modify/menuitems', async(req,res) =>{
  try{
    const { menuid, item_name, ingredientsused } = req.body;
    const result = await pool.query("UPDATE menuitems SET item_name = $1, ingredientsused = $2 WHERE menuid = $3",
    [item_name, ingredientsused, menuid]);
    res.status(200).json(result.rows);
  }
  catch(err){
    console.error('Error executing query', err.stack);
    res.status(500).json({ error: 'Failed to modify data' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

//Stuff for OAuth  
  // Middleware for sessions
  // const session = require('express-session');

// app.use(
//   session({
//     secret: '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',
//     resave: false, // Prevents unnecessary session saving
//     saveUninitialized: false, // Ensures no empty sessions are stored
//     cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 24-hour session
//   })
// );
app.use(
  session({
    secret: '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',
    resave: false, // Prevents unnecessary session saving
    saveUninitialized: false, // Prevents storing empty sessions
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      secure: true, // Ensures cookies are sent only over HTTPS
      httpOnly: true, // Prevents client-side JavaScript access to cookies
      sameSite: 'none', // Allows cross-origin requests
    },
  })
);

// app.use(
  //   cookieSession({
  //     name: 'session',
  //     keys: ['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'], // Replace with your secret key
  //     maxAge: 24 * 60 * 60 * 1000, // 24 hours
//   })
// );

  app.use(passport.initialize());
  app.use(passport.session());
  
  // Passport Google OAuth Strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: '903918584895-96ghg3tevp05m8r3ouior1j2ufbhq5dg.apps.googleusercontent.com',
        clientSecret: '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',
        // callbackURL: 'http://localhost:3000/auth/callback', // local host
        callbackURL: 'https://project-3-03-team-2xy5.onrender.com/auth/callback', // deplyed
      },
      (accessToken, refreshToken, profile, done) => {
        // Save user profile (or handle user creation here)
        done(null, profile);
      }
    )
  );
  
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
  
  // Google Auth Routes
  app.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );
  
  app.get(
    '/auth/callback',
    passport.authenticate('google', {
      failureRedirect: '/',
    }),
    (req, res) => {
      // res.redirect('http://localhost:3001/'); // Redirect to the homepage or login page- local
      console.log(req);
      res.redirect('https://project-3-03-team-1.onrender.com');
    }
  );
  
  app.get('/auth/logout', (req, res) => {
    req.logout((err) => {
      if (err) {
        console.error('Logout error:', err);
        return res.status(500).send('Failed to log out');
      }
      req.session = null; // Clear the session if using cookie-session
      // res.redirect('http://localhost:3001/'); // Redirect to the homepage or login page- local
      res.redirect('https://project-3-03-team-1.onrender.com');
      console.log("Redirected?");
    });
  });
  
  app.get('/auth/status', (req, res) => {
    if (req.isAuthenticated()) {
      res.json({ user: req.user });
    } else {
      res.json({ user: null });
    }
  });

  // const client = new OAuth2Client('903918584895-96ghg3tevp05m8r3ouior1j2ufbhq5dg.apps.googleusercontent.com'); // Replace with your Google client ID
  
  // app.get('/auth/status', async (req, res) => {
  //   const token = req.session.token;  // or use whatever method you store the token
  //   if (!token) {
  //     return res.status(401).json({ error: 'No token provided' });
  //   }
  
  //   try {
  //     // Verify the token
  //     const ticket = await client.verifyIdToken({
  //       idToken: token,
  //       audience: '903918584895-96ghg3tevp05m8r3ouior1j2ufbhq5dg.apps.googleusercontent.com',  // Ensure this matches the client ID
  //     });
      
  //     const payload = ticket.getPayload();
  //     console.log('User data:', payload);  // Contains the user's profile information
      
  //     // Respond with user data
  //     res.json({ user: payload });
  //   } catch (error) {
  //     console.error('Error verifying token:', error);
  //     res.status(500).json({ error: 'Failed to verify token' });
  //   }
  // });
  