const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');
const app = express();
app.use(express.json()); 
app.use(cors());
app.use('/api', taskRoutes);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
  });
const PORT = 5000;
app.get('/', (req, res) => {
    res.send('Hello from Node.js Backend!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});