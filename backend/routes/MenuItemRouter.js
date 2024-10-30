import express from 'express'

const router = express.Router();

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
