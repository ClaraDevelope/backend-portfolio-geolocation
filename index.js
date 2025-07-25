require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const connectDB = require('./config/db');
const router = require('./routes/visitRoute');

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Backend del portfolio activo');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
