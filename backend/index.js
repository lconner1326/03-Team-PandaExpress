// Import dependencies
import express from 'express';
import pkg from 'pg';
import cors from 'cors';
import dotenv from 'dotenv';
// Stuff for OAuth
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import cookieSession from 'cookie-session';
import session from 'express-session';
import { OAuth2Client } from 'google-auth-library';

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

// Define another route for kitchenpage that frontend can call
app.get('/api/kitchen', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM kitchentable');
    res.status(200).json(result.rows); // This exports result.rows
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.get('/api/priceditems', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM priceditems');
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
    let itemId = 0;
    
    
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
          "INSERT INTO neworderhistory (id, priceditem, side, entree1, entree2, entree3, cost, premium, itemid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
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
        console.log("Price of item: ", itemCost);
        await pool.query(
          "INSERT INTO neworderhistory (id, priceditem, side, entree1, entree2, entree3, cost, premium, itemid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
          [
            newOrderId,
            priced_dictionary[name] || -1,
            -1,
            -1,
            -1,
            -1,
            itemCost,
            itemId,
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
            itemCost,
            itemId,
          ]
        );
        itemId += 1;
      } else {
        console.warn("Skipping invalid order:", order);
      }
    }
    // Commit transaction
    await pool.query("COMMIT");
    console.log("Transaction committed successfully");
    res.status(200).json({ success: true, message: "Orders processed successfully", orderId: newOrderId, itemId: 0 });
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




// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

//Stuff for OAuth  
  // Middleware for sessions
  // const session = require('express-session');

app.use(
  session({
    secret: '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',
    resave: false, // Prevents unnecessary session saving
    saveUninitialized: false, // Ensures no empty sessions are stored
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 24-hour session
  })
);
// app.use(
//   session({
//     secret: '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',
//     resave: false, // Prevents unnecessary session saving
//     saveUninitialized: false, // Prevents storing empty sessions
//     cookie: {
//       maxAge: 24 * 60 * 60 * 1000, // 24 hours
//       secure: true, // Ensures cookies are sent only over HTTPS
//       httpOnly: true, // Prevents client-side JavaScript access to cookies
//       sameSite: 'none', // Allows cross-origin requests
//     },
//   })
// );

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
  