const express = require('express');
const cors = require('cors');
const router = require('./src/Router');

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);

app.listen(3333, () => console.log('Server is Running'))