const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5001;

const cors = require('cors');
app.use(cors());

app.get('/api/data', (req, res) => {
  const data = { message: 'Hello from Node.js!' };
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;