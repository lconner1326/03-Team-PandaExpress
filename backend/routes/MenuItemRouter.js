import express from 'express';

/**
 * Express router for handling menu item-related requests.
 * @module MenuItemRouter
 */

const router = express.Router();

/**
 * GET /MenuItem
 * Retrieves all menu items from the database.
 * 
 * @name GetMenuItems
 * @function
 * @memberof module:MenuItemRouter
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {JSON} - A JSON response containing an array of menu items or an error message.
 * 
 * @example
 * // Example usage:
 * fetch('/MenuItem')
 *   .then(response => response.json())
 *   .then(data => console.log(data))
 *   .catch(error => console.error(error));
 * 
 * @throws {500} - Returns an error message if there is an issue with database query execution.
 */
router.get("/MenuItem", async (req, res) => {
    const client = new Client({
        user: 'csce331_03',
        host: 'csce-315-db.engr.tamu.edu',
        database: 'csce331_03',
        password: 'team3team',
        port: 5432, // Default PostgreSQL port
    });

    try {
        const query = 'SELECT * FROM MenuItems';
        const result = await client.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error('Error executing query', error.stack);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
